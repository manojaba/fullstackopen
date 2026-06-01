const dummy = (blog) => {
if (blog.length === 0){
    return 1
}
}

const totelLikes = (blogs) => {
    return blogs.reduce((sum,blog) => sum + blog.likes,0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max,blog) => blog.likes > max.likes ? blog : max)
}

const mostBlogs = (blogs) => {
    return 
}

module.exports = {dummy,totelLikes,favoriteBlog}