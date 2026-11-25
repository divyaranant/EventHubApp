export class newEvent{

    constructor(page){
        this.page = page;
        this.addNewEventButton = page.getByRole('button', { name: '+ Add Event' });
        this.title = page.getByLabel('Title');
        this.description = page.getByPlaceholder('Describe the event…');
        this.category = page.getByLabel('Category');
        this.city = page.getByLabel('City');
        this.venue = page.getByLabel('Venue');
        this.date = page.getByLabel('Event Date & Time');
        this.price = page.getByLabel('Price ($)');
        this.totalSeats = page.getByLabel('Total Seats');
        this.imageUrl = page.getByLabel('Image URL (optional)');
        this.addEventButton = page.getByTestId('add-event-btn');
    }

    async newEvent(){
        await this.addNewEventButton.click();
    }

    async createNewEvent(title, description, category, city, venue, date, price, seats, imageUrl){
        await this.title.fill(title);
        await this.description.fill(description);
        await this.category.selectOption(category);
        await this.city.fill(city);
        await this.venue.fill(venue);
        await this.date.fill(date);
        await this.price.fill(price);
        await this.totalSeats.fill(seats);
        if (imageUrl) {
            await this.imageUrl.fill(imageUrl);
        }
        await this.addEventButton.click();
    }

    getEventRow(title){
        return this.page.getByRole('row', { name: new RegExp(title) });
    }

    async deleteEvent(title){
        const row = this.getEventRow(title);
        await row.getByRole('button', { name: 'Delete' }).click();
        await this.page.getByRole('button', { name: 'Delete event' }).click();
    }

}
