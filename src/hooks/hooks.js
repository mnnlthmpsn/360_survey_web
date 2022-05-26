import { useState } from "react"
import axios from 'axios'

const api_url = () => {
    let _url = "https://crustsolutionsgh.com:8210"

    const get_url = () => _url
    return { url: get_url }
}

const usePostHook = (url) => {

    const base_url = api_url().url()

    const [isLoading, setLoading] = useState(false)

    const initDataFetching = async body => {
        setLoading(true)

        try {
            return await axios.post(`${base_url}/${url}`, { ...body })
        } catch (err) { 
            throw err.toString()
        } finally {
            setLoading(false)
        }
    }

    return { initDataFetching, isLoading }
}


export { usePostHook }