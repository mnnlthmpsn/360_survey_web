import { BriefcaseIcon, DocumentAddIcon, DocumentDuplicateIcon, MenuAlt3Icon, SearchIcon, TrashIcon, XIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { logo } from '../images';


const TextField = (props) => {
    return (
        <div className="space-y-1">
            <label htmlFor={props.label} className="text-sm lg:text-base select-none">{props.label}</label>
            <input {...props} className="form-control" />
        </div>
    )
}

const TextAreaField = (props) => {
    return (
        <div className="space-y-1">
            <label htmlFor={props.label} className="text-sm lg:text-base select-none">{props.label}</label>
            <textarea {...props} className="form-control" cols='5' rows='5' placeholder={`Enter ${props.label}`}></textarea>
        </div>
    )
}


// Search Field
const SearchField = (props) => {

    const [searchItem, setSearchItem] = useState('')

    const search = () => {
        console.log(searchItem)
    }

    return (
        <div className="space-y-1">
            <div className='border hover:border-primary-100 duration-200 rounded-md relative flex items-center pl-4 pr-12'>
                <input {...props} onChange={e => setSearchItem(e.target.value)} value={searchItem} className="outline-none w-full h-full py-3 text-sm font-semibold" placeholder={`...Search ${props.label}`} />
                <div className="absolute right-5 cursor-pointer" onClick={search}>
                    <SearchIcon className='h-5 w-auto' />
                </div>
            </div>
        </div>

    )
}

// select field
const SelectField = props => {
    return (
        <div className="space-y-1">
            <label htmlFor={props.label} className="text-sm lg:text-base select-none">{props.label}</label>
            <select className='form-control-select' {...props}>
                <option value="" defaultValue>-- Select {props.label} --</option>
                {
                    !!props.options && props.options.map(option => (
                        <option value={option.value} key={option.value}>{option.key}</option>
                    ))
                }
            </select>
        </div>
    )
}

// contact card for small screens
const ContactCard = ({ contact }) => {
    return (
        <div className='rounded-md relative border p-3 flex flex-col space-y-2'>
            <p className='text-xs font-base'>{`${contact.firstname} ${contact.lastname}`}</p>
            <p className='text-xs font-light'>{contact.role}</p>
            <div className='flex absolute right-2 bottom-2 items-center justify-end'>
                <TrashIcon className='h-5 w-auto text-red-500 cursor-pointer ' />
            </div>
        </div>
    )
}

// job cards for small screens
const JobCard = ({ job }) => {
    return (
        <div className='rounded-md relative border p-3 flex flex-col space-y-2'>
            <p className='text-xs font-base'>{job.jobs_id}</p>
            <p className='text-xs font-light'>{job.entry_date}</p>
            <div className='flex absolute right-2 bottom-2 items-center justify-end'>
                <TrashIcon className='h-5 w-auto text-red-500 cursor-pointer ' />
            </div>
        </div>
    )
}


// Button
const Button = props => {

    const isLoading = () => {
        return props.isloading === 'true' ? <p>...loading</p> : props.label || 'Continue'
    }

    return <button className={!props.isPrimary ? 'primary-btn' : 'secondary-btn'} {...props}> {isLoading()} </button>
}

const showToast = (type, message) => {
    toast[type](message, {
        position: "top-right",
        className: "font-light text-sm",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    })
}


// layout
const Layout = ({ children }) => {

    const [toggle, setToggle] = useState(false)

    const toRoute = useNavigate()
    const { pathname } = useLocation()

    const logout = () => {
        sessionStorage.clear()
        toRoute('/login', { replace: true })
    }

    const menuItems = [
        // { title: 'Users', icon: <UsersIcon className='h-6 w-auto' />, route: '/' },
        // { title: 'Add User', icon: <UserAddIcon className='h-6 w-auto' />, route: '/add_user' },
        { title: 'Clients', icon: <BriefcaseIcon className='h-6 w-auto' />, route: '/' },
        { title: 'Jobs', icon: <DocumentDuplicateIcon className='h-6 w-auto' />, route: '/jobs' },
        { title: 'Job Entry', icon: <DocumentAddIcon className='h-6 w-auto' />, route: '/job_entry' },
    ]

    const buildMenuItems = () => (
        <div className='relative'>
            {
                menuItems.map(menu => (
                    <div className="flex select-none items-center space-x-4 mr-5 text-sm lg:text-base" key={menu.route} onClick={() => toRoute(menu.route, { replace: true })}>
                        <div
                            className={`w-1 py-4 rounded-xl bg-primary-50 duration-300 ${pathname === menu.route ? "opacity-100" : "opacity-0"
                                }`}
                        ></div>
                        <div className="flex items-center space-x-6 lg:space-x-4 py-3 px-4 w-full cursor-pointer hover:text-white duration-150 hover:bg-primary-50 rounded-lg">
                            {menu.icon}
                            <p>{menu.title}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )

    return (
        <div className="h-screen w-screen flex bg-white">
            <div className="hidden lg:block flex-none w-1/5 h-full border-r">
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-2 ml-1 h-full mt-20">
                        <div className="px-8 pb-12 flex space-x-4 select-none items-center">
                            <img src={logo} alt="logo" className="h-24 cursor-pointer" onClick={() => toRoute('/', { replace: true })} />
                        </div>
                        {/* menus */}
                        {buildMenuItems()}
                    </div>
                </div>
            </div>

            <div className="grow overflow-auto">
                <div className="flex flex-col">
                    <div className="h-16 flex-none border-b bg-primary-50 lg:bg-gray-50 sticky z-10 inset-0">
                        <div className="flex items-center justify-between h-full items-center px-8">
                            <p className="text-white font-light lg:font-semibold text-md lg:text-gray-600"><span className='font-light text-xs'>Welcome</span> Kwame</p>
                            <MenuAlt3Icon className='text-white h-5 w-auto lg:hidden' onClick={() => setToggle(true)} />
                            <p className='text-sm hidden lg:block cursor-pointer' onClick={logout}>Logout</p>
                        </div>
                    </div>
                    <div className="grow p-8 mb-10">
                        {children}
                    </div>
                </div>
            </div>

            {/* mobile menu items */}
            <div className={`absolute z-20 bg-white p-8 duration-150 ${toggle ? 'h-screen w-screen opacity-100' : 'h-0 w-0 opacity-0'}`}>
                <div className="flex items-center justify-between">
                    <p onClick={() => console.log('you did')}>Welcome Kwame</p>
                    <XIcon className='h-5 w-auto' onClick={() => setToggle(false)} />
                </div>
                <p className='font-light text-sm'>Browse menu...</p>

                <div className={`pt-8 flex flex-col ${!toggle && 'hidden'}`}>
                    {buildMenuItems()}
                </div>
            </div>
        </div>
    )
}

export { TextField, SearchField, SelectField, Button, Layout, ContactCard, JobCard, TextAreaField, showToast}