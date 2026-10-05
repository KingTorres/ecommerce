import { useEffect, useState } from 'react'
import type { DataProp } from '../interfaces/Itemlist'

export function useFetchData() {
    const [data, setData] = useState<DataProp[] | null>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController
        const fetchData = async ()=> {
            try {
                const res = await fetch('https://dummyjson.com/products')
                if(!res.ok) {
                    throw new Error('Server Error')
                }
                const result = await res.json()
                setData(result.products)
            }
            catch(err) {
                if(err instanceof Error)
                {
                    setError(err.message)
                }
                else {
                    setError('An Error Occured')
                }
            }
            finally {
                if(!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }
        
        fetchData()
    },[])

    return {
        data,
        error,
        loading
    }
}