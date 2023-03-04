import { FidgetSpinner } from "react-loader-spinner";
import  './Loader.scss'
export const Loader = ({className, color}) => {
    return (
        <div className={`${className}`}>
            <FidgetSpinner backgroundColor={color} ballColors={['orange', 'darkblue', 'red']}/>
        </div>
    )
}