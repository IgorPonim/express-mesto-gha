const express = require('express');
//  раздаем статику
const path = require('path');

const PUBLIC_FOLDER = path.join(__dirname, 'public');
const app = express();
app.use(express.static(PUBLIC_FOLDER));
const port = 3000;
const mongoose = require('mongoose');
const { routes } = require('./routes/routes');
//  парсер
app.use(express.json());

//  мидлВара
app.use((req, res, next) => {
  req.user = {
    _id: '622c3f5f3eba5fbcf0a129f7',
  };
  console.log(req.method, req.path);
  next();
});

async function main() {
  console.log('trying to connect');
  await mongoose.connect(
    'mongodb://localhost:27017/mestodb',
    {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    },
  );

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
app.use(routes);
