import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Button from './components/Button'

import Statistics from './components/Statistics'






function App() {
  const [good,setGood] = useState(0);
  const[neutral,setNeutral] = useState(0);
  const[bad,setBad] = useState(0);

  const handleGood = () => {
    const newClick = good + 1
    setGood(newClick)
  }
  
  const handleNeutral = () => {
    const newClick = neutral + 1
    setNeutral(newClick)
  }

  const handleBad = () => {
    const newClick = bad + 1
    setBad(newClick)
  }


  return (
  <>
    <h1>give feedback</h1>
    <Button onClick={handleGood} text='good'></Button>
    <Button onClick={handleNeutral} text='neutral'></Button>
    <Button onClick={handleBad} text='bad'></Button>
<Statistics good={good} neutral={neutral} bad={bad}></Statistics>
  </>
  )
}

export default App
