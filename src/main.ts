import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as Sentry from '@sentry/vue'
import { onCLS, onLCP, onFCP, onTTFB, onINP } from 'web-vitals'

const app = createApp(App)

// Sentry integration
Sentry.init({
  app,
  environment: import.meta.env.MODE,
  dsn: 'https://cf56419f940e40318f624dc5b15df6b5@report.qiqucn.com/1',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // 生产环境建议降低到 0.1 或更低
  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% 的正常会话将被记录
  replaysOnErrorSampleRate: 1.0, // 100% 的错误会话将被记录
})

// Track Core Web Vitals
onCLS(sendToUmami)  // Cumulative Layout Shift
onINP(sendToUmami)  // Interaction to Next Paint
onLCP(sendToUmami)  // Largest Contentful Paint
onFCP(sendToUmami)  // First Contentful Paint
onTTFB(sendToUmami) // Time to First Byte
function sendToUmami(metric: { name: string; value: number; rating: string }) {
  const roundedValue = Math.round(metric.value) as number;
  // Send each metric as a separate event for better readability in Umami console
  (window as any)?.umami?.track(`web-vitals-${metric.name.toLowerCase()}`, {
    value: roundedValue,
    rating: metric.rating,
    unit: getMetricUnit(metric.name),
  })
  console.log(`Web Vital reported to Umami: ${metric.name} = ${roundedValue} (${metric.rating})`)
}

function getMetricUnit(metricName: string): string {
  // CLS is a score, others are in milliseconds
  return metricName === 'CLS' ? 'score' : 'ms'
}


app.mount('#app')
