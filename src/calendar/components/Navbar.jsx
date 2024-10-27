import React from 'react'
import { useAuthStore } from '../../hooks'

export const Navbar = () => {

    const {startLogout,user} = useAuthStore()

    return (
        <div className='navbar navbar-dark mynavbar mb-4 px-4'>
            
            <span className='navbar-brand'>
                <img src="../public/images/logo-blanco.svg" alt="" className='img-navbar'/>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <span className='fs-6'>Bievenido:</span> <span className='fs-6 fw-normal'>{user.name}</span>
            </span>

            

            <button
                className="btn btn-light"
                onClick={startLogout}
            >
                <i
                    className='fa fa-sign-out-alt'
                >
                </i>
                &nbsp;
                <span>Salir</span>
            </button>

        </div>
    )
}
