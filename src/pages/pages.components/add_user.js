import { Layout, SelectField, TextField } from "../../components/ui.components"

export const AddUser = () => {

    const roles = [
        { key: 'Super Admin', value: 'sudo' },
        { key: 'Administrator', value: 'admin' },
        { key: 'Authorizer', value: 'authorizer' },
        { key: 'Editor', value: 'editor' },
    ]

    const status = [
        { key: 'Active', value: 'active' },
        { key: 'Disabled', value: 'disabled' }
    ]

    return (
        <Layout>
            <p className="text-sm lg:py-8 lg:text-base">Add User</p>
            <div className="py-8">
                <form className="grid lg:grid-cols-2 gap-6 md:pr-60">
                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Firstname' placeholder="Emmanuel" required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Lastname' placeholder="Thompson" required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Username' placeholder="mnnlthmpsn" required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Password' type="password" placeholder="**********" required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <SelectField label='Status' options={status} requird />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <SelectField label='Role' options={roles} required />
                    </div>
                    
                    <div className="col-span-2 md:w-1/2 lg:w-1/4">
                        <button className="primary-btn">Add User</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}