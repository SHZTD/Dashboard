<template>
  <ion-page>
    <ion-header translucent class="ion-no-border">
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" text="Home"></ion-back-button>
        </ion-buttons>
        <ion-title>
          <div class="title-container">
            <div class="title-icon">
              <ion-icon :icon="codeSlashOutline" color="primary"></ion-icon>
            </div>
            <div class="title-text">Dev Analytics</div>
          </div>
        </ion-title>
        <ion-buttons slot="end">
          <ion-button class="refresh-button" @click="refreshData">
            <ion-icon :icon="refreshOutline"></ion-icon>
          </ion-button>
          <ion-segment
            :value="currentRoute"
            color="primary"
            @ionChange="handleTabChange"
          >
            <ion-segment-button value="biz">
              <ion-label>Business</ion-label>
            </ion-segment-button>
            <ion-segment-button value="dev">
              <ion-label>Dev</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-buttons>
      </ion-toolbar>
      
      <!-- Dashboard summary stats -->
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-value">156</div>
          <div class="stat-label">Commits</div>
          <div class="stat-change positive">
            <ion-icon :icon="trendingUpOutline"></ion-icon> 23%
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-value">28</div>
          <div class="stat-label">Pull Requests</div>
          <div class="stat-change positive">
            <ion-icon :icon="trendingUpOutline"></ion-icon> 12%
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-value">94%</div>
          <div class="stat-label">Code Coverage</div>
          <div class="stat-change positive">
            <ion-icon :icon="trendingUpOutline"></ion-icon> 3%
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-value">12</div>
          <div class="stat-label">Issues</div>
          <div class="stat-change negative">
            <ion-icon :icon="trendingDownOutline"></ion-icon> 8%
          </div>
        </div>
      </div>
    </ion-header>
    
    <ion-content color="dark" fullscreen :scroll="false">
      <ion-grid class="main-grid">
        <ion-row class="main-row">
          <!-- First row: 3 charts -->
          <ion-col size="12" size-md="4" size-lg="4" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="shieldCheckmarkOutline" color="primary"></ion-icon>
                  <div>
                    <h3>Code Quality Metrics</h3>
                    <span>By team</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <ChartJsRadar />
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-md="4" size-lg="4" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="gitCommitOutline" color="primary"></ion-icon>
                  <div>
                    <h3>Commit Activity</h3>
                    <span>Last 30 days</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <ApexLineChart />
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-md="4" size-lg="4" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="speedometerOutline" color="primary"></ion-icon>
                  <div>
                    <h3>Build Performance</h3>
                    <span>Current vs previous</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <BuildComparisonChart />
                </div>
              </div>
            </div>
          </ion-col>
          
          <!-- Second row: 2 charts -->
          <ion-col size="12" size-md="6" size-lg="6" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="pieChartOutline" color="primary"></ion-icon>
                  <div>
                    <h3>Code Coverage</h3>
                    <span>Unit tests</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <EChartsDonut />
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-md="6" size-lg="6" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="pulseOutline" color="primary"></ion-icon>
                  <div>
                    <h3>API Performance</h3>
                    <span>Live response time</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <RealtimeApiChart />
                </div>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    
    <!-- Floating action button -->
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button color="primary">
        <ion-icon :icon="addOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button color="dark">
          <ion-icon :icon="downloadOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button color="dark">
          <ion-icon :icon="shareOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button color="dark">
          <ion-icon :icon="codeOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonSegment, IonSegmentButton, IonLabel,
  IonBackButton, IonGrid, IonRow, IonCol, IonButton,
  IonIcon, IonFab, IonFabButton, IonFabList
} from '@ionic/vue';
import { 
  codeSlashOutline, refreshOutline, trendingUpOutline, 
  trendingDownOutline, shieldCheckmarkOutline, gitCommitOutline, 
  speedometerOutline, pieChartOutline, pulseOutline, ellipsisHorizontalOutline,
  addOutline, downloadOutline, shareOutline, codeOutline
} from 'ionicons/icons';

import ChartJsRadar from '@/components/ChartJsRadar.vue';
import ApexLineChart from '@/components/ApexLineChart.vue';
import BuildComparisonChart from '@/components/BuildComparisonChart.vue';
import EChartsDonut from '@/components/EChartsDonut.vue';
import RealtimeApiChart from '@/components/RealtimeApiChart.vue';

const router = useRouter();
const route = useRoute();
const currentRoute = ref('dev');

