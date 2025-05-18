<template>
  <div>
    <ion-header translucent>
      <ion-toolbar color="dark">
        <ion-title color="primary">Business Analytics</ion-title>
        <ion-buttons slot="end">
          <ion-segment 
            value="business" 
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
    
    <!-- dashboard -->
    <ion-grid>
      <ion-row>
        <!-- Chart 1: Sales ad revenue (Chart.js) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">Sales ad revenue</ion-label>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <canvas ref="adRevenueChart"></canvas>
            </ion-card-content>
          </ion-card>
        </ion-col>
        
        <!-- Chart 2: Customer growth (ApexCharts) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">Customer growth</ion-label>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div ref="customerGrowthChart"></div>
            </ion-card-content>
          </ion-card>
        </ion-col>
        
        <!-- Chart 3: Sales conversion (SVG Custom) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">Sales conversion</ion-label>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="custom-pie-chart">
                <svg width="100%" height="200" viewBox="0 0 200 200">
                  <path 
                    d="M100,100 L100,0 A100,100 0 0,1 180,50 Z" 
                    fill="#06b6d4"
                  />
                  <path 
                    d="M100,100 L180,50 A100,100 0 0,1 100,200 Z" 
                    fill="#0ea5e9"
                  />
                  <path 
                    d="M100,100 L100,200 A100,100 0 0,1 20,150 Z" 
                    fill="#0284c7"
                  />
                  <path 
                    d="M100,100 L20,150 A100,100 0 0,1 100,0 Z" 
                    fill="#0369a1"
                  />
                  <circle cx="100" cy="100" r="70" fill="#1e1e1e" />
                  <text x="100" y="100" text-anchor="middle" fill="white" font-size="20">
                    78%
                  </text>
                </svg>
                <div class="legend">
                  <div><span style="color: #06b6d4">■</span> Leads (35%)</div>
                  <div><span style="color: #0ea5e9">■</span> Prospectos (25%)</div>
                  <div><span style="color: #0284c7">■</span> Clientes (15%)</div>
                  <div><span style="color: #0369a1">■</span> Recurrentes (25%)</div>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </ion-col>
        
        <!-- Chart 4: Market share (ECharts) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">Market share</ion-label>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div ref="marketShareChart" style="width: 100%; height: 300px;"></div>
            </ion-card-content>
          </ion-card>
        </ion-col>
        
        <!-- Chart 5: Stock simulation (Real-time) -->
        <ion-col size="12" size-md="6" size-lg="4">
          <ion-card color="medium">
            <ion-card-header>
              <ion-card-title>
                <ion-label color="primary">Stock simulation (real-time)</ion-label>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <canvas ref="stockChart"></canvas>
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
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonLabel,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonBackButton
} from '@ionic/vue';
import { 
  barChartOutline as barChart, 
  trendingUpOutline as trendingUp, 
  pieChartOutline as pieChart,
  analyticsOutline as analytics,
  statsChartOutline as statsChart
} from 'ionicons/icons';
import { Chart, registerables } from 'chart.js';
import ApexCharts from 'apexcharts';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'BusinessAnalytics',
  components: {
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent,
    IonLabel,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonBackButton
  },
  setup() {
    const router = useRouter();
    const adRevenueChart = ref(null);
    const customerGrowthChart = ref(null);
    const marketShareChart = ref(null);
    const stockChart = ref(null);
    let stockIntervalId = null;
    let chartInstances = {
      adRevenue: null,
      customerGrowth: null,
      marketShare: null,
      stock: null
    };

    const handleTabChange = (e) => {
      router.push(`/${e.detail.value}`);
    };

    // Initialize all charts
    const initCharts = () => {
      // Chart 1: Ad Revenue (Chart.js)
      Chart.register(...registerables);
      chartInstances.adRevenue = new Chart(adRevenueChart.value, {
        type: 'bar',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [{
            label: 'Ingresos por publicidad ($)',
            data: [12500, 19000, 22000, 28000, 32500, 40000],
            backgroundColor: '#06b6d4',
            borderColor: '#06b6d4',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              }
            }
          }
        }
      });

      // Chart 2: Customer Growth (ApexCharts)
      const customerGrowthOptions = {
        series: [{
          name: 'Usuarios activos',
          data: [4500, 6200, 7800, 9500, 11500, 14200, 17000]
        }],
        chart: {
          type: 'area',
          height: 350,
          toolbar: {
            show: false
          }
        },
        colors: ['#06b6d4'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023'],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val.toLocaleString() + " usuarios";
            }
          }
        }
      };
      chartInstances.customerGrowth = new ApexCharts(customerGrowthChart.value, customerGrowthOptions);
      chartInstances.customerGrowth.render();

      // Chart 4: Market Share (ECharts)
      chartInstances.marketShare = echarts.init(marketShareChart.value);
      const marketShareOptions = {
        color: ['#06b6d4'],
        radar: {
          indicator: [
            { name: 'EE.UU.', max: 100 },
            { name: 'Europa', max: 100 },
            { name: 'Asia', max: 100 },
            { name: 'LatAm', max: 100 },
            { name: 'África', max: 100 },
            { name: 'Oceanía', max: 100 }
          ],
          radius: '65%',
          splitNumber: 4
        },
        series: [{
          type: 'radar',
          data: [{
            value: [85, 72, 65, 45, 30, 55],
            name: 'Nuestra plataforma',
            areaStyle: {
              color: 'rgba(6, 182, 212, 0.4)'
            }
          }]
        }],
        tooltip: {
          trigger: 'item'
        }
      };
      chartInstances.marketShare.setOption(marketShareOptions);

      // Chart 5: Stock Simulation (Real-time Chart.js)
      const initialDataPoints = Array(30).fill(100);
      chartInstances.stock = new Chart(stockChart.value, {
        type: 'line',
        data: {
          labels: Array(30).fill(''),
          datasets: [{
            label: 'Valor de la acción ($)',
            data: initialDataPoints,
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
              min: 50,
              max: 150
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });

      // Real-time data simulation for stock chart
      stockIntervalId = setInterval(() => {
        const lastValue = chartInstances.stock.data.datasets[0].data[chartInstances.stock.data.datasets[0].data.length - 1];
        const change = (Math.random() - 0.5) * 10;
        const newValue = Math.max(50, Math.min(150, lastValue + change));
        
        chartInstances.stock.data.datasets[0].data.shift();
        chartInstances.stock.data.datasets[0].data.push(newValue);
        chartInstances.stock.update();
      }, 1000);
    };

    // Cleanup charts on unmount
    const cleanupCharts = () => {
      if (chartInstances.adRevenue) chartInstances.adRevenue.destroy();
      if (chartInstances.customerGrowth) chartInstances.customerGrowth.destroy();
      if (chartInstances.marketShare) chartInstances.marketShare.dispose();
      if (chartInstances.stock) chartInstances.stock.destroy();
      if (stockIntervalId) clearInterval(stockIntervalId);
    };

    onMounted(() => {
      initCharts();
      window.addEventListener('resize', () => {
        if (chartInstances.marketShare) chartInstances.marketShare.resize();
      });
    });

    onUnmounted(() => {
      cleanupCharts();
      window.removeEventListener('resize', () => {
        if (chartInstances.marketShare) chartInstances.marketShare.resize();
      });
    });

    return {
      barChart,
      trendingUp,
      pieChart,
      analytics,
      statsChart,
      handleTabChange,
      adRevenueChart,
      customerGrowthChart,
      marketShareChart,
      stockChart
    };
  }
});
</script>

<style scoped>
.chart-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  background-color: var(--ion-color-dark);
  border-radius: 8px;
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

.custom-pie-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.legend {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  color: white;
  font-size: 12px;
}
</style>