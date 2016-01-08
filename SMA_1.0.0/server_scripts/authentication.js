var localStrategy=require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');

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
  					smaLocals.userInSession=ozkartUser;
            //smaLocals.userType=ozkartUser.userRole;
            for(userIndex in smaLocals.smaUsers){
              console.log(smaLocals.smaUsers[userIndex].userType+' VS '+ozkartUser.userRole)
              if(smaLocals.smaUsers[userIndex].userType==ozkartUser.userRole){
                console.dir(smaLocals.smaUsers[userIndex]);
                smaLocals.activeUser=smaLocals.smaUsers[userIndex];
                smaLocals.activeUser.isAuthenticated=true;
                break;
              }
            }
  					return done(null,ozkartUser);
  				}else{
  					return  done(null,false);
  				}
  			}else{
  				return  done(null,false);
  			}
  	}));
  	

/*   LOG OUT
for(userIndex in smaLocals.smaUsers){
              
              if(smaLocals.smaUsers[userIndex].userType==visitor){
                smaLocals.activeUser=smaLocals.smaUsers[userIndex];
                smaLocals.activeUser.isAuthenticated=true;
                break;
              }
            }
*/
    passport.use('local-signup',new localStrategy({
      usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
      },function(req,email,password,done){
     /*   dbConnector.registerUser(function(err,newuser){
          if(err)
            return done(null)
          else
            return done(newuser);

        };
       */ 
      }));

  }


