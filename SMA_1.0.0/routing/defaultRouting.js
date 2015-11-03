	
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
		
		trialGet(app,smaLocals);




		function  defaultPost(app,smaLocals){
			app.post('/',function(req,res){
				postIndex(req,res);
			});
			app.post('/index.ejs',function(req,res){
				postIndex(req,res);
			});
			app.post('/about.ejs',function(req,res){

			})
		}
		function defaultGet(app,smaLocals){
			app.get('/',function(req,res){
				getIndex(req,res);
			});
			app.get('/index.ejs',function(req,res){
				getIndex(req,res);
			});
			

		}
		function trialGet(app,smaLocals){
			
			for(var pages in smaLocals.menuItems){
				console.log("the  pages  routed   are  :.....    "+smaLocals.menuItems[pages].viewName);
				app.get('/'+smaLocals.menuItems[pages].viewName,function(req,res){
					trialGetAll(req,res)
				});
			}

			app.get('/*',function(req,res){

				res.render('pages/error.ejs',smaLocals.locals());

			})

			
		}

		//__________________________________GET________________________________________________________

		var getIndex=function(req,res){
						console.log('default page was requested  by GET')


						res.render('pages/'+smaLocals.activePage.viewName,smaLocals.locals());

						}
		var getWithDefaults=function(req,res){
							console.log('default page was requested  by GET')
							res.render()
						}
		var trialGetAll =function(req,res){
								//for(var ind in smaLocals.menuItems){

									//console.log(smaLocals.menuItems[ind].viewName+' VS '+req.originalUrl)
									//if('/'+smaLocals.menuItems[ind].viewName===req.originalUrl){
										
										//return;
									//}
								//}
								//

									
									res.render('pages'+req.originalUrl,smaLocals.locals(),function(err,html){
										if(err){
											console.log('1111111111');
											res.redirect(404,'pages/error.ejs',smaLocals.locals())
										}else{
											res.send(html);
										}
									});
									
								
							};
		//_________________________________POST_________________________________________________________
		var postIndex=function(req,res){
						console.log('default page was requested  by  POST')
						smaLocals.setSelectedLanguage(req.body.language,function(){
							console.log('rendering with ....'+smaLocals.selectedLanguage);
							res.render('pages/'+smaLocals.activePage.viewName,smaLocals.locals());
						});
						
					}
		//________________________________ERROR__________________________________________________________
		var renderError=function(req,res){
			
		}
	}




		
//_________________________________________________________________________________________________________________________
module.exports.registerRoutings=registerRoutings;
