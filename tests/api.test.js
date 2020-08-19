const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const h = require('./helper')
const Blog = require('../models/blog')
const db = require('../utils/db.js')
const auth = require('../utils/auth')
require('express-async-errors')


beforeAll( async () => {
    await db.connect()
})

beforeEach( async () => {
    await Blog.deleteMany({})
    const blogs = h.initialBlogs.map(b => new Blog(b))
    const promises = await blogs.map(b => b.save())
    await Promise.all(promises)
})

afterAll( async () => {
    await db.close()
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
        const token = await h.getUserToken()
        const payload = await auth.decryptToken(token)


        const blog = {
            title: 'temp title',
            author : 'temp author',
            url : 'temp url',
            likes : 123556,
            user : payload.id
        }

        const response = await api.post(url)
            .set('authorization', `bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newBlog = response.body
        delete newBlog.id

        expect(blog).toEqual(newBlog)

        const allBlogs = await h.getAllBlogs()
        expect(allBlogs).toHaveLength(h.initialBlogs.length + 1)
    })

    test('likes default value', async () => {
        const token = await h.getUserToken()

        const blog = {
            title: 'temp title',
            author : 'temp author',
            url : 'temp url',
        }

        const response = await api.post(url)
            .send(blog)
            .set('authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('check required properties', async () => {
        const token = await h.getUserToken()

        const blog = {
            author : 'temp author',
            likes : 123
        }

        await api.post(url)
            .send(blog)
            .set('authorization', `bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('delete blog', async () => {
        const blog = Blog(h.initialBlogs[0]).toJSON()

        await api.delete(`${url}/${blog.id}`)
            .expect(200)
            .expect(blog)
            .expect('Content-Type', /application\/json/)
    })


    test('update blog', async () => {
        let blog = Blog(h.initialBlogs[0]).toJSON()
        blog.likes = 99999

        await api.put(`${url}/${blog.id}`)
            .send(blog)
            .expect(200)
            .expect(blog)
            .expect('Content-Type', /application\/json/)
    })
})

