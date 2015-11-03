var dbConnector=function(sql){
	this.sql=sql;
	this.connectionJson={
		user:'node.js',
		password:'12qwert12',
		server:'78.139.172.254',
		database:'smaDataBase',
		options: {
        	encrypt: true // Use this if you're on Windows Azure 
    	}
	};

//Data Source=OZKART-PC;Initial Catalog=smaDataBase;Integrated Security=True


	dbConnector.prototype.getLanguageList=function(){
			var connection = new this.sql.Connection(this.connectionJson, function(err) {
		    // ... error checks 
		    //console.log(err.toString());
		    // Query 
		    
		    var request = new sql.Request(connection); // or: var request = connection.request(); 
		    request.query('select * from languages', function(err, recordset) {
		        // ... error checks 
		        //console.log(err.toString());
		        
		        console.log('value from db is '+recordset[0]['languageName']);
		    });
		    
		 
			});
	}
	dbConnector.prototype.getLanguageGUID=function(languageSysName,callback){
			var connection = new this.sql.Connection(this.connectionJson, function(err) {
		    	var request=new sql.Request(connection);
				request.input('languageName', sql.VarChar, languageSysName);
			    //request.output('output_parameter', sql.VarChar(50));
			    request.execute('getLanguageGUID', function(err, recordsets, returnValue) {
			        // ... error checks 
			        //console.log('began  db  '+languageSysName.toString());
				        if( recordsets != undefined ){
				        	if( recordsets[0] != undefined ){
					        		if( recordsets[0][0] != undefined ){
					        		 //console.log(recordsets[0][0]);
							        //console.log(languageSysName+' __ '+recordsets[0][0].languageGUID);
							        callback(recordsets[0][0].languageGUID,languageSysName);
							       // return recordsets[0][0].languageGUID;
							    }else{
						    		console.log('broken  party!!!');
						    		//return '';
						    	}
				        	}else{
						    		console.log('broken  party!!!');
						    		//return '';
						    	}							       
				    	}else{
					    		console.log('broken  party!!!');
					    		//return '';
					    	}

	    			});
		 
			});
	}

dbConnector.prototype.getLnaguageDisplayName=function(languageSysName,callback){
	var connection = new this.sql.Connection(this.connectionJson, function(err) {
		    	var request=new sql.Request(connection);
				request.input('languageName', sql.VarChar, languageSysName);
			    //request.output('output_parameter', sql.VarChar(50));
			    request.execute('getLanguageDisplayName', function(err, recordsets, returnValue) {
			        // ... error checks 
			       // console.log('began  db  '+languageSysName.toString());
				        if( recordsets != undefined ){
				        	if( recordsets[0] != undefined ){
					        		if( recordsets[0][0] != undefined ){
					        		 //console.log(recordsets[0][0]);
							       // console.log(languageSysName+' __ '+recordsets[0][0].languageDisplayName);
							        callback(recordsets[0][0].languageDisplayName,languageSysName);
							       // return recordsets[0][0].languageDisplayName;
							    }else{
						    		console.log('broken  party!!!');
						    		//return '';
						    	}
				        	}else{
						    		console.log('broken  party!!!');
						    		//return '';
						    	}							       
				    	}else{
					    		console.log('broken  party!!!');
					    		//return '';
					    	}

	    			});
		 
			});
	}
	
};

module.exports.dbConnector=dbConnector;