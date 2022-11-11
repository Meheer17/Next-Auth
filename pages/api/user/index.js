import dbConnect from '../../../lib/db'
import Users from '../../../models/Users'
import { getSession } from "next-auth/react"

dbConnect()

export default async function handler(req, res) {  
  const session = await getSession({ req })
  const {method} = req;
  if (session && session.user.admin) {
    // Signed in
    switch (method) {
      case 'GET':
        try {
          const project = await Users.find()
          res.status(200).json({data: project});
        } catch (error) {
          res.status(400).json({success:false});
        }
        break;
  
      default:
        res.status(400).json({error: "ERROR"})
        break;
    }
  } else {
    // Not Signed in
    res.status(400).json({error: "Error"})
  }

}