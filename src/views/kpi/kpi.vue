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
            <div class="title-text">KPI Dashboard</div>
          </div>
        </ion-title>
        <ion-buttons slot="end">
          <ion-button class="refresh-button" @click="refreshData">
            <ion-icon :icon="refreshOutline"></ion-icon>
          </ion-button>
          <ion-button class="action-button" @click="exportData">
            <ion-icon :icon="downloadOutline"></ion-icon>
          </ion-button>
          <ion-button class="action-button" @click="shareReport">
            <ion-icon :icon="shareOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      
      <!-- Tabs in header -->
      <ion-toolbar color="dark">
        <ion-segment :value="activeTab" color="primary" @ionChange="handleTabChange">
          <ion-segment-button value="overview">
            <ion-label>Overview</ion-label>
          </ion-segment-button>
          <ion-segment-button value="business">
            <ion-label>Business</ion-label>
          </ion-segment-button>
          <ion-segment-button value="development">
            <ion-label>Development</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" fullscreen :scroll="false">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="tab-content">
        <!-- Combined KPI Summary -->
        <div class="kpi-container">
          <div v-for="(kpi, index) in allKPIs" :key="index" class="kpi-card">
            <div class="kpi-value">{{ kpi.value }}</div>
            <div class="kpi-label">{{ kpi.title }}</div>
            <div class="kpi-change" :class="kpi.trend">
              <ion-icon :icon="kpi.trend === 'up' ? trendingUpOutline : trendingDownOutline"></ion-icon>
              {{ Math.abs(kpi.change) }}%
            </div>
          </div>
        </div>

        <!-- All Charts Grid -->
        <ion-grid class="charts-grid">
          <ion-row class="charts-row">
            <!-- Business Charts -->
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
                </div>
                <div class="chart-content">
                  <ChartJsBar />
                </div>
              </div>
            </ion-col>

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
                </div>
                <div class="chart-content">
                  <ApexAreaChart />
                </div>
              </div>
            </ion-col>

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
                </div>
                <div class="chart-content">
                  <CustomPieChart />
                </div>
              </div>
            </ion-col>

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
                </div>
                <div class="chart-content">
                  <EChartsRadar />
                </div>
              </div>
            </ion-col>

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
                </div>
                <div class="chart-content">
                  <RealtimeStockChart />
                </div>
              </div>
            </ion-col>

            <!-- Dev Charts -->
            <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="shieldCheckmarkOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Code Quality</h3>
                      <span>By team</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <ChartJsRadar />
                </div>
              </div>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="gitCommitOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Commit Activity</h3>
                      <span>Last 30 days</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <ApexLineChart />
                </div>
              </div>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="speedometerOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Build Performance</h3>
                      <span>Current vs previous</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <BuildComparisonChart />
                </div>
              </div>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="6" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="codeOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Code Coverage</h3>
                      <span>Unit tests</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <EChartsDonut />
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
                </div>
                <div class="chart-content">
                  <RealtimeApiChart />
                </div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Business Tab -->
      <div v-if="activeTab === 'business'" class="tab-content">
        <!-- Business KPIs -->
        <div class="kpi-container">
          <div v-for="(kpi, index) in businessKPIs" :key="index" class="kpi-card large">
            <div class="kpi-value">{{ kpi.value }}</div>
            <div class="kpi-label">{{ kpi.title }}</div>
            <div class="kpi-description">{{ kpi.description }}</div>
            <div class="kpi-change" :class="kpi.trend">
              <ion-icon :icon="kpi.trend === 'up' ? trendingUpOutline : trendingDownOutline"></ion-icon>
              {{ Math.abs(kpi.change) }}%
            </div>
          </div>
        </div>

        <!-- Business Charts -->
        <ion-grid class="charts-grid">
          <ion-row class="charts-row">
            <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="barChartOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Revenue Overview</h3>
                      <span>Last 6 months performance</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <ChartJsBar />
                </div>
              </div>
            </ion-col>

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
                </div>
                <div class="chart-content">
                  <ApexAreaChart />
                </div>
              </div>
            </ion-col>

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
                </div>
                <div class="chart-content">
                  <CustomPieChart />
                </div>
              </div>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="6" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="globeOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Market Analysis</h3>
                      <span>Regional performance metrics</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <EChartsRadar />
                </div>
              </div>
            </ion-col>

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
                </div>
                <div class="chart-content">
                  <RealtimeStockChart />
                </div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Development Tab -->
      <div v-if="activeTab === 'development'" class="tab-content">
        <!-- Dev KPIs -->
        <div class="kpi-container">
          <div v-for="(kpi, index) in devKPIs" :key="index" class="kpi-card large">
            <div class="kpi-value">{{ kpi.value }}</div>
            <div class="kpi-label">{{ kpi.title }}</div>
            <div class="kpi-description">{{ kpi.description }}</div>
            <div class="kpi-change" :class="kpi.trend">
              <ion-icon :icon="kpi.trend === 'up' ? trendingUpOutline : trendingDownOutline"></ion-icon>
              {{ Math.abs(kpi.change) }}%
            </div>
          </div>
        </div>

        <!-- Dev Charts -->
        <ion-grid class="charts-grid">
          <ion-row class="charts-row">
            <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="shieldCheckmarkOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Code Quality Metrics</h3>
                      <span>By team performance</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <ChartJsRadar />
                </div>
              </div>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="gitCommitOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Commit Activity</h3>
                      <span>Last 30 days</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <ApexLineChart />
                </div>
              </div>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="4" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="speedometerOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Build Performance</h3>
                      <span>Current vs previous</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <BuildComparisonChart />
                </div>
              </div>
            </ion-col>

            <ion-col size="12" size-md="6" size-lg="6" class="chart-col">
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <ion-icon :icon="codeOutline" color="primary"></ion-icon>
                    <div>
                      <h3>Code Coverage</h3>
                      <span>Unit test coverage metrics</span>
                    </div>
                  </div>
                </div>
                <div class="chart-content">
                  <EChartsDonut />
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
                </div>
                <div class="chart-content">
                  <RealtimeApiChart />
                </div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon,
  IonSegment, IonSegmentButton, IonLabel,
  IonGrid, IonRow, IonCol
} from '@ionic/vue'
import { 
  analyticsOutline, refreshOutline, downloadOutline, shareOutline,
  trendingUpOutline, trendingDownOutline, barChartOutline, peopleOutline,
  pieChartOutline, globeOutline, shieldCheckmarkOutline, gitCommitOutline,
  speedometerOutline, codeOutline, pulseOutline
} from 'ionicons/icons'

