const jwt = require('jsonwebtoken')
const config = require('config')

//Middleware - це функція, яка дозволяє перехоплювати певні дані, і робити деяку логіку

module.exports = (req, res, next) => {
//метод OPTIONS перевіряє доступність сервера
  if (req.method === "OPTIONS") {
    return next()
  }

  try {
      //забираємо токен з хедера авторизації
      const token = req.headers.authorization.split(' ')[1] // "Bearer Token"

      if (!token) {
          return res.status(401).json({message: 'Нет авторизации'})
      }
      //розкодування токена 
      const decoded = jwt.verify(token, config.get('jwtSecret'))
      req.user = decoded
      next()

  } catch(e) {
    res.status(401).json({message: 'Нет авторизации'})
  }
}