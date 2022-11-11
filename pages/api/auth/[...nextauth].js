import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch';
import Users from "../../../models/Users"

const fetcher = (...args) => fetch(...args).then(res => res.json())
export default NextAuth({
  
  adapter: MongoDBAdapter(clientPromise),
  session: {
    secret: process.env.SECRET,
    jwt: true,  
  },
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (user.admin){
        session.user.admin = user.admin
      }
      return session
    }
  }
})