// Import your chart components
import ChartJsBar from '@/components/ChartJsBar.vue'
import ApexAreaChart from '@/components/ApexAreaChart.vue'
import CustomPieChart from '@/components/CustomPieChart.vue'
import EChartsRadar from '@/components/EChartsRadar.vue'
import RealtimeStockChart from '@/components/RealtimeStockChart.vue'
import ChartJsRadar from '@/components/ChartJsRadar.vue'
import ApexLineChart from '@/components/ApexLineChart.vue'
import BuildComparisonChart from '@/components/BuildComparisonChart.vue'
import EChartsDonut from '@/components/EChartsDonut.vue'
import RealtimeApiChart from '@/components/RealtimeApiChart.vue'

interface KPIMetric {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  description: string
}

const activeTab = ref('overview')

const businessKPIs: KPIMetric[] = [
  { title: 'Revenue', value: '$1.2M', change: 12, trend: 'up', description: 'Monthly recurring revenue' },
  { title: 'Customers', value: '2,450', change: 8, trend: 'up', description: 'Active customers' },
  { title: 'Avg. Order', value: '$490', change: 5, trend: 'up', description: 'Average order value' },
  { title: 'Profit Margin', value: '18%', change: -2, trend: 'down', description: 'Net profit margin' },
]

const devKPIs: KPIMetric[] = [
  { title: 'Commits', value: '156', change: 23, trend: 'up', description: 'This month' },
  { title: 'Pull Requests', value: '28', change: 12, trend: 'up', description: 'Merged this week' },
  { title: 'Code Coverage', value: '94%', change: 3, trend: 'up', description: 'Test coverage' },
  { title: 'Issues', value: '12', change: -8, trend: 'down', description: 'Open issues' },
]

const allKPIs = computed(() => [...businessKPIs, ...devKPIs])

const handleTabChange = (e: CustomEvent) => {
  activeTab.value = e.detail.value
}

const refreshData = () => {
  console.log('Refreshing KPI data...')
}

const exportData = () => {
  console.log('Exporting KPI data...')
}

const shareReport = () => {
  console.log('Sharing KPI report...')
}
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

.refresh-button,
.action-button {
  --padding-start: 8px;
  --padding-end: 8px;
  margin-left: 4px;
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

/* Content */
ion-content {
  --background: #121212;
  --overflow: hidden;
}

.tab-content {
  padding: 8px;
  height: calc(100vh - 140px);
  overflow: hidden;
}

/* KPI Container */
.kpi-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  padding: 0 8px;
}

.kpi-card {
  flex: 1;
  min-width: 120px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.kpi-card.large {
  min-width: 200px;
  padding: 16px;
}

.kpi-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
}

.kpi-card.large .kpi-value {
  font-size: 2rem;
}

.kpi-label {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 4px;
}

.kpi-description {
  font-size: 0.7rem;
  color: #64748b;
  margin-bottom: 8px;
}

.kpi-change {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 0.7rem;
  font-weight: 500;
}

.kpi-change.up {
  color: #4ade80;
}

.kpi-change.down {
  color: #f87171;
}

/* Charts Grid */
.charts-grid {
  height: calc(100% - 100px);
  padding: 0;
}

.charts-row {
  height: 100%;
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

.chart-content {
  flex: 1;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* CSS Variables for theming */
:root {
  --color-card-bg: #1e1e1e;
  --color-card-header: #252525;
  --color-card-border: rgba(255, 255, 255, 0.1);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .kpi-container {
    flex-wrap: wrap;
  }
  
  .kpi-card {
    min-width: 50%;
  }
  
  .chart-col {
    height: 300px;
  }
  
  ion-segment {
    max-width: 100%;
  }
  
  ion-segment-button {
    min-width: 70px;
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .kpi-card {
    min-width: 100%;
  }
  
  .chart-col {
    height: 250px;
  }
  
  .tab-content {
    height: auto;
  }
  
  .charts-grid {
    height: auto;
  }
}
</style>