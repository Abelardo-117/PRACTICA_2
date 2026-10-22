import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.abrir();
    await use(login);
  },
});

export { expect } from '@playwright/test';

