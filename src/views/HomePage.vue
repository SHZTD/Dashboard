<template>
  <ion-page class="home-page">
    <ion-header class="ion-no-border">
      <ion-toolbar color="dark">
        <ion-title>
          <div class="logo-container">
            <div class="logo-icon">
              <ion-icon :icon="analyticsOutline" color="primary"></ion-icon>
            </div>
            <div class="logo-text">BlueShare Dashboard</div>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" color="dark">
      <div class="page-container">
        <div class="content-wrapper">
          <div class="hero-section">
            <h1 class="main-title">Welcome to <span>BlueShare</span></h1>
            <p class="subtitle">Select a dashboard to continue</p>
          </div>
          
          <div class="buttons-grid">
            <div class="dashboard-button-container" @click="navigateTo('/biz')">
              <div class="dashboard-button business">
                <div class="button-icon">
                  <ion-icon :icon="businessOutline"></ion-icon>
                </div>
                <div class="button-content">
                  <h2>Business Analytics</h2>
                  <p>Revenue, customers, and market data</p>
                </div>
                <div class="button-arrow">
                  <ion-icon :icon="chevronForwardOutline"></ion-icon>
                </div>
              </div>
            </div>
            
            <div class="dashboard-button-container" @click="navigateTo('/dev')">
              <div class="dashboard-button dev">
                <div class="button-icon">
                  <ion-icon :icon="codeSlashOutline"></ion-icon>
                </div>
                <div class="button-content">
                  <h2>Dev Analytics</h2>
                  <p>Code metrics, performance, and quality</p>
                </div>
                <div class="button-arrow">
                  <ion-icon :icon="chevronForwardOutline"></ion-icon>
                </div>
              </div>
            </div>
          </div>

          <div class="buttons-grid">
            <div class="dashboard-button-container" @click="navigateTo('/kpi')">
              <div class="dashboard-button business">
                <div class="button-icon">
                  <ion-icon :icon="businessOutline"></ion-icon>
                </div>
                <div class="button-content">
                  <h2>KPI</h2>
                  <p>Key performance indicator</p>
                </div>
                <div class="button-arrow">
                  <ion-icon :icon="chevronForwardOutline"></ion-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-text">
            <p>© SHZTD - Thomas 2025</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon 
} from '@ionic/vue';
import { 
  businessOutline, 
  codeSlashOutline, 
  analyticsOutline,
  chevronForwardOutline
} from 'ionicons/icons';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
.home-page {
  --ion-background-color: #000000;
}

ion-toolbar {
  --background: transparent;
  --border-color: transparent;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--ion-color-primary);
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 0;
  box-sizing: border-box;
  background: radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05), transparent 70%);
}

.content-wrapper {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
  padding-top: 40px;
}

.main-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.main-title span {
  color: var(--ion-color-primary);
  position: relative;
}

.main-title span::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--ion-color-primary);
  opacity: 0.5;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0;
  line-height: 1.5;
}

.buttons-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  margin-bottom: 40px;
}

.dashboard-button-container {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.dashboard-button-container:hover {
  transform: translateY(-8px);
}

.dashboard-button {
  background-color: #111111;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dashboard-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(6, 182, 212, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dashboard-button:hover::before {
  opacity: 1;
}

.dashboard-button.business {
  border-left: 4px solid var(--ion-color-primary);
}

.dashboard-button.dev {
  border-left: 4px solid var(--ion-color-secondary);
}

.button-icon {
  font-size: 2.5rem;
  color: var(--ion-color-primary);
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(6, 182, 212, 0.1);
  border-radius: 12px;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

.dashboard-button.dev .button-icon {
  color: var(--ion-color-secondary);
  background-color: rgba(14, 165, 233, 0.1);
}

.button-content {
  flex: 1;
}

.button-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
}

.button-content p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.4;
}

.button-arrow {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.3);
  margin-left: 16px;
  transition: transform 0.3s ease, color 0.3s ease;
}

.dashboard-button:hover .button-arrow {
  transform: translateX(5px);
  color: var(--ion-color-primary);
}

.dashboard-button.dev:hover .button-arrow {
  color: var(--ion-color-secondary);
}

.footer-text {
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  margin-top: auto;
  padding-top: 40px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 16px;
  }
  
  .hero-section {
    margin-bottom: 30px;
    padding-top: 20px;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .button-icon {
    font-size: 2rem;
    width: 56px;
    height: 56px;
    margin-right: 16px;
  }
  
  .button-content h2 {
    font-size: 1.3rem;
  }
}

@media (max-width: 576px) {
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .dashboard-button {
    padding: 16px;
  }
  
  .button-icon {
    font-size: 1.8rem;
    width: 48px;
    height: 48px;
    margin-right: 12px;
  }
  
  .button-content h2 {
    font-size: 1.1rem;
    margin-bottom: 4px;
  }
  
  .button-content p {
    font-size: 0.9rem;
  }
}
</style>