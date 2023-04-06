import { useEffect, useState } from "react"
import { fetchGameBySearchQuery, fetchNewGames } from "utils"
import { Pagination, SearchForm, Loader, GameList, ErrorComponent } from 'components'
import styled from "styled-components"
import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

const Catalog = () => {
    const [games, setGames] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [params, setParams] = useSearchParams()

    const searchParams = useMemo(
        () => Object.fromEntries([...params]),
        [params]
    );

    const { ordering = null, query = null, genre = null, page = 1} = searchParams

    useEffect(() => {
        setIsLoading(true)
        if (query || ordering || genre) {
            fetchGameBySearchQuery(query, page, ordering, genre).then(({data}) => {
                const { results, count } = data

                setGames(results)
                setTotalPages(count / 25)

                setIsLoading(false)
            }).catch(error => {
                console.log(error)
                setIsError(true)
                setIsLoading(false)
            })
        }
        else { //temporarily solution
            fetchNewGames(page, 25).then(({ data }) => {
                const { results, count } = data
                
                setGames(results.filter(game => game.slug !== 'atomic-heart'))
                setTotalPages(count / 25)
                setIsLoading(false)
            }).catch(error => {
                console.log(error)
                setIsError(true)
                setIsLoading(false)
            })
        }
        
    }, [query, ordering, genre, page, setParams, searchParams])

    const handlePageChange = (page) => {
        setParams({...searchParams, page: (page + 1)})
        
        setIsLoading(true)

        window.scroll({
            top: 0,
        });
    }
    return (
        <Page>
            {isError ? <ErrorComponent/> :
            <>
                    <SearchForm className={'catalog'} />
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