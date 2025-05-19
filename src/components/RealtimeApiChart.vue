<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">API performance</ion-label>
      </ion-card-title>
      <ion-note>Live response time (ms)</ion-note>
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
  name: 'RealtimeApiChart',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote
  },
  setup() {
    const chartCanvas = ref(null);
    let chartInstance = null;
    let intervalId = null;

    onMounted(() => {
      Chart.register(...registerables);
      const initialData = Array(15).fill(0).map(() => Math.random() * 300 + 50);
      
      chartInstance = new Chart(chartCanvas.value, {
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
          animation: { duration: 0 },
          scales: {
            y: {
              min: 0,
              max: 500,
              grid: { color: 'rgba(255,255,255,0.1)' },
              ticks: { color: '#aaa' }
            },
            x: { grid: { display: false } }
          },
          plugins: { legend: { display: false } }
        }
      });

      intervalId = setInterval(() => {
        const newValue = Math.random() * 300 + 50;
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