<template>
  <ion-card color="medium">
    <ion-card-header>
      <ion-card-title>
        <ion-label color="primary">Build performance</ion-label>
      </ion-card-title>
      <ion-note>Current vs previous</ion-note>
    </ion-card-header>
    <ion-card-content>
      <div class="build-comparison">
        <svg width="100%" height="180" viewBox="0 0 200 180">
          <!-- Ejes -->
          <line x1="30" y1="20" x2="30" y2="160" stroke="#333" stroke-width="2"/>
          <line x1="30" y1="160" x2="170" y2="160" stroke="#333" stroke-width="2"/>
          
          <!-- Barras -->
          <rect x="50" y="80" width="40" height="80" fill="#06b6d4" rx="3">
            <animate attributeName="height" from="0" to="80" dur="1s" fill="freeze"/>
            <animate attributeName="y" from="160" to="80" dur="1s" fill="freeze"/>
          </rect>
          <text x="70" y="75" text-anchor="middle" fill="white" font-size="12">48s</text>
          
          <rect x="110" y="120" width="40" height="40" fill="#0ea5e9" rx="3">
            <animate attributeName="height" from="0" to="40" dur="1s" begin="0.5s" fill="freeze"/>
            <animate attributeName="y" from="160" to="120" dur="1s" begin="0.5s" fill="freeze"/>
          </rect>
          <text x="130" y="115" text-anchor="middle" fill="white" font-size="12">36s</text>
          
          <!-- Labels -->
          <text x="70" y="175" text-anchor="middle" fill="#aaa" font-size="10">Prev</text>
          <text x="130" y="175" text-anchor="middle" fill="#aaa" font-size="10">Current</text>
          
          <!-- Mejora porcentual -->
          <path d="M70,70 L130,110" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
          <text x="100" y="90" text-anchor="middle" fill="#10b981" font-size="12">25% faster</text>
        </svg>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote 
} from '@ionic/vue';

export default {
  name: 'BuildComparisonChart',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote
  }
};
</script>

<style scoped>
.build-comparison {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.build-comparison text {
  font-family: Arial, sans-serif;
}
</style>