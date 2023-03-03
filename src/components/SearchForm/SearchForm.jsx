// import { Filter } from "./Filter"
// import { useState, useEffect } from "react"
// import { getDataForFilter } from "../api/games-api"
import css from './SearchForm.module.css'

export const SearchForm = ({ onSubmit, render, className }) => {
    console.log(className)
    return (
        <form className={css[className]} onSubmit={(e) => {
            const { query, ordering, genre } = e.target.elements
            onSubmit(e, query.value, ordering.value, genre.value)
        }   
        }>
            <input type="text" name='query' />
            <button className={css.button} type="submit">GO</button>
            <div>
                <div>
            <label for='order_select'>Order by:</label>
            <select name="ordering" id="order_select">
                <option value="name">Name</option>
                <option value="released">Released</option>
                <option value="added">Added</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
                <option value="rating">Rating</option>
                <option value="metacritic">Metacritic</option>
                    </select>
                </div>
                <div>
                    <label for='genre_select'>Genre:</label>
                    <select name="genre" id="">
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
        </form>
    )
}

    
