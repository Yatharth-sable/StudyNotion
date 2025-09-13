// this will prevent authenticated users form accessing the route
import React from 'react' 
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const OpenRoute = ({children}) => {

    const {token} = useSelector((state) => state.auth)

  if (token === null) {
       return children
  } else{
    return <Navigate to="/dashboard/my-profile"></Navigate>
  }
}
export default OpenRoute
