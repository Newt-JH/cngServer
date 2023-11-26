var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2'); // mysql2 모듈을 사용
const config = require('./config/database'); // config 파일 불러오기
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productstatusRouter = require('./routes/productstatus');
var contactRouter = require('./routes/contact');
var faqRouter = require('./routes/faq');
var productRouter = require('./routes/product');
var productImageRouter = require('./routes/productImage');
var productListRouter = require('./routes/productList');
var productSerchRouter = require('./routes/productSearch');
var categoryRouter = require('./routes/category');
var contactInsertRouter = require('./routes/contactInsert');
var productInsertRouter = require('./routes/productInsert');
const cors = require('cors');


var app = express();
const connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productstatus', productstatusRouter);
app.use('/contact', contactRouter);
app.use('/faq', faqRouter);
app.use('/product', productRouter);
app.use('/productImage', productImageRouter);
app.use('/productList', productListRouter);
app.use('/productSerch', productSerchRouter);
app.use('/category', categoryRouter);
app.use('/contactInsert', contactInsertRouter);
app.use('/productInsert', productInsertRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// 페이로드 크기 늘리기
app.use(bodyParser.json({ limit: '3000mb' }));
app.use(bodyParser.urlencoded({ limit: '3000mb', extended: true }));
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

module.exports = app;
