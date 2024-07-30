import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const LoginRedirect = () => {
    const { token } = useParams<{ token: string }>();
  const navigate=  useNavigate()

  useEffect(() => {
    navigate('/reset',{state: { token } })
  }, [token])

  return (
    <div>....loading</div>
  )
}

export default LoginRedirect