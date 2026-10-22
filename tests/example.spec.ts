import { test, expect } from '@playwright/test';

test('la aplicación TiendaUT responde desde el servidor local', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('TiendaUT');
  await expect(page.getByRole('heading', { name: 'Bienvenido a TiendaUT' })).toBeVisible();
});

