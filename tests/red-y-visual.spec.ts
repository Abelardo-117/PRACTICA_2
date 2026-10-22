import { test, expect } from '@playwright/test';

test('si la API falla, el catálogo debe avisar al usuario', async ({ page }) => {
  await page.route('**/api/productos', (route) =>
    route.fulfill({ status: 500, body: 'Error interno' }),
  );
  await page.goto('/catalogo.html');
  await expect(page.getByText('No pudimos cargar los productos')).toBeVisible();
});

test('la página de inicio se ve igual que la referencia', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('inicio.png', { maxDiffPixelRatio: 0.02 });
});

