<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">Stock simulation (real-time)</ion-label>
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
  name: 'RealtimeStockChart',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel
  },
  setup() {
    const chartCanvas = ref(null);
    let chartInstance = null;
    let intervalId = null;

    onMounted(() => {
      Chart.register(...registerables);
      const initialDataPoints = Array(30).fill(100);
      
      chartInstance = new Chart(chartCanvas.value, {
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
          animation: { duration: 0 },
          scales: {
            y: {
              min: 50,
              max: 150,
              grid: { color: 'rgba(255,255,255,0.1)' },
              ticks: { color: '#aaa' }
            },
            x: { 
              grid: { display: false },
              ticks: { display: false }
            }
          },
          plugins: { legend: { display: false } }
        }
      });

      intervalId = setInterval(() => {
        const lastValue = chartInstance.data.datasets[0].data[chartInstance.data.datasets[0].data.length - 1];
        const change = (Math.random() - 0.5) * 10;
        const newValue = Math.max(50, Math.min(150, lastValue + change));
        
        chartInstance.data.datasets[0].data.shift();
        chartInstance.data.datasets[0].data.push(newValue);
        chartInstance.update();
      }, 1000);
    });

    onUnmounted(() => {
      if (intervalId) clearInterval(intervalId);
      if (chartInstance) chartInstance.destroy();
    });

    return { chartCanvas };
  }
};
</script>