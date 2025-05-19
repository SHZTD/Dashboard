<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">Code coverage</ion-label>
      </ion-card-title>
      <ion-note>Unit tests</ion-note>
    </ion-card-header>
    <ion-card-content>
      <div ref="chartContainer" class="chart-container"></div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote 
} from '@ionic/vue';

export default {
  name: 'EChartsDonut',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote
  },
  setup() {
    const chartContainer = ref(null);
    let chartInstance = null;

    onMounted(() => {
      chartInstance = echarts.init(chartContainer.value);
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
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
              color: 'white'
            }
          },
          labelLine: { show: false },
          data: [
            { value: 78, name: 'Covered', itemStyle: { color: '#06b6d4' } },
            { value: 22, name: 'Missing', itemStyle: { color: '#333' } }
          ]
        }]
      };
      chartInstance.setOption(option);

      window.addEventListener('resize', function() {
        chartInstance.resize();
      });
    });

    onUnmounted(() => {
      if (chartInstance) {
        chartInstance.dispose();
        window.removeEventListener('resize', function() {
          chartInstance.resize();
        });
      }
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