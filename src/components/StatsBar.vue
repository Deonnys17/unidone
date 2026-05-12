<template>
  <div class="stats-bar">
    <div class="stats-row">
      <div class="stat">
        <span class="stat-value">{{ total }}</span>
        <span class="stat-label">Всього</span>
      </div>
      <div class="stat accent-green">
        <span class="stat-value">{{ done }}</span>
        <span class="stat-label">Виконано</span>
      </div>
      <div class="stat accent-orange">
        <span class="stat-value">{{ pending }}</span>
        <span class="stat-label">Залишилось</span>
      </div>
      <div class="stat accent-red">
        <span class="stat-value">{{ overdue }}</span>
        <span class="stat-label">Прострочено</span>
      </div>
    </div>

    <div
      v-if="total > 0"
      class="progress-wrap"
    >
      <div class="progress-label">
        <span>Прогрес виконання</span>
        <span class="progress-pct">{{ percent }}%</span>
      </div>
      <div class="progress-track">
        <div
          class="progress-fill"
          :style="{ width: percent + '%' }"
          :class="progressClass"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsBar',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  computed: {
    total() { return this.tasks.length },
    done() { return this.tasks.filter(t => t.done).length },
    pending() { return this.tasks.filter(t => !t.done).length },
    overdue() {
      const now = new Date()
      return this.tasks.filter(t => !t.done && t.deadline && new Date(t.deadline) < now).length
    },
    percent() {
      if (!this.total) return 0
      return Math.round((this.done / this.total) * 100)
    },
    progressClass() {
      if (this.percent === 100) return 'fill-perfect'
      if (this.percent >= 60) return 'fill-good'
      if (this.percent >= 30) return 'fill-mid'
      return 'fill-low'
    }
  }
}
</script>

<style scoped>
.stats-bar {
  background: #fff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 2px 16px rgba(37, 99, 235, 0.08);
  margin-bottom: 24px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
}

.stat.accent-green { background: #f0fdf4; border-color: #86efac; }
.stat.accent-orange { background: #fff7ed; border-color: #fdba74; }
.stat.accent-red { background: #fff1f2; border-color: #fca5a5; }

.stat-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1e3a8a;
  line-height: 1;
}

.accent-green .stat-value { color: #16a34a; }
.accent-orange .stat-value { color: #ea580c; }
.accent-red .stat-value { color: #dc2626; }

.stat-label {
  font-size: 0.72rem;
  color: #94a3b8;
  margin-top: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.progress-wrap {
  margin-top: 4px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  color: #64748b;
  margin-bottom: 6px;
  font-weight: 500;
}

.progress-pct {
  font-weight: 700;
  color: #1e3a8a;
}

.progress-track {
  height: 10px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fill-low  { background: linear-gradient(90deg, #ef4444, #f97316); }
.fill-mid  { background: linear-gradient(90deg, #f97316, #eab308); }
.fill-good { background: linear-gradient(90deg, #22c55e, #16a34a); }
.fill-perfect { background: linear-gradient(90deg, #2563eb, #7c3aed); }
</style>
