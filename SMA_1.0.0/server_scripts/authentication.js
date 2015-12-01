var localStrategy=require('passport-local').Strategy;

  module.exports=function(passport,sma){

  	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});


	console.log('__________this  is  the   authentication_______________')
	console.dir(sma);


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
  					
  					var user=new sma.userSession('GUID',email,password,'client');
  					sma.activeUser.userInSession=user;
  					return done(null,user);
  				}else{
  					return  done(null,false);
  				}
  			}else{
  				return  done(null,false);
  			}
  	}));
  	
  }


