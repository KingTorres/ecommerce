import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { addProductItem } from '../../features/cartSlice'
import { decreaseQuantity } from '../../features/cartSlice'
import { removeProductItem } from '../../features/cartSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const ItemCart = useSelector((state: RootState) => state.productCart.productItems)
    const totalPrice = ItemCart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0
    const totalItem = ItemCart?.reduce((acc, item) => acc + item.quantity, 0) || 0
    const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <div className='p-3 px-3 gap-2 h-full flex flex-col items-center justify-start w-[100%] relative'>
        <div className='pt-1 pb-15 flex flex-col gap-2'>
            {ItemCart.length > 0 && 
            <>
            {ItemCart?.map((item) => (
                <div className='py-2 px-2 xl:py-0 xl:px-1 bg-[#ffffff] drop-shadow-md rounded-xl flex gap-3 xl:gap-5 items-center overflow-hidden' key={item.id}>
                    <div className='w-[25%] max-w-[25%] min-w-[25%] xl:max-w-[20%] xl:min-w-[20%]'><img className='w-full aspect-square' src={item.thumbnail} alt={item.title} /></div>
                    <div className='py-3 gap-1 h-full min-w-[50%] flex flex-col items-start'>
                        <div className='text-black w-full text-nowrap overflow-hidden text-ellipsis text-left mt-2'>{item.title}</div>
                        <div className='text-[#ffb37c] font-semibold'>${item.price}</div>
                    </div>
                    <div className='w-[25%] flex items-center'>
                        <div className='w-full flex flex-col gap-2 items-center'>
                            <div className='text-black font-bold w-[70%]'><button className='w-full py-0 rounded-lg w-full' onClick={() => dispatch(addProductItem(item))}>+</button></div>
                            <div>x{item.quantity}</div>
                            <div className='text-black font-bold w-[70%]'><button className='rounded-lg w-full' onClick={() => dispatch(decreaseQuantity(item.id))}>-</button></div>
                        </div>
                    </div>
                    <button className='rounded-br-xl bg-[#8ac9ff] text-l font-bold text-[#ffffff] h-7 w-7 absolute top-0 left-0' onClick={() => dispatch(removeProductItem(item.id))}>X</button>
                </div>
            ))}
            </>}
            {ItemCart.length <= 0 &&                
                <>
                    <div className='text-4xl opacity-40 font-semibold my-5'>No Item</div>
                    <button className='text-xl text-[#ffffff] bg-[#ffb37c] py-2 px-6 rounded-lg' onClick={() => navigate('/')}>Go Back</button>
                </>
            }
        </div>
        <div className='bg-[#ffffff] w-full flex justify-between p-2 px-5 pb-4 absolute bottom-0 border border-grey-600 xl:rounded-tr-xl xl:rounded-tl-xl'>
            <div className='font-semibold'>ITEMS: <span className='text-[#ffb37c] font-bold'>{totalItem}</span></div>
            <div className='font-semibold'>TOTAL: <span className='text-[#ffb37c] font-bold'>${Number(totalPrice).toFixed(2)}</span></div>
        </div>
      
    </div>
  )
}

export default Cart
