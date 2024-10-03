import Swal from 'sweetalert2';
import Modal from 'react-modal'
import es from 'date-fns/locale/es'
import DatePicker, { registerLocale } from "react-datepicker";
import { useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import 'sweetalert2/dist/sweetalert2.min.css'


registerLocale('es', es)

export const CalendarModal = () => {

    const [ isOpen, setIsOpen ] = useState(true)
    const [ formSubmitted , setFormSubmitted ] = useState(false)

    const [formValue, setFormValue] = useState({
        title: "Angelus",
        notes: "Illescas",
        start: new Date(),
        end: addHours(new Date(), 2),
    })


    const handleOnChange = ({ target }) => {
        setFormValue({
            ...formValue, [target.name]: target.value
        })
    }

    const handleOnChangeEvent = (event, change) => {
        setFormValue({
            ...formValue,
            [change]: event
        })
    }

    const HandleOnSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)
        const difference = differenceInSeconds(formValue.end, formValue.start)
        console.log(difference);

        if ( isNaN( difference ) || difference <=0 ){
            Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error')
            console.log('Error de fechas');
            return 
        }

        if ( formValue.title.length <= 0) {  return console.log("no title provide");}

        console.log(formValue);

        // TODO:

    }

    const titleClass = useMemo(() => {
        if ( !formSubmitted) return ''
        return (formValue.title.length>0)
        ? ''
        : 'is-invalid'
    }, [formValue.title,formSubmitted])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    const onCloseModal = () => {
        console.log('cerrando modal');
        setIsOpen(false)
    }



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={HandleOnSubmit}>

                <div className="form-group mb-2 row">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValue.start}
                        className='form-control'
                        onChange={(event) =>
                            handleOnChangeEvent(event, "start")
                        }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2 row">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValue.start}
                        selected={formValue.end}
                        className='form-control'
                        onChange={(event) =>
                            handleOnChangeEvent(event, "end")
                        }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValue.title}
                        onChange={handleOnChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValue.notes}
                        onChange={handleOnChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}



