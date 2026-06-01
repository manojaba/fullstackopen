const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

 blogsRouter.get('/',async (request,response) => {
   const blogs = await Blog.find({})
   response.json(blogs)
 })

 blogsRouter.post('/',(request,response,next) => {
    const body = request.body
    const blog = new Blog(body)
    blog.save().then(savedBlog => {
        response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
 })

 blogsRouter.delete('/:id',async (request,response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
 })

 blogsRouter.put('/:id',async (request,response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if(!blog){
    response.status(404).end
  }
  blog.title = request.body.title
  blog.author = request.body.author
  blog.url = request.body.url
  blog.likes = request.body.likes
  
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
 })

 module.exports = blogsRouter