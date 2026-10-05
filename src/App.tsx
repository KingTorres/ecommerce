import './App.css'
import Home from './component/Home/Home'
import NotFound from './component/NotFound/NotFound'
import Cart from './component/Cart/Cart'
import Navigation from './component/Navigation/Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from './store'
function App() {
  const userToken = useSelector((state: RootState) => state.userProfile.accessToken)

  return (
    <>
    <BrowserRouter>
      <div className='w-dvw flex flex-col h-dvh'>
        <div className='flex flex-col h-[100%] w-[100%] body-wrapper'>
          {
            userToken &&
            <div className='h-fit'>
              <Navigation></Navigation>
            </div>
          }
          <div className='grow overflow-x-auto'>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/home' element={<Home/>}></Route>
              <Route path='/cart' element={<Cart/>}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
