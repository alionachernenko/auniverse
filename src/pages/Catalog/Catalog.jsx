import { useEffect, useState } from "react"
import { fetchGameBySearchQuery } from "utils"
import { Pagination, SearchForm, Loader, GameList, ErrorComponent } from 'components'
import styled from "styled-components"



const Catalog = ({onSubmit, searchParams}) => {
    const [games, setGames] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [isError, setIsError] = useState(false)

    const { ordering, value, genre } = searchParams

    useEffect(() => {
        setIsLoading(true)

        fetchGameBySearchQuery(value, page, ordering, genre).then(({data}) => {
                const { results, count } = data

                setGames(results.filter(game => game.slug !== 'atomic-heart'))
                setTotalPages(count / 20)

                setIsLoading(false)
            }).catch(error => {
                console.log(error)
                setIsError(true)
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
        <Page>
            {isError ? <ErrorComponent/> :
            <>
                <SearchForm className={'catalog'} onSubmit={onSubmit} setPage={setPage} />
                    {isLoading ? <Loader className={'loader-catalog'} color={'white'} /> :
                        (games.length !== 0 ?
                            <>
                                <GameList games={games} />
                                <Pagination totalPages={totalPages <= 500 ? totalPages : 500} changePage={handlePageChange} page={page} />
                            </> :
                            <h1 style={{ color: 'white' }}>No matches</h1>
                        )
                    }
                </>
            }
        </Page>
    )
}


const Page = styled.div`
    padding: 10px 0 40px 0;
    box-sizing: border-box;
    min-height: calc(100vh - 61px);
    position: relative;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;

    @media screen and (min-width: 1200px){
        padding: 40px 0;
    }
`

export default Catalog