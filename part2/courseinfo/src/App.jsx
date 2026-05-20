import { useState } from 'react'
import Course from './components/Course'


function App({courses}) {

 

  return (
    <>
    <h1>Web development curriculum</h1>
    {courses.map(course => <Course key={course.id} course={course}></Course>)}
    </>
  )
}

export default App
