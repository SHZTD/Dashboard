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
                <div class="chart-content" @click="openSMARTModal('revenue-overview')">
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
                <div class="chart-content" @click="openSMARTModal('customer-growth')">
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
                <div class="chart-content" @click="openSMARTModal('code-quality')">
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
                <div class="chart-content" @click="openSMARTModal('code-quality')">
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

    <!-- SMART Goals Modal -->
    <ion-modal :is-open="smartModalOpen" @didDismiss="smartModalOpen = false">
      <ion-header>
        <ion-toolbar color="dark">
          <ion-title>{{ selectedChart?.title }} - SMART Analysis</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="smartModalOpen = false">
              <ion-icon :icon="closeOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      
      <ion-content color="dark" class="smart-modal-content" :scroll-y="true">
        <div class="smart-container" v-if="selectedChart">
          <div class="smart-header">
            <div class="smart-icon">
              <ion-icon :icon="selectedChart.icon" color="primary"></ion-icon>
            </div>
            <div class="smart-title">
              <h2>{{ selectedChart.title }}</h2>
              <p>{{ selectedChart.description }}</p>
            </div>
          </div>

          <div class="smart-goals">
            <div class="smart-goal" v-for="(goal, index) in selectedChart.smartGoals" :key="index">
              <div class="goal-letter">{{ goal.letter }}</div>
              <div class="goal-content">
                <h3>{{ goal.title }}</h3>
                <p>{{ goal.description }}</p>
                <div class="goal-metrics" v-if="goal.metrics">
                  <div class="metric" v-for="(metric, idx) in goal.metrics" :key="idx">
                    <span class="metric-label">{{ metric.label }}:</span>
                    <span class="metric-value" :class="metric.status">{{ metric.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="smart-actions">
            <ion-button expand="block" color="primary" @click="exportSMARTReport">
              <ion-icon :icon="downloadOutline" slot="start"></ion-icon>
              Export SMART Report
            </ion-button>
            <ion-button expand="block" fill="outline" color="primary" @click="setSMARTReminder">
              <ion-icon :icon="notificationsOutline" slot="start"></ion-icon>
              Set Reminder
            </ion-button>
          </div>
        </div>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon,
  IonSegment, IonSegmentButton, IonLabel,
  IonGrid, IonRow, IonCol,
  IonModal,
} from '@ionic/vue'
import { 
  analyticsOutline, refreshOutline, downloadOutline, shareOutline,
  trendingUpOutline, trendingDownOutline, barChartOutline, peopleOutline,
  pieChartOutline, globeOutline, shieldCheckmarkOutline, gitCommitOutline,
  speedometerOutline, codeOutline, pulseOutline,
  closeOutline, notificationsOutline
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

const smartModalOpen = ref(false)
const selectedChart = ref(null)

const chartData = {
  'revenue-overview': {
    title: 'Revenue Overview',
    description: 'Track monthly recurring revenue growth',
    icon: barChartOutline,
    smartGoals: [
      {
        letter: 'S',
        title: 'Specific',
        description: 'Increase monthly recurring revenue by focusing on enterprise clients and premium subscriptions.',
        metrics: [
          { label: 'Target Segment', value: 'Enterprise (>$10K ARR)', status: 'good' },
          { label: 'Product Focus', value: 'Premium Plans', status: 'good' }
        ]
      },
      {
        letter: 'M',
        title: 'Measurable',
        description: 'Track revenue metrics with clear KPIs and benchmarks.',
        metrics: [
          { label: 'Current MRR', value: '$1.2M', status: 'good' },
          { label: 'Growth Rate', value: '+12% MoM', status: 'excellent' },
          { label: 'Target MRR', value: '$1.5M', status: 'pending' }
        ]
      },
      {
        letter: 'A',
        title: 'Achievable',
        description: 'Based on current growth trends and market conditions, targets are realistic.',
        metrics: [
          { label: 'Market Size', value: '$50B TAM', status: 'good' },
          { label: 'Conversion Rate', value: '3.2%', status: 'good' },
          { label: 'Churn Rate', value: '2.1%', status: 'excellent' }
        ]
      },
      {
        letter: 'R',
        title: 'Relevant',
        description: 'Revenue growth directly impacts company valuation and expansion capabilities.',
        metrics: [
          { label: 'Business Impact', value: 'High', status: 'excellent' },
          { label: 'Strategic Priority', value: '#1', status: 'excellent' }
        ]
      },
      {
        letter: 'T',
        title: 'Time-bound',
        description: 'Achieve revenue targets within specific timeframes.',
        metrics: [
          { label: 'Q1 Target', value: '$1.35M', status: 'pending' },
          { label: 'Q2 Target', value: '$1.5M', status: 'pending' },
          { label: 'Annual Target', value: '$18M', status: 'pending' }
        ]
      }
    ]
  },
  'customer-growth': {
    title: 'Customer Growth',
    description: 'Monitor customer acquisition and retention',
    icon: peopleOutline,
    smartGoals: [
      {
        letter: 'S',
        title: 'Specific',
        description: 'Acquire 500 new customers per quarter through digital marketing and referrals.',
        metrics: [
          { label: 'Acquisition Channel', value: 'Digital + Referral', status: 'good' },
          { label: 'Target Segment', value: 'SMB + Enterprise', status: 'good' }
        ]
      },
      {
        letter: 'M',
        title: 'Measurable',
        description: 'Track customer acquisition cost, lifetime value, and retention rates.',
        metrics: [
          { label: 'Current Customers', value: '2,450', status: 'good' },
          { label: 'CAC', value: '$125', status: 'good' },
          { label: 'LTV', value: '$2,400', status: 'excellent' },
          { label: 'LTV:CAC Ratio', value: '19.2:1', status: 'excellent' }
        ]
      },
      {
        letter: 'A',
        title: 'Achievable',
        description: 'Growth targets align with marketing budget and team capacity.',
        metrics: [
          { label: 'Marketing Budget', value: '$200K/month', status: 'good' },
          { label: 'Sales Team', value: '12 reps', status: 'good' },
          { label: 'Lead Pipeline', value: '1,200/month', status: 'excellent' }
        ]
      },
      {
        letter: 'R',
        title: 'Relevant',
        description: 'Customer growth drives revenue and market share expansion.',
        metrics: [
          { label: 'Revenue Impact', value: 'Direct', status: 'excellent' },
          { label: 'Market Share', value: '2.3%', status: 'good' }
        ]
      },
      {
        letter: 'T',
        title: 'Time-bound',
        description: 'Achieve customer milestones by specific dates.',
        metrics: [
          { label: 'Q1 Goal', value: '2,950 customers', status: 'pending' },
          { label: 'Q2 Goal', value: '3,450 customers', status: 'pending' },
          { label: 'Annual Goal', value: '4,500 customers', status: 'pending' }
        ]
      }
    ]
  },
  'code-quality': {
    title: 'Code Quality Metrics',
    description: 'Maintain high code standards across teams',
    icon: shieldCheckmarkOutline,
    smartGoals: [
      {
        letter: 'S',
        title: 'Specific',
        description: 'Achieve 95% code coverage and reduce technical debt by 30%.',
        metrics: [
          { label: 'Coverage Target', value: '95%', status: 'pending' },
          { label: 'Debt Reduction', value: '30%', status: 'pending' }
        ]
      },
      {
        letter: 'M',
        title: 'Measurable',
        description: 'Track code quality metrics with automated tools.',
        metrics: [
          { label: 'Current Coverage', value: '94%', status: 'excellent' },
          { label: 'Code Smells', value: '23', status: 'warning' },
          { label: 'Security Issues', value: '2', status: 'warning' },
          { label: 'Maintainability', value: 'A', status: 'excellent' }
        ]
      },
      {
        letter: 'A',
        title: 'Achievable',
        description: 'Targets are realistic with current team skills and tools.',
        metrics: [
          { label: 'Team Experience', value: 'Senior', status: 'excellent' },
          { label: 'Tools Available', value: 'SonarQube, ESLint', status: 'good' },
          { label: 'Time Allocation', value: '20% refactoring', status: 'good' }
        ]
      },
      {
        letter: 'R',
        title: 'Relevant',
        description: 'Code quality directly impacts product reliability and development speed.',
        metrics: [
          { label: 'Bug Reduction', value: '40%', status: 'excellent' },
          { label: 'Dev Velocity', value: '+15%', status: 'good' }
        ]
      },
      {
        letter: 'T',
        title: 'Time-bound',
        description: 'Achieve quality targets within 6 months.',
        metrics: [
          { label: 'Month 3 Target', value: '94.5% coverage', status: 'pending' },
          { label: 'Month 6 Target', value: '95% coverage', status: 'pending' },
          { label: 'Debt Reduction', value: 'Q2 2024', status: 'pending' }
        ]
      }
    ]
  }
  // Add more chart data as needed...
}

const openSMARTModal = (chartId: string) => {
  selectedChart.value = chartData[chartId]
  if (selectedChart.value) {
    smartModalOpen.value = true
  }
}

const exportSMARTReport = () => {
  console.log('Exporting SMART report for:', selectedChart.value?.title)
  // Add export functionality
}

const setSMARTReminder = () => {
  console.log('Setting reminder for:', selectedChart.value?.title)
  // Add reminder functionality
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

/* SMART Modal Styles */
.smart-modal-content {
  --background: #121212;
  --overflow: auto;
}

.smart-container {
  padding: 20px;
  min-height: 100%;
  padding-bottom: 40px; /* Extra padding at bottom */
}

.smart-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.smart-icon {
  font-size: 2rem;
  color: var(--ion-color-primary);
}

.smart-title h2 {
  margin: 0 0 4px 0;
  color: var(--ion-color-primary);
  font-size: 1.5rem;
}

.smart-title p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.smart-goals {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px; /* Increased margin */
}

.smart-goal {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.goal-letter {
  width: 40px;
  height: 40px;
  background: var(--ion-color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.goal-content {
  flex: 1;
}

.goal-content h3 {
  margin: 0 0 8px 0;
  color: white;
  font-size: 1.1rem;
}

.goal-content p {
  margin: 0 0 12px 0;
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.4;
}

.goal-metrics {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.metric-label {
  color: #94a3b8;
  font-size: 0.8rem;
}

.metric-value {
  font-weight: 600;
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 4px;
}

.metric-value.excellent {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

.metric-value.good {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

.metric-value.warning {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

.metric-value.pending {
  background: rgba(148, 163, 184, 0.2);
  color: #94a3b8;
}

.smart-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px; /* Extra margin at bottom */
}

/* Ensure modal takes full height and is scrollable */
ion-modal {
  --height: 100%;
  --max-height: 100%;
}

ion-modal ion-content {
  --overflow: auto;
  height: 100%;
}

/* Chart hover effect */
.chart-content {
  cursor: pointer;
  transition: all 0.3s ease;
}

.chart-content:hover {
  transform: scale(1.02);
  background: rgba(6, 182, 212, 0.05);
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .smart-goal {
    flex-direction: column;
    text-align: center;
  }
  
  .goal-letter {
    align-self: center;
  }
  
  .metric {
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }
  
  .smart-container {
    padding: 16px;
    padding-bottom: 60px; /* More padding on mobile */
  }
}
</style>