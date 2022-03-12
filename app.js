
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



app.use((req, res, next) => {
  req.user = {
    _id: '622c2f1ccfb30eab6d387ea0' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});



async function main() {
  console.log('trying to connect')
  await mongoose.connect('mongodb://localhost:27017/mestodb'),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()