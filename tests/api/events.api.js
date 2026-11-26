export class EventsApi {
    constructor(request) {
        this.request = request;
    }

    async list({ page = 1, limit = 12 } = {}) {
        return this.request.get(`/api/events?page=${page}&limit=${limit}`);
    }

    async getById(id) {
        return this.request.get(`/api/events/${id}`);
    }

    async create(payload) {
        return this.request.post(`/api/events`, { data: payload });
    }

    async delete(id) {
        return this.request.delete(`/api/events/${id}`);
    }
}
