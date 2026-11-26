import{ test, expect } from '../fixtures/api.fixtures';

test.describe('Events API', { tag: '@api' }, () => {

    test('Get /api/events returns list', async ({eventsApi}) => {
        const res = await eventsApi.list();
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(body.success).toBe(true);
        expect(Array.isArray(body.data)).toBe(true);
        expect(body.pagination).toHaveProperty('total');
    });

 test('GET /api/events/:id returns a single event', async ({ eventsApi }) => {
     const res = await eventsApi.getById(285);
     expect(res.status()).toBe(200);

     const body = await res.json();
     expect(body.data.id).toBe(285);
      
 });
 test('POST /api/events creates an event, then DELETE removes it', async ({ eventsApi }) => {
        const payload = {
            title: `API Test Event ${Date.now()}`,
            description: 'Created via API test',
            category: 'Conference',
            venue: 'Tech Park Convention Center',
            city: 'Bangalore',
            eventDate: '2027-01-15T04:30:00.000Z',
            price: 100,
            totalSeats: 50,
            imageUrl: 'https://picsum.photos/seed/eventhubqa/640/360',
        };

        const createRes = await eventsApi.create(payload);
        expect(createRes.status()).toBe(201);
        const created = (await createRes.json()).data;
        expect(created.title).toBe(payload.title);

        const deleteRes = await eventsApi.delete(created.id);
        expect(deleteRes.status()).toBe(200);
        const deleteBody = await deleteRes.json();
        expect(deleteBody.success).toBe(true);
     });


 });