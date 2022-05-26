import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { Layout, TextField, TextAreaField, Button, showToast } from "../../components/ui.components"
import { usePostHook } from "../../hooks/hooks"

export const JobEntry = () => {

    const { initDataFetching, isLoading } = usePostHook("admin_job_entry")

    const [currentUser, setCurrentUser] = useState("")
    const [job, setJob] = useState({
        client_user: "",
        reg_num: "",
        "co-ordinates": "",
        site_location: "",
        district: "",
        description: "",
        updated_by: "",
        status_comment: "",
        key: "1qaz@WSX"
    })

    const createJob = async e => {
        e.preventDefault()
        try {
            const { data } = await initDataFetching(job)
            console.log(data)

            // fix this duplicate later
            showToast(data.status === 0 ? 'success' : 'error', data.message)
        }
        catch (e) {
            showToast('error', e)
        }
    }

    useEffect(() => {
        const username = sessionStorage.getItem('qqrv')
        setCurrentUser(JSON.parse(username))
    }, [])

    return (
        <Layout>
            <p className="text-sm lg:py-8 lg:text-base">Job Entry</p>
            <div className="py-8 mb-10">
                <form className="grid lg:grid-cols-2 gap-6 md:pr-60" onSubmit={createJob}>
                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Client Username' value={job.client_user} onChange={e => setJob({ ...job, client_user: e.target.value })} placeholder="username" required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Registration Number' placeholder="---" value={job.reg_num} onChange={e => setJob({ ...job, reg_num: e.target.value })} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Co-ordinates' placeholder="41°24’12.2″N   2°10’26.5″E" value={job["co-ordinates"]} onChange={e => setJob({ ...job, "co-ordinates": e.target.value })} />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Site' placeholder="Dansoman" value={job.site_location} onChange={e => setJob({ ...job, site_location: e.target.value })} required />
                    </div>

                    <div className="col-span-2">
                        <TextField label='District' placeholder='District' value={job.district} onChange={e => setJob({ ...job, district: e.target.value })} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Updated By' placeholder='Current User' value={currentUser} disabled required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Comments' placeholder='Enter brief comment here' value={job.status_comments} onChange={e => setJob({ ...job, status_comments: e.target.value })} required />
                    </div>

                    <div className="col-span-2">
                        <TextAreaField label='Description' value={job.description} onChange={e => setJob({ ...job, description: e.target.value })} />
                    </div>

                    <div className="col-span-2 md:w-1/2 lg:w-1/4">
                        <Button isloading={isLoading.toString()} type='submit' />
                    </div>
                </form>
            </div>
            <ToastContainer />
        </Layout>
    )
}