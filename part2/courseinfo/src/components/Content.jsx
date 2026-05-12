import Part from "./Part"

const Content = ({content}) => {
  
    const sum = content.reduce((sum,each) => each.exercises + sum,0)
    
    return(
        <>
        {content.map(each => <Part key={each.id} part={each}></Part>)}
        <h3>Total of {sum} exercises</h3>
        </>
    )
}

export default Content