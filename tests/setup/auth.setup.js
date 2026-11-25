import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async({ page}) => {
   const loginPage = new LoginPage(page)
   await loginPage.goto();
   await loginPage.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
   await page.context().storageState({path:authFile});

});