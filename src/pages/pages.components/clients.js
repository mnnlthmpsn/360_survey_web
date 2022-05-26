import { PencilAltIcon, SearchIcon, TrashIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { ContactCard, Layout, Loader, showToast } from "../../components/ui.components"
import { usePostHook } from "../../hooks/hooks"

export const Clients = () => {

    const [data, setData] = useState([])

    const { initDataFetching, isLoading } = usePostHook('fetch_all_users_admin')

    const getClients = async () => {
        try {
            const { data } = await initDataFetching({ "key": "1qaz@WSX" })
            data.status === 0 && setData(data.output)

            data.status === 0 ? showToast('success', 'User list updated') : showToast('error', data.message)
        } catch (err) {
            showToast('error', err.toString())
        }
    }

    useEffect(() => {
        getClients()
    }, [])

    return (
        <Layout>
            { isLoading && Loader() }
            <div className='md:w-1/2 lg:w-1/3 sticky inset-0'>
                <div className="space-y-1">
                    <div className='border hover:border-primary-100 duration-200 rounded-md relative flex items-center pl-4 pr-12'>
                        <input className="outline-none w-full h-full py-3 text-sm font-semibold" placeholder="Search Client" />
                        <div className="absolute right-5 cursor-pointer">
                            <SearchIcon className='h-5 w-auto' />
                        </div>
                    </div>
                </div>
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
                            <th className='col-span-2'>Status</th>
                            <th className='col-span-1'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user, i) => (
                                <tr className='grid grid-cols-7 flex w-auto text-left text-md items-center rounded-md font-light gap-x-5 px-2 py-4 hover:bg-gray-50 duration-200' key={i}>
                                    <th className='col-span-1 text-sm text-center'>{i + 1} </th>
                                    <th className='col-span-2 text-sm flex flex-col'>
                                        <p>{`${user.firstname} ${user.lastname}`}</p>
                                        <p className="text-xs font-light">{user.phone_number}</p>
                                    </th>
                                    <td className='col-span-1 text-sm'>{user.username}</td>
                                    <td className='col-span-2 text-sm'>{user.status}</td>
                                    <td className='col-span-1 flex space-x-2'>
                                        <PencilAltIcon className='h-5 w-auto self-center hover:text-primary-50 cursor-pointer duration-200 hover:scale-110' />
                                        <TrashIcon className='h-5 w-auto text-red-400 hover:text-red-500 cursor-pointer hover:scale-110 duration-200 ' />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <ToastContainer />
            </div>
        </Layout>
    )
}