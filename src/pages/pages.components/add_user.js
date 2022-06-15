import { useState } from "react"
import { ToastContainer } from "react-toastify"
import { Layout, Loader, SelectField, showToast, TextField } from "../../components/ui.components"
import { usePostHook } from "../../hooks/hooks"

export const AddUser = () => {

    const nationality = [
        { key: 'Ghanaian', value: 'Ghanaian' },
        { key: 'Nigerian', value: 'Nigerian' }
    ]

    const gender = [
        { key: 'Male', value: 'M' },
        { key: 'Female', value: 'F' }
    ]

    const id = [
        { key: "Driver's License", value: "Driver's License" },
        { key: "Ghana Card", value: "Ghana Card" },
        { key: "Voter's ID", value: "Voter's ID" },
        { key: "Passport", value: "Passport" },
    ]

    const { initDataFetching, isLoading } = usePostHook("signup_by_admin")

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        othername: "",
        username: "",
        dob: "",
        sex: "",
        address: "",
        nationality: "",
        id_type: "",
        id_number: "",
        email: "",
        password: "",
        phone_number: "",
        key: "1qaz@WSX"
    })

    const addClient = async e => {
        e.preventDefault()
        try {
            const { data } = await initDataFetching(user)
            showToast(data.status === 0 ? "success" : "error", data.message)
        }
        catch (e) {
            showToast('error', e)
        }
    }

    return (
        <Layout>
            {isLoading && Loader()}
            <p className="text-sm lg:py-8 lg:text-base">Add Client</p>
            <div className="py-8 mb-10">
                <form className="grid lg:grid-cols-2 gap-6 md:pr-60" onSubmit={addClient}>
                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Firstname' placeholder="Emmanuel" value={user.firstname} onChange={e => setUser({...user, firstname: e.target.value})} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Lastname' placeholder="Thompson" value={user.lastname} onChange={e => setUser({ ...user, lastname: e.target.value })} required />
                    </div>

                    <div className="col-span-2">
                        <TextField label='Other Names' placeholder="Ampadu" value={user.othername} onChange={e => setUser({...user, othername: e.target.value})} />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Username' placeholder="mnnlthmpsn" value={user.username} onChange={e => setUser({...user, username: e.target.value})} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="dob">DOB</label>
                        <input type="date" className="form-control" value={user.dob} onChange={e => setUser({ ...user, dob: e.target.value })} />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <SelectField label='Sex' options={gender} value={user.sex} onChange={e => setUser({...user, sex: e.target.value})} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Address' placeholder="46C Dansoman" value={user.address} onChange={e => setUser({...user, address: e.target.value})} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <SelectField label='Nationality' options={nationality} value={user.nationality} onChange={e => setUser({...user, nationality: e.target.value})} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <SelectField label='ID Type' options={id} value={user.id_type} onChange={e => setUser({ ...user, id_type: e.target.value })} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='ID Number' placeholder="334DS65" value={user.id_number} onChange={e => setUser({...user, id_number: e.target.value})} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Email' type="email" placeholder="new_user@user.com" value={user.email} onChange={e => setUser({...user, email: e.target.value})} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Password' type="password" placeholder="**********" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Phone' type="tel" placeholder="054 000 0000" value={user.phone_number} onChange={e => setUser({...user, phone_number: e.target.value})} required />
                    </div>

                    <div className="col-span-2 lg:col-span-1 md:w-1/2 lg:w-1/4">
                        <button className="primary-btn" type="submit">Add User</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </Layout>
    )
}