// esxpress 框架 是node.js的web框架

const express = require('express');
// body-parser 是一个插件 模块处理请求体
const bodyParser = require('body-parser');
const request = require('request');
const querystring= require('querystring');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());


// app.get('/',(req, res) => {
//   res.send('Hello, world!');
// })

app.post('/sms_send', (req, res) =>{
  let tpl_value = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
  console.log(tpl_value);
  var queryData = querystring.stringify({
    "mobile": req.body.phone,  // 接受短信的用户手机号码
    "tpl_id": req.body.tpl_id,  // 您申请的短信模板ID，根据实际情况修改
    "tpl_value": `#code#=${tpl_value}`,  // 您设置的模板变量，根据实际情况修改
    "key": req.body.key,  // 应用APPKEY(应用详细页查询)
  });

  var queryUrl = 'http://v.juhe.cn/sms/send?'+queryData;

  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // 打印接口返回内容
      
      var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
      res.json(jsonObj);
      console.log(jsonObj)
    } else {
      console.log('请求异常');
    }
  }) 
})

const port = process.env.PROT || 5000;

app.listen(port, ()=> {
  console.log(`Server is running ${port}`);
})