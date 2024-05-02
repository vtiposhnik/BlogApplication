import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    value: string | ReactNode
    handleClick?: () => void;
    styles?: React.CSSProperties
    type?: string
}

export const Button2 = (props: ButtonProps) => {
    const { value, handleClick, styles, type } = props
    return (
        <button style={styles} type={type} onClick={handleClick} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">{value}</button>
    )
}

export const CustomButton = (props) => {
    const {value, path} = props

    return (
        <Link to={path} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {value}
        </Link>
    )
}