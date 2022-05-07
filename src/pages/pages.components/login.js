import { useState } from "react"
import { TextField, Button } from "../../components/ui.components"
import { logo } from "../../images"
import { usePostHook } from "../../hooks/hooks"
import { useNavigate } from "react-router-dom"

export const Login = () => {

    const { isLoading } = usePostHook('login_in_admin')

    const [user, setUser] = useState({ username: '', password: '' })
    const navigator = useNavigate()

    const login = async e => {
        e.preventDefault()
        // initDataFetching(user)
        navigator('/', { replace: true})
    }


    return (
        <div className="flex h-screen w-screen">
            {/* login form */}
            <div className="flex flex-col items-center lg:justify-center py-12 lg:py-48 lg:w-1/2 h-screen">
                <div className="px-8 w-screen lg:w-3/5 flex flex-col items-start">
                    <div className="flex items-center mb-12 select-none">
                        <img src={logo} alt="logo" className="h-24"/>
                    </div>

                    <div className="space-y-2 mb-8 select-none">
                        <p className="text-2xl">Login</p>
                        <p className="text-xs lg:text-sm font-light">Welcome back. Please enter your details</p>
                    </div>

                    {/* form */}
                    <form className="w-full space-y-6" autoComplete="false" autoSave="false" onSubmit={login}>
                        <TextField label="Username" placeholder='mnnlthmpsn' onChange={e => setUser({...user, username: e.target.value})}/>
                        <TextField label="Password" type='password' placeholder='**********' onChange={e => setUser({...user, password: e.target.value})} />
                        <p className="text-sm hover:underline duration-200 cursor-pointer select-none">Forgot Password?</p>
                        <Button isloading={isLoading.toString()} type='submit' />
                    </form>
                </div>
            </div>

            {/* image carousel */}
            <div className="hidden lg:block grow h-screen bg-primary-50">
                <div className="flex h-full w-full items-center justify-center">
                    <p className="text-white font-light">Something goes here</p>
                </div>
            </div>
        </div>
    )
}