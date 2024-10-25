import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { CalendarPage } from '../calendar/pages/CalendarPage'
import { useAuthStore, useCalendarStore } from '../hooks'
import { useEffect } from 'react'

export const AppRouter = () => {

    const { cheackAuthToken, status } = useAuthStore()

    
    useEffect(() => {
        cheackAuthToken()
    }, [])




    if (status === 'checking') {
        return (
            <h1>Cargando...</h1>
        )
    }

    return (
        <Routes>
            {status === 'not-autheticated'
                ? (
                    <>
                        <Route path='/auth/*' element={<LoginPage />} />
                        <Route path='/*' element={<Navigate to='/auth/login' />} />
                    </>
                )
                : (
                    <>
                        <Route path='/' element={<CalendarPage />} />
                        <Route path='/*' element={<Navigate to="/" />} />
                    </>
                )
            }


        </Routes>
    )
}
