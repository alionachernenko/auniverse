
import { useContext, useEffect, useState } from "react"
import { getUsers } from "utils/firebase"
import { Loader } from 'components/Loader/Loader'
import authContext from '../../context/context'

import { UserCard } from "components/UserCard/UserCard"
import styled from "styled-components"
const Users = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {userId} = useContext(authContext)


    useEffect(() => {

        getUsers().then(res => {
            setUsers(Object.keys(res.val()))
            setIsLoading(false)
        })
    }, [])

    return(
        <Page>
            {isLoading ? <Loader className={'loader-profile'} color={'darkblue'} /> : 
            <UsersList>
                {users.map(user => 
                // eslint-disable-next-line array-callback-return
                {if(user === userId) return
                return <li><UserCard id={user}/></li>}
                )}
            </UsersList>}
        </Page>
    )
}

const Page = styled.div`
padding: 20px;
box-sizing: border-box;
min-height: calc(100vh - 61px);
width: 100%; 
`

const UsersList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export default Users