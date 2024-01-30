const jwt = require('jsonwebtoken')
const secret = "N@R@$!MH@"
const isLogin = (req ,res , next) => {
    let token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({error:"Unidentified , please Login to Continue" , success:false})
    } else {
        try {
            let login = jwt.verify(token, secret);
            if (login) {
               req.user = login;
         
               next();
            }
        } catch (error) {
            return res.status(401).send({error:"Something Went Wrong" , success:false , message :e.message})
        }

    }
}

module.exports = isLogin;