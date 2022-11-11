import dbConnect from '../../../lib/db'
import Users from '../../../models/Users'
import { getSession } from "next-auth/react"


dbConnect()
export default async (req, res) => {
    const session = await getSession({ req })
    const {query: {id}, method} = req;
    switch (method) {
  
        case 'PUT':
            if(session && session.user.admin){
                try {
                    const project = await Users.updateOne({"email": id}, {$set : {admin: true}})
    
                    if(!project){
                        console.log(project)
                        return res.status(400).json({success: false})
                    }
                    
                    console.log(project)
                    res.status(200).json({success: true, data: project})
    
                } catch (error) {
                res.status(400).json({success: false})
                }
            }
            break;

            default:
                res.status(400).json({success: false})
                break;
        }
}