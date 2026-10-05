import { useState, type SyntheticEvent } from "react"
import { setCredentials } from "../features/userSlice"
import { useDispatch } from "react-redux"
interface UserProp {
    firstName: string,
    accessToken?: string
}
export function useLoginSubmit() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState('')
    const [loading, setLoading]= useState(false)
    const [user, setUser] = useState<UserProp | ''>()
    const dispatch = useDispatch()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Login Failed')
            }
            localStorage.setItem('accessToken', data.accessToken)
            setUser(data)
            dispatch(setCredentials({userProfile: data, accessToken: data.accessToken}))
        } catch(err) {
            if(err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unexpected error occured')
            }
        } finally {
            setLoading(false)
        }
    }
    return {
        username,setUsername,
        password,setPassword,
        error,setError,
        loading,
        user,
        handleSubmit
    }
}