<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">Sales ad revenue</ion-label>
      </ion-card-title>
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
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel 
} from '@ionic/vue';

export default {
  name: 'ChartJsBar',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel
  },
  setup() {
    const chartCanvas = ref(null);
    let chartInstance = null;

    onMounted(() => {
      Chart.register(...registerables);
      chartInstance = new Chart(chartCanvas.value, {
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
              labels: {
                color: '#fff'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#aaa',
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              }
            },
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
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