const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)


describe('api tests', () => {

    test('get blogs url', async () => {
        await api.get('/api/blogs/')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
