import {test,expect} from './fixtures/auth.fixtures';
import {HomePage} from './pages/home.page';

test('verify home page', async({ loggedInPage }) =>
{
    await expect(loggedInPage.getByText('Featured Events')).toBeVisible();
}


)

test('each event card shows complete info', async ({ loggedInPage }) => {
    const homePage = new HomePage(loggedInPage);

    await expect(homePage.eventCards.first()).toBeVisible();
    const count = await homePage.eventCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const card = homePage.eventCards.nth(i);
        await test.step(`card #${i}`, async () => {
            await expect.soft(homePage.getCardImage(card)).toBeVisible();
            await expect.soft(homePage.getCardImage(card)).toHaveAttribute('alt', /.+/);
            await expect.soft(homePage.getCardTitle(card)).not.toBeEmpty();
            await expect.soft(homePage.getCardDate(card)).toBeVisible();
            await expect.soft(homePage.getCardPrice(card)).toBeVisible();
            await expect.soft(homePage.getCardSeats(card)).toBeVisible();
            await expect.soft(homePage.getCardBookNow(card)).toBeVisible();
        });
    }
});