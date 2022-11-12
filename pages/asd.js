import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch';
import { useEffect, useState } from "react";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
    const {data: session, status} = useSession()
    const [em, setEm] = useState('')
    const [sub, setSub] = useState(false)

    useEffect(() => {
      if(sub) {
        createProject(em)
        setSub(false)
      }
    })

    const auth = useSWR('/api/user', fetcher).data
    if(!auth) return <></>
    const asd = auth.data
    const router = useRouter()
    
    function handleSubmit(e){
      e.preventDefault()
      setSub(true)
    }

    function handleChange(e) {
      setEm(e.target.value)
    }

    async function createProject(esa) {
      console.log(esa)
        try {
            const res = await fetch(`https://next-auth-six-sooty.vercel.app/api/user/${esa}`, {
                    method: 'PUT',
                    headers:{
                        "Accept":"applocation/json",
                        "Content-Type": 'application/json'
                    },
                })
            router.push('/asd')
        } catch (error) {
            console.log(error)
        }
    }
    if (status === "authenticated" ) {
        return (
        <>
            <p>Signed in as {session.user.name}</p> 
            {asd.map(s => {
                return (
                    <div>
                      <h5>{s.name} - {s.email}</h5>
                    </div>
                )
            })}
            <form onSubmit={handleSubmit}>
              <input onChange={handleChange} value={em} type="text" required></input>
              <button type="submit"> Make Admin </button>
            </form>
        </>
        )
        
    }

  return <a href="/login">Sign in</a>
}