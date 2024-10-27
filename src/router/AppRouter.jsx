import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { CalendarPage } from '../calendar/pages/CalendarPage'
import { useAuthStore, useCalendarStore,  } from '../hooks'
import { useEffect } from 'react'

export const AppRouter = () => {

    const { cheackAuthToken, status } = useAuthStore()



    useEffect(() => {
        cheackAuthToken()
    }, [])


    if (status === 'checking') {
        return (
            <>
                <div className="spinner-container">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </>
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
