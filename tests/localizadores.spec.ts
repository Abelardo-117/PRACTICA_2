import { test, expect } from '@playwright/test';

test('E2 corregido acota el botón al producto Teclado mecánico', async ({ page }, testInfo) => {
  await page.goto('/catalogo.html');
  await expect(page.getByTestId('producto')).toHaveCount(4);

  const botonTeclado = page.getByTestId('producto')
    .filter({ hasText: 'Teclado mecánico' })
    .getByRole('button', { name: 'Agregar al carrito' });

  await expect(botonTeclado).toHaveCount(1);
  await botonTeclado.click();
  await expect(page.getByTestId('contador-carrito')).toHaveText('1');

  await testInfo.attach('e2-localizador-unico-teclado', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

