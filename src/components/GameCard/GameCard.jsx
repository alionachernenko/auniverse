import { Link, useLocation } from "react-router-dom"
import { BiRightArrow } from 'react-icons/bi'
import './GameCard.scss'
import placeholderImage from '../../image/placeholder.png'

export const GameCard = ({ data, width, className }) => {
    const location = useLocation()

    const {name, released, genres, background_image, slug, rating} = data

    return (
        <div className={`${className}`}>
            {background_image ? <img src={background_image} className='poster'
                alt="" width={width}  /> : <img src={placeholderImage} alt='' className='poster'/>}
                <div className='description'>
                <p className='title'>
                    {name}
                </p>
                {released && <p className='release_year'>{released.slice(0, 4)}</p>}
                <ul className='genres'>
                    {genres.slice(0, 3).map((genre => {
                        return  <li>{genre.name}</li>
                    }))}
                </ul>
            </div>
            <Link to={`/auniverse/catalog/${slug}`} aria-label={`Read more about ${name}`}>
                <p>
                    Read more
                </p>
                <BiRightArrow color="green" title="Read more button right arrow"/>
            </Link>
            {location.pathname === '/catalog' && <p className='rating'>{rating}</p>}
        </div>
    )
}
