<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">Pull requests</ion-label>
      </ion-card-title>
      <ion-note>Last 30 days</ion-note>
    </ion-card-header>
    <ion-card-content>
      <div ref="chartContainer" class="chart-container"></div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import ApexCharts from 'apexcharts';
import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote 
} from '@ionic/vue';

export default {
  name: 'ApexLineChart',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote
  },
  setup() {
    const chartContainer = ref(null);
    
    onMounted(() => {
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
          animations: { enabled: true }
        },
        colors: ['#06b6d4', '#10b981'],
        stroke: { curve: 'smooth', width: 2 },
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
          labels: { style: { colors: '#aaa' } }
        },
        yaxis: { labels: { style: { colors: '#aaa' } } },
        legend: { labels: { colors: '#fff' } },
        tooltip: { theme: 'dark' }
      };

      new ApexCharts(chartContainer.value, options).render();
    });

    return { chartContainer };
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>