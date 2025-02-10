import { ChangeEvent, ChangeEventHandler, FocusEventHandler } from "react";

export interface InputType {
    type:"text" | "email" | "password" | "tel",
    placeholder:string,
    extraClass?:string,
    onChange?:ChangeEventHandler<HTMLInputElement>,
    onBlur?:FocusEventHandler<HTMLInputElement>,
    name?:string,
    value?:string
}