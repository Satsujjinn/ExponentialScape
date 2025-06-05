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
    const del = await request(app).delete(`/api/messages/${res.body.id}`);
    expect(del.statusCode).toBe(200);
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

  it('returns metrics', async () => {
    await request(app).post('/api/views');
    const res = await request(app).get('/api/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('views');
    expect(res.body).toHaveProperty('messageCount');
  });

  it('sorts messages by likes', async () => {
    const first = await request(app).post('/api/messages').send({ text: 'First' });
    const second = await request(app).post('/api/messages').send({ text: 'Second' });
    await request(app).post(`/api/messages/${second.body.id}/like`);
    const res = await request(app).get('/api/messages?sort=likes');
    expect(res.statusCode).toBe(200);
    const [top] = res.body.messages;
    expect(top.id).toBe(second.body.id);
    await request(app).delete(`/api/messages/${first.body.id}`);
    await request(app).delete(`/api/messages/${second.body.id}`);
  });
});
