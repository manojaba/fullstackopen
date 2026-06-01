const Blog = require('../models/blog')
const initialBlogs = [
    {
        title:'hare hare hare',
        author:'swami swami',
        url:'gaja gja aja',
        likes:2
    },
    {
        title:'namaskaaram',
        author:'gopal',
        url:'chumkum',
        likes:3
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}



module.exports = {initialBlogs, blogsInDB}