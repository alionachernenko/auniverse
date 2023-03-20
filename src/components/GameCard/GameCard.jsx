import './GameCard.scss'
import { BiRightArrow } from 'react-icons/bi'

import { Link } from "react-router-dom"
import placeholderImage from 'assets/images/placeholder.png'

export const GameCard = ({ data, className }) => {

    const {name, released, genres, background_image, slug, rating } = data

    return (
        <Link to={`/catalog/${slug}`} aria-label={`Read more about ${name}`} className='readmore-btn'>
        <div className={`${className}`}>
            {background_image ? <img loading='lazy' src={background_image} className='poster'
                alt='No poster here' width='500' height='auto' /> : <img src={placeholderImage} alt={`${name} poster`} className='poster'/>}
                <div className='description'>
                    <p className='title'>
                        {name}
                    </p>
                    {released && <p className='release_year'>{released.slice(0, 4)}</p>}
                    {genres && <ul className='genres'>
                        {genres.map((genre => <li className="genres_item" key={genre.id}>{genre.name}</li>))}
                    </ul>}
                </div>
                <div className='readmore-btn'>
                    <p>Read more</p>
                    <BiRightArrow color="green" title="Read more button right arrow"/>
                </div>
             <p className='rating'>{rating}</p>
        </div>
    </Link>
    )
}