import { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
  
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value} {props.symbol}</p>
  )
}


const Statistics = (props) => {
  if (props.all.length === 0) {
    return (
      <p>No feedback given</p>
    )
  } return (
    <>
    <table>
      <tbody>
        <tr>
          <td><StatisticLine text='good'/></td>
          <td><StatisticLine value={props.good} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='neutral'/></td>
          <td><StatisticLine value={props.neutral} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='bad'/></td>
          <td><StatisticLine value={props.bad}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='all'/></td>
          <td><StatisticLine value={props.all.length} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='average'/></td>
          <td><StatisticLine value={(props.good-props.bad)/props.all.length} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='positive'/></td>
          <td><StatisticLine value={(props.good/props.all.length)*100} symbol='%' /></td>
        </tr>
      </tbody>
      
    </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(all.concat('G'))
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setAll(all.concat('N'))
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setAll(all.concat('B'))
    setBad(bad+1)
  }

  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}
export default App;
