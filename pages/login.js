import React, { useEffect } from 'react'
import { getSession, useSession ,getProviders } from "next-auth/react"
import { useRouter } from 'next/router'
import BtnLogin from '../components/BtnLogin'

const Login = ({providers}) => {
  const router = useRouter()
  const {data: session, status } = useSession()

  useEffect(() => {
    if( session ) router.push('/')
    return
  })
  if(session) return null;

  return (
    <div className="d-flex justify-content-center align-items-center"
    style={{ minHeight: '100vh' }}>
      <div style={{maxWidth: '450px', width: '100%'}}
      className="border border-1 max-auto p-4 shadow">

        <h2 className="text-center fw-bolder text-uppercase"
        style={{ color: '#555', letterSpacing: '1px' }}>
          NextAuth
        </h2>

        <p className="text-center">Login with NextAuth</p>

        <BtnLogin 
          provider={providers.google}
          bgColor='#f2573f'
        />
        
      </div>
    </div>
  )
}

Login.getInitialProps = async () => {
  return {
    providers: await getProviders(),
  }
}

export default Login
