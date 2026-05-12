import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173')
})

test('додає нове завдання через форму', async ({ page }) => {
  await page.fill('input[placeholder="Наприклад: Математика"]', 'Математика')
  await page.selectOption('select', 'Лабораторна')
  await page.fill('input[type="date"]', '2026-06-01')
  await page.click('.btn-add')

  await expect(page.locator('.task-list')).toContainText('Математика')
})

test('кнопка задізейблена якщо форма не заповнена', async ({ page }) => {
  await expect(page.locator('.btn-add')).toBeDisabled()
})

test('форма очищається після додавання завдання', async ({ page }) => {
  await page.fill('input[placeholder="Наприклад: Математика"]', 'Фізика')
  await page.selectOption('select', 'Іспит')
  await page.fill('input[type="date"]', '2026-06-15')
  await page.click('.btn-add')

  await expect(page.locator('input[placeholder="Наприклад: Математика"]')).toHaveValue('')
})