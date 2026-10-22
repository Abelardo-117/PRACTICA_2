import { test, expect } from '@playwright/test';

test('la página de inicio muestra el título y el encabezado', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('TiendaUT');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bienvenido a TiendaUT');
});

test('el enlace Iniciar sesión lleva al formulario', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Iniciar sesión' }).click();
  await expect(page).toHaveURL(/login\.html/);
  await expect(page.getByRole('heading', { name: 'Iniciar sesión' })).toBeVisible();
});

