import { useEffect, useState } from "react"
import axios from 'axios'

const api_url = () => {
    let _url = "https://crustsolutionsgh.com:8210"

    const get_url = () => _url
    return { url: get_url }
}

const usePostHook = url => {

    const base_url = api_url().url()

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState([])

    const initDataFetching = async body => {
        setLoading(true)

        try {
            const res = await axios.post(`${base_url}/${url}`, { body: body })
            console.log(res)
            setData([])
        } catch (err) {
            console.log('an error occured')
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return { initDataFetching, data, isLoading, error }
}

const useGetHook = url => {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setLoading(false)
        setErrors([])
        setData(
            [
                { name: 'Emmanuel Kwadwo Ntiamoah Thomposn', role: 'CEO', id: '1' },
                { name: 'Ernest Ofori Thomposn', role: 'Super Admin', id: '2' },
                { name: 'Erasmus Ofori Thomposn', role: 'Administrator', id: '3' },
                { name: 'Emmanuel Kwadwo Ntiamoah Thomposn', role: 'Administrator', id: '4' },
                { name: 'Emmanuel Kwadwo Ntiamoah Thomposn', role: 'Editor', id: '5' },
                { name: 'Emmanuel Kwadwo Ntiamoah Thomposn', role: 'Editor', id: '6' },
                { name: 'Emmanuel Kwadwo Ntiamoah Thomposn', role: 'System Administrator', id: '7' },
                { name: 'Emmanuel Kwadwo Ntiamoah Thomposn', role: 'Administrator', id: '8' },
                { name: 'Emmanuel Kwadwo Ntiamoah Thomposn', role: 'Administrator', id: '9' },
                { name: 'Emmanuel Kwadwo Ntiamoah Thomposn', role: 'Administrator', id: '10' },
                { name: 'Emmanuel Kwadwo Ntiamoah Thomposn', role: 'Administrator', id: '11' },
            ]
        )
    }, [url])

    return { data, isLoading, errors }
}

export { usePostHook, useGetHook }