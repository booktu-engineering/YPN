import jwt from 'jsonwebtoken'

const checkForAuthorization = (req, res, next) => {
    try {
    if(!req.headers.authorization) return res.status(403).json({ message: 'Sorry you cant access this route'})
    const key = '6df7e61ce8cfc31f2c4f000fa5fcf7c0fb4c2395ea10818e2eb5e94efd008b022bae771d8fa30a4dc37dd06ed851554b5aa40e7b40dfb39acbc7a4282520c20a'
    req.user = jwt.verify(req.headers.authorization, key)
    next();
    }  catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message || 'Something went wrong'})
    }
}

export {
    checkForAuthorization
}