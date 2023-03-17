import { Link, useLocation } from "react-router-dom"
import { BiRightArrow } from 'react-icons/bi'
import './GameCard.scss'
import placeholderImage from 'assets/images/placeholder.png'
// import styled from "styled-components"

export const GameCard = ({ data, width, className }) => {
    const location = useLocation()
    const {name, released, genres, background_image, slug, rating } = data
    console.log(rating)
    console.log(data)

    return (
        <Link to={`/catalog/${slug}`} aria-label={`Read more about ${name}`} className='readmore-btn'>
        <div className={`${className}`}>
            {background_image ? <img loading='lazy' src={background_image} className='poster'
                alt="" width='500' height='auto' /> : <img src={placeholderImage} alt='' className='poster'/>}
                <div className='description'>
                <p className='title'>
                    {name}
                </p>
                {released && <p className='release_year'>{released.slice(0, 4)}</p>}
                {genres && <ul className='genres'>
                    {genres.map((genre => {
                        return  <li className="genres_item" key={genre.id}>{genre.name}</li>
                    }))}
                </ul>}
            </div>
            <div className="desc">
                {name && <h1>{name}</h1>}
                {released && <p>{released.slice(0, 4)}</p>}
                {genres && <ul className='genres'>
                    {genres.map((genre => {
                        return  <li className="genres_item" key={genre.id}>{genre.name}</li>
                    }))}
                </ul>}
            </div>
            <div className='readmore-btn'>
                <p>Read more</p>
                <BiRightArrow color="green" title="Read more button right arrow"/>
            </div>
            
            {location.pathname === '/catalog' && <p className='rating'>{rating}</p>}
        </div>
        </Link>
    )
}