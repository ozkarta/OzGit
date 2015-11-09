
var async=require('async');

var smaLocals=function(db){
	this.configInJSON;

	this.default_layout_name;
	this.default_header_name;
	this.default_footer_name;
	this.logoImageName;

	this.languageItems=[];
	this.selectedLanguage='georgian';


	this.activeUser;

	this.smaUsers=[];

	this.activePage;
    

	smaLocals.prototype.setActivePage=function(viewName){
		console.log('Activator  function')
		console.dir(this.activeUser.menuItems);
		for(var view in this.activeUser.menuItems){
			console.log('opa1')
			console.log(viewName +'VS'+ '/'+this.activeUser.menuItems[view].viewName)


			if (viewName == '/'+this.activeUser.menuItems[view].viewName){

				this.activePage=this.activeUser.menuItems[view];
			}
		}
	}


	smaLocals.prototype.locals=function(){
		//console.dir(this.activeUser)
		var toReturn={
				locals: {
					'menuItems' : this.activeUser.menuItems,
					'logoName': this.activeUser.logoName,
					'languageItems': this.activeUser.languageItems,
					'currentLanguage':this.activeUser.selectedLanguage,
					'activePage':this.activePage
					}
				}
		console.log("yleoba aris ----- "+toReturn.locals.currentLanguage);

		return  toReturn;
	}
	smaLocals.prototype.setSelectedLanguage=function(languageNameProvided,callback){
	
		for(var langObject in this.activeUser.languageItems){
			//console.log(this.languageItems[langObject].languageName+" VS "+languageNameProvided);
			if (this.activeUser.languageItems[langObject].languageName===languageNameProvided){
			this.activeUser.selectedLanguage=this.activeUser.languageItems[langObject].languageSystemName;	
			console.log(this.activeUser.languageItems[langObject].languageName+" VS "+languageNameProvided);
			console.log('returned:)) with '+this.activeUser.selectedLanguage)
			callback();		
			};
		}
		
	}



	smaLocals.prototype.translateActiveUser = function(callback){



		var activeLanguageGUID='';
		for(var lang in this.activeUser.languageItems){
				if(this.activeUser.languageItems[lang].languageSystemName==this.activeUser.selectedLanguage){
					activeLanguageGUID=this.activeUser.languageItems[lang].languageSystemName;
				}
		}



		console.log('______________________TRANSLATING______________________________');
		console.dir(this.activeUser.menuItems);


		async.forEach(this.activeUser.menuItems,function(item1,callback){
			db.getVariableTranslated(activeLanguageGUID,item1.screenName,function(val){
				item1.screenName=val;
				db.getVariableTranslated(activeLanguageGUID,item1.pageTitle,function(val2){
					item1.pageTitle=val2;
				});
			});
			callback();
		},function(err){
			callback();
		});

		
	}
}
	
//____________________________________OUT_OF_CLASS_VARIABLES________________________________________________________
var menuItem=function(screenName,pageTitle,viewName){
	this.screenName=screenName;
	this.pageTitle=pageTitle;
	this.viewName=viewName;

}

var defaultPageObject=function(pageTitle,viewName){
	this.pageTitle=pageTitle;
	this.viewName=viewName;
}

var languageObject=function(languageGUID,languageName,languageSystemName){
	this.languageGUID=languageGUID;
	this.languageName=languageName;
	this.languageSystemName=languageSystemName;
}

var userObject=function(isAuthenticated,userType,layoutName,headerName,footerName,logoName,languageItems,menuItems,defaultPage){
	this.isAuthenticated=isAuthenticated;


	this.userType=userType;
	this.layoutName=layoutName;
	this.headerName=headerName;
	this.footerName=footerName;
	this.logoName=logoName;

	this.languageItems=languageItems;
	this.selectedLanguage='georgian';

	this.menuItems=menuItems;

	this.defaultPage=defaultPage;
}



//_________________________________________________________________________________________________________________

module.exports.smaLocals=smaLocals;
module.exports.menuItem=menuItem
module.exports.defaultPageObject=defaultPageObject;
module.exports.languageObject=languageObject;
module.exports.userObject=userObject;