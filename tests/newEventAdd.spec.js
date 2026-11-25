import fs from 'fs';
import path from 'path';
import {test,expect} from './fixtures/auth.fixtures';
import {HomePage} from './pages/home.page';
import {newEvent} from './pages/newEvent.page';

const eventData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fixtures', 'data', 'eventData.json'), 'utf-8')
);

test('add new event', async({loggedInPage})=>{

    const uniqueTitle = `${eventData.title} ${Date.now()}`;

    const homePage = new HomePage(loggedInPage);
    await homePage.gotoManageEvents();
    await expect(loggedInPage).toHaveURL(/\/admin\/events/);

    const newEventPage = new newEvent(loggedInPage);
    const row = newEventPage.getEventRow(uniqueTitle);

    await newEventPage.newEvent();
    await newEventPage.createNewEvent(uniqueTitle, eventData.description, eventData.category, eventData.city, eventData.venue, eventData.date, eventData.price, eventData.seats, eventData.imageUrl);

    await expect(newEventPage.title).toHaveValue('');
    await expect(row).toBeVisible();
    await expect(row).toContainText(eventData.category);
    await expect(row).toContainText(eventData.city);
    const displayDate = new Date(eventData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    await expect(row).toContainText(displayDate);
    await expect(row).toContainText(eventData.price);
    await expect(row).toContainText(`${eventData.seats}/${eventData.seats}`);

    await loggedInPage.goto('/events');
    const card = loggedInPage.locator('article', { hasText: uniqueTitle });
    const cardImage = card.locator('img');
    await expect(cardImage).toHaveAttribute('src', new RegExp(encodeURIComponent(eventData.imageUrl)));
    await expect(cardImage).toHaveAttribute('alt', uniqueTitle);

    await homePage.gotoManageEvents();
    await newEventPage.deleteEvent(uniqueTitle);
    await expect(row).toHaveCount(0);

})
