import { FC, FocusEventHandler, Fragment, MouseEventHandler, useRef, useState } from "react";
import { SearchProps } from "./props";
import { InputChangeHandler } from "@irimold/react-component";
import { containerClasses, notesClasses, popupClasses } from "./classes";
import { Active, Idle } from "@irimold/react-component/constants";
import { Input } from "../Input";

export const Search : FC<SearchProps> = ({
    renderOption,
    options = [],
    onSearch,
    onSelect,
    onBlur,
    onFocus,
    ...props
}) => {
    const [isFocus, setIsFocus] = useState(false)
    const focusTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
    const blurTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const handleChange : InputChangeHandler = ({name, value}) => {
        if (typeof onSearch == 'function') {
            onSearch(value)
        }
    }

    const handleSelect = (value: any) : MouseEventHandler => {
        return () => {
            if (typeof onSelect == 'function') {
                onSelect({name: props.name, value})
            }
        }
    }

    const handleFocus : FocusEventHandler<HTMLInputElement> = (event) => {
        if (typeof onFocus == 'function') {
            onFocus(event)
        }

        clearTimeout(focusTimeoutRef.current)
        focusTimeoutRef.current = setTimeout(() => {
            setIsFocus(true)
        }, 300)
    }

    const handleBlur : FocusEventHandler<HTMLInputElement> = (event) => {
        if (typeof onBlur == 'function') {
            onBlur(event)
        }

        clearTimeout(blurTimeoutRef.current)
        blurTimeoutRef.current = setTimeout(() => {
            setIsFocus(false)
        }, 300)
    }

    return (
        <div 
            className={`${
                containerClasses.position
            }`}
        >
            <Input
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
            <div 
                className={`${
                    popupClasses.background
                } ${
                    popupClasses.borderRadius
                } ${
                    popupClasses.boxShadow
                } ${
                    popupClasses.display[isFocus ? Active : Idle]
                } ${
                    popupClasses.height
                } ${
                    popupClasses.overflow
                } ${
                    popupClasses.padding
                } ${
                    popupClasses.position
                } ${
                    popupClasses.zIndex
                }`}
            >
                { !options.length ? (
                    <p 
                        className={`${
                            notesClasses.align
                        }`}
                    >
                        Tidak bisa menemukan yang sedang dicari
                    </p>
                ) : typeof renderOption == 'function' ? options.map((val, index) => (
                    <Fragment key={index}>
                        { renderOption(val, handleSelect(val)) }
                    </Fragment>
                )) : (
                    <p 
                        className={`${
                            notesClasses.align
                        }`}
                    >
                        Komponen tidak disetting dengan benar
                    </p>
                ) }
            </div>
        </div>
    )
}