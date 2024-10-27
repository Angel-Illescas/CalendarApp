import { CalendarEventBox, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Calendar } from 'react-big-calendar'
import { getMessages, localizer } from '../../helpers'
import { useEffect, useState } from 'react'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useAuthStore } from '../../hooks'

export const CalendarPage = () => {

  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents, } = useCalendarStore()

  const [view, setView] = useState(localStorage.getItem('lastView') || 'week')
  const { user } = useAuthStore()



  const eventStyleGetter = (event, star, end, isSelected) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

    const style = {
      backgroundColor: isMyEvent ? "#59b5f7" : "#f75959",
      borderRadius: "5px",
      borderColor: "white",
      opacity: 0.8,
      color: "white"
    }
    return { style }
  }



  const handleOnDoubleClick = (event) => {
    // console.log({ doubleClick: event });
    openDateModal()
  }
  const handleOnSelect = (event) => {
    // console.log({ click: event });
    setActiveEvent(event)
  }
  const handleOnViewChange = (event) => {
    // console.log({ viewChange: event });
    localStorage.setItem('lastView', event)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />
      <div className='container-fluid p-3'>
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
      </div>
      <CalendarModal />
      <FabAddNew />
      {/* <FabDelete /> */}
    </>
  )
}
