import { FidgetSpinner } from "react-loader-spinner";
import css from './Loader.module.css'
import clsx from "clsx";
export const Loader = ({page}) => {
    return (
        <div className={clsx(page === 'homepage' ? css.homepage : css['catalog_game-description']
        )}>
            <FidgetSpinner backgroundColor={page === 'homepage' ? 'darkblue' : 'white'} ballColors={['orange', 'darkblue', 'red']}/>
        </div>
    )
}