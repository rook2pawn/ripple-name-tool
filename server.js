var http=require('http')
var express=require('express')
var app=express()
var server=http.createServer(app)
var bp=require('body-parser')
var request=require('request')
var response=require('response')
app.use(bp.json())
server.listen(3000)

//in browser, go to http://127.0.0.1:3000/

var ecstatic=require('ecstatic')
app.use(ecstatic('./web'))
app.post('/submitname',function(req,res){
	request("https://id.ripple.com/v1/user/"+req.body.name, {json:true}, function(error,resp,body){
        var obj={}
        if (body.exists==true){
            obj.exists=true
            obj.username=body.username
            obj.address=body.address
        }
        else {
            obj.exists=false
        }
        response.json(obj).status(200).pipe(res)
    })
})

