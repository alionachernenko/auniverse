import { useContext, useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { getGameById, getScreenshots} from "../../services/games-api"
import { StoresList } from "components/StoresList/StoresList";
import { Loader } from "../../components/Loader/Loader";
import {authContext} from '../../context/context'
import styled from "styled-components";
import { BookmarkButton } from "components/BookmarkButton/BookmarkButton";
import { Container } from "components/Container/Container";

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
            <Container>
            {isLoading ? <Loader color={'white'} /> :
            <>
            <div style={{display: 'flex'}}>
                <Info>
                    <div>
                        <Meta>

                            <Title>{title}</Title>
                            {year && <Year>{year}</Year>}
                            {isLoggedIn &&
                                <BookmarkButton gameData={gameData}/>
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
                                <ScreenshotWrapper>
                                    <Screenshot src={image} alt='fdff' loading="lazy"/>
                                </ScreenshotWrapper>)}
                            </Screenshots>}</>
                        }
                </Container>
            </Page>
            
    )
}

const Page = styled.div`
    padding: 30px;

    height: calc(100vh - 61px);
    background-size: cover;
    background-position: top;
    overflow-y: scroll;
    // align-items: center;
    display: flex;
    flex-direction: column;
    background-color: #00021A;  
    
    @media screen and (min-width: 768px) {
        padding: 60px;
    }
`

const Info = styled.div`
    display: flex;
    gap: 40px;
    height: auto;
    box-sizing: border-box;
    margin-bottom: 60px;
    width: 100%;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        margin-bottom: 30px;
    }

    @media screen and (min-width: 1200px) {
        width: 1130px;
    }
`

const Meta = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    gap: 10px;


    @media screen and (min-width: 1200px) {
        flex-direction: row;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;

    }
`
const Title = styled.h1`
    color: white;
    font-weight: 700;
    text-align: left;
    font-size: 35px;
    border-bottom: 1px solid orange;
    padding: 10px 0;
    
    @media screen and (min-width: 1200px) {
        border-bottom: 0;
        padding: 0;
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
    @media screen and (min-width: 768px) and (max-width: 1199px) {
        margin-right: 0;
    }

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
    flex-wrap: wrap;
    backdrop-filter: blur(10px);
    width: 100%;
    `

const Screenshot = styled.img`
    object-fit: cover;
    height: 100%;
    width: 100%;
`

const ScreenshotWrapper = styled.li`
    clip-path: polygon(5% 0, 100% 0, 100% 10%, 100% 91%, 95% 100%, 0 100%, 0 71%, 0 10%);
    transition: 250ms all ease;
    cursor: zoom-in;
    &:hover {
        transform: scale(0.9);
        clip-path:none
    }

    width: 100%;

    @media screen and (min-width: 768px) {
        width: calc((100% - 10px)/2);
    }

    @media screen and (min-width: 1200px) {
        width: calc((100% - 20px)/3);
    }

    @media screen and (min-width: 1440px) {
        width: calc((100% - 30px)/4);
    }
`

export default GameDescription