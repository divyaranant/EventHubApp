import fs from 'fs';
import { test as base, expect} from '@playwright/test';
import { EventsApi } from '../api/events.api';
import { BookingApi } from '../api/bookings.api';

function getAuthToken() {
    const state = JSON.parse(fs.readFileSync('playwright/.auth/user.json', 'utf-8'));
    const { origin } = new URL(process.env.BASE_URL);
    const page = state.origins.find((o) => o.origin === origin);
    const tokenEntry = page?.localStorage.find((item) => item.name === 'eventhub_token');
    return tokenEntry?.value;
}

export const test = base.extend({
    apiContext: async ({playwright}, use) => {
        const context = await playwright.request.newContext({
            baseURL: 'https://api.eventhub.rahulshettyacademy.com',
            extraHTTPHeaders: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        await use(context);
        await context.dispose();
    },

    eventsApi: async ({ apiContext}, use) => {
        await use(new EventsApi(apiContext));
    },

    bookingsApi: async ({ apiContext }, use) => {
        await use(new BookingApi(apiContext));
    },
});

export { expect };