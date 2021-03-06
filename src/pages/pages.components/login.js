import { Fragment, useState } from "react"
import { TextField, Button, showToast } from "../../components/ui.components"
import { logo } from "../../images"
import { usePostHook } from "../../hooks/hooks"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

export const Login = () => {

    const [user, setUser] = useState({ username: '', password: '' })
    const { initDataFetching, isLoading } = usePostHook('log_in_admin')

    const navigator = useNavigate()

    const login = async e => {
        e.preventDefault()
        const { data } = await initDataFetching(user)
        if (data.status === 0) {
            sessionStorage.setItem('qqrv', JSON.stringify(user.username))
            navigator('/')
        } else {
            showToast('error', data.message)
        }
    }


    return (
        <Fragment>
            <div className="hidden md:flex h-screen w-screen">
                {/* login form */}
                <div className="flex flex-col items-center lg:justify-center py-12 lg:py-48 w-full h-screen">
                    <div className="px-8 w-screen lg:w-3/5 flex flex-col items-start">
                        <div className="flex items-center mb-12 select-none">
                            <img src={logo} alt="logo" className="h-24" />
                        </div>

                        <div className="space-y-2 mb-8 select-none">
                            <p className="text-2xl">Login</p>
                            <p className="text-xs lg:text-sm font-light">Welcome back. Please enter your details</p>
                        </div>

                        {/* form */}
                        <form className="w-full space-y-6" autoComplete="false" autoSave="false" onSubmit={login}>
                            <TextField label="Username" placeholder='username' onChange={e => setUser({ ...user, username: e.target.value })} disabled={isLoading} />
                            <TextField label="Password" type='password' placeholder='password' onChange={e => setUser({ ...user, password: e.target.value })} disabled={isLoading} />
                            <p className="text-sm hover:underline duration-200 cursor-pointer select-none">Forgot Password?</p>
                            <Button isloading={isLoading.toString()} type='submit' disabled={isLoading} />
                        </form>
                    </div>
                </div>

                {/* image carousel */}
                <div className="hidden lg:block grow h-screen bg-[#e6e6e6]">
                    <div className="flex h-full w-full items-center justify-center">
                        <img className="object-cover object-left h-full w-full" src="https://images.unsplash.com/photo-1628155858736-bacadae33a88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fFN1cnZleWluZyUyMHRyaXBvZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=2400&q=2400" alt="" srcset="" />
                    </div>
                </div>

                <ToastContainer />
            </div>

            <div className="md:hidden flex relative items-center justify-center h-screen w-screen p-8">
                <img src={logo} alt="logo" className="absolute top-24 h-24" />
                <p className="text-center">Please use a laptop or Computer for better user experience</p>
            </div>
        </Fragment>
    )
}