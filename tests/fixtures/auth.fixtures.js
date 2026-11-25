import {test as base, expect} from '@playwright/test';
import {LoginPage} from '../pages/login.page';

export const test = base.extend( {
 loginPage: async({page},use) => {
    await use(new LoginPage(page));
 },

 loggedInPage: async ({page},use) => {
    await page.goto('/'); // already authenticated via storageState (see setup project)
    await use(page);
 }

});

export {expect};