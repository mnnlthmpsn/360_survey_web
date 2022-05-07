import { Layout, SelectField, TextField, TextAreaField } from "../../components/ui.components"

export const JobEntry = () => {

    const roles = [
        { key: 'Super Admin', value: 'sudo' },
        { key: 'Administrator', value: 'admin' },
        { key: 'Authorizer', value: 'authorizer' },
        { key: 'Editor', value: 'editor' },
    ]

    const clients = [
        { key: 'Emmanuel Thompson', value: '1' },
        { key: 'Disabled', value: 'disabled' }
    ]

    return (
        <Layout>
            <p className="text-sm lg:py-8 lg:text-base">Job Entry</p>
            <div className="py-8 mb-10">
                <form className="grid lg:grid-cols-2 gap-6 md:pr-60">
                    <div className="col-span-2 lg:col-span-1">
                        <SelectField label='Client' options={clients} requird />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Reg Number' placeholder="4453WSD" required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Co-ordinates' placeholder="234456" required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Site Location' placeholder="Dansoman" required />
                    </div>

                    <div className="col-span-2">
                        <TextAreaField label='Description' />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Updated By' placeholder='Current User' disabled required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <TextField label='Comments' placeholder='...this is behind the mast :)' required />
                    </div>

                    <div className="col-span-2 md:w-1/2 lg:w-1/4">
                        <button className="primary-btn">Add Job</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}