onMounted(() => {
  const routeName = route.path.split('/')[1];
  if (routeName === 'biz' || routeName === 'dev') {
    currentRoute.value = routeName;
  }
});

watch(() => route.path, (newPath) => {
  const routeName = newPath.split('/')[1];
  if (routeName === 'biz' || routeName === 'dev') {
    currentRoute.value = routeName;
  }
});

const handleTabChange = (e: CustomEvent) => {
  const newRoute = e.detail.value;
  if (newRoute !== currentRoute.value) {
    router.push(`/${newRoute}`);
  }
};

const refreshData = () => {
  // Implement data refresh logic
  console.log('Refreshing data...');
};
</script>

<style scoped>
/* Header Styles */
ion-header {
  box-shadow: none;
}

ion-toolbar {
  --background: #000000;
  --color: rgb(0, 0, 0);
  padding: 0 8px;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.title-text {
  font-weight: 600;
  color: var(--ion-color-primary);
  font-size: 1.1rem;
}

.refresh-button {
  margin-right: 8px;
  --padding-start: 8px;
  --padding-end: 8px;
}

ion-segment {
  --background: transparent;
  padding: 0;
}

ion-segment-button {
  --color: #06b6d4;
  --color-checked: #000000;
  --background-checked: #06b6d4;
  --padding-start: 8px;
  --padding-end: 8px;
  min-width: 90px;
  border-radius: 8px;
  overflow: hidden;
}

/* Stats Bar */
.stats-container {
  display: flex;
  flex-wrap: wrap;
  padding: 4px 16px;
  background: linear-gradient(to right, rgb(44, 0, 255), rgb(0, 176, 255));
  border-bottom: 1px solid rgb(47, 0, 255);
}

.stat-item {
  flex: 1;
  min-width: 100px;
  padding: 4px;
  text-align: center;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: rgb(255, 255, 255);
}

.stat-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}

.stat-change {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  margin-top: 2px;
  gap: 2px;
}

.stat-change.positive {
  color: #4ade80;
}

.stat-change.negative {
  color: #f87171;
}

/* Grid Layout */
.main-grid {
  padding: 8px;
  height: calc(100% - 16px);
  max-height: calc(100vh - 140px); /* Adjust based on header height */
}

.main-row {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.chart-col {
  padding: 4px;
  height: 50%;
  display: flex;
}

/* Chart Card Styles */
.chart-card {
  background-color: var(--color-card-bg);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-card-border);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  border-color: rgba(6, 182, 212, 0.4);
}

.chart-header {
  background-color: var(--color-card-header);
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-title ion-icon {
  font-size: 1.2rem;
}

.chart-title h3 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ion-color-primary);
}

.chart-title span {
  display: block;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

.chart-options-btn {
  --color: rgba(255, 255, 255, 0.7);
  --padding-start: 4px;
  --padding-end: 4px;
  height: 24px;
}

.chart-content {
  flex: 1;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.chart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

ion-content {
  --background: #121212;
  --overflow: hidden;
}

/* CSS Variables for theming */
:root {
  --color-card-bg: #1e1e1e;
  --color-card-header: #252525;
  --color-card-border: rgba(255, 255, 255, 0.1);
}

/* Floating Action Button */
ion-fab-button {
  --box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
}

/* Fix for chart overflow issues */
.chart-wrapper > div,
.chart-wrapper > canvas {
  width: 100% !important;
  height: 100% !important;
  max-width: 100%;
  max-height: 100%;
}

/* Responsive Adjustments */
@media (min-width: 992px) {
  .chart-col[size-lg="4"] {
    height: 50%;
    max-height: 50%;
  }
  
  .chart-col[size-lg="6"] {
    height: 50%;
    max-height: 50%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .chart-col[size-md="4"] {
    height: 50%;
    max-height: 50%;
  }
  
  .chart-col[size-md="6"] {
    height: 50%;
    max-height: 50%;
  }
}

@media (max-width: 767px) {
  .main-grid {
    max-height: none;
    height: auto;
  }
  
  .chart-col {
    height: 200px;
    min-height: 200px;
  }
  
  .stats-container {
    flex-wrap: wrap;
  }
  
  .stat-item {
    min-width: 50%;
    padding: 2px;
  }
  
  ion-segment {
    max-width: 140px;
  }
  
  ion-segment-button {
    min-width: 60px;
    font-size: 0.8rem;
  }
}
</style>