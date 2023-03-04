import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { getGameById, getScreenshotsOfGame} from "../../services/games-api"
import css from './GameDescription.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaPlaystation, FaSteam, FaAppStore, FaXbox, FaGooglePlay, FaItchIo } from 'react-icons/fa'
import { SiGogdotcom, SiNintendo, SiEpicgames } from 'react-icons/si'
import {RiXboxLine} from 'react-icons/ri'
import 'swiper/css/bundle'
import 'swiper/css/navigation';
import { Loader } from "../../components/Loader/Loader";
import { Navigation } from "swiper";

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
    // const [isFavourite, setIsFavourite] = useState(false)

    const { gameSlug } = useParams()

    window.scroll({
        top: 0,
    });

    useEffect(() => {
        Promise.all([getGameById(gameSlug), getScreenshotsOfGame(gameSlug)]).then(res => {
            const [game, screenshots] = res
            setGameData(game.data)
            setTitle(game.data.name)
            setPoster(game.data.background_image)
            setDescription(game.data.description_raw)
            setStores(game.data.stores)
            setYear(game.data.released.slice(0, 4))
            setScreenshots(screenshots.data.results)
        }).catch(error => console.log(error)).finally(setTimeout(() => {setIsLoading(false)}, 500))
        
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
                    <ul className={css.stores_list}>
                        {stores.map(store => <li><a href={`https://${store.store.domain}`}>
                            {store.store.name === 'Steam' && <FaSteam />}
                            {store.store.name === 'PlayStation Store' && <FaPlaystation />}
                            {store.store.name === 'App Store' && <FaAppStore />}
                            {store.store.name === 'GOG' && <SiGogdotcom />}
                            {store.store.name === 'Xbox Store' && <FaXbox />}
                            {store.store.name === 'Xbox 360 Store' && <RiXboxLine />}
                            {store.store.name === 'Nintendo Store' && <SiNintendo />}
                            {store.store.name === 'Epic Games' && <SiEpicgames />}
                            {store.store.name === 'Google Play' && <FaGooglePlay />}
                            {store.store.name === 'itch.io' && <FaItchIo />}
                        </a></li>)}
                    </ul>
                    <p className={css.description}>{description}</p>
                
                    <button type="button" className={css.toggle_button} onClick={toggleShowScreenshots}>{showScreenshots ? 'Hide' : 'Show'} screenshots</button>
                
                    {showScreenshots &&
                        <Swiper className={css.slider}
                            spaceBetween={0}
                            slidesPerView={'auto'}
                            initialSlide={0}
                            loop={true}
                        >
                            {screenshots.map(screenshot => <SwiperSlide className={css.slide}><img className={css.screenshot} src={screenshot.image} alt='fdff' /></SwiperSlide>)}
                        </Swiper>}</>} {/* решить что делать со слайдером */}
                
        </div>
    )
}

