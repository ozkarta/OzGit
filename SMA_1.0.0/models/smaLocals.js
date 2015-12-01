
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
					'additionalMenuItems': this.activeUser.additionalMenuItems,
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
				console.log('returned:)) with '+this.activeUser.selectedLanguage);
				this.translateActiveUser(function(){
					console.log('-------------------------------------translation----  calling back')
					callback();		
				});
				break;
			};
		}
		
	}

	smaLocals.prototype.translateActiveUser = function(callback){


		//  find active language GUID
		var activeLanguageGUID='';
		for(var lang in this.activeUser.languageItems){
				if(this.activeUser.languageItems[lang].languageSystemName==this.activeUser.selectedLanguage){
					activeLanguageGUID=this.activeUser.languageItems[lang].languageGUID;
				}
		}



		//console.log('______________________TRANSLATING______________________________');
		//console.dir(this.activeUser.menuItems);

		console.log('began  translation ......')
		async.forEach(this.activeUser.menuItems,function(item1,callback1){
			db.getVariableTranslated(activeLanguageGUID,item1.systemName,function(val){
				if(val != undefined){
					item1.screenName=val;
				}
				
				//console.log('item 1  is ---->  '+val)
				db.getVariableTranslated(activeLanguageGUID,item1.pageTitle,function(val2){
					if(val2!=undefined){
						item1.pageTitle=val2;
					}					
				});
				callback1();
			});
			
		},function(err){
			console.log('translation  was complete');
			callback();
		});
		
	}
}
	
//____________________________________OUT_OF_CLASS_VARIABLES________________________________________________________
var menuItem=function(screenName,pageTitle,viewName){
	this.screenName=screenName;
	this.systemName=screenName;
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

var userObject=function(isAuthenticated,userType,layoutName,headerName,footerName,logoName,languageItems,menuItems,additionalMenuItems,defaultPage){
	this.isAuthenticated=isAuthenticated;


	this.userType=userType;
	this.layoutName=layoutName;
	this.headerName=headerName;
	this.footerName=footerName;
	this.logoName=logoName;

	this.languageItems=languageItems;
	this.selectedLanguage='georgian';

	this.menuItems=menuItems;
	this.additionalMenuItems=additionalMenuItems;
	this.defaultPage=defaultPage;

	this.userInSession;
}

var userSession=function(guid,email,password,userRole){
	
	this.guid=guid;
	this.email=email;
	this.passpord=password;
	this.userRole=userRole;
}



//_________________________________________________________________________________________________________________

module.exports.smaLocals=smaLocals;
module.exports.menuItem=menuItem
module.exports.defaultPageObject=defaultPageObject;
module.exports.languageObject=languageObject;
module.exports.userObject=userObject;
module.exports.userSession=userSession;