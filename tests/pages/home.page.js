export class HomePage {
    constructor(page){
        this.page=page
        this.bookNowButton = page.getByRole('link', { name: 'Book Now' }).nth(1);
        this.homeLink = page.getByRole('link', { name: 'Home'});
        this.myBookings = page.getByTestId('nav-bookings');
        this.events = page.getByTestId('nav-events');
        this.manageEvents = page.getByRole('link', { name: 'Manage Events' }).first();
        this.eventCards = page.locator('article');
    }

    getCardImage(card){ return card.locator('img'); }
    getCardTitle(card){ return card.getByRole('heading'); }
    getCardDate(card){ return card.getByText(/^[A-Za-z]{3}, \d{1,2} [A-Za-z]{3}$/); }
    getCardPrice(card){ return card.getByText(/\$[\d,]+/); }
    getCardSeats(card){ return card.getByText(/seats?/i); }
    getCardBookNow(card){ return card.getByRole('link', { name: 'Book Now' }); }

    async goToHomePage(){
        await this.homeLink.click();
    }
    async gotoBookNow(){
        await this.bookNowButton.click();
    }

     async gotoMyBookings(){
       await this.myBookings.click();
    }

    async gotoEvents(){
        await this.events.click();

    }

    async gotoManageEvents(){
        await this.manageEvents.click();
    }

        
}