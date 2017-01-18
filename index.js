/*
 主入口程序（要注意顺序）
 */
//创建一个Web服务器
var express = require('express');//用require导入一个模块'express'到express,require引入第三方模块
var app = express();//
app.set('port',process.env.PORT || 3009);//设置一个端口号（port）


var bodyParser = require('body-parser');//解析body的中间件，比方说你通过post来传递表单，json数据，或者上传文件，在koa中是不容易获取的，通过koa-bodyparser解析之后，在koa中this.body就能直接获取到数据。


var users =require('./routes/users');//引入自己建立的Node.js模块


var path = require('path');//path是Node.js自带的模块
var favicon = require('serve-favicon');
//配置静态资源（html,js,css,img这些都是静态资源，public用于存储静态资源）
app.use(express.static(__dirname + '/public'));
//设置图标
app.use(favicon(path.join(__dirname,'public','favicon.ico')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.use('/users',users);


//定制404页面（中间件）
app.use(function (req,res) {//req请求，res响应
    res.type('text/html');
    res.status(404);
    res.send('<span style="color:red">404 - Not Found</span>');
});

//定制500页面
app.use(function (err,req,res,next) {//err错误，next下一个
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

//启动服务器
app.listen(app.get('port'),function(){//通过get获取端口号
    console.log('Express started on http://localhost:' + app.get('port') + ';press Ctrl-C to terminate.');
});
