import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
const uploadOnCloudinary = async (file) => {
    try {
        cloudinary.config({ 
        cloud_name: 'dhruv1234', 
        api_key: '818792783394733', 
        api_secret: 'I3nc_UoINX8s8-5fugMFDHg2phk' // Click 'View API Keys' above to copy your API secret
    });
    const uploadResult = await cloudinary.uploader
       .upload(file , {
        resource_type:'auto'
       })

       fs.unlinkSync(file)
      
       return uploadResult.secure_url
    } catch (error) {
        fs.unlinkSync(file)
        console.log(error , "cloudinary");
    }
     
}

export default uploadOnCloudinary