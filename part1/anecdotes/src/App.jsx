import { useState } from 'react'


function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  

  const [selected,setSelected] = useState(0)
  const [votes,setVotes] = useState([0,0,0,0,0,0,0,0])

  const largest = Math.max(...votes);
  const index = votes.indexOf(largest)

  const handleRandomClick = () => {
    let randomNumber = Math.floor(Math.random() * 10)
    if(randomNumber <= 7){
      setSelected(randomNumber);
      console.log('first attempt',randomNumber)
    }else {
      randomNumber = randomNumber % 8
      setSelected(randomNumber)
      console.log('after dividing',randomNumber)
    }
  }

  const handleVote = () => {
    let copy = [...votes]
    console.log('copy:',copy)
    console.log('selected num',selected)
    console.log('anectodes selcted',anecdotes[selected])
    copy[selected] += 1
    setVotes(copy)
    
  }

  return (
    <>
     <h4>{anecdotes[selected]}</h4>
     <p>votes: {votes[selected]}</p>
     
     <button onClick={handleRandomClick}>vote</button>
     <button onClick={ handleVote}>vote for this anectode</button>

     <h2>Anecdote with most votes</h2>
     <p>{anecdotes[index]}</p>

    </>
  )
}





export default App
