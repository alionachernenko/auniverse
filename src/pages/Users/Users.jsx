import { useContext, useEffect, useState } from 'react'
import { getUsers } from 'utils/firebase'
import { Loader } from 'components/Loader/Loader'
import authContext from '../../context/context'

import { UserCard } from 'components/UserCard/UserCard'
import styled from 'styled-components'
import { Container } from 'components/Container/Container'

const Users = () => {
    const [userIDs, setUserIDs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {userId} = useContext(authContext)


    useEffect(() => {
        getUsers().then(res => {
            const IDs = res.val()

            setUserIDs(Object.keys(IDs).filter(ID => ID !== userId))
            setIsLoading(false)
        })
    }, [userId])

    return(
        <Page>
            <Container>
            {isLoading ? <Loader className={'loader-profile'} color={'darkblue'} /> : 
            <UsersList>
                {userIDs.map(userID => <UserCard id={userID}/>)}
                    </UsersList>}
                </Container>
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