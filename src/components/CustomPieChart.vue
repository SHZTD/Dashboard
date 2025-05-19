<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">Sales conversion</ion-label>
      </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="custom-pie-chart">
        <svg width="100%" height="200" viewBox="0 0 200 200">
          <path d="M100,100 L100,0 A100,100 0 0,1 180,50 Z" fill="#06b6d4"/>
          <path d="M100,100 L180,50 A100,100 0 0,1 100,200 Z" fill="#0ea5e9"/>
          <path d="M100,100 L100,200 A100,100 0 0,1 20,150 Z" fill="#0284c7"/>
          <path d="M100,100 L20,150 A100,100 0 0,1 100,0 Z" fill="#0369a1"/>
          <circle cx="100" cy="100" r="70" fill="#1e1e1e"/>
          <text x="100" y="100" text-anchor="middle" fill="white" font-size="20">78%</text>
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
</template>

<script>
import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel 
} from '@ionic/vue';

export default {
  name: 'CustomPieChart',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel
  }
};
</script>

<style scoped>
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