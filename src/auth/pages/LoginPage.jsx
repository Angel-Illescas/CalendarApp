import './LoginPage.css'
import { useAuthStore, useForm } from '../../hooks';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: "",
    loginPassword: "",
}
const registerFormFields = {
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPassword2: "",
}

export const LoginPage = () => {

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange, formState: loginFormState, } = useForm(loginFormFields)
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange, formState: registerFormState } = useForm(registerFormFields)
    const { startLogin, starRegister, errorMessage } = useAuthStore()
    const [isLoginPage, setIsLoginPage] = useState(true)

    const handleLoginOrRegister = (event) => {
        event.preventDefault()
        setIsLoginPage(!isLoginPage)
    }

    const handleOnLoginSubmit = (event) => {
        event.preventDefault()

        startLogin({ email: loginEmail, password: loginPassword })

    }

    const handleOnRegisterSubmit = (event) => {
        event.preventDefault()
        if (registerPassword !== registerPassword2) {
            Swal.fire("Error de Registro", "Contraseñas no coinciden", 'error')
        } else {
            starRegister({ email: registerEmail, name: registerName, password: registerPassword })
        }

    }


    useEffect(() => {
        if (errorMessage === "Logout Exitoso") {
        } else if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error')
        }
    }, [errorMessage])



    return (
        <div className="container login-container ">
            <div className="row ">
                <div className="col-md-6 login-form-1 " style={{ display: isLoginPage ? '' : "none" }}>
                    <img src="/assets/images/01.svg" alt="" srcset="" className='img-login' />
                    <h3 className='mt-1'>Ingreso</h3>
                    <form className='text-center' onSubmit={handleOnLoginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />

                        </div>
                        <button className='btn btn-link btn-linkb' onClick={handleLoginOrRegister}>Registrate aqui</button>
                    </form>
                </div>

                <div className="col-md-6 login-form-2" style={{ display: isLoginPage ? "none" : "" }}>
                    <h3>Registro</h3>
                    <form className='text-center' onSubmit={handleOnRegisterSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2 ">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />

                        </div>
                        <button className='btn btn-link text-end' onClick={handleLoginOrRegister}>Ya tengo una cuenta</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
