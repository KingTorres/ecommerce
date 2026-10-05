import { useMemo, useState } from 'react'
import type { ItemProp } from '../../interfaces/Itemlist'
import { useFetchData } from '../../utils/ProductData'
import { addProductItem } from '../../features/cartSlice'
import { useDispatch } from 'react-redux'

const ItemList = () => {
    const {data, error, loading} = useFetchData()
    const [category, setCategory] = useState('')
    const [query, setQuery] = useState('')
    const [previewItem, setPreviewItem] = useState<ItemProp | null>()
    const [showPreview, setShowPreview] = useState(false)
    const dispatch = useDispatch()

    const allItems = useMemo(() => {
        if (!data) return [];
        if (category && category !== '') {
            return data.filter(a => String(a.category) === category);
        }
        if (query) {
            return data.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));
        }
        return data;
    },[data, category, query])
    const handleCategoryChange = (e: string) => {
        setCategory(e)
        setQuery('')
    }
    const handleQueryChange = (e: string) => {
        setCategory('')
        setQuery(e)
    }

    const CategoryButton = ['beauty','fragrances','furniture','groceries']
    
    const itemClick = (item:number) => {
        const seletedItem = data?.find((d) => d.id === item)
        if(seletedItem) {
            setPreviewItem({
                id: seletedItem?.id,
                title: seletedItem?.title,
                price: seletedItem?.price,
                thumbnail: seletedItem?.thumbnail
            })
            setShowPreview(true)
        }
    }

    const AddItem = () => {
        if(previewItem) {
            dispatch(addProductItem(previewItem))
            setShowPreview(false)
        }
    }
  return (
    <>
    {error ? <div>{error}</div>: loading ?
        <div className='flex flex-col items-center align-center w-full'>
            <div className='drop-shadow-lg w-[100%] bg-[#ffffff] xl:rounded-br-xl xl:rounded-xl xl:mt-3 xl:top-3 min-h-25 xl:min-h-12'>
            </div>
            <div className='bg-[#e7e7e7] px-[2.5vw] py-[2vh] grid gap-2 gap-y-2.5 grid-cols-2 md:grid-cols-4 w-full'>
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className='overflow-hidden pb-3 rounded-lg bg-[#ffffff] w-[full] h-65'></div>
                ))}
            </div>
        </div> :
        <>
        <div className='flex flex-col items-center align-center'>
            <div className='drop-shadow-lg w-[100%] sticky top-0 flex flex-col items-center md:flex-row bg-[#ffffff] xl:rounded-br-xl xl:rounded-xl xl:mt-3 xl:top-3'>
                <div className='w-[100%] mt-2 md:mt-0 py-2 px-2 md:w-[40%]'>
                    <input className='border border-[#ffb37c] rounded-xl py-0.5 px-3 pr-5 w-full' type="text" placeholder='Find Item' value={query} onChange={(e) => handleQueryChange(e.target.value)}/>
                </div>
                <div className='text-sm w-[100%] py-2 px-2 flex gap-2 justify-between overflow-y-auto min-h-12  md:w-[60%]'>
                    <button className={`${category === '' ? 'active' : '' } flex justify-center pt-1.5 px-3.5`} onClick={() => handleCategoryChange('')}>All</button>
                    {
                        CategoryButton?.map((item) => (
                            <button className={`${category === item ? 'active' : '' } capitalize flex justify-center w-[100%] pt-1.5 px-3.5`} onClick={() => handleCategoryChange(item)} key={item}>
                                {item}
                            </button>
                        ))
                    }
                </div>    
            </div>
            
            
            <div className='bg-[#e7e7e7] px-[2.5vw] py-[2vh] grid gap-2 gap-y-2.5 grid-cols-2 md:grid-cols-4'>
                {allItems && allItems.map((item) => (
                    <div className='overflow-hidden pb-3 rounded-lg bg-[#ffffff]' key={item.id} onClick={() => itemClick(item.id)}>
                        <div className='bg-[#ffffff] aspect-square w-[100%]'><img src={item.thumbnail} alt={item.title} /></div>
                        <div className='text-sm flex flex-col justify-center min-h-[3em] max-h-[3.5rem] line-clamp-2'>{item.title}</div>
                        <div className='text-[#000000] font-semibold'>${item.price}</div>
                    </div>
                ))}
            </div>
        </div>
        {
            showPreview &&
            <div className='flex items-center align-center justify-center fixed top-0 z-1 backdrop-blur-md bg-[#dbdbdb00] h-full w-full'>
                <div className='max-w-70 bg-[#f9f9f9] flex justify-center items-center py-2 px-4 rounded-xl flex flex-col w-fit drop-shadow-lg'>
                    <div className='aspect-square w-50'>
                        <img className='w-[100%] aspect-square' src={previewItem?.thumbnail} alt="previewItem?.previewTitle" />
                    </div>
                    <div className='w-60'>{previewItem?.title}</div>
                    <div className='text-[#000000] font-bold'>${previewItem?.price}</div>
                    <div className='w-full text-white my-3 flex flex-col gap-2'>
                        <button className='py-1 rounded-lg bg-[#56bf56] w-full' onClick={() => AddItem()}>Add to Cart</button>
                        <button className='py-1 rounded-lg bg-[#ffb37c] w-full' onClick={() => setShowPreview(false)}>Cancel</button>
                    </div>
                </div> 
            </div>
        }
        </>
    }
    </>
  )
}

export default ItemList