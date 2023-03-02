
import { useEffect, useState } from "react"
import { getGames } from "../../services/games-api"
import { getGameBySearchQuery } from "../../services/games-api"
import { Pagination } from "../../components/Pagination/Pagination"
import { SearchForm } from "../../components/SearchForm/SearchForm"
import { Loader } from "../../components/Loader/Loader"
import css from './Catalog.module.css'
import { GameList } from "../../components/GameList/GameList"

export const Catalog = ({onSubmit, page, query, setPage, setQuery}) => {
    const [games, setGames] = useState([])
    const [totalPages, setTotalPages] = useState(5)
    const [isLoading, setIsLoading] = useState(true)

    window.scroll({
    top: 0,
    });

    useEffect(() => {
        if (query === '') {
            setIsLoading(true)
            getGames(page).then(res => {
                setTotalPages(res.data.count / 20)
                setGames(res.data.results)
                setIsLoading(false)
            }).catch(error => {
                console.log(error)
                setIsLoading(false)
            })
    }
        else {
            setIsLoading(true)
            getGameBySearchQuery(query, page).then(res => {
                setGames(res.data.results)
                setTotalPages(res.data.count / 20)
                setIsLoading(false)
            }).catch(error => {
                console.log(error)
                setIsLoading(false)
            })
        }
    }, [page, query])

    const handlePageChange = (page) => {
        setPage(page + 1)
            window.scroll({
            top: 0,
        });
    }

   

    return (
        <div className={css.catalog} style={{marginTop: 61, backgroundColor: 'black', minHeight: '100vh'}}>
            <SearchForm className={'searchform_catalog'} onSubmit={onSubmit} render={'catalog'} />
            {isLoading ? <Loader page={'catalog'} /> :
                <><GameList games={games} />
                    <Pagination totalPages={totalPages} changePage={handlePageChange} page={page} />
                </>}
            
        </div>
    )
}
