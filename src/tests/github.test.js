import request from 'supertest'
import { app } from '../server'

test('github routes should return 200', async () => {
  const response = await request(app).get('/api/github/search/users/luke-h1')
  expect(response.statusCode).toBe(200)
})

// test('/api/github/search/users/luke-h1 should have certain keys', async () => {
//   const response = await request(app).get('/api/github/search/users/luke-h1')
// })
