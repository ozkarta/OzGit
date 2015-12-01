var localStrategy=require('passport-local').Strategy;
var ozkartUser;

  module.exports=function(passport,sma,smaLocals){

  	passport.serializeUser(function(user, done) {
	  done(null, user.guid);
	});

	passport.deserializeUser(function(guid, done) {
	  //User.findById(id, function(err, user) {
	    //done(err, user);
	  //});
	done(null,ozkartUser.guid)
	});


	


  	passport.use('local-login',new localStrategy({
  		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
  	},function(req,email,password,done){
  		console.log('____________________________________');
  		console.log(email+'   email');
  		console.log(password+'   password');
  		if(email=='ozbegi'){
  				if(password=='12qwert12'){
  					//var k=new sma.userSession('GUID','ozbegi','12qwert12','client');
  					ozkartUser=new sma.userSession('GUID',email,password,'client');
  					smaLocals.activeUser.userInSession=ozkartUser;
  					return done(null,ozkartUser);
  				}else{
  					return  done(null,false);
  				}
  			}else{
  				return  done(null,false);
  			}
  	}));
  	
  }


