const checkLogged = (req,res,next)=>{
    if(req.session.username){
        next();
    } 
}
module.exports = {checkLogged}