import fs from 'fs';
import path from 'path';
import {test,expect} from './fixtures/auth.fixtures';
import { HomePage } from './pages/home.page.js';
import { EventsPage } from './pages/events.page.js';

const bookingData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fixtures', 'data', 'bookingData.json'), 'utf-8')
);


test('click on Book Now', async({loggedInPage}) =>
{
  const homePage = new HomePage(loggedInPage);
  await homePage.gotoBookNow();

  // TODO: confirm the actual post-click target (URL/heading/text) and replace this
  await expect(loggedInPage).toHaveURL(/events/);
});

test('verify event details',async({loggedInPage}) =>
{
  const homePage = new HomePage(loggedInPage);
  await homePage.gotoBookNow();

  const eventsPage = new EventsPage(loggedInPage);
  for (const locator of eventsPage.detailLocators) {
    await expect(locator).toBeVisible();
    await expect(locator).not.toBeEmpty();
}
});

for (const booking of bookingData) {
  test(`Book Tickets - ${booking.fullName}`, async({loggedInPage}) =>
  {
    const homePage = new HomePage(loggedInPage);
    await homePage.gotoBookNow();

    const eventsPage = new EventsPage(loggedInPage);
    await eventsPage.bookTickets(booking.fullName, booking.email, booking.phone);

    await expect(eventsPage.successMessage).toBeVisible();
    await expect(eventsPage.bookingCustomer).toHaveText(booking.fullName);

    await eventsPage.viewBookings();
    await expect(loggedInPage).toHaveURL(/\/bookings/);
  });
}