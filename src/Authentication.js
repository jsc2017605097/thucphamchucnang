import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Authentication(Page) {
    return function ComponentFunction() {
        const history = useHistory()
        const token = window.localStorage.getItem('token')
        const [loading, setLoading] = useState(true)
        const dispatch = useDispatch()

        useEffect(() => {
            if (!token) {
                history.push('/login')
            }
            axios({
                method: 'post',
                url: '/api/checktoken',
                headers: {
                    "Authorization": token
                }
            })
                .then(res => {
                    setLoading(false)
                })
                .catch(error => {
                    history.push('/login')
                })
        }, [history, token, dispatch])

        return loading ? null : <Page />
    }
}

export default Authentication