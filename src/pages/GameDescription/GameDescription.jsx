import { useContext, useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { getGameById, getScreenshots} from "../../services/games-api"
import { StoresList } from "components/StoresList/StoresList";
import { Loader } from "../../components/Loader/Loader";
import authContext from '../../context/context'
import styled from "styled-components";
import { ToggleFavouriteButton } from "components/ToggleFavouriteButton/ToggleFavouriteButton";

const GameDescription = () => {
    const {isLoggedIn} = useContext(authContext)

    const [title, setTitle] = useState('')
    const [poster, setPoster] = useState()
    const [screenshots, setScreenshots] = useState([])
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
        Promise.all([getGameById(gameSlug), getScreenshots(gameSlug)]).then(res => {
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

    return (
        <Page background={poster}>
            {isLoading ? <Loader color={'white'} /> :
            <>
            <div style={{display: 'flex'}}>
                <Info>
                    <div >
                        <Meta>

                            <Title>{title}</Title>
                            {year && <Year>{year}</Year>}
                            {isLoggedIn &&
                                <ToggleFavouriteButton gameData={gameData}/>
                            }
                        </Meta>
                
                    {description && <Overview>{description}</Overview>}
                    </div>
                    {stores && <StoresList stores={stores}/>}
                        </Info>
                        </div >
                        {screenshots &&
                            <Screenshots>
                                {screenshots.map(({image}) => 
                                <li>
                                    <Screenshot src={image} alt='fdff' loading="lazy"/>
                                </li>)}
                            </Screenshots>}</>
                        }
                
        </Page>
    )
}

const Page = styled.div`
    padding: 20px;

    height: calc(100vh - 61px);
    background-size: cover;
    background-position: top;
    overflow-y: scroll;
    // align-items: center;
    display: flex;
    flex-direction: column;
    background-color: #00021A;    
`

const Info = styled.div`
    overflow-y: scroll;
    display: flex;
    gap: 40px;
    clip-path: polygon(3% 0, 100% 0, 100% 10%, 100% 92%, 97% 100%, 0 100%, 0 71%, 0 9%);
    background-color: transparent;
    backdrop-filter: blur(10px);
    // clip-path: polygon(11% 0, 70% 0%, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 70%, 0 11%);
    height: auto;
    // background-color: #080D2B;
    padding: 40px;
    box-sizing: border-box;
    margin-bottom: 20px;
    width: 60vw
`

const Meta = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
        gap: 20px;
    }
`
const Title = styled.h1`
    color: white;
    font-weight: 700;
    text-align: center;
    font-size: 35px;

    
    @media screen and (min-width: 1200px) {
        font-size: 50px;
        border-right: 1px solid orange;
        padding-right: 20px
    }
`
const Year = styled.p`
    color: white;
    font-weight: 700;
    text-align: center;
    font-size: 30px;
    margin-right: auto;

    @media screen and (min-width: 1200px) {
        font-size: 50px;
    }
`
const Overview = styled.p`
    color: white;
    max-width: 80vw;
    font-size: 20px;
    line-height: 35px;
    max-height: 200px;
    overflow-y: scroll
`

const Screenshots = styled.ul`
    display: flex;
    height: auto;
    gap: 10px;
    padding: 40px;
    flex-wrap: wrap;
    backdrop-filter: blur(10px);
    width: 90vw
`

const Screenshot = styled.img`
    height: 200px;
    width: calc((90vw - 40px)/5);
    max-width: 1000px;
    clip-path: polygon(5% 0, 100% 0, 100% 10%, 100% 91%, 95% 100%, 0 100%, 0 71%, 0 10%);
    object-fit: cover;
    transition: 250ms all ease;
    cursor: zoom-in;

    &:hover {
        transform: scale(0.9);
        clip-path:none
    }
`

export default GameDescription