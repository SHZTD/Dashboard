<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title color="primary">BlueShare Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content color="dark" class="ion-padding">
      <div class="dashboard-container">
        <h1 class="main-title">Welcome to BlueShare</h1>
        <p class="subtitle">Select a dashboard to continue</p>
        
        <div class="buttons-container">
          <ion-button 
            expand="block" 
            size="large" 
            color="primary" 
            class="dashboard-button"
            @click="navigateTo('/biz')"
          >
            <div class="button-content">
              <ion-icon :icon="businessOutline" class="button-icon"></ion-icon>
              <div class="button-text">
                <strong>Business Analytics</strong>
                <span>Revenue, customers, and market data</span>
              </div>
            </div>
          </ion-button>
          
          <ion-button 
            expand="block" 
            size="large" 
            color="primary" 
            class="dashboard-button"
            @click="navigateTo('/dev')"
          >
            <div class="button-content">
              <ion-icon :icon="codeSlashOutline" class="button-icon"></ion-icon>
              <div class="button-text">
                <strong>Dev Analytics</strong>
                <span>Code metrics, performance, and quality</span>
              </div>
            </div>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage,
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/vue';
import { 
  businessOutline,
  codeSlashOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton,
    IonIcon
  },
  setup() {
    const router = useRouter();
    
    const navigateTo = (path) => {
      router.push(path);
    };
    
    return {
      navigateTo,
      businessOutline,
      codeSlashOutline
    };
  }
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #06b6d4;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 3rem;
  text-align: center;
  opacity: 0.8;
}

.buttons-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-button {
  height: auto;
  --padding-top: 1.5rem;
  --padding-bottom: 1.5rem;
  --padding-start: 1.5rem;
  --padding-end: 1.5rem;
  --border-radius: 12px;
  --background: #1e1e1e;
  --background-hover: #2a2a2a;
  --color: white;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.dashboard-button:hover {
  transform: translateY(-5px);
}

.button-content {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
}

.button-icon {
  font-size: 2.5rem;
  margin-right: 1.5rem;
}

.button-text {
  display: flex;
  flex-direction: column;
}

.button-text strong {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.button-text span {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 576px) {
  .main-title {
    font-size: 2rem;
  }
  
  .button-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
  
  .button-text strong {
    font-size: 1rem;
  }
  
  .button-text span {
    font-size: 0.8rem;
  }
}
</style>