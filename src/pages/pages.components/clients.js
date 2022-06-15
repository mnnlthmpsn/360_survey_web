import { LockOpenIcon, PencilAltIcon, RefreshIcon, SearchIcon, TrashIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Swal from "sweetalert2"
import { ContactCard, Layout, Loader, showToast } from "../../components/ui.components"
import { usePostHook } from "../../hooks/hooks"

export const Clients = () => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const router = useNavigate()

    const fetchAdmin = usePostHook('fetch_all_users_admin')
    const resendOTP = usePostHook('resend_validation_admin')
    const disableUserAdmin = usePostHook('disable_user_admin')
    const enableUserAdmin = usePostHook('enable_user_admin')
    const password_reset = usePostHook('reset_user_password_admin')

    const toRoute = route => router(route)

    const getClients = async () => {
        try {
            const { data } = await fetchAdmin.initDataFetching({ "key": "1qaz@WSX" })
            data.status === 0 && setData(data.output)

            data.status === 0 ? showToast('success', 'User list updated') : showToast('error', data.message)
        } catch (err) {
            showToast('error', err.toString())
        }
    }

    const search = e => {
        e.preventDefault()
        const filtered = data.filter(dt => dt.username.toLowerCase().includes(e.target.value.toLowerCase()))

        setFilteredData(filtered)
    }

    const disableUser = username => {
        Swal.fire({
            title: 'Disable User',
            text: 'Do you wish to continue?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0D76C1',
            cancelButtonColor: '#FF0000',
            confirmButtonText: 'Continue'
        }).then(async res => {
            if (res.isConfirmed) {
                const { data } = await disableUserAdmin.initDataFetching({ "key": "1qaz@WSX", "username": username })
                data.status !== 0 && showToast('error', data.message)
                getClients()
            }
        })
    }

    const enableUser = async username => {
        const { data } = await enableUserAdmin.initDataFetching({ "key": "1qaz@WSX", username })
        showToast(data.status === 0 ? "success" : "error", data.message)
        getClients()
    }

    const resetPassword = username => {
        Swal.fire({
            title: 'Reset Password',
            text: 'Do you wish to continue?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#0D76C1',
            cancelButtonColor: '#FF0000',
            confirmButtonText: 'Continue'
        }).then(async res => {
            if (res.isConfirmed) {
                const { data } = await password_reset.initDataFetching({ username, new_password: "password123", key: "1qaz@WSX" })
                showToast(data.status === 0 ? 'success' : 'error', data.message)
            }
        })
    }

    const TableRow = ({ user, i }) => {
        return (
            <tr className='grid grid-cols-7 flex w-auto text-left text-md items-center rounded-md font-light gap-x-5 px-2 py-4 hover:bg-gray-50 duration-200' key={i}>
                <th className='col-span-1 text-sm text-center'>{i + 1} </th>
                <th className='col-span-2 text-sm flex flex-col'>
                    <p>{`${user.firstname} ${user.lastname}`}</p>
                    <p className="text-xs font-light">{user.phone_number}</p>
                </th>
                <td className='col-span-1 text-sm'>{user.username}</td>
                <td className='col-span-1 text-sm capitalize'>{user.status}</td>
                <td className='col-span-2 text-xs flex space-x-2 items-center justify-center'>
                    <div className="relative group">
                        <LockOpenIcon className="h-6 hover:text-gray-800 duration-200 cursor-pointer" onClick={() => resetPassword(user.username)} />
                        <div className="absolute w-20 invisible group-hover:visible py-1 px-2 rounded bg-gray-600 text-xs text-white border">
                            Reset PIN
                        </div>
                    </div>
                    <button className="border rounded-md bg-primary-50 hover:bg-primary-100 text-white px-5 py-2" onClick={() => resendValidation(user.username)}>Resend OTP</button>
                    {
                        user.status.toLowerCase() === 'disabled'
                            ? <div className="relative group">
                                <RefreshIcon className="h-6 text-green-400 cursor-pointer hover:text-green-500 duration-200" onClick={() => enableUser(user.username)} />
                                <div className="absolute invisible group-hover:visible py-1 px-2 rounded bg-gray-600 text-xs text-white border">
                                    Activate
                                </div>
                            </div>
                            : <div className="relative group">
                                <TrashIcon className="h-6 text-red-400 cursor-pointer hover:text-red-500 duration-200" onClick={() => disableUser(user.username)} />
                                <div className="absolute invisible group-hover:visible py-1 px-2 rounded bg-gray-600 text-xs text-white border">
                                    Disable
                                </div>
                            </div>
                    }
                </td>
            </tr>
        )
    }

    const resendValidation = async username => {
        const { data } = await resendOTP.initDataFetching({ username, key: '1qaz@WSX' })
        data.status === 0 ? showToast('success', 'OTP resent') : showToast('error', data.message)
    }

    useEffect(() => {
        getClients()
    }, [])

    return (
        <Layout>
            {fetchAdmin.isLoading && Loader()}
            {resendOTP.isLoading && Loader()}
            {disableUserAdmin.isLoading && Loader()}
            {enableUserAdmin.isLoading && Loader()}

            <div className="flex space-x-4">
                <div className='md:w-1/2 lg:w-1/3 sticky inset-0'>
                    <div className="space-y-1">
                        <form className='border hover:border-primary-100 duration-200 rounded-md relative flex items-center pl-4 pr-12' onSubmit={search}>
                            <input onChange={search} className="outline-none w-full h-full py-3 text-sm font-semibold" placeholder="Search Client" />
                            <div className="absolute right-5 cursor-pointer" onClick={search}>
                                <SearchIcon className='h-5 w-auto' />
                            </div>
                        </form>
                    </div>
                </div>
                <button className="border rounded-md bg-primary-50 hover:bg-primary-100 text-sm text-white px-5 py-2" onClick={() => toRoute('add_client')}>Add Client</button>
            </div>

            <div className="w-full lg:hidden pt-5">
                <p className='text-sm px-4'>Users</p>
            </div>

            {/* body */}
            <div className='select-none mb-10'>
                {/* small to medium screens */}
                <div className='grid grid-cols-2 md:grid-cols-3 py-4 gap-2 lg:hidden'>
                    {
                        data.map((contact, i) => <ContactCard contact={contact} key={i} />)
                    }
                </div>

                {/* large to extra large screens */}
                <table className='hidden lg:flex flex-col space-y-3'>
                    <thead>
                        <tr className='grid grid-cols-7 flex w-auto text-sm items-center text-left gap-x-5 px-2 py-4 border mt-5 rounded-md bg-gray-50'>
                            <th className='col-span-1 text-center'>#</th>
                            <th className='col-span-2 flex flex-col'>
                                <p>Name</p>
                                <p className="text-xs font-light">phone</p>
                            </th>
                            <th className='col-span-1'>Username</th>
                            <th className='col-span-1'>Status</th>
                            <th className='col-span-2 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.length > 0
                                ? filteredData.map((user, i) => <TableRow user={user} i={i} key={i} />)
                                : data.map((user, i) => <TableRow user={user} i={i} key={i} />)
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <ToastContainer />
            </div>
        </Layout>
    )
}