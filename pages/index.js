import React from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'

const Home = () => {
  const { data: session, status } = useSession()
  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {session.user.name}</p> 
        <button onClick={() => signOut()}>Sign out</button>
        <br/>
        <Link href={'/asd'}>ASD</Link>
      </>
    )
    
  }

  return <Link href="/login">Sign in</Link>
}

export default Home
