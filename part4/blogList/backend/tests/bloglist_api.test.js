const {test,after,beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach( async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
    

})

test('all blogs are returned',async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length,helper.initialBlogs.length)
})

test('the unique identifier check', async () => {
    const response = await api.get('/api/blogs')
   const blog = response.body[0]
   assert.ok(blog.id)
   assert.strictEqual(blog._id,undefined)
})

test('creates a new blogpost', async() => {
    const newBlog = {
        title:'armegeddon',
    author:'paal',
    url:'dpang',
    likes:8
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert.strictEqual(titles.includes('armegeddon'),true)

})
test('empty like defaults to zero', async() => {
    const newBlog = {
        title:'samosa',
        author:'majoj',
        url:'dapanggg',
        
    }
   const response =  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    assert.strictEqual(response.body.likes,0)

})

test('request with title,or author missing',async() => {

    const newBlog = {
        author:'manoj',
        url:'damak',
        likes:3
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    
})

after(async () => {
    await mongoose.connection.close()
})