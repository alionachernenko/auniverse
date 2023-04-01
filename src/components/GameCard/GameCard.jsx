import { Link, useLocation } from "react-router-dom"
import placeholderImage from 'assets/images/placeholder.png'
import styled, {css} from 'styled-components'

export const GameCard = ({ data, className }) => {
    const location = useLocation()

    const { name, released, genres, background_image, slug, rating } = data

    return (
        <Link to={`/catalog/${slug}`} aria-label={`Read more about ${name}`} state={
            { from: `${location.pathname}${location.search}`
        }}>
        <Card className={`${className}`}>
            {background_image ? <Poster loading='lazy' src={background_image} alt={`${name} poster`} width={500}
                height='auto' /> : <Poster src={placeholderImage}   alt='No poster here'/>}
                <Description>
                    <Title>
                        {name}
                    </Title>
                    {released && <Year>{released.slice(0, 4)}</Year>}
                    {genres && <Genres>
                        {genres.map((({id, name}) => <Genre key={id}>{name}</Genre>))}
                    </Genres>}
                </Description>
             <Rating className='rating'>{rating}</Rating>
        </Card>
    </Link>
    )
}

const Poster = styled.img``

const Description = styled.div``

const Year = styled.p``

const Card = styled.div`
    ${({className}) => {
    switch (className) {
        case 'gamecard_catalog':
            return css`
                height: auto;
                position: relative;
                overflow: hidden;

                color: white;
                background-color: #00021A;
                
                clip-path: polygon(11% 0, 70% 0%, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 67%, 0 11%);
                transform: scale(1);
                transition: 250ms transform ease;

                &:hover{
                    transform: scale(1.05);
                }

                @media screen and (min-width: 768px) {
                    height: 500px;
                }

                & ${Poster}{
                    height: 70%;
                    width: 100%;

                    object-fit: cover;
                    transition: 500ms all ease;
                }

            
                & ${Description} {
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
            `
        case 'gamecard_slider':
            return css`
                max-width: 500px;
                height: 350px;
                position: relative;
                overflow: hidden;
                
                clip-path: polygon(11% 0, 70% 0%, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 70%, 0 11%);

                & ${Description} {
                    width: 50%;
                    height: 100%;
                    padding: 0 10px;
                    box-sizing: border-box;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 15px;

                    position: absolute;
                    top: 0;;
                    right: 100%;

                    background-color: #00021A;
                    
                    transition: 250ms right ease;

                    & ${Year}{
                        color: white;
                    }

                }

                & .rating, & ${Year} {
                    display: none;
                }

                & ${Poster} {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: 500ms all ease;
                        
                    }

                &:hover ${Poster} {
                    height: 100%;
                    filter: blur(5px);
                }

                &:hover ${Description} {
                    right: 50%;
                }
            `
        
        default: return css``
        }
    }}
`

const Genres = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    
    font-size: 15;
    letter-spacing: 0.05em;
    
    color: #f0f0f0;
`

const Genre = styled.li`
    padding: 0 5px 0 0;

    &:not(:last-child){
    border-right: 1px solid orange;
}
`

const Title = styled.p`
    color: white;

    font-size: 25px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    white-space: normal;
    word-break: break-word;
`

const Rating = styled.p`
    display: flex;
    align-items: center;
    padding: 10px 10px 5px 10px;

    position: absolute;
    top: 0;
    right: 40px;

    font-size: 20px;
    font-weight: 700;

    color: white;
    background-color: #050B2B;
    transition: 400ms top ease;
`