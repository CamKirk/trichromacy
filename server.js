let bc = require('badcube');
let tf = require('@tensorflow/tfjs');
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendFile('./index.html');
});

var goalDict = {
	red: 0,
	green: 1,
	blue: 2
}
app.post('/colors',function(req,res){
	//console.log(req.body.data)

	let data = JSON.parse(req.body.data);
	let goalNum = goalDict[data.goal];
	let arr = [];

	for(let i = 0; i < 3; i++){
		arr.push(parseInt(data[i][goalNum]));
	};

	data.answer = arr.indexOf(Math.max(...arr));
	data.correct = Boolean(data.answer === data.selected);


	Submissions.insert(data);
	res.end();
})

app.listen(3000,function(){
	console.log('listening on port 3000');
});
