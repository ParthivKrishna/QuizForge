const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET


function authenticate(
  req,
  res,
  next
) {
    //console.log('Authorization Header:')
  //console.log(req.headers.authorization)

  const authHeader =
    req.headers.authorization

  if (!authHeader) {

    return res.status(401).json({
      success: false,
      message: 'Token missing'
    })

  }

  const token =
    authHeader.split(' ')[1]
  console.log('Token:')
  console.log(token)

  try {

   // console.log(authHeader)

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      )
      console.log('Decoded JWT:')
      console.log(decoded)
    req.user = decoded

console.log('REQ.USER SET TO:')
console.log(req.user)

next()

  } catch (error) {

  console.log('JWT Error:')
  console.log(error)

  return res.status(401).json({
    success: false,
    message: 'Invalid token'
  })

}

}


module.exports = {
  authenticate
}