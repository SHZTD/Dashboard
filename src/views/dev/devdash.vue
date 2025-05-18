<template>
  <div>
    <ion-header translucent>
      <ion-toolbar color="dark">
        <ion-title color="primary">Dev Analytics</ion-title>
        <ion-buttons slot="end">
          <ion-segment 
            value="dev" 
            color="primary"
            @ionChange="handleTabChange">
            <ion-segment-button value="biz">
              <ion-label>Business</ion-label>
            </ion-segment-button>
            <ion-segment-button value="dev">
              <ion-label>Dev</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-grid>
      <ion-row>
        <!-- 1. Gráfico de commits (Chart.js - Radar) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">Code commits</ion-label>
              </ion-card-title>
              <ion-note>Por equipo</ion-note>
            </ion-card-header>
            <ion-card-content>
              <canvas ref="commitChart"></canvas>
            </ion-card-content>
          </ion-card>
        </ion-col>
        
        <!-- 2. Gráfico de PRs (ApexCharts) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">Pull requests</ion-label>
              </ion-card-title>
              <ion-note>Last 30 days</ion-note>
            </ion-card-header>
            <ion-card-content>
              <div ref="prChart" class="chart-container"></div>
            </ion-card-content>
          </ion-card>
        </ion-col>
        
        <!-- 3. Build performance (SVG Custom) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">Build performance</ion-label>
              </ion-card-title>
              <ion-note>Current vs previous</ion-note>
            </ion-card-header>
            <ion-card-content>
              <div class="build-comparison">
                <svg width="100%" height="180" viewBox="0 0 200 180">
                  <!-- Ejes -->
                  <line x1="30" y1="20" x2="30" y2="160" stroke="#333" stroke-width="2"/>
                  <line x1="30" y1="160" x2="170" y2="160" stroke="#333" stroke-width="2"/>
                  
                  <!-- Barras -->
                  <rect x="50" y="80" width="40" height="80" fill="#06b6d4" rx="3">
                    <animate attributeName="height" from="0" to="80" dur="1s" fill="freeze"/>
                    <animate attributeName="y" from="160" to="80" dur="1s" fill="freeze"/>
                  </rect>
                  <text x="70" y="75" text-anchor="middle" fill="white" font-size="12">48s</text>
                  
                  <rect x="110" y="120" width="40" height="40" fill="#0ea5e9" rx="3">
                    <animate attributeName="height" from="0" to="40" dur="1s" begin="0.5s" fill="freeze"/>
                    <animate attributeName="y" from="160" to="120" dur="1s" begin="0.5s" fill="freeze"/>
                  </rect>
                  <text x="130" y="115" text-anchor="middle" fill="white" font-size="12">36s</text>
                  
                  <!-- Labels -->
                  <text x="70" y="175" text-anchor="middle" fill="#aaa" font-size="10">Prev</text>
                  <text x="130" y="175" text-anchor="middle" fill="#aaa" font-size="10">Current</text>
                  
                  <!-- Mejora porcentual -->
                  <path d="M70,70 L130,110" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
                  <text x="100" y="90" text-anchor="middle" fill="#10b981" font-size="12">25% faster</text>
                </svg>
              </div>
            </ion-card-content>
          </ion-card>
        </ion-col>
        
        <!-- 4. Code coverage (ECharts) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">Code coverage</ion-label>
              </ion-card-title>
              <ion-note>Unit tests</ion-note>
            </ion-card-header>
            <ion-card-content>
              <div ref="coverageChart" class="chart-container"></div>
            </ion-card-content>
          </ion-card>
        </ion-col>
        
        <!-- 5. API Performance (Chart.js - Tiempo real) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">API performance</ion-label>
              </ion-card-title>
              <ion-note>Live response time (ms)</ion-note>
            </ion-card-header>
            <ion-card-content>
              <canvas ref="apiChart"></canvas>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonLabel, IonIcon, IonHeader, IonToolbar, IonTitle, IonButtons, IonSegment,
  IonSegmentButton, IonBackButton, IonNote
} from '@ionic/vue';
import { 
  gitCommitOutline as gitCommit, 
  gitPullRequestOutline as gitPullRequest, 
  timerOutline as timer,
  shieldCheckmarkOutline as shield,
  pulseOutline as pulse
} from 'ionicons/icons';
import { Chart, registerables } from 'chart.js';
import ApexCharts from 'apexcharts';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'DevAnalytics',
  components: {
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonLabel, IonIcon, IonHeader, IonToolbar, IonTitle, IonButtons, IonSegment,
    IonSegmentButton, IonBackButton, IonNote
  },
  setup() {
    const router = useRouter();
    const commitChart = ref(null);
    const prChart = ref(null);
    const coverageChart = ref(null);
    const apiChart = ref(null);
    let apiIntervalId = null;
    let chartInstances = {
      commit: null,
      api: null,
      coverage: null
    };

    const handleTabChange = (e) => {
      router.push(`/${e.detail.value}`);
    };

    // 1. Gráfico de Commits (Chart.js - Radar)
    const initCommitChart = () => {
      Chart.register(...registerables);
      chartInstances.commit = new Chart(commitChart.value, {
        type: 'radar',
        data: {
          labels: ['Frontend', 'Backend', 'Mobile', 'QA', 'DevOps', 'Data'],
          datasets: [{
            label: 'Commits por equipo',
            data: [65, 59, 90, 81, 56, 55],
            backgroundColor: 'rgba(6, 182, 212, 0.2)',
            borderColor: '#06b6d4',
            pointBackgroundColor: '#06b6d4',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#06b6d4'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: '#fff'
              }
            }
          },
          scales: {
            r: {
              angleLines: {
                color: 'rgba(255,255,255,0.1)'
              },
              grid: {
                color: 'rgba(255,255,255,0.1)'
              },
              pointLabels: {
                color: '#aaa'
              },
              ticks: {
                backdropColor: 'transparent',
                color: '#aaa'
              }
            }
          }
        }
      });
    };

    // 2. Gráfico de PRs (ApexCharts)
    const initPRChart = () => {
      const options = {
        series: [{
          name: 'Open PRs',
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 5)
        }, {
          name: 'Merged PRs',
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 2)
        }],
        chart: {
          type: 'line',
          height: 300,
          toolbar: { show: false },
          animations: {
            enabled: true
          }
        },
        colors: ['#06b6d4', '#10b981'],
        stroke: {
          curve: 'smooth',
          width: 2
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          categories: Array.from({ length: 30 }, (_, i) => i + 1),
          labels: {
            style: {
              colors: '#aaa'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#aaa'
            }
          }
        },
        legend: {
          labels: {
            colors: '#fff'
          }
        },
        tooltip: {
          theme: 'dark'
        }
      };

      new ApexCharts(prChart.value, options).render();
    };

    // 4. Code Coverage (ECharts)
    const initCoverageChart = () => {
      chartInstances.coverage = echarts.init(coverageChart.value);
      const option = {
        series: [{
          type: 'pie',
          radius: ['70%', '90%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#1e1e1e',
            borderWidth: 2
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
              color: 'white'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 78, name: 'Covered', itemStyle: { color: '#06b6d4' } },
            { value: 22, name: 'Missing', itemStyle: { color: '#333' } }
          ]
        }]
      };
      chartInstances.coverage.setOption(option);
    };

    // 5. API Performance (Chart.js - Tiempo real)
    const initAPIChart = () => {
      const initialData = Array(15).fill(0).map(() => Math.random() * 300 + 50);
      
      chartInstances.api = new Chart(apiChart.value, {
        type: 'line',
        data: {
          labels: Array(15).fill(''),
          datasets: [{
            label: 'Response Time (ms)',
            data: initialData,
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          animation: {
            duration: 0
          },
          scales: {
            y: {
              min: 0,
              max: 500,
              grid: {
                color: 'rgba(255,255,255,0.1)'
              },
              ticks: {
                color: '#aaa'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });

      // Simular datos en tiempo real
      apiIntervalId = setInterval(() => {
        const chart = chartInstances.api;
        const newValue = Math.random() * 300 + 50;
        
        chart.data.datasets[0].data.shift();
        chart.data.datasets[0].data.push(newValue);
        chart.update();
      }, 1000);
    };

    onMounted(() => {
      initCommitChart();
      initPRChart();
      initCoverageChart();
      initAPIChart();

      window.addEventListener('resize', function() {
        if (chartInstances.coverage) chartInstances.coverage.resize();
      });
    });

    onUnmounted(() => {
      if (apiIntervalId) clearInterval(apiIntervalId);
      if (chartInstances.coverage) chartInstances.coverage.dispose();
      if (chartInstances.commit) chartInstances.commit.destroy();
      if (chartInstances.api) chartInstances.api.destroy();
    });

    return {
      gitCommit,
      gitPullRequest,
      timer,
      shield,
      pulse,
      handleTabChange,
      commitChart,
      prChart,
      coverageChart,
      apiChart
    };
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}

ion-icon {
  font-size: 48px;
}

ion-card {
  --background: #1e1e1e;
  --color: white;
  margin-bottom: 16px;
}

ion-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

ion-toolbar {
  --background: #121212;
  --color: white;
}

ion-segment {
  --background: transparent;
}

ion-segment-button {
  --color: #06b6d4;
  --color-checked: #ffffff;
  --background-checked: #06b6d4;
}

.build-comparison {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.build-comparison text {
  font-family: Arial, sans-serif;
}
</style>