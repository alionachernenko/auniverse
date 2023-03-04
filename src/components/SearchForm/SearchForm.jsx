import css from './SearchForm.module.css'
import { useEffect, useState } from 'react'
import { getGameByName } from 'services/games-api'
import { Link } from 'react-router-dom'

export const SearchForm = ({ onSubmit, className }) => {
    const [value, setValue] = useState('')
    const [filteredGames, setFilteredGames] = useState()

    useEffect(() => {
        getGameByName(value).then(res => {
                    setFilteredGames(res.data.results)
                })
     },
    [value])

    return (
        <form className={css[className]} onSubmit={(e) => {
            const { query, ordering, genre } = e.target.elements
            onSubmit(e, query.value, ordering.value, genre.value)
        }   
        }>
            <input value={value} type="text" name='query' onChange={(e) => {
                setValue(e.target.value)
                
            }
            } />
            <button className={css.button} type="submit">GO</button>
            <div>
                <div>
            <label htmlFor='order_select'>Order by:</label>
            <select name="ordering" id="order_select">
                <option value="added">Added</option>
                <option value="released">Released</option>
                <option value="name">Name</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
                <option value="rating">Rating</option>
                <option value="metacritic">Metacritic</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='genre_select'>Genre:</label>
                    <select name="genre" id="genre_select">
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="indie">Indie</option>
                        <option value="rpg">RPG</option>
                        <option value="strategy">Strategy</option>
                        <option value="shooter">Shooter</option>
                        <option value="platformer">Platformer</option>
                    </select>
                </div>
            </div>
            {(filteredGames && value !== '') &&
            <ul>
                {filteredGames.map(game => <li key={game.id}>
                        <img src={`${game.background_image}`} alt="" />
                    <Link to={`/auniverse/catalog/${game.slug}`}>
                        {game.name}
                    </Link></li>)}
        </ul>
                }
        </form>
    )
}

    
