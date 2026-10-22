import { test, expect } from '@playwright/test';

test('Vaciar carrito deja el contador en 0 sin errores de JavaScript', async ({ page }, testInfo) => {
  const errores: string[] = [];
  page.on('pageerror', error => errores.push(error.message));

  await page.goto('/catalogo.html');
  await expect(page.getByTestId('producto')).toHaveCount(4);

  const productos = page.getByTestId('producto');
  await productos.filter({ hasText: 'Teclado mecánico' })
    .getByRole('button', { name: 'Agregar al carrito' }).click();
  await productos.filter({ hasText: 'Mouse inalámbrico' })
    .getByRole('button', { name: 'Agregar al carrito' }).click();
  await expect(page.getByTestId('contador-carrito')).toHaveText('2');

  await page.getByRole('button', { name: 'Vaciar carrito' }).click();
  await expect(page.getByTestId('contador-carrito')).toHaveText('0');
  expect(errores).toEqual([]);

  await testInfo.attach('vaciar-carrito-contador-cero', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

test('Iniciar sesión con campos vacíos muestra error y no abre el catálogo', async ({ page }, testInfo) => {
  await page.goto('/login.html');
  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page.getByRole('alert')).toHaveText('Usuario o contraseña incorrectos');
  await expect(page).toHaveURL(/login\.html/);

  await testInfo.attach('login-campos-vacios', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

test('La API entrega productos con nombre válido y precio mayor que cero', async ({ request }, testInfo) => {
  const respuesta = await request.get('/api/productos');
  expect(respuesta.ok()).toBeTruthy();

  const productos: Array<{ nombre?: unknown; precio?: unknown }> = await respuesta.json();
  expect(productos.length).toBeGreaterThan(0);
  for (const producto of productos) {
    expect(typeof producto.nombre).toBe('string');
    expect((producto.nombre as string).trim().length).toBeGreaterThan(0);
    expect(typeof producto.precio).toBe('number');
    expect(producto.precio as number).toBeGreaterThan(0);
  }

  await testInfo.attach('respuesta-api-productos', {
    body: Buffer.from(JSON.stringify(productos, null, 2)),
    contentType: 'application/json',
  });
});

