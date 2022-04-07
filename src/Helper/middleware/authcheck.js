const { verifyIdToken } = require('@/components/Api/FirebaseAdmin');

/**
 * Middleware to verify request with firebase admin and append uid and authToken into the "req" variable
 * 
 * Authorization header must be like ` Bearer ....token value string...` in order for this to work.
 * otherwise it will just return "unauthorized"
 */
const withAuthcheck = () => async (req, res, next) => {
    if (!("authorization" in req.headers)) {

       res.status(401).end("Unauthorized request, No TOKEN");
    }
    try {
        //console.log("req.headers.authorization",req.headers.authorization)
        const auth = req.headers.authorization.split(" ");
        // console.log("token",auth)
        const token = auth[1]??auth[0];
        // console.log("token",token)
        const decodedToken= await verifyIdToken(token);
        req.authToken = token;
        req.uid = decodedToken.uid;
        req.decodedToken = decodedToken;
        next()
    } catch (err) {
         console.log(err.errorInfo)
        res.status(401).end("unauthorized request");
    }

}

export default withAuthcheck