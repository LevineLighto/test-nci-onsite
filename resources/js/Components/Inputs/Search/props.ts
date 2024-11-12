import { InputProps } from "@irimold/react-component";
import { MouseEventHandler, ReactNode } from "react";

export interface SearchProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
    renderOption: (value: any, onClick: MouseEventHandler) => ReactNode
    options?    : any[]
    onSearch?   : (search: string) => void
    onSelect?   : (data: { name: string, value: any }) => void
}