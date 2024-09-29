import { Navbar } from '../'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import { getMessages, localizer } from '../../helpers'



const events = [{
  title: "Cumpleaños del jefe",
  notes: "Hay que comprar el pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
}]

const eventStyleGetter = ( event,star,end,isSelected ) => {
console.log({event,star,end,isSelected});

const style = {
  backgroundColor: "black",
  borderRadius:"0px",
  opacity: 0.8,
  color: "red"
}

return {style}
}

export const CalendarPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={getMessages()}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </>
  )
}
