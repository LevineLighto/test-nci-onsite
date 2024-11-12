import { Active, Idle } from "@irimold/react-component/constants"

export const containerClasses = {
    position: 'relative'
}

export const popupClasses = {
    background  : 'bg-white',
    borderRadius: 'rounded',
    boxShadow   : 'shadow',
    display     : {
        [Active]    : 'block',
        [Idle]      : 'hidden'
    },
    height      : 'max-h-[160px]',
    overflow    : 'overflow-auto',
    padding     : 'p-2',
    position    : 'absolute top-full inset-x-0',
    zIndex      : 'z-[100]',
}

export const notesClasses = {
    align: 'text-center'
}
