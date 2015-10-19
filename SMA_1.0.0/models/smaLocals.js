var smaLocals=function(){
	this.configInJSON;

	this.default_layout_name;
	this.default_header_name;
	this.default_footer_name;
	this.logoImageName;

	this.menuItems=[];
	this.languageItems=[];
	this.defaultPage;
	this.selectedLanguage='georgian';
    //console.log('smaLocals constructor  was invoked')
	smaLocals.prototype.locals=function(){
		var toReturn={
				locals: {
					'menuItems' : this.menuItems,
					'logoName': this.logoImageName,
					'languageItems': this.languageItems,
					'currentLanguage':this.selectedLanguage,
					'defaultPage':this.defaultPage
					}
				}
		console.log("yleoba aris ----- "+toReturn.locals.currentLanguage);

		return  toReturn;
	}
	smaLocals.prototype.setSelectedLanguage=function(languageNameProvided,callback){
	
		for(var langObject in this.languageItems){
			//console.log(this.languageItems[langObject].languageName+" VS "+languageNameProvided);
			if (this.languageItems[langObject].languageName===languageNameProvided){
			this.selectedLanguage=this.languageItems[langObject].languageSystemName;	
			console.log(this.languageItems[langObject].languageName+" VS "+languageNameProvided);
			console.log('returned:)) with '+this.selectedLanguage)
			callback();		
			};
		}
		
	}

}

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


module.exports.smaLocals=smaLocals;
module.exports.menuItem=menuItem
module.exports.defaultPageObject=defaultPageObject;
module.exports.languageObject=languageObject;