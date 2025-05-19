<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">Customer growth</ion-label>
      </ion-card-title>
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
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel 
} from '@ionic/vue';

export default {
  name: 'ApexAreaChart',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel
  },
  setup() {
    const chartContainer = ref(null);
    
    onMounted(() => {
      const options = {
        series: [{
          name: 'Usuarios activos',
          data: [4500, 6200, 7800, 9500, 11500, 14200, 17000]
        }],
        chart: {
          type: 'area',
          height: 350,
          toolbar: { show: false },
          animations: { enabled: true }
        },
        colors: ['#06b6d4'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
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
          categories: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023'],
          labels: { style: { colors: '#aaa' } }
        },
        yaxis: { 
          labels: { 
            style: { colors: '#aaa' },
            formatter: function (val) {
              return val.toLocaleString();
            }
          } 
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val.toLocaleString() + " usuarios";
            }
          }
        }
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
  height: 350px;
}
</style>