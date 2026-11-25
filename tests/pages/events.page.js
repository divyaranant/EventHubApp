export class EventsPage {
    constructor(page) {
        this.page = page;

        // label -> its sibling value <p> (icon-box detail pattern: label <p> + value <p>)
        const fieldValue = (label) =>
            page.getByText(label, { exact: true }).locator('xpath=following-sibling::p[1]');

        // label -> its sibling value <span> (confirmation row pattern: label <span> + value <span>)
        const confirmationValue = (label) =>
            page.getByText(label, { exact: true }).locator('xpath=following-sibling::span[1]');

        this.eventTitle = page.getByRole('heading', { level: 1 });
        this.eventDate = fieldValue('Date');
        this.eventTime = fieldValue('Time');
        this.eventVenue = fieldValue('Venue');
        this.eventCity = fieldValue('City');
        this.eventAvailability = fieldValue('Available');
        this.eventPrice = fieldValue('Price per ticket');
        this.bookTicketHeader = page.getByRole('heading', { name: 'Book Tickets' });
        this.fullName = page.getByPlaceholder('Your full name');
        this.email = page.getByPlaceholder('you@email.com');
        this.phone = page.getByRole('textbox',{name:'phone'});
        this.confirm = page.getByRole('button',{name:'Confirm Booking'});
        this.successMessage = page.getByRole('heading', { name: /Booking Confirmed/ });
        this.reservedMessage = page.getByText('Your tickets are reserved.');
        this.bookingRef = page.locator('.booking-ref');
        this.bookingCustomer = confirmationValue('Customer');
        this.bookingTicketCount = confirmationValue('Tickets');
        this.bookingTotal = confirmationValue('Total');
        this.viewBookingsButton = page.getByRole('button', {name:'View My Bookings'});
    }

    async goto(eventId) {
        await this.page.goto(`/events/${eventId}`);
    }

    get detailLocators() {
        return [
            this.eventTitle,
            this.eventDate,
            this.eventTime,
            this.eventVenue,
            this.eventCity,
            this.eventAvailability,
            this.eventPrice,
        ];
    }

    async bookTickets(fullName, email, phone){
       await this.fullName.fill(fullName);
       await this.email.fill(email);
       await this.phone.fill(phone);
       await this.confirm.click();

    }

    get confirmationLocators() {
        return [
            this.successMessage,
            this.reservedMessage,
            this.bookingRef,
            this.bookingCustomer,
            this.bookingTicketCount,
            this.bookingTotal,
        ];
    }

    async viewBookings(){
        await this.viewBookingsButton.click();
    }
}
