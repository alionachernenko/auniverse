import { useContext, useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { getGameById, getScreenshotsOfGame} from "../../services/games-api"
import { StoresList } from "components/StoresList/StoresList";
import { Loader } from "../../components/Loader/Loader";
import authContext from '../../context/context'
import styled, {css} from "styled-components";
import { ToggleFavouriteButton } from "components/ToggleFavouriteButton/ToggleFavouriteButton";

export const GameDescription = () => {
    const {isLoggedIn} = useContext(authContext)

    const [title, setTitle] = useState('')
    const [poster, setPoster] = useState()
    const [screenshots, setScreenshots] = useState([])
    const [showScreenshots, setShowScreenshots] = useState(false)
    const [description, setDescription] = useState()
    const [stores, setStores] = useState()
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
        <Page background={poster}>
            {isLoading ? <Loader color={'white'} /> :
                <><Meta>
                    <Title>{title}</Title>
                    {year && <Year>{year}</Year>}
                    {isLoggedIn &&
                        <ToggleFavouriteButton gameData={gameData}/>
                    }
                </Meta>
                    {stores && <StoresList stores={stores}/>}
                    {description && <Overview>{description}</Overview>}
                    <ToggleScreenshotsButton type="button" onClick={toggleShowScreenshots}>
                        {showScreenshots ? 'Hide' : 'Show'} screenshots</ToggleScreenshotsButton>
                    {showScreenshots &&
                        <ul>
                            {screenshots.map(({image}) => 
                            <li style={{width: 'auto'}}>
                                <Screenshot src={image} alt='fdff' />
                            </li>)}
                        </ul>}</>}
                
        </Page>
    )
}

const Page = styled.div`
    padding: 20px;
    margin-top: 61px;
    height: calc(100vh - 61px);
    background-size: cover;
    background-position: top;
    backdrop-filter: brightness(30%);
    overflow-y: scroll;
    align-items: center;
    display: flex;
    flex-direction: column;

    ${props => css`
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${props.background})
        `
    }}

    
`
const Meta = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const Title = styled.h1`
    color: white;
    font-weight: 700;
    font-size: 50px;
    margin-right: 20px;
`
const Year = styled.p`
    color: white;
    font-weight: 700;
    font-size: 50px;
    margin-right: 20px;
`
const Overview = styled.p`
    color: white;
    background-color: rgba(59, 57, 57, 0.357);
    width: 50vw;
    font-size: 20px;
    padding: 10px 20px;
    line-height: 35px;
    margin-bottom: 20px;
    border-radius: 20px;
`

const Screenshot = styled.img`
    height: 400px;
    width: auto;
`

const ToggleScreenshotsButton = styled.button`
    color: white;
    margin-bottom: 20px;
    font-size: 20px;
    cursor: pointer;
    background-color: #080D2B;
    padding: 8px 16px;
    border: none;
    font-family: 'Nunito', sans-serif
`