export class myBookingsPage {

    constructor(page){
        this.page = page;
        this.bookingDetails = page.getByTestId('booking-card');
        this.latestBooking = this.bookingDetails.first();
        this.bookingDateDetail = this.latestBooking.getByRole('heading', { level: 3 });
        this.bookingTicketDetail = this.latestBooking.getByText(/🎫\s*\d+\s*tickets?/);
        this.bookingCityDetail = this.latestBooking.getByText(/📍\s*.+/);
        this.bookingRefDetail = this.latestBooking.locator('.booking-ref');
        this.bookingStatusDetail = this.latestBooking.locator('span.rounded-full');
        this.viewDetailsLink = this.latestBooking.getByRole('button',{name:'View Details'});
        
    }
   
    async getCity() {
        const text = await this.bookingCityDetail.textContent();
        return text.replace(/📍/, '').trim();
    }

    async getTicketCount() {
        const text = await this.bookingTicketDetail.textContent();
        const match = text.match(/\d+/);
        return match ? Number(match[0]) : null;
    }

    get viewBookingLocators(){
        return [
           this.latestBooking,
           this.bookingDateDetail,
           this.bookingTicketDetail,
           this.bookingCityDetail,
           this.bookingRefDetail,
           this.bookingStatusDetail,
           this.viewDetailsLink
        ]
    }

    async viewDetails(){
        await this.viewDetailsLink.click();
    }
}