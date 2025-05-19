<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">Code commits</ion-label>
      </ion-card-title>
      <ion-note>Por equipo</ion-note>
    </ion-card-header>
    <ion-card-content>
      <canvas ref="chartCanvas"></canvas>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote 
} from '@ionic/vue';

export default {
  name: 'ChartJsRadar',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote
  },
  setup() {
    const chartCanvas = ref(null);
    let chartInstance = null;

    onMounted(() => {
      Chart.register(...registerables);
      chartInstance = new Chart(chartCanvas.value, {
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
    });

    onUnmounted(() => {
      if (chartInstance) chartInstance.destroy();
    });

    return { chartCanvas };
  }
};
</script>