const request = require('supertest');
const app = require('../index');

describe('API', () => {
  it('responds to GET /api/hello', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Hello from the backend!' });
  });

  it('creates a message', async () => {
    const res = await request(app).post('/api/messages').send({ text: 'Test' });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe('Test');
  });

  it('rejects empty message', async () => {
    const res = await request(app).post('/api/messages').send({ text: '' });
    expect(res.statusCode).toBe(400);
  });

  it('stores contact message', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Alice', email: 'a@example.com', message: 'Hi' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ success: true });
  });

  it('rejects invalid contact message', async () => {
    const res = await request(app).post('/api/contact').send({});
    expect(res.statusCode).toBe(400);
  });
});
