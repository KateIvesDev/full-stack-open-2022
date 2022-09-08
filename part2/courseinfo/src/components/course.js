import React from 'react'; 

const Header = (props) => {
    return(
      <>
        <h1>{props.course}</h1>
      </>
    )
  }

const Part = (props) => {
    return(
        <>
        <p>{props.name} {props.exercises}</p>
        </>
    )
}
  
const Content = ({parts}) => {
    return(
        <>
        {parts.map(({name, exercises}, index) =>
        <Part name={parts[index].name} exercises={parts[index].exercises} key={index}/>)}
        </>
    )
}
  
const Total = ({parts}) => {
    return(
        <>
        <p>Number of exercises: {parts.reduce((a,b) => a + b.exercises,0)}</p>
        </>
    )
}
  
const Course = ( {course} ) => {
    return(
      <>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </>
    )
}
  
export default Course