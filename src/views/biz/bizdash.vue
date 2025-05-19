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
              <ion-icon :icon="analyticsOutline" color="primary"></ion-icon>
            </div>
            <div class="title-text">Business Analytics</div>
          </div>
        </ion-title>
        <ion-buttons slot="end">
          <ion-button class="refresh-button" @click="refreshData">
            <ion-icon :icon="refreshOutline"></ion-icon>
          </ion-button>
          <ion-segment 
            :value="currentRoute" 
            color="primary"
            @ionChange="handleTabChange">
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
          <div class="stat-value">$1.2M</div>
          <div class="stat-label">Revenue</div>
          <div class="stat-change positive">
            <ion-icon :icon="trendingUpOutline"></ion-icon> 12%
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-value">2,450</div>
          <div class="stat-label">Customers</div>
          <div class="stat-change positive">
            <ion-icon :icon="trendingUpOutline"></ion-icon> 8%
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-value">$490</div>
          <div class="stat-label">Avg. Order</div>
          <div class="stat-change positive">
            <ion-icon :icon="trendingUpOutline"></ion-icon> 5%
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-value">18%</div>
          <div class="stat-label">Profit Margin</div>
          <div class="stat-change negative">
            <ion-icon :icon="trendingDownOutline"></ion-icon> 2%
          </div>
        </div>
      </div>
    </ion-header>
    
    <ion-content color="dark" fullscreen>
      <ion-grid class="main-grid">
        <ion-row class="main-row">
          <!-- Revenue Overview -->
          <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="barChartOutline" color="primary"></ion-icon>
                  <div>
                    <h3>Revenue Overview</h3>
                    <span>Last 6 months</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <ChartJsBar />
                </div>
              </div>
            </div>
          </ion-col>
          
          <!-- Customer Growth -->
          <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="peopleOutline" color="primary"></ion-icon>
                  <div>
                    <h3>Customer Growth</h3>
                    <span>Quarterly progression</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <ApexAreaChart />
                </div>
              </div>
            </div>
          </ion-col>
          
          <!-- Revenue Distribution -->
          <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="pieChartOutline" color="primary"></ion-icon>
                  <div>
                    <h3>Revenue Distribution</h3>
                    <span>By product category</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <CustomPieChart />
                </div>
              </div>
            </div>
          </ion-col>
          
          <!-- Market Analysis -->
          <ion-col size="12" size-md="6" size-lg="6" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="globeOutline" color="primary"></ion-icon>
                  <div>
                    <h3>Market Analysis</h3>
                    <span>Regional performance</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <EChartsRadar />
                </div>
              </div>
            </div>
          </ion-col>
          
          <!-- Stock Performance -->
          <ion-col size="12" size-md="6" size-lg="6" class="chart-col">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <ion-icon :icon="trendingUpOutline" color="primary"></ion-icon>
                  <div>
                    <h3>Stock Performance</h3>
                    <span>Real-time simulation</span>
                  </div>
                </div>
                <ion-button fill="clear" size="small" class="chart-options-btn">
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </div>
              <div class="chart-content">
                <div class="chart-wrapper">
                  <RealtimeStockChart />
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
          <ion-icon :icon="printOutline"></ion-icon>
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
  analyticsOutline, refreshOutline, trendingUpOutline, 
  trendingDownOutline, barChartOutline, peopleOutline, 
  pieChartOutline, globeOutline, ellipsisHorizontalOutline,
  addOutline, downloadOutline, shareOutline, printOutline
} from 'ionicons/icons';

import ChartJsBar from '@/components/ChartJsBar.vue';
import ApexAreaChart from '@/components/ApexAreaChart.vue';
import CustomPieChart from '@/components/CustomPieChart.vue';
import EChartsRadar from '@/components/EChartsRadar.vue';
import RealtimeStockChart from '@/components/RealtimeStockChart.vue';

const router = useRouter();
const route = useRoute();
const currentRoute = ref(route.path.split('/')[1] || 'biz');

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

onMounted(() => {
  watch(() => route.path, (newPath) => {
    const routeName = newPath.split('/')[1];
    if (routeName === 'biz' || routeName === 'dev') {
      currentRoute.value = routeName;
    }
  });
});
</script>

<style scoped>
/* Header Styles */
ion-header {
  box-shadow: none;
}

ion-toolbar {
  --background: #000000;
  --color: white;
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
  --color-checked: #ffffff;
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
  padding: 8px 16px;
  background: linear-gradient(to right, var(--color-gradient-start), var(--color-gradient-end));
  border-bottom: 1px solid rgba(6, 182, 212, 0.1);
}

.stat-item {
  flex: 1;
  min-width: 100px;
  padding: 8px;
  text-align: center;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}

.stat-change {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  margin-top: 4px;
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
  padding: 16px;
}

.chart-col {
  padding: 8px;
}

/* Chart Card Styles */
.chart-card {
  background-color: var(--color-card-bg);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-card-border);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  border-color: rgba(6, 182, 212, 0.4);
}

.chart-header {
  background-color: var(--color-card-header);
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chart-title ion-icon {
  font-size: 1.4rem;
}

.chart-title h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--ion-color-primary);
}

.chart-title span {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

.chart-options-btn {
  --color: rgba(255, 255, 255, 0.7);
  --padding-start: 4px;
  --padding-end: 4px;
  height: 30px;
}

.chart-content {
  flex: 1;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-wrapper {
  width: 100%;
  height: 100%;
  min-height: 250px;
}

/* Floating Action Button */
ion-fab-button {
  --box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .stats-container {
    padding: 4px 8px;
  }
  
  .stat-item {
    padding: 4px;
  }
  
  .stat-value {
    font-size: 1.2rem;
  }
  
  .main-grid {
    padding: 8px;
  }
  
  .chart-header {
    padding: 12px;
  }
  
  .chart-content {
    padding: 12px;
  }
}

@media (max-width: 576px) {
  .stats-container {
    flex-wrap: wrap;
  }
  
  .stat-item {
    min-width: 50%;
    padding: 4px;
  }
  
  .chart-title h3 {
    font-size: 0.9rem;
  }
  
  .chart-title span {
    font-size: 0.7rem;
  }
  
  .chart-title ion-icon {
    font-size: 1.2rem;
  }
}
</style>