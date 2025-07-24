const request = require('supertest');
const app = require('../index');
let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'Password123' });
  token = res.body.token;
});

describe('GET /api/library', () => {
  it('requires auth', async () => {
    const res = await request(app).get('/api/library');
    expect(res.status).toBe(401);
  });

  it('returns an array when authorized', async () => {
    const res = await request(app)
      .get('/api/library')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
