
const express = require('express')
const app = express()
const port = 3000
const { routes } = require('./routes/routes')
const mongoose = require('mongoose')
//парсер
app.use(express.json())

//мидлВара
app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})
app.use(routes)
//раздаем статику
const path = require('path')

const PUBLIC_FOLDER = path.join(__dirname, 'public')
app.use(express.static(PUBLIC_FOLDER))







async function main(){
  console.log('trying to connect')
  await mongoose.connect('mongodb://localhost:27017/users')
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()