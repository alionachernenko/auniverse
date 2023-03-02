// import { Filter } from "./Filter"
// import { useState, useEffect } from "react"
// import { getDataForFilter } from "../api/games-api"
import css from './SearchForm.module.css'

export const SearchForm = ({ onSubmit, render, className }) => {
    console.log(className)
    return (
        <form className={css[className]} onSubmit={(e) => {
            console.log(e.target.elements.query.value)
            onSubmit(e, e.target.elements.query.value)
        }
            
        }>
                <input type="text" name='query' />
                <button className={css.button} type="submit">GO</button>
        </form>
    )
}

    
