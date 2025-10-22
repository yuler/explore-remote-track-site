import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as Sentry from '@sentry/vue'

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

app.mount('#app')
