import { createSlice } from '@reduxjs/toolkit';



export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isNewNote:false,
        isLoadingEvents: true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
            state.isNewNote = false;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null,
            state.isNewNote = false
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id == payload.id) {
                    return payload
                }
                return event
            })
        },
        onDeleteEvent: (state, { payload }) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id != state.activeEvent.id)
                state.activeEvent = null;
            }
        },
        onLoadingEvent: (state, { payload = []}) => {
            state.isLoadingEvents = false
            payload.forEach(event => {
                const exist = state.events.some(dbevent => dbevent.id === event.id )
                if(!exist){
                    state.events.push(event)
                }
            });
        },
        onLogoutCalendar: ( state ) => {
            state.isLoadingEvents = true,
            state.events      = []
            state.activeEvent = null
        },
        onIsNewNote: (state) =>{
            state.isNewNote = true
        }
    }
});



export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadingEvent,onLogoutCalendar,onIsNewNote } = calendarSlice.actions;
