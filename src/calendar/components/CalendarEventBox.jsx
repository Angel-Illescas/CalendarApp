import React from 'react'

export const CalendarEventBox = ({event}) => {
    const {title, user} = event
  return (
    <>
    <b>{title}</b>
    <p>by: {user.name}</p>
    </>
  )
}
