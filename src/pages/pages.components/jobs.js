import { SearchIcon, XIcon } from "@heroicons/react/solid"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Button, JobCard, Layout, Loader, SelectField, showToast, TextAreaField } from "../../components/ui.components"
import { usePostHook } from "../../hooks/hooks"

export const Jobs = () => {

    const getJobs = usePostHook('fetch_all_jobs')
    const fetchSingleJob = usePostHook('fetch_one_job')
    const updateJobFunc = usePostHook('job_status_update')

    const [jobs, setJobs] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [currentUser, setCurrentUser] = useState('')
    const router = useNavigate()

    const [jobUpdate, setJobUpdate] = useState({
        reg_num: "",
        job_status: "",
        status_comments: "",
        updated_by: "",
        key: "1qaz@WSX"
    })

    const toRoute = route => {
        router(route)
    }

    const options = [
        { key: 'Completed', value: 'Completed' },
        { key: 'Started', value: 'Started' },
        { key: 'Pending', value: 'Pending' },
    ]

    const getCurrentlyLoggedUser = async () => {
        const username = sessionStorage.getItem('qqrv')
        setCurrentUser(JSON.parse(username))
    }

    const fetchJobs = useCallback(async () => {
        const { data } = await getJobs.initDataFetching({
            "status": "Created",
            "key": "1qaz@WSX"
        })

        if (data.status === 0) {
            setJobs(data.output)
            showToast('success', "Job list updated successfully")
        }
        else {
            showToast('error', data.message)
        }
    }, [])

    const search = async e => {
        e.preventDefault()
        const { data } = await fetchSingleJob.initDataFetching({ "reg_num": searchItem, "key": "1qaz@WSX" })

        if (data.status === 0) {
            setShowModal(true)
        } else {
            showToast('error', data.message)
        }
    }

    const update = async e => {
        e.preventDefault()
        const updated_by = !!currentUser && currentUser
        const reg_num = !!searchItem && searchItem

        const payload = { reg_num, updated_by, job_status: jobUpdate.job_status, status_comments: jobUpdate.status_comments, key: "1qaz@WSX" }

        setShowModal(false)

        try {
            const { data } = await updateJobFunc.initDataFetching(payload)

            showToast(data.status === 0 ? 'success' : 'error', data.message)
        } catch (err) {
            showToast('error', err.toString())
        }

    }

    const _renderModal = () => {
        return (
            <div className="absolute inset-0 h-screen w-screen flex items-center justify-center">
                <div className="w-screen h-screen backdrop-blur-sm bg-white/30 z-20"></div>
                <div className="absolute flex z-20 items-center justify-center h-screen w-screen inset-0 shrink-0 inset-0 ">
                    <div className="h-auto shrink-0 w-1/3 border p-5 flex flex-col bg-white rounded">
                        <div className="flex justify-between">
                            <p>Update Job: {searchItem}</p>
                            <XIcon className="h-6 cursor-pointer" onClick={() => setShowModal(false)} />
                        </div>

                        {_renderUpdateForm()}
                    </div>
                </div>
            </div>
        )
    }

    const _renderUpdateForm = () => {
        return (
            <form className="grid grid-cols-1 pt-8 space-y-6 p-5" onSubmit={update}>
                <SelectField label='Status' options={options} onChange={e => setJobUpdate({ ...jobUpdate, job_status: e.target.value })} />
                <TextAreaField label='Status Comment' onChange={e => setJobUpdate({ ...jobUpdate, status_comments: e.target.value })} />
                <Button label='Update' type='submit' />
            </form>
        )
    }

    useEffect(() => {
        fetchJobs()
        getCurrentlyLoggedUser()
    }, [fetchJobs])

    return (
        <Layout>
            {(getJobs.isLoading || fetchSingleJob.isLoading || updateJobFunc.isLoading) && Loader()}
            {showModal === true && _renderModal()}

            <div className='md:w-1/2 lg:w-1/3 sticky inset-0'>
                <div className="space-y-1">
                    <form className='border hover:border-primary-100 duration-200 rounded-md relative flex items-center pl-4 pr-12' onSubmit={search}>
                        <input onChange={e => setSearchItem(e.target.value)} value={searchItem} className="outline-none w-full h-full py-3 text-sm font-semibold" placeholder="Enter Job ID" />
                        <div className="absolute right-5 cursor-pointer" onClick={search}>
                            <SearchIcon className='h-5 w-auto' />
                        </div>
                    </form>
                    <p className="text-xs text-red-600 font-light px-2">Search by Job ID</p>
                </div>
            </div>

            <div className="w-full lg:hidden pt-5">
                <p className='text-sm px-4'>Users</p>
            </div>

            {/* body */}
            <div className='mb-10'>
                {/* small to medium screens */}
                <div className='grid grid-cols-2 md:grid-cols-3 py-4 gap-2 lg:hidden'>
                    {
                        jobs.map(job => <JobCard job={job} key={job.jobs_id} />)
                    }
                </div>

                {/* large to extra large screens */}
                <table className='hidden lg:flex flex-col space-y-3'>
                    <thead>
                        <tr className='grid grid-cols-7 flex w-auto text-sm text-left gap-x-5 px-2 py-4 border mt-5 rounded-md bg-gray-50'>
                            <th className='col-span-1 text-center'>#</th>
                            <th className='col-span-1 text-start'>Entry Date</th>
                            <th className='col-span-1'>Job ID</th>
                            <th className='col-span-1'>Status</th>
                            <th className='col-span-1'>Client</th>
                            <th className='col-span-2'>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            jobs.map((job, i) => (
                                <tr className='grid grid-cols-7 flex w-auto text-left text-md items-center rounded-md font-light gap-x-5 px-2 py-4 hover:bg-gray-50 duration-200' key={job.jobs_id}>
                                    <th className='col-span-1 text-sm text-center'>{i + 1} </th>
                                    <th className='col-span-1 text-sm'>{job.entry_date}</th>
                                    <td className='col-span-1 text-sm hover:underline hover:text-blue-600 duration-200 cursor-pointer' onClick={() => toRoute(`/job_details/${job.reg_num}`)}>{job.reg_num}</td>
                                    <td className='col-span-1 text-sm'>{job.status}</td>
                                    <td className='col-span-1 text-sm'>{job.client}</td>
                                    <td className='col-span-2 flex space-x-2 text-sm font-bold'>{job.description}</td>
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