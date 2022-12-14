import React from 'react'

const Notification = ({ message, newPerson }) => {
    if (message === null) {
      return null
    }

    if (message.includes('phonebook')){
        return(
            <div className='notification'>
                {message}
            </div>
        )
    } else return(
        <div className='error'>
                {message}
            </div>
    )
  
  }
  export default  Notification;


