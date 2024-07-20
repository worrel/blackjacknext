'use client'

import { useCallback } from "react";

export interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const Button: React.FC<any> = ({onClick, text}) => {
    
    const onClickHandler = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        onClick(event)
    }, [onClick])

    return (
        <a 
            className="group rounded-lg bg-slate-300 border border-gray-600 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" 
            href='' 
            onClick={onClickHandler}>{text}</a>
    )
}

export default Button;