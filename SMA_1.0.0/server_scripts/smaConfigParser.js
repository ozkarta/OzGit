var   configReader=function(sma,app,smaLocals,fs,dbConnector,xmlObject,utf8){
	this.app=app;
	this.smaLocals=smaLocals;

	this.k='ozKart';

    //----------------------------------------------------------------------------------
	configReader.prototype.parseConfig=function (){
	var data=fs.readFileSync('./configurations/SMAconfig.0.01.XML','utf8');
	
	var parser=new xmlObject.Parser();
	parser.parseString(data,function(err,result){
					smaLocals.configInJSON=result;
					initLayoutVariables();
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

		smaLocals.defaultPage=new sma.defaultPageObject(smaLocals.configInJSON.SMA.default_page[0]['page_title'],
																smaLocals.configInJSON.SMA.default_page[0]['page_view_name']);



	};
	//-------------------------------------------------------------------------------------------


}



module.exports.configReader=configReader;