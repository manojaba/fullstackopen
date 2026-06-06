import { useEffect, useState } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'


function App() {
  const[blogs,setBlogs] = useState([])
  const[username,setUsername] = useState('')
  const[password,setpassword] = useState('')
  const[user,setUser] = useState(null)
  const[title,setTitle] = useState('')
  const[author,setAuthor] = useState('')
  const[url,setUrl] = useState('')
  const[notification,setNotification] = useState('')

  useEffect( () => {
    (async () => {
      if(user){
         const fetchedBlogs = await blogsService.getAll()
      setBlogs(fetchedBlogs)
      }
     
      
    })()
  },[user])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username,password)
    try{
const user = await loginService.login({username,password})
    setUser(user)
    window.localStorage.setItem('loggedBlogUser',JSON.stringify(user))
    blogsService.setToken(user.token)
    setNotification(`user ${user.name} logged in`)
    }catch(error){
      setNotification(error.message)
      setTimeout(() => {
        setNotification('')
      },2000)
    }
    
  }

  const showLogin = () => (
    <>
    <h2>login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </label>
      </div>
      <div>
        <label>
          password
          <input type='password' value={password} onChange={e => setpassword(e.target.value)}></input>
        </label>
      </div>
      <button type='submit'>login</button>

    </form>
    </>
  )

  const showBlog = () => (
    <>
    <h1>blogs</h1>
    <h2>{user.name} logged in <button onClick={handleLogout}>logout</button></h2>
        <ul>
      {
      blogs.map(b =><Blog key={b.id}  blog = {b}></Blog>)
    }
    </ul>
    <h2>create new blog</h2>
    <form onSubmit={handleBlogSubmit}>
      <label>
        title
        <input type='text' value={title} onChange={e => setTitle(e.target.value)}></input>
      </label>
      <label>
        author
        <input type='text' value={author} onChange={e => setAuthor(e.target.value)}></input>
      </label>
      <label>
        url
        <input type='text' value={url} onChange={e => setUrl(e.target.value)}></input>
      </label>
      <button type='submit'>create</button>

    </form>
    </>
    )

    const handleLogout = () => {
      setUser(null)
      window.localStorage.clear()
    }

    const handleBlogSubmit = async (event) => {
      event.preventDefault()
      const newBlog = await blogsService.create({title,author,url})
      setBlogs(prev => prev.concat(newBlog))
      setNotification(`a new blog ${title} by ${author} added`)
      setTimeout(()=> {
        setNotification('')
      },2000)
      setTitle('')
      setAuthor('')
      setUrl('')
     
      
    }




  return (
    <>
    <h1>Blog App </h1>
    <h3>{notification}</h3>
    
    {!user && showLogin()}
    {user && showBlog()}
  
      
    </>
  )
}

export default App
