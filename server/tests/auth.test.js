const request = require('supertest');
const app = require('../index');

describe('POST /api/auth/login', () => {
  it('rejects missing credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.status).toBe(400);
  });

  it('succeeds with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'Password123' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
  });
});
