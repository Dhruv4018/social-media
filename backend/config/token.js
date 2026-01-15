import jwt from"jsonwebtoken"

const genToken = async (userId)=>{
    try {
        const token = await jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn:"20y"
        })
        return token
    } catch (error) {
        console.log("error token");
        
    }
}

export default genToken