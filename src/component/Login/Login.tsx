import { useLoginSubmit } from '../../utils/LoginData'
import loginBG from "../../assets/img/loginBG.jpg"
const Login = () => { 
    const {
        setUsername,
        setPassword,
        error,
        loading,
        handleSubmit
    }  = useLoginSubmit()
  return (
    <>
    <div className='flex flex-col items-center justify-center h-full'>
        <div className='backdrop-blur-sm rounded-3xl bg-[#ffffff24] p-2 border-5 border-[#ffb37c] z-1'>
            <div className='w-[20em] rounded-2xl flex flex-col p-5 border-3 border-[#8ac9ff] bg-[#ffffff]'>
                <div>Please Login</div>
                <form className='flex flex-col gap-3 p-5 px-2 pb-0' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2'>
                        <div>User:</div>
                        <input className='w-[100%] text-[#84ccff] placeholder-gray-300 font-bold bg-[#dff7ff] rounded-lg py-1 px-2' type="text" name='username' placeholder='try emilys' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <div>Pass:</div>
                        <input className='w-[100%] text-[#84ccff] placeholder-gray-300 font-bold bg-[#dff7ff] rounded-lg py-1 px-2' type="password" name='password' placeholder='try emilyspass' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className='my-1 bg-[#56bf56] text-white font-semibold rounded-lg p-1' type='submit' disabled={loading}>
                        {loading ? 'Verifying..' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
        <div className='pt-2 min-h-9 text-[#ff0000] z-1'>{error && error}</div>
        <div className='h-full w-full absolute'>
            <img className='brightness-95 h-[100%] w-[100%] object-cover' src={loginBG} alt="Background" />
        </div>
    </div>
        
    </>
  )
}

export default Login
