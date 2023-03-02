import ReactPaginate from "react-paginate"
import './Pagination.scss'
import {MdOutlineDoubleArrow} from 'react-icons/md'

export const Pagination = ({totalPages, changePage, page}) => {
    return (
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
    )
}