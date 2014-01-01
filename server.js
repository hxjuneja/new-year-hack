var fs = require("fs");
var express = require("express");
var app = express();

function render_html(res, file){

    fs.readFile(__dirname+"/"+file, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.set({
             'Content-Type': 'text/html'
            });

         res.send(data);
        }
    });
};

app.get("/index", function(req, res){
    render_html(res, 'html/index.html');
});


app.use(express.bodyParser());
app.use('/static', express.static(__dirname + '/static'));
app.use('/html', express.static(__dirname + '/html'));
app.use('/samples', express.static(__dirname + '/samples'));
app.listen(3000);
console.log('Listening on port 3000');
