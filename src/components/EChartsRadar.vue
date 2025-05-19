<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">Market share</ion-label>
      </ion-card-title>
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
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel 
} from '@ionic/vue';

export default {
  name: 'EChartsRadar',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel
  },
  setup() {
    const chartContainer = ref(null);
    let chartInstance = null;

    onMounted(() => {
      chartInstance = echarts.init(chartContainer.value);
      const option = {
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
          splitNumber: 4,
          axisName: {
            color: '#aaa'
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          splitArea: { show: false }
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
  height: 350px;
}
</style>