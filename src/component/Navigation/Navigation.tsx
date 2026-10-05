import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import CartImage from "../../assets/img/cart.png"

const Navigation = () => {
  const ItemCart = useSelector((state: RootState) => state.productCart.productItems)
  const totalItem = ItemCart?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const navigate = useNavigate()
  return (
    <div className='drop-shadow-sm sticky top-0 z-2 py-1 px-4 bg-[#ffffff] flex justify-between items-center h-fit xl:pb-2 xl:rounded-br-lg xl:rounded-bl-lg'>
      <div className='cursor-default rounded-lg px-2 text-white bg-[#ffb37c]' onClick={() => navigate('/')}>
        Products
      </div>
      <div className='flex gap-1 items-center'>
        <div className='flex font-semibold text-[#ffb37c] px-2 py-0.5 cursor-default'>
          <div>$</div>
          <div>1000</div>
        </div>
        <button className='relative' onClick={() => navigate('/cart')}>
          <img className='w-6' src={CartImage} alt="cart" />
          {totalItem > 0 &&
            <div className='top-[-0.5em] right-[-0.8em] flex items-center justify-center rounded-2xl text-[0.6em] absolute bg-red-600 text-white h-4.5 w-4.5'>{totalItem > 99 ? '99' : String(totalItem)}</div>
          }
        </button>
      </div>
    </div>
  )
}

export default Navigation