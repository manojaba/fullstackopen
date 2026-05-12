import Content from "./Content"
import Header from "./Header"

const Course = ({course}) => {
    return(
        <>
        <Header name = {course.name}></Header>
        <Content content = {course.parts}></Content>
        </>
    )
}

export default Course