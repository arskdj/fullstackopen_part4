const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const db = require('../utils/db.js')
require('express-async-errors')

beforeAll( async () => {
    await db.connect()
})

beforeEach( async () => {
    await User.deleteMany({})
    const users = initialUsers.map(b => new User(b))
    const promises = await users.map(b => b.save())
    await Promise.all(promises)
})

afterAll( async () => {
    await db.close()
})

const initialUsers = [
    {name : 'mario', username : 'some1', password : '1234'},
    {name : 'luigi', username : 'some2', password : '1234'},
    {name : 'waluigi', username: 'some3', password : '1234'},
    {name : 'wario',   username : 'some4', password : '1234'}
]


const getAllUsers = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

describe('users', () => {
    const url = '/api/users/'

    test('get users url', async () => {
        const response = await api.get(url)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(4)
    })

    test('post user', async () => {
        const user = {
            'name' : 'testUser',
            'username' : 'sometest',
            'password' : '1234'
        }

        const response = await api.post(url)
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const {name, username} = response.body
        delete user.password
        expect(user).toEqual({name, username})

        const allUsers = await getAllUsers()
        expect(allUsers).toHaveLength(initialUsers.length + 1)
    })


    test('post invalid password', async () => {
        const user = {
            'name' : 'invalid_password',
            'username' : 'invalidUser',
            'password' : '12'
        }

        await api.post(url)
            .send(user)
            .expect(400)
            .expect({error: 'password too short'})

        const userInDb = await User.find({name:user.name})
        expect(userInDb).toEqual([])
    })

    test('post invalid username', async () => {
        const user = {
            'name' : 'invalid_username',
            'username' : 'n',
            'password' : '1234'
        }

        await api.post(url)
            .send(user)
            .expect(400)
            .expect({error: 'username too short'})

        const userInDb = await User.find({name:user.name})
        expect(userInDb).toEqual([])
    })
})
