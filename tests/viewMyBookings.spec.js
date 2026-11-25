import {test, expect} from './fixtures/auth.fixtures';
import { HomePage } from './pages/home.page';
import {myBookingsPage} from './pages/myBookings.page';

test ('View my bookings', async({loggedInPage}) => {
const homePage = new HomePage(loggedInPage);
await homePage.gotoMyBookings();
await expect(loggedInPage).toHaveURL('/bookings');
const myBookings = new myBookingsPage(loggedInPage);
for (const locator of myBookings.viewBookingLocators){
    await expect(locator).toBeVisible();
    await expect(locator).not.toBeEmpty();
    }
const city = await myBookings.getCity();
expect(city).toBeTruthy();

const ticketCount = await myBookings.getTicketCount();
expect(ticketCount).toBeGreaterThan(0);

await myBookings.viewDetails();
await expect(loggedInPage).toHaveURL(/\/bookings\//);

});
