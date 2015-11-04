var   configReader=function(sma,app,smaLocals,fs,dbConnector,xmlObject,utf8){
	this.app=app;
	this.smaLocals=smaLocals;

	this.k='ozKart';

    //----------------------------------------------------------------------------------
	configReader.prototype.parseConfig=function (){
	//var data=fs.readFileSync('./configurations/SMAconfig.0.01.XML','utf8');
	var data=fs.readFileSync('./configurations/SMAconfig.0.02.XML','utf8');
	
	var parser=new xmlObject.Parser();
	parser.parseString(data,function(err,result){
					smaLocals.configInJSON=result;
					//initLayoutVariables();


					initLayoutVariablesTrial_version_02();
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

	var initLayoutVariablesTrial_version_02=function(){
		//  default page elements
		smaLocals.default_layout_name=smaLocals.configInJSON.SMA.layout_name.toString();
		smaLocals.default_header_name=smaLocals.configInJSON.SMA.header_name.toString();
		smaLocals.default_footer_name=smaLocals.configInJSON.SMA.footer_name.toString();

		//    LANGUAGES
		for(var language in smaLocals.configInJSON.SMA.languages[0]['language_variable']){

			var lang=smaLocals.configInJSON.SMA.languages[0]['language_variable'][language];

			dbConnector.getLnaguageDisplayName(lang,function(languageDisp,languageSys){
				
				dbConnector.getLanguageGUID(languageSys,function(guid,language){
					console.log('preparing  ...... '+languageSys+'  '+languageDisp+'  '+guid);
					
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
				if(userObject.layout_name != undefined){
					layoutName=userObject.layout_name.toString();
				}else{
					layoutName=smaLocals.layoutName;
				}

				if(userObject.header_name != undefined){
					headerName=userObject.header_name.toString();
				}else{
					headerName=smaLocals.headerName;
				}
				if(userObject.footer_name != undefined){
					footerName=userObject.footer_name.toString();
				}else{
					footerName=smaLocals.footerName;
				}
				if(userObject.logo_name != undefined){
					logoName=userObject.logo_name.toString();
				}else{
					logoName=smaLocals.logoName;
				}
				
				
				//   LANGUAGES  FOR USER
				if(languageObjectJSON!= undefined){
					console.log('entering language  object for  .......')
				    console.dir(languageObjectJSON[0]);
					for(var language in languageObjectJSON[0]['language_variable']){

						var lang=languageObjectJSON[0]['language_variable'][language];

						dbConnector.getLnaguageDisplayName(lang,function(languageDisp,languageSys){
							
							dbConnector.getLanguageGUID(languageSys,function(guid,language){
								console.log('preparing  ...... '+languageSys+'  '+languageDisp+'  '+guid);
								
									languageObject.push(new sma.languageObject(guid,languageDisp,languageSys));
									console.log('pushed!______-language');
							});				
						})	
					}

				}else{
					languageObject=smaLocals.languageItems;
				}
				
				
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


	}



}



module.exports.configReader=configReader;