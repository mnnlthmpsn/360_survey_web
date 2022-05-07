import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { ContactCard, Layout, SearchField } from '../../components/ui.components'
import { useGetHook } from '../../hooks/hooks'

export const Dashboard = () => {

    const { data } = useGetHook('')

    return (
        <Layout>
            <div className='md:w-1/2 lg:w-1/3 sticky inset-0'>
                <SearchField label='Users' />
            </div>

            <div className="w-full lg:hidden pt-5">
                <p className='text-sm px-4'>Users</p>
            </div>

            {/* body */}
            <div className='select-none mb-10'>
                {/* small to medium screens */}
                <div className='grid grid-cols-2 md:grid-cols-3 py-4 gap-2 lg:hidden'>
                    {
                        data.map(user => <ContactCard contact={user}/>)
                    }
                </div>

                {/* large to extra large screens */}
                <table className='hidden lg:flex flex-col space-y-3'>
                    <thead>
                        <tr className='grid grid-cols-7 flex w-auto text-sm text-left gap-x-5 px-2 py-4 border mt-5 rounded-md bg-gray-50'>
                            <th className='col-span-1 text-center'>#</th>
                            <th className='col-span-3'>Name</th>
                            <th className='col-span-2'>Role</th>
                            <th className='col-span-1'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user, i) => (
                                <tr className='grid grid-cols-7 flex w-auto text-left text-md items-center rounded-md font-light gap-x-5 px-2 py-4 hover:bg-gray-50 duration-200' key={user.id}>
                                    <th className='col-span-1 text-sm text-center'>{i + 1} </th>
                                    <th className='col-span-3 text-sm'>{ user.name }</th>
                                    <td className='col-span-2 text-sm'>{ user.role }</td>
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
            </div>
        </Layout>
    )
}
