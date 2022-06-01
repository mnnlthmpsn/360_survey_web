import { ChevronLeftIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Loader, showToast } from "../../components/ui.components"
import { usePostHook } from "../../hooks/hooks"

export const JobDetails = () => {

    const { reg_num } = useParams()
    const { initDataFetching, isLoading } = usePostHook('fetch_one_job')

    const [jobDetails, setJobDetails] = useState({})
    const [jobKeys, setJobKeys] = useState([])
    const [jobVals, setJobVals] = useState([])
    const router = useNavigate()

    const getJobDetails = async () => {
        const { data } = await initDataFetching({ reg_num, key: '1qaz@WSX' })
        data.status === 0 ? showToast('success', data.message) : showToast('error', data.message)
        setJobKeys(Object.keys(data.output))
        setJobVals(Object.values(data.output))
        setJobDetails(data)
    }

    useEffect(() => {
        getJobDetails()
    }, [reg_num])

    return (
        <div className="h-screen w-screen p-8 lg:px-52 overflow-auto lg:py-12">
            {isLoading && Loader()}
            <div className="flex items-center space-x-5">
                <ChevronLeftIcon className="h-8 rounded-full border p-2 cursor-pointer hover:bg-primary-100 hover:text-white duration-200" onClick={() => router(-1)} />
                <p>Job Details</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 pt-8 mb-10 gap-x-4 gap-y-14">
                {
                    jobKeys.map((key, i) => (
                        <div key={i}>
                            <p className="text-sm text-center pb-2">{jobKeys[i]}</p>
                            <div className="border rounded-lg h-full flex items-center justify-center text-center px-5 text-sm font-light py-1 bg-gray-50">
                                <p>{jobVals[i]}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <p className="mb-6">Statuses</p>
            { 
                jobDetails.output2?.map((item, i) => (
                    <div className="flex flex-col relative justify-center border-l space-y-4 p-10" key={item.reg_num}>
                        <p className="absolute -left-4 rounded-full bg-green-500 flex text-xs items-center text-white justify-center h-8 w-8">{i + 1 }</p>
                        <p className="text-xs">{item.date}</p>
                        <p className="font-light">{item.status_comments}</p>
                        <p>{item.update_status}</p>
                    </div>
                ))
            }
            
            <ToastContainer />
        </div>
    )
}