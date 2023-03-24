import ReactPaginate from "react-paginate"

import { MdOutlineDoubleArrow } from 'react-icons/md'
import styled from 'styled-components'

export const Pagination = ({totalPages, changePage, page}) => {
    return (
        <PaginationContainer>
            <ReactPaginate
                onClick={(e) => {
                    changePage(e.nextSelectedPage)
                }}
                nextClassName='next'
                previousClassName="prev"
                previousLabel={<MdOutlineDoubleArrow fill="white"/>}
                nextLabel={<MdOutlineDoubleArrow fill="white"/>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                pageClassName='page'
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

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        background-color: transparent;
    }

    & .page a{
    color: white;
}

    & .active{
        background-color: orange;

        & a {
            color: white;
        }
    }

    & .next a, & .prev a{
        display: block;
    }

    & .next:not(.disabled), & .prev:not(.disabled) {
        cursor: pointer;
    }

    & .next svg, & .prev svg {
        display: block;
        height: 30px;
        width: 30px;
    }

    & .prev svg {
        transform: rotate(-180deg);
    }
`