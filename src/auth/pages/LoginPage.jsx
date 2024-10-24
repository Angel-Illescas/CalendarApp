import './LoginPage.css'
import { useAuthStore, useForm } from '../../hooks';

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

const { loginEmail, loginPassword, onInputChange: onLoginInputChange, formState:loginFormState} = useForm(loginFormFields)
const { registerName, registerEmail,registerPassword,registerPassword2, onInputChange: onRegisterInputChange, formState:registerFormState } = useForm(registerFormFields)
const {startLogin,} = useAuthStore()

const handleOnLoginSubmit = (event) => {
    event.preventDefault()
    
    startLogin({email:loginEmail,password:loginPassword})

}

const handleOnRegisterSubmit = (event) => {
    event.preventDefault()
    console.log(registerFormState);
}



    return (
        <div className="container login-container ">
            <div className="row ">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
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
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
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
                    </form>
                </div>
            </div>
        </div>
    )
}
