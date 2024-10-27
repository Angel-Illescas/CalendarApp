
import { addHours } from 'date-fns';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from './../../hooks/useUiStore';
import { useAuthStore } from '../../hooks';
export const FabAddNew = () => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent,starSettingNewNote } = useCalendarStore()
    const { user } = useAuthStore()

    const handleClickNew = () => {
        setActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user
        })
        starSettingNewNote()
        openDateModal()
    }

    return (
        <button
            className="btn btn-prymary fab"
            onClick={handleClickNew}>
            <i className="fas fa-plus"></i>
        </button>
    )
}
