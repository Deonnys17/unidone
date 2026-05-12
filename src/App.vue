<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <h1 class="logo">
          UniDone
        </h1>
        <p class="subtitle">
          Student Deadline Manager
        </p>
        <span
          class="badge"
          :class="isDev ? 'badge-dev' : 'badge-prod'"
        >{{ appStatus }}</span>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <StatsBar :tasks="tasks" />
        <div v-if="showUrgentFilter" class="urgent-banner">
          🔥 Фільтр термінових завдань увімкнено
        </div>
        <TaskForm @add-task="addTask" />
        <TaskList
          :tasks="tasks"
          @remove-task="removeTask"
          @toggle-done="toggleDone"
        />
      </div>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <span>UniDone © 2024</span>
        <span class="env-info">
          Режим: <strong>{{ appStatus }}</strong>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import StatsBar from './components/StatsBar.vue'
import { useTasks } from './composables/useTasks.js'
import posthog from 'posthog-js'

export default {
  name: 'App',
  components: { TaskForm, TaskList, StatsBar },
  setup() {
    const { tasks, addTask, removeTask, toggleDone } = useTasks()
    return { tasks, addTask, removeTask, toggleDone }
  },
  data() {
    return {
      showUrgentFilter: false
    }
  },
  mounted() {
    posthog.onFeatureFlags(() => {
      this.showUrgentFilter = posthog.isFeatureEnabled('show-urgent-filter')
    })
  },
  computed: {
    appStatus() {
      return import.meta.env.VITE_APP_STATUS || 'Development'
    },
    isDev() {
      return import.meta.env.VITE_APP_STATUS === 'Development'
    }
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: #fff;
  padding: 24px 0 20px;
  box-shadow: 0 4px 24px rgba(37, 99, 235, 0.18);
}

.header-inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.logo {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #fff;
}

.subtitle {
  font-size: 0.9rem;
  color: #bfdbfe;
  text-decoration: underline;
}

.main {
  flex: 1;
  padding: 32px 0;
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
}

.urgent-banner {
  background: #fef3c7;
  border: 1.5px solid #f59e0b;
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #92400e;
}

.footer {
  background: #1e3a8a;
  color: #bfdbfe;
  padding: 14px 0;
  font-size: 0.82rem;
}

.footer-inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.env-info strong {
  color: #fff;
}
</style>