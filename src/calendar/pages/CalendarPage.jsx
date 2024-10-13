import { CalendarEventBox, CalendarModal, Navbar } from '../'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import { getMessages, localizer } from '../../helpers'
import { useState } from 'react'
import { useUiStore } from '../../hooks/useUiStore'


const events = [{
  title: "Cumpleaños del jefe",
  notes: "Hay que comprar el pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
}]

const eventStyleGetter = (event, star, end, isSelected) => {
  const style = {
    backgroundColor: "black",
    borderRadius: "0px",
    opacity: 0.8,
    color: "red"
  }
  return { style }
}



export const CalendarPage = () => {

  const {openDateModal} = useUiStore()

  const [view, setView] = useState(localStorage.getItem('lastView') || 'week')

  const handleOnDoubleClick = (event) => {
    console.log({ doubleClick: event });
    openDateModal()
  }
  const handleOnSelect = (event) => {
    console.log({ click: event });
  }
  const handleOnViewChange = (event) => {
    console.log({ viewChange: event });
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        defaultView={view}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={handleOnDoubleClick}
        onSelectEvent={handleOnSelect}
        onView={handleOnViewChange}
      />
      <CalendarModal />
    </>
  )
}
