import { ReactNode } from "react";

interface ButtonProps {
    value: string | ReactNode
    handleClick?: () => void;
    styles?: React.CSSProperties
    type?: string
}

export const Button = (props: ButtonProps) => {
    const { value, handleClick, styles, type } = props
    return (
        <button style={styles} type={type} onClick={handleClick} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">{value}</button>
    )
}