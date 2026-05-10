import StatisticsLine from "./StatisticsLine"

const Statistics = ({good,neutral,bad}) => {
  if(good === 0 && neutral === 0 && bad === 0){
    return(
      <p>no feedback given</p>
    )
  } else {
    return(

    
    <>
    <h1>statistics</h1>
<table>
  <tbody>
        <StatisticsLine text='good' value={good}></StatisticsLine>
    <StatisticsLine text = 'neutral' value={neutral}></StatisticsLine>
     <StatisticsLine text = 'bad' value={bad}></StatisticsLine>
     <StatisticsLine text='all' value={good + neutral + bad}></StatisticsLine>
     <StatisticsLine text='average' value={(good + neutral + bad)/3}></StatisticsLine>
     <StatisticsLine text='positive' value={(good/(good + neutral + bad)) * 100}></StatisticsLine>
  </tbody>
</table>

    </>
  )
  }
}

export default Statistics