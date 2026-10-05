import ItemList from '../Product/ItemList'
import Login from '../Login/Login'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
const Home = () => {
  const userToken = useSelector((state: RootState) => state.userProfile.accessToken)
  return (
    <>
    {!userToken ? <Login></Login> :
      <ItemList></ItemList>
    }
    </>
  )
}

export default Home
