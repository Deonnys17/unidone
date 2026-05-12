<template>
  <div class="task-form">
    <h2>Додати завдання</h2>
    <div class="form-group">
      <label>Назва предмета</label>
      <input
        v-model="form.subject"
        type="text"
        placeholder="Наприклад: Математика"
      >
    </div>
    <div class="form-group">
      <label>Тип роботи</label>
      <select v-model="form.type">
        <option value="">
          Оберіть тип
        </option>
        <option value="Лабораторна">
          Лабораторна
        </option>
        <option value="Курсова">
          Курсова
        </option>
        <option value="Контрольна">
          Контрольна
        </option>
        <option value="Реферат">
          Реферат
        </option>
        <option value="Іспит">
          Іспит
        </option>
      </select>
    </div>
    <div class="form-group">
      <label>Дата дедлайну</label>
      <input
        v-model="form.deadline"
        type="date"
      >
    </div>
    <button
      class="btn-add"
      :disabled="!isValid"
      @click="submit"
    >
      Додати завдання
    </button>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  emits: ['add-task'],
  data() {
    return {
      form: {
        subject: '',
        type: '',
        deadline: ''
      }
    }
  },
  computed: {
    isValid() {
      return this.form.subject.trim() && this.form.type && this.form.deadline
    }
  },
  methods: {
    submit() {
      if (!this.isValid) return
      this.$emit('add-task', { ...this.form, done: false })
      this.form = { subject: '', type: '', deadline: '' }
    }
  }
}
</script>

<style scoped>
.task-form {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 16px rgba(37, 99, 235, 0.08);
  margin-bottom: 24px;
}

h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
}

input, select {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1a1a2e;
  background: #f8fafc;
  transition: border-color 0.2s;
  outline: none;
}

input:focus, select:focus {
  border-color: #3b82f6;
  background: #fff;
}

.btn-add {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.2s, opacity 0.2s;
}

.btn-add:hover:not(:disabled) {
  background: #1d4ed8;
}

.btn-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
