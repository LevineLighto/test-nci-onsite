import { InputChangeHandler } from "@irimold/react-component";
import { ComponentPropsWithoutRef } from "react";

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
    onChange?           : InputChangeHandler
    containerClassName? : string
    label?              : string
}