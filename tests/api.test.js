const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const h = require('./helper')
require('express-async-errors')

beforeEach( async () => {
    await h.initDB()
})

afterAll( async () => {
    await h.closeDB()
})

describe('api tests', () => {
    const url = '/api/blogs'

    test('get blogs url', async () => {
        const response = await api.get(url)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(6)
    })

    test('id is defined', async () => {
        const response = await api.get(url)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body[0].id).toBeDefined()
    })

    test('post blog', async () => {
        const tempBlog = {
            title: 'temp title',
            author : 'temp author',
            url : 'temp url',
            likes : 123556
        }

        const response = await api.post(url)
            .send(tempBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newBlog = response.body
        delete newBlog.id

        expect(tempBlog).toEqual(newBlog)

        const allBlogs = await h.getAllBlogs()
        expect(allBlogs).toHaveLength(h.initialBlogs.length + 1)
    })

    test('likes default value', async () => {
        const tempBlog = {
            title: 'temp title',
            author : 'temp author',
            url : 'temp url',
        }

        const response = await api.post(url)
            .send(tempBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('check required properties', async () => {
        const tempBlog = {
            author : 'temp author',
            likes : 123
        }

        const response = await api.post(url)
            .send(tempBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

