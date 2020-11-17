const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token =  req.headers['x-access-token'] || req.body.token || req.query.token;


    if(token){

        jwt.verify(token,req.app.get('api_secret_key'),(err,data)=>{

            if(err)
            {
                res.json({status:false,err:'Token Geçersiz'})
            }
            else
            {
                req.data=data;
                next()
            }
        })

    } 
    else{
        res.json({status:false,err:'Token yok'})
    }

}