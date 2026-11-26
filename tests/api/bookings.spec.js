import{ test, expect } from '../fixtures/api.fixtures';

test.describe('Bookings API', { tag: '@api' }, () => {
test('Get /api/bookings returns list', async ({bookingsApi}) => {
        const res = await bookingsApi.list();
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(body.success).toBe(true);
        expect(Array.isArray(body.data)).toBe(true);
        expect(body.pagination).toHaveProperty('total');
    });

 test('GET /api/bookings creates bookings', async ({ bookingsApi }) => {
     
        const payload = {
            customerName: 'Sweetie Pie',
            customerEmail: 'sweetie@email.com',
            customerPhone: '9111111111',
            quantity: 1,
            eventId: 285
        };

        const createRes = await bookingsApi.create(payload);
        expect(createRes.status()).toBe(201);
        const created = (await createRes.json()).data;
        expect(created.customerName).toBe(payload.customerName);
        expect(created.eventId).toBe(payload.eventId);
        expect(created.status).toBe('confirmed');
    });

});