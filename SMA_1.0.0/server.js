var express=require('express');
var app=express();
var expressLayouts=require('express-ejs-layouts');
var expressPartials=require('express-partials');
var fs=require('fs');
var xmlObject=require('xml2js');
var multer = require('multer');
var bodyParser = require('body-parser');

var utf8=require('utf8');

var serverRouter=require('./routing/defaultRouting.js');
var sma=require('./models/smaLocals.js');
var configParser=require('./server_scripts/smaConfigParser.js');
var sql=require('mssql');
var db=require('./server_scripts/dbConnector');



var dbConnector=new db.dbConnector(sql);
var smaLocals=new sma.smaLocals(dbConnector);
var configReader=new configParser.configReader(sma,app,smaLocals,fs,dbConnector,xmlObject,utf8);

var registerRoutings=new serverRouter.registerRoutings(sma,smaLocals);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(2021);
app.set('view engine','ejs');
//app.set('layout','layouts/layout_version_0.1.ejs');
app.use(expressLayouts)
app.use(expressPartials())
app.use(express.static(__dirname + '/public'));



//    VARIABLES

	

//____________________________FUNCTIONS________________________________________________
function main(){
	//console.log(configReader.k.toString())
	configReader.parseConfig(function(){
		registerRoutings.register(app,smaLocals,function(){
			setLayout(smaLocals.activeUser.layoutName);
		});
	});

	//console.log('puny   ------   '+punyCode.toUnicode(''));

	//dbConnector.getLanguageList();
	//dbConnector.getGUIDWithValue('English');


	
	
};


function setLayout(layoutName){
	app.set('layout','layouts/'+layoutName);
}
//______________________________________________________________________________________

//    INIT SECTION
main();


console.log('!!!  the server was compiled  !!!\n')

