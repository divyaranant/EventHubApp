export class BookingApi {
    constructor(request){
        this.request = request;
    }

    async list({page = 1, limit = 10} = {}) {
        return this.request.get(`/api/bookings?page=${page}&limit=${limit}`);
    }
    async create(payload) {
        return this.request.post(`/api/bookings`, { data: payload });
    }
    
}