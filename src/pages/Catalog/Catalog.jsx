import { useEffect, useState } from "react"
import { getGameBySearchQuery } from "../../services/games-api"
import { Pagination } from "../../components/Pagination/Pagination"
import { SearchForm } from "../../components/SearchForm/SearchForm"
import { Loader } from "../../components/Loader/Loader"
import css from './Catalog.module.css'
import { GameList } from "../../components/GameList/GameList"

export const Catalog = ({onSubmit, searchParams}) => {
    const [games, setGames] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)

    const {ordering, value, genre} = searchParams
    
    useEffect(() => {
        setIsLoading(true)
        getGameBySearchQuery(value, page, ordering, genre).then(({data}) => {
                const { results, count } = data

                setGames(results)
                setTotalPages(count / 20)

                setIsLoading(false)
            }).catch(error => {
                console.log(error)

                setIsLoading(false)
            })
    }, [page, value, ordering, genre])

    const handlePageChange = (page) => {
        setPage(page + 1)

        window.scroll({
            top: 0,
        });
    }

    return (
        <div className={css.catalog} style={{marginTop: 61, backgroundColor: 'black', boxSizing: 'border-box',minHeight: 'calc(100vh - 61px)', position: "relative"}}>
            <SearchForm className={'catalog'} onSubmit={onSubmit} />
            {isLoading ? <Loader className={'loader-catalog'} color={'white'} /> :
                (games.length !== 0 ? <><GameList games={games} />
                        <Pagination totalPages={totalPages <= 500 ? totalPages : 500} changePage={handlePageChange} page={page} />
                    </> : <h1 style={{color: 'white'}}>No matches</h1>)}
        </div>
    )
}
