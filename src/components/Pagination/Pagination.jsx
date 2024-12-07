import ReactPaginate from "react-paginate"

import { MdOutlineDoubleArrow } from 'react-icons/md'
import styled from 'styled-components'

export const Pagination = ({ totalPages, changePage, page }) => {

    return (
        <PaginationContainer>
            <ReactPaginate
                onPageChange={
                    (e) => {
                    
                    changePage(e.selected)
                    }
                }
                nextClassName='next'
                previousClassName="prev"
                previousLabel={<MdOutlineDoubleArrow fill="white"/>}
                nextLabel={<MdOutlineDoubleArrow fill="white"/>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                pageClassName='page'
                disabledClassName="disabled"
                containerClassName='container'
                activeClassName='active'
                forcePage={page - 1}
                pageCount={Math.ceil(totalPages)}
                />
        </PaginationContainer>
    )
}

const PaginationContainer = styled.div`
    & .container {
        width: 100%;
        margin-top: auto;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;

        background-color: transparent;
    }

    & .page {
        width: auto;
        min-width: 30px;
        box-sizing: border-box;
        height: 30px;
        padding: 2px;
        border-radius: 15px;
        border: 1px solid transparent;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        background-color: transparent;
        transition: 180ms all ease;

         &:hover {
                border: 1px solid orange
            }

    }

    & .page a{
        color: white;
    }

    
        & .break a{
            transition: 180ms all ease;
            color: white;

            &:hover {
                color: orange;
            }
        }

    & .active{
        background-color: orange;

        & a {
            color: white;

            
        }
    }

    & .disabled a{
        cursor: not-allowed;

        & svg{
            fill: grey;
        }
    }

    & .next a, & .prev a{
        display: block;
    }

    & .next svg, & .prev svg {
        display: block;
        height: 30px;
        width: 30px;
        transition: 180ms all ease;
        
        &:not(.disabled svg):hover {
            filter: drop-shadow(2px 0px orange)
        }
    }

    & .prev svg {
        transform: rotate(-180deg);
    }
`