import { useContext, useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { getGameById, getScreenshots} from "../../services/games-api"
import { StoresList } from "components/StoresList/StoresList";
import { Loader } from "../../components/Loader/Loader";
import {authContext} from '../../context/context'

import { BookmarkButton } from "components/BookmarkButton/BookmarkButton";
import { Container } from "components/Container/Container";
import { getComments } from "utils/firebase";
import { Comments } from "components/Comments/Comments";
import { ErrorComponent } from "components/ErrorComponent/ErrorComponent";

import styled from "styled-components";

const formatComments = (comments) => {
    return Object.entries(comments).map(el => {
        return {[el[0]] : el[1]}
    })
}

const GameDescription = () => {
    const {isLoggedIn} = useContext(authContext)

    const [title, setTitle] = useState('')
    const [screenshots, setScreenshots] = useState([])
    const [description, setDescription] = useState()
    const [stores, setStores] = useState()
    const [year, setYear] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [gameData, setGameData] = useState({})
    const [comments, setComments] = useState([])
    const [isError, setIsError] = useState(false)
    const [showOverview, setShowOverview] = useState(false)
    const { gameSlug } = useParams()

    const toggleShowDescription = () => {
        setShowOverview(prev => !prev)
    }


    window.scroll({
        top: 0,
    });

    useEffect(() => {
        Promise.all([getGameById(gameSlug), getScreenshots(gameSlug), getComments(gameSlug)]).then(res => {
            const [game, screenshots, comments] = res
            const {data} = game
            const {name, description_raw, stores, released} = data
            const { results } = screenshots.data

            console.log(data)
            setGameData(data)
            setTitle(name)
            setDescription(description_raw)
            setStores(stores)
            setYear(released.slice(0, 4))
            setScreenshots(results)

            if(comments.val()) setComments(formatComments(comments.val()))

            setIsLoading(false)
        }).catch(error => {
                console.log(error)
                setIsError(true)
                setIsLoading(false)
            })
    }, [description, gameSlug])

    return (
        <Page>
            <Container>
            {isLoading ? <Loader color={'white'} /> : isError ? <ErrorComponent/> :
            <>
                <div style={{display: 'flex'}}>
                    <Info>
                        <div>
                            <Meta>
                                <Title>{title}</Title>
                                { year && <Year>{year}</Year> }
                                { isLoggedIn && <BookmarkButton gameData={gameData}/> }
                            </Meta>
                                    {description && <Overview className={showOverview ? 'more' : 'less'}>{description}</Overview>}
                                    {description && description.length > 673 && <ToggleShowButton onClick={toggleShowDescription}>Show {showOverview ? 'less' : 'more'}</ToggleShowButton>}
                        </div>
                                {stores && <StoresList stores={stores} data={gameData}/>}
                    </Info>
                 </div>
                    {screenshots &&
                        <Screenshots>
                            {screenshots.map(({image, id}) => 
                                <ScreenshotWrapper key={id}>
                                    <Screenshot src={image} alt='fdff' loading="lazy"/>
                                </ScreenshotWrapper>)}
                        </Screenshots>}
                    <Comments setComments={setComments} gameSlug={gameSlug} comments={comments} />
            </>
            }
            </Container>
        </Page> 
    )
}

const Page = styled.div`
    padding: 30px;

    min-height: calc(100vh - 61px);
    background-size: cover;
    background-position: top;
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
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;


    @media screen and (min-width: 1200px) {
        margin-bottom: 20px;
        flex-direction: row;
        align-items: center;
        gap: 20px;
    }
`
const Title = styled.h1`
    padding: 10px 0;
    border-bottom: 1px solid orange;

    font-size: 35px;
    font-weight: 700;
    text-align: left;
    color: white;
    
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
    overflow: hidden;
    transition: 250ms all ease;
    margin-bottom: 20px;
    text-overflow: ellipsis;

    &.less{
        height: 205px;
    }

    &.more{
        height: auto
    }
`

const Screenshots = styled.ul`
    width: 100%;
    height: auto;
    margin-bottom: 60px;

    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    backdrop-filter: blur(10px);
`

const Screenshot = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`

const ScreenshotWrapper = styled.li`
    width: 100%;
    transition: 250ms all ease;
    cursor: zoom-in;

    clip-path: polygon(5% 0, 100% 0, 100% 10%, 100% 91%, 95% 100%, 0 100%, 0 71%, 0 10%);

    &:hover {
        transform: scale(1.2);
        clip-path:none;
        z-index: 1111
    }

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
const ToggleShowButton = styled.button`
    background-color: transparent;
    font-family: 'Nunito', sans-serif;
    color: white;
    font-size: 17px;
    padding: 5px 10px;
    border: 1px solid orange;
    border-radius: 10px
`
export default GameDescription