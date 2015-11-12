var async =  require ('async');



var   configReader=function(sma,app,smaLocals,fs,dbConnector,xmlObject,utf8){
	this.app=app;
	this.smaLocals=smaLocals;

	this.k='ozKart';

    //----------------------------------------------------------------------------------
	configReader.prototype.parseConfig=function (callback){
	//var data=fs.readFileSync('./configurations/SMAconfig.0.01.XML','utf8');
	var data=fs.readFileSync('./configurations/SMAconfig.0.02.XML','utf8');
	
	var parser=new xmlObject.Parser();
	parser.parseString(data,function(err,result){
						smaLocals.configInJSON=result;
						//initLayoutVariables();


						initLayoutVariablesTrial_version_04(function(){
						callback();
					});
					
				});

	};
	//------------------------------------------------------------------------------------
	var initLayoutVariables =function (){
		//  page elements
		smaLocals.default_layout_name=smaLocals.configInJSON.SMA.layout_name.toString();
		smaLocals.default_header_name=smaLocals.configInJSON.SMA.header_name.toString();
		smaLocals.default_footer_name=smaLocals.configInJSON.SMA.footer_name.toString();

		//  MENU ITEMS
		for(var menu_item in smaLocals.configInJSON.SMA.menus[0]['menu_item']){
			//smaLocals.menuItems.push(smaLocals.configInJSON.SMA.menus[0]['menu_item'][menu_item]);
			smaLocals.menuItems.push(new sma.menuItem(smaLocals.configInJSON.SMA.menus[0]['menu_item'][menu_item].screen_name,
													  smaLocals.configInJSON.SMA.menus[0]['menu_item'][menu_item].screen_page[0].page_title,
													  smaLocals.configInJSON.SMA.menus[0]['menu_item'][menu_item].screen_page[0].page_view_name
				));
		}
		//   LOGO NAME
		smaLocals.logoImageName=smaLocals.configInJSON.SMA.logo_name.toString();
		
		//    LANGUAGES
		for(var language in smaLocals.configInJSON.SMA.languages[0]['language_variable']){

			var lang=smaLocals.configInJSON.SMA.languages[0]['language_variable'][language];
			//console.log(lang);

			dbConnector.getLnaguageDisplayName(lang,function(languageDisp,languageSys){
				//var lang=('ქართული');
				dbConnector.getLanguageGUID(languageSys,function(guid,language){
					console.log('preparing  ...... '+languageSys+'  '+languageDisp+'  '+guid);
					//if(guid!='' && guid!= undefined){
						smaLocals.languageItems.push(new sma.languageObject(guid,languageDisp,languageSys));
					//}
				});				
			})	
		}

		//   DEFAULT PAGe

		smaLocals.activePage=new sma.activePageObject(smaLocals.configInJSON.SMA.default_page[0]['page_title'],
																smaLocals.configInJSON.SMA.default_page[0]['page_view_name']);



	};
	//-------------------------------------------------------------------------------------------
	var initLayoutVariablesTrial_version_04=function(returner){

		console.log('starting default variables.....');
		initDefaultVariables(function(){
			console.log('default variables initialized')
		    console.log('starting default languages.....');
			initDefaultLanguages(function(){
				console.log('default languages initialized');
				console.log('starting user iteration....');

				async.forEach(smaLocals.configInJSON.SMA.user_specific,function(userSection,callback1){
						async.forEach(userSection.user,function(user,callback2){

								console.log('user found  in  the config  while iterating');
								console.dir(user)
								
								console.log('_____________________________')
								//var  userObject=userSpecific.user[userIndex];
								//___________________READY_______________________________________________
								var isAuthenticated=false;

								var userType=user.user_type.toString();
								var layoutName;
								var headerName;
								var footerName;
								var logoName;

								var languageObject=[];
								var menusObject=[];
								var defaultPageObject;
								//___________________________JSONS_____________________________________________
								var languageObjectJSON=user.languages;
								var menusObjectJSON=user.menus;
								var defaultPageObjectJSON=user.default_page;
								//      CHECK   IF  VARIABLES ARE   ASSIGNED FOR USERS  OTHERWISE  TAKE THEM FROM DEFAULT   VERSION
								if(user.layout_name != undefined & user.layout_name!=''){
									layoutName=user.layout_name.toString();
								}else{
									layoutName=smaLocals.default_layout_name;
								}

								if(user.header_name != undefined & user.header_name!=''){
									headerName=user.header_name.toString();
								}else{
									headerName=smaLocals.default_header_name;
								}
								if(user.footer_name != undefined & user.footer_name!=''){
									footerName=user.footer_name.toString();
								}else{
									footerName=smaLocals.default_footer_name;
								}
								console.log('USER LOGO NAME IS ')
								console.dir(user.logo_name);
								if(user.logo_name != undefined & user.logo_name!=''){
									logoName=user.logo_name.toString();
									console.log('valid')
									console.log(logoName)
								}else{
									logoName=smaLocals.logoImageName;
									console.log('IN ___valid')
									console.log(logoName)
								}

								console.dir(languageObjectJSON);
								if(languageObjectJSON!=undefined){
									console.dir(languageObjectJSON[0]['language_variable']);
									//______________LANGUAGES____________________
									initUsersLanguages(user.languages[0],languageObject,function(){
											console.log('language  for users  are  initiated  and  called back ')
											console.log(languageObject);
											initMenu(menusObjectJSON,menusObject,function(){
											console.dir(menusObject);
											initDefaultPage(defaultPageObjectJSON,defaultPageObject,function(obj){
												//console.log('after object is ...,.,..,,,')
												defaultPageObject=obj;
												smaLocals.activePage=defaultPageObject;
											    //console.dir(defaultPageObject);
											
												//define  default active user
												if(userType=='visitor'){
													isAuthenticated=true;
												}


												//     PUSH  NEW  USERS   to    smaLocal
												var user=new sma.userObject(isAuthenticated,userType,layoutName,headerName,footerName,logoName,languageObject,menusObject,defaultPageObject);

												smaLocals.smaUsers.push(user);
												if(isAuthenticated){
													smaLocals.activeUser=user;
												}
												callback2();
											});
										});
									});
								}else{
									console.log('there  was  no   language  found for the user.')
									console.log('applying default value.....');
									languageObject=smaLocals.languageItems;
									initMenu(menusObjectJSON,menusObject,function(){

										initDefaultPage(defaultPageObjectJSON,defaultPageObject,function(obj){
											//console.log('after object is ...,.,..,,,');
											defaultPageObject=obj;
											smaLocals.activePage=defaultPageObject;
										    //console.dir(defaultPageObject);
										
											//define  default active user
											if(userType=='visitor'){
												isAuthenticated=true;
											}


											//     PUSH  NEW  USERS   to    smaLocal
											var user=new sma.userObject(isAuthenticated,userType,layoutName,headerName,footerName,logoName,languageObject,menusObject,defaultPageObject);

											smaLocals.smaUsers.push(user);
											if(isAuthenticated){
												smaLocals.activeUser=user;
											}
											callback2();
										});
									});
								}
								


						},function(err){
							callback1();
						});
				},function(err){
					//   TRANSLATE ACTIVE
					smaLocals.translateActiveUser(function(){
						returner();
					})
				});
			});
		});


	}
	var initLayoutVariablesTrial_version_05=function(returner){
		initDefaultVariables(function(){
			//console.log('default variables initialized')
			initDefaultLanguages(function(){
					console.log('default languages initialized')
					async.forEach(smaLocals.configInJSON.SMA.user_specific,function(userSection,callback1){
							//console.dir(userSection);
							//console.log('____________________________________________________');
							//var userSpecific=smaLocals.configInJSON.SMA.user_specific[userSection];
							async.forEach(userSection.user,function(user,callback2){
								//console.dir(user)
								
								//console.log('_____________________________')
								//var  userObject=userSpecific.user[userIndex];
								//___________________READY_______________________________________________
								var isAuthenticated=false;

								var userType=user.user_type.toString();
								var layoutName;
								var headerName;
								var footerName;
								var logoName;

								var languageObject=[];
								var menusObject=[];
								var defaultPageObject;
								//___________________________JSONS_____________________________________________
								var languageObjectJSON=user.languages;
								var menusObjectJSON=user.menus;
								var defaultPageObjectJSON=user.default_page;
								//      CHECK   IF  VARIABLES ARE   ASSIGNED FOR USERS  OTHERWISE  TAKE THEM FROM DEFAULT   VERSION
								if(user.layout_name != undefined & user.layout_name!=''){
									layoutName=user.layout_name.toString();
								}else{
									layoutName=smaLocals.default_layout_name;
								}

								if(user.header_name != undefined & user.header_name!=''){
									headerName=user.header_name.toString();
								}else{
									headerName=smaLocals.default_header_name;
								}
								if(user.footer_name != undefined & user.footer_name!=''){
									footerName=user.footer_name.toString();
								}else{
									footerName=smaLocals.default_footer_name;
								}
								if(user.logo_name != undefined & user.logo_name!=''){
									logoName=user.logo_name.toString();
								}else{
									logoName=smaLocals.logoImageName;
								}


								console.dir(languageObjectJSON[0]['language_variable']);
								//______________LANGUAGES____________________
								async.forEach(languageObjectJSON[0]['language_variable'],function(lang,callback3){
										//var lang=languageObjectJSON[0]['language_variable'][language];
										console.log('users  languages is  ---->     '+lang)
										dbConnector.getLnaguageDisplayName(lang,function(languageDisp,languageSys){
											console.log('users  language translated is  ---->     '+lang)
											dbConnector.getLanguageGUID(languageSys,function(guid,language){
												console.log('preparing  ...... '+languageSys+'  '+languageDisp+'  '+guid);
												
													languageObject.push(new sma.languageObject(guid,languageDisp,languageSys));
													console.log('pushed!______-language');													
											});				
										});	
								},function(err){
									callback2();
								});
								
							},function(err){
								callback1();
							});							
					},function(err){
						console.log('time to  return  main  initialization :))');
					});
				});
		});

	}


	var initLayoutVariablesTrial_version_03=function(returner){
		initDefaultVariables(function(){
			console.log('default variables initialized')
			initDefaultLanguages(function(){
					console.log('default languages initialized')
					for (var userSection in smaLocals.configInJSON.SMA.user_specific){
						console.log(userSection);
						var userSpecific=smaLocals.configInJSON.SMA.user_specific[userSection];
						for(var userIndex in userSpecific.user){
								console.dir(userSpecific.user[userIndex])
								console.log('_____________________________')
								var  userObject=userSpecific.user[userIndex];
								//___________________READY_______________________________________________
								var isAuthenticated=false;

								var userType=userObject.user_type.toString();
								var layoutName;
								var headerName;
								var footerName;
								var logoName;

								var languageObject=[];
								var menusObject=[];
								var defaultPageObject;
								//___________________________JSONS_____________________________________________
								var languageObjectJSON=userObject.languages;
								var menusObjectJSON=userObject.menus;
								var defaultPageObjectJSON=userObject.default_page;
								//      CHECK   IF  VARIABLES ARE   ASSIGNED FOR USERS  OTHERWISE  TAKE THEM FROM DEFAULT   VERSION
								if(userObject.layout_name != undefined & userObject.layout_name!=''){
									layoutName=userObject.layout_name.toString();
								}else{
									layoutName=smaLocals.default_layout_name;
								}

								if(userObject.header_name != undefined & userObject.header_name!=''){
									headerName=userObject.header_name.toString();
								}else{
									headerName=smaLocals.default_header_name;
								}
								if(userObject.footer_name != undefined & userObject.footer_name!=''){
									footerName=userObject.footer_name.toString();
								}else{
									footerName=smaLocals.default_footer_name;
								}
								if(userObject.logo_name != undefined & userObject.logo_name!=''){
									logoName=userObject.logo_name.toString();
								}else{
									logoName=smaLocals.logoImageName;
								}

								initLanguageList(function(){
									initMenu(function(){
										initDefaultPage(function(){

											//define  default active user
											if(userType=='visitor'){
												isAuthenticated=true;
											}


											//     PUSH  NEW  USERS   to    smaLocal
											var user=new sma.userObject(isAuthenticated,userType,layoutName,headerName,footerName,logoName,languageObject,menusObject,defaultPageObject);

											smaLocals.smaUsers.push(user);
											if(isAuthenticated){
												smaLocals.activeUser=user;
											}

										});
									});
								});








								
						}
					}
			})
		})
	}


	var initDefaultVariables=function(call1){
		smaLocals.default_layout_name=smaLocals.configInJSON.SMA.layout_name.toString();
		smaLocals.default_header_name=smaLocals.configInJSON.SMA.header_name.toString();
		smaLocals.default_footer_name=smaLocals.configInJSON.SMA.footer_name.toString();
		smaLocals.logoImageName=smaLocals.configInJSON.SMA.logo_name.toString();
		call1();
	}
	var initDefaultLanguagesold=function(call2){
		for(var language in smaLocals.configInJSON.SMA.languages[0]['language_variable']){

			var lang=smaLocals.configInJSON.SMA.languages[0]['language_variable'][language];

			dbConnector.getLnaguageDisplayName(lang,function(languageDisp,languageSys){
				
				dbConnector.getLanguageGUID(languageSys,function(guid,language){
					console.log('preparing  default  ...... '+languageSys+'  '+languageDisp+'  '+guid);
					
						smaLocals.languageItems.push(new sma.languageObject(guid,languageDisp,languageSys));
					
				});				
			})	
		}
		call2();
	}
	var initDefaultLanguages=function(call2){
		async.forEachSeries(smaLocals.configInJSON.SMA.languages[0]['language_variable'],function(lang,callback0){
				var val=true;
				dbConnector.getLnaguageDisplayName(lang,function(languageDisp,languageSys){
				
					dbConnector.getLanguageGUID(languageSys,function(guid,language){
						    console.log('preparing  default  ...S... '+languageSys+'  '+languageDisp+'  '+guid);
							if(guid==undefined | language==undefined){
								callback0()	;
							}
							else{
								smaLocals.languageItems.push(new sma.languageObject(guid,languageDisp,languageSys));
								console.log('pushed');
								val=false;
								callback0()	;
							}
							
					});				
				});
			  //callback0();
			console.log(val);
			

		},function(err){
			console.log('called back');
			call2();
		});
	}

	var initUsersLanguages=function(languageOBJ,userLanguage,call2){
		async.forEachSeries(languageOBJ['language_variable'],function(lang,callback0){
				var val=true;
				dbConnector.getLnaguageDisplayName(lang,function(languageDisp,languageSys){
				
					dbConnector.getLanguageGUID(languageSys,function(guid,language){
						    console.log('preparing  default  ...USER... '+languageSys+'  '+languageDisp+'  '+guid);
							if(guid==undefined | language==undefined){
								callback0()	;
							}
							else{
								userLanguage.push(new sma.languageObject(guid,languageDisp,languageSys));
								console.log('pushed  for user ....');
								val=false;
								callback0()	;
							}
							
					});				
				});
			  //callback0();
			console.log(val);
			

		},function(err){
			console.log('called back');
			call2();
		});
	}
	var initLanguageList=function(languageObjectJSON,languageObject,call3){
		//   LANGUAGES  FOR USER
				if(languageObjectJSON!= undefined){
					console.log('entering language  object for  .......')
				    console.dir(languageObjectJSON[0]);
					iterateLanguages(function(){
						call3();
					});

				}else{
					languageObject=smaLocals.languageItems;
					call3();
				}		
	}
	var iterateLanguages=function(call4){
		for(var language in languageObjectJSON[0]['language_variable']){

						var lang=languageObjectJSON[0]['language_variable'][language];
						console.log('users  languages is  ---->     '+lang)
						dbConnector.getLnaguageDisplayName(lang,function(languageDisp,languageSys){
							console.log('users  language translated is  ---->     '+lang)
							dbConnector.getLanguageGUID(languageSys,function(guid,language){
								console.log('preparing  ...... '+languageSys+'  '+languageDisp+'  '+guid);
								
									languageObject.push(new sma.languageObject(guid,languageDisp,languageSys));
									console.log('pushed!______-language');
							});				
						})	
					}
	}
	var initMenu=function(menusObjectJSON,menusObject,call5){
		if(menusObjectJSON != undefined){
					for(var menu_item in menusObjectJSON[0]['menu_item']){
						//smaLocals.menuItems.push(smaLocals.configInJSON.SMA.menus[0]['menu_item'][menu_item]);
						menusObject.push(new sma.menuItem(menusObjectJSON[0]['menu_item'][menu_item].screen_name,
																  menusObjectJSON[0]['menu_item'][menu_item].screen_page[0].page_title,
																  menusObjectJSON[0]['menu_item'][menu_item].screen_page[0].page_view_name
							));
						console.log('menues  pushed');
					}
				}
		call5();
	}
	var initDefaultPage=function(defaultPageObjectJSON,defaultPageObject,call6){
		if(defaultPageObjectJSON != undefined){

					defaultPageObject=new sma.defaultPageObject(defaultPageObjectJSON[0]['page_title'],
																defaultPageObjectJSON[0]['page_view_name']);
					console.log('default page is .....')
					console.dir(defaultPageObject);
				}

		console.log('default page is calling  back')
		call6(defaultPageObject);
	}
	var initLayoutVariablesTrial_version_02=function(returner){
		//  default page elements
		smaLocals.default_layout_name=smaLocals.configInJSON.SMA.layout_name.toString();
		smaLocals.default_header_name=smaLocals.configInJSON.SMA.header_name.toString();
		smaLocals.default_footer_name=smaLocals.configInJSON.SMA.footer_name.toString();

		//    LANGUAGES
		for(var language in smaLocals.configInJSON.SMA.languages[0]['language_variable']){

			var lang=smaLocals.configInJSON.SMA.languages[0]['language_variable'][language];

			dbConnector.getLnaguageDisplayName(lang,function(languageDisp,languageSys){
				
				dbConnector.getLanguageGUID(languageSys,function(guid,language){
					console.log('preparing  default  ...... '+languageSys+'  '+languageDisp+'  '+guid);
					
						smaLocals.languageItems.push(new sma.languageObject(guid,languageDisp,languageSys));
					
				});				
			})	
		}
		//    USER SPECIFIC_______________________________________________________________

		for (var userSection in smaLocals.configInJSON.SMA.user_specific){
			console.log(userSection);
			var userSpecific=smaLocals.configInJSON.SMA.user_specific[userSection];
			for(var userIndex in userSpecific.user){
				console.dir(userSpecific.user[userIndex])
				console.log('_____________________________')
				var  userObject=userSpecific.user[userIndex];
				//___________________READY_______________________________________________
				var isAuthenticated=false;

				var userType=userObject.user_type.toString();
				var layoutName;
				var headerName;
				var footerName;
				var logoName;

				var languageObject=[];
				var menusObject=[];
				var defaultPageObject;
				//___________________________JSONS_____________________________________________
				var languageObjectJSON=userObject.languages;
				var menusObjectJSON=userObject.menus;
				var defaultPageObjectJSON=userObject.default_page;

				//      CHECK   IF  VARIABLES ARE   ASSIGNED FOR USERS  OTHERWISE  TAKE THEM FROM DEFAULT   VERSION
				if(userObject.layout_name != undefined & userObject.layout_name!=''){
					layoutName=userObject.layout_name.toString();
				}else{
					layoutName=smaLocals.default_layout_name;
				}

				if(userObject.header_name != undefined & userObject.header_name!=''){
					headerName=userObject.header_name.toString();
				}else{
					headerName=smaLocals.default_header_name;
				}
				if(userObject.footer_name != undefined & userObject.footer_name!=''){
					footerName=userObject.footer_name.toString();
				}else{
					footerName=smaLocals.default_footer_name;
				}
				if(userObject.logo_name != undefined & userObject.logo_name!=''){
					logoName=userObject.logo_name.toString();
				}else{
					logoName=smaLocals.logoImageName;
				}
				
				//__________________________LANGUAGES TRIAL__________________________________________
				


				if(languageObjectJSON!= undefined){
					console.log('entering language  object for  .......')
				    console.dir(languageObjectJSON[0]);
					for(var language in languageObjectJSON[0]['language_variable']){

						var lang=languageObjectJSON[0]['language_variable'][language];
						console.log('users  languages is  ---->     '+lang)
						var  languageDisplayName;
						var  languageGUID;

						languageDisplayName=dbConnector.getLnaguageDisplayName_blocking(lang);
						languageGUID=dbConnector.getLanguageGUID_blocking(lang);


					}

				}else{
					languageObject=smaLocals.languageItems;
				}


				

				
				//____________________________________________________________________________________
				//  MENU ITEMS    FOR USER
				if(menusObjectJSON != undefined){
					for(var menu_item in menusObjectJSON[0]['menu_item']){
						//smaLocals.menuItems.push(smaLocals.configInJSON.SMA.menus[0]['menu_item'][menu_item]);
						menusObject.push(new sma.menuItem(menusObjectJSON[0]['menu_item'][menu_item].screen_name,
																  menusObjectJSON[0]['menu_item'][menu_item].screen_page[0].page_title,
																  menusObjectJSON[0]['menu_item'][menu_item].screen_page[0].page_view_name
							));
					}
				}
				//      DEFAULT PAGE  FOR USER

				if(defaultPageObjectJSON != undefined){
					defaultPageObject=new sma.defaultPageObject(defaultPageObjectJSON[0]['page_title'],
																defaultPageObjectJSON[0]['page_view_name']);
				}
				

				//define  default active user
				if(userType=='visitor'){
					isAuthenticated=true;
				}


				//     PUSH  NEW  USERS   to    smaLocal
				var user=new sma.userObject(isAuthenticated,userType,layoutName,headerName,footerName,logoName,languageObject,menusObject,defaultPageObject);

				smaLocals.smaUsers.push(user);
				if(isAuthenticated){
					smaLocals.activeUser=user;
				}


			}
			

		}
		returner();

	}

	
	


}



module.exports.configReader=configReader;