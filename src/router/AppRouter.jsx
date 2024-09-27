import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { CalendarPage } from '../calendar/pages/CalendarPage'

export const AppRouter = () => {

    const authStatus = 'not-Authenticated'

    return (
        <Routes>
            {authStatus === 'not-Authenticated'
                ? <Route path='/auth/*' element={<LoginPage />} />
                : <Route path='/*' element={<CalendarPage />} />
            }   
            <Route path='/*' element={<Navigate to='/auth/login'/>}/>

        </Routes>
    )
}
