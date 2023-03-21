// import './GameCard.scss'
import styled, {css} from 'styled-components'

import { Link } from "react-router-dom"
import placeholderImage from 'assets/images/placeholder.png'

export const GameCard = ({ data, className }) => {

    const {name, released, genres, background_image, slug, rating } = data

    return (
        <Link to={`/catalog/${slug}`} aria-label={`Read more about ${name}`} className='readmore-btn'>
        <Card className={`${className}`}>
            {background_image ? <img loading='lazy' src={background_image} className='poster' alt={`${name} poster`} width={500}
                height='auto' /> : <img src={placeholderImage}   alt='No poster here' className='poster'/>}
                <div className='description'>
                    <Title>
                        {name}
                    </Title>
                    {released && <p className='release_year'>{released.slice(0, 4)}</p>}
                    {genres && <Genres className='genres'>
                        {genres.map((({id, name}) => <li className="genres_item" key={id}>{name}</li>))}
                    </Genres>}
                </div>
             <Rating className='rating'>{rating}</Rating>
        </Card>
    </Link>
    )
}

const Card = styled.div`
    ${({className}) => {
    switch (className) {
        case 'gamecard_catalog':
            return css`
                height: 500px;
                color: white;
                background-color: #00021A;
                overflow: hidden;
                position: relative;
                clip-path: polygon(11% 0, 70% 0%, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 67%, 0 11%);
                transform: scale(1);
                transition: 250ms transform ease;

                @media screen and (max-width: 767px) {
                    height: auto;
                }

                & .poster{
                    object-fit: cover;
                    height: 70%;
                    transition: 500ms all ease;
                    width: 100%;
                }

                &:hover{
                    transform: scale(1.05);
                }

                & .description {
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

               
            `
        case 'gamecard_slider':
            return css`
                height: 350px;
                overflow: hidden;
                position: relative;
                max-width: 500px;
                clip-path: polygon(11% 0, 70% 0%, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 70%, 0 11%);

                & .description {
                    position: absolute;
                    width: 50%;
                    right: 100%;
                    transition: 250ms right ease;
                    top: 0;
                    height: 100%;
                    background-color: #00021A;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 15px;
                    box-sizing: border-box;
                    padding: 0 10px;

                    

                    & h1, p{
                        color: white;
                    }

                    & ul{
                        flex-wrap: wrap;
                    }
                }

                & .rating, & .release_year {
                    display: none;
                }

                & .poster {
                        object-fit: cover;
                        transition: 500ms all ease;
                        width: 100%;
                        height: 100%;
                    }

                &:hover .poster {
                    height: 100%;
                    filter: blur(5px);
                }

                &:hover .description {
                    right: 50%;
                }
            `

        default: return css``
        }
    }}
`

const Genres = styled.div`
    display: flex;
    gap: 5px;
    color: #f0f0f0;
    font-size: 15;
    letter-spacing: 0.05em;
    list-style: none;
    flex-wrap: wrap;

    & li{
        padding: 0 5px 0 0;
    }

    & li:not(:last-child){
    border-right: 1px solid orange;
}
`

const Title = styled.p`
     color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 25px;
    letter-spacing: 0.05em;
    white-space: normal;
    word-break: break-word;
`

const Rating = styled.p`
        position: absolute;
        top: 0;
        right: 40px;
        color: white;
        background-color: #050B2B;
        padding: 10px 10px 5px 10px;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        align-items: center;
        transition: 400ms top ease;
`