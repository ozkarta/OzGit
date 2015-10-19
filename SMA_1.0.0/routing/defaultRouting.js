	
	var registerRoutings=function(app,smaLocals,locals){






		console.log('BEGIN DEBUG  ____ROUTINGS___')
		console.log('the layout name is : '+smaLocals.default_layout_name);
		console.log('the header name is : '+smaLocals.default_header_name);
		console.log('the footer name is : '+smaLocals.default_footer_name);
		for(var i=0;i<smaLocals.menuItems.length;i++){
			console.log('menus  --->'+smaLocals.menuItems[i].screenName);
			console.log('menus  --->'+smaLocals.menuItems[i].pageTitle);
			console.log('menus  --->'+smaLocals.menuItems[i].viewName);

		}


		for(var i=0;i<smaLocals.languageItems.length;i++){
			console.log('languages --->'+smaLocals.languageItems[i].languageName+'---->'+smaLocals.languageItems[i].languageGUID);
		}

		console.log('END DEBUG  ____ROUTINGS___')


		defaultPost(app,smaLocals);
		defaultGet(app,smaLocals);
		
	}

function  defaultPost(app,smaLocals){
	app.post('/',function(req,res){
		console.log('default page was requested  by  POST')
		smaLocals.setSelectedLanguage(req.body.language,function(){
			console.log('rendering with ....'+smaLocals.selectedLanguage);
			res.render('pages/'+smaLocals.defaultPage.viewName,smaLocals.locals());
		});
		
	});

}
function defaultGet(app,smaLocals){
	app.get('/',function(req,res){
			console.log('default page was requested  by GET')


			res.render('pages/'+smaLocals.defaultPage.viewName,smaLocals.locals());

			});

}

//_________________________________________________________________________________________________________________________
module.exports.registerRoutings=registerRoutings;
