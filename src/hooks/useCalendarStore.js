import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadingEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from './../api/calendarApi';
import { parseDates } from "../helpers/parseDates";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const starSavingEvent = async (calendarEvent) => {
    try {

      if (calendarEvent.id) {
        const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }

      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))

    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar evento', error.response.data.msg, 'error')
    }
  }

  const startDeleteEvent = async(calendarEvent) => {

    try {

      const { data } = await calendarApi.delete(`/events/${calendarEvent.id}`)
      dispatch(onDeleteEvent())

    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar evento', '', 'error')
    }



  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = parseDates(data.events)
      dispatch(onLoadingEvent(events))

    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  }



  return {
    events, setActiveEvent, activeEvent, starSavingEvent, startDeleteEvent, startLoadingEvents, hasEventSelected: !!activeEvent,
  }
}
