import { Context } from '@/context/Context'
import React, { useContext } from 'react'

const getToken = () => {
 const {token, setToken} = useContext(Context)
 const userId = Number(localStorage.getItem("userId"))
 return {token, setToken, userId}
}

export default getToken