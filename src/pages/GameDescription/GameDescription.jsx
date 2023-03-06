import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { getGameById, getScreenshotsOfGame} from "../../services/games-api"
import css from './GameDescription.module.css'
import { SwiperSlide } from 'swiper/react';
import { StoresList } from "components/StoresList/StoresList";
import 'swiper/css/bundle'
import 'swiper/css/navigation';
import { Loader } from "../../components/Loader/Loader";
import { Slider } from "components/Slider/Slider";

export const GameDescription = ({isLoggedIn, addToFavs, removeFromFavs}) => {
    const [title, setTitle] = useState('')
    const [poster, setPoster] = useState()
    const [screenshots, setScreenshots] = useState([])
    const [showScreenshots, setShowScreenshots] = useState(false)
    const [description, setDescription] = useState('')
    const [stores, setStores] = useState([])
    const [year, setYear] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [gameData, setGameData] = useState({})

    const { gameSlug } = useParams()

    window.scroll({
        top: 0,
    });

    useEffect(() => {
        Promise.all([getGameById(gameSlug), getScreenshotsOfGame(gameSlug)]).then(res => {
            const [game, screenshots] = res
            const {data} = game
            const {name, background_image, description_raw, stores, released} = data
            const {results} = screenshots.data

            setGameData(data)
            setTitle(name)
            setPoster(background_image)
            setDescription(description_raw)
            setStores(stores)
            setYear(released.slice(0, 4))
            setScreenshots(results)

            setIsLoading(false)
        }).catch(error => {
            console.log(error)
            setIsLoading(false)
        })
        
    }, [gameSlug])

    const toggleShowScreenshots = () => {
        setShowScreenshots(prevState => !prevState)
    }

    return (
        <div className={css.section} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${poster})`
        }}>
            {isLoading ? <Loader className={'loader-game_description'} color={'white'} /> :
                <><div>
                    <h1 className={css.title}>{title}</h1>
                    {year && <p className={css.year}>{year}</p>}
                    {isLoggedIn &&
                        (<><button type="button" onClick={() => {
                        addToFavs(gameData.slug, gameData)
                        }}>Add</button>
                        <button type="button" onClick={() => {
                            removeFromFavs(gameData.slug)
                        }}>Remove</button></>)
                    }
                </div>
                    <StoresList stores={stores}/>
                    <p className={css.description}>{description}</p>
                    <button type="button" className={css.toggle_button} onClick={toggleShowScreenshots}>{showScreenshots ? 'Hide' : 'Show'} screenshots</button>
                    {showScreenshots &&
                        <Slider>
                            {screenshots.map(screenshot => <SwiperSlide className={css.slide}><img className={css.screenshot} src={screenshot.image} alt='fdff' /></SwiperSlide>)}
                        </Slider>}</>} {/* решить что делать со слайдером */}
                
        </div>
    )
}

