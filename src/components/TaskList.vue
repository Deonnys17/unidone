<template>
  <div class="task-list">
    <h2>Мої завдання <span class="count">{{ tasks.length }}</span></h2>

    <div
      v-if="tasks.length === 0"
      class="empty"
    >
      <p>Завдань поки немає. Додайте перше! 🎯</p>
    </div>

    <div
      v-else
      class="tasks"
    >
      <div
        v-for="task in sortedTasks"
        :key="task.id"
        class="task-card"
        :class="{ done: task.done, overdue: isOverdue(task) && !task.done }"
      >
        <div class="task-check">
          <input
            type="checkbox"
            :checked="task.done"
            @change="$emit('toggle-done', task.id)"
          >
        </div>
        <div class="task-info">
          <div class="task-subject">
            {{ task.subject }}
          </div>
          <div class="task-meta">
            <span class="task-type">{{ task.type }}</span>
            <span
              class="task-deadline"
              :class="{ overdue: isOverdue(task) && !task.done }"
            >
              📅 {{ formatDate(task.deadline) }}
            </span>
          </div>
        </div>
        <button
          class="btn-remove"
          @click="$emit('remove-task', task.id)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  emits: ['remove-task', 'toggle-done'],
  computed: {
    sortedTasks() {
      return [...this.tasks].sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1
        return new Date(a.deadline) - new Date(b.deadline)
      })
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return ''
      const d = new Date(dateStr)
      return d.toLocaleDateString('uk-UA', { day: '2-digit', month: 'long', year: 'numeric' })
    },
    isOverdue(task) {
      if (!task.deadline) return false
      return new Date(task.deadline) < new Date()
    }
  }
}
</script>

<style scoped>
.task-list {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 16px rgba(37, 99, 235, 0.08);
}

h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.count {
  background: #dbeafe;
  color: #2563eb;
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 0.85rem;
}

.empty {
  text-align: center;
  color: #94a3b8;
  padding: 40px 0;
  font-size: 1rem;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  transition: border-color 0.2s, opacity 0.2s;
}

.task-card.done {
  opacity: 0.5;
}

.task-card.overdue {
  border-color: #fca5a5;
  background: #fff7f7;
}

.task-check input[type=checkbox] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #2563eb;
}

.task-info {
  flex: 1;
}

.task-subject {
  font-weight: 600;
  font-size: 1rem;
  color: #1e293b;
  margin-bottom: 4px;
}

.task-card.done .task-subject {
  text-decoration: line-through;
}

.task-meta {
  display: flex;
  gap: 12px;
  font-size: 0.8rem;
  color: #64748b;
}

.task-type {
  background: #e0e7ff;
  color: #3730a3;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 500;
}

.task-deadline.overdue {
  color: #dc2626;
  font-weight: 600;
}

.btn-remove {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.btn-remove:hover {
  color: #ef4444;
  background: #fee2e2;
}
</style>
