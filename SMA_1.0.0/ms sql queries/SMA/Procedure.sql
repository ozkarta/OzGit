use smaDataBase


DECLARE @sql NVARCHAR(MAX) = N'';

SELECT @sql += N'DROP PROCEDURE dbo.'
  + QUOTENAME(name) + ';
' FROM sys.procedures
WHERE name LIKE N'%'
--AND SCHEMA_NAME(schema_id) like N'%';

--select @sql

EXEC sp_executesql @sql;
go
--				HISTORY 1
-------------------------------------------------------------------------------------------------------------
--create procedure  getLanguageList
--as
--begin 
--	select * from languages
--end
--go

--create procedure getLanguageGUID
--@languageName  varchar(50)
--as
--begin
--	select languageGUID from languages where languageSystemName=@languageName
--end
--go

--create procedure getLanguageDisplayName
--@languageName  varchar(50)
--as
--begin
--	select languageDisplayName from languages where languageSystemName=@languageName
--end
--go

--create procedure getVariableList
--as 
--begin
--	select distinct variableName from variables
--end

--go
--create procedure getAccessLevelsList
--as
--begin
--	select * from accessLevels where  levelName <>   'visitor'  and levelName <>  'SMAManager' order by level
--end
--go
--------------------------------------------

--create procedure  getTranslatedVariableValue

--@languageGUID  varchar(50),
--@variableName  varchar(100)
--as
--begin
--	select value from variables where variables.languageGUID=@languageGUID and variables.variableName=@variableName
--end

--go

----------------------------------------------------------------

--create procedure userNameValidation
--@userName  varchar(100)
--as 

--begin
--	if exists(select [userName] from usersGeneral where [userName]=@userName)
--		select '-1'
--	else  select '1'
--end

--go
---------------------------------------------------------------


--create procedure registerUser
--@defaultLanguage nvarchar(100),
--@userName nvarchar(500),
--@firstName nvarchar(500),
--@lastName nvarchar(500),
--@phone varchar(100),
--@email varchar(500),
--@passwordHash varchar(max),
--@salt varchar(max),
--@accessLevelGUID varchar(50),
--@passportId varchar(20)
--as
--begin
--	declare @accesLevelGUID varchar(50)
	
--	declare @userGUID varchar(50)
--	set @userGUID=newid()
--	insert into usersGeneral ([languageGUID],[userGUID],[levelGUID],[email],[emailConfirmed],[passwordHash],[salt], [phoneNumber],	[phoneNumberConfirmed]	, [accessFailedCount], [userName],[firstName],	
--	[lastName],[passportID]		,[registerDate]	)
--	values(@defaultLanguage,@userGUID,@accessLevelGUID,@email,0,@passwordHash,@salt,@phone,0,0,@userName,@firstName,@lastName,@passportId,getdate())
--	select @userGUID
--end

--go

------------------------------------


--create procedure activateUser
--@userGUID varchar(50)
--as
--begin
--	update  usersGeneral
--		set	emailConfirmed=1	where userGUID=@userGUID
			
--end
--go
--------------------------------------------------

--create procedure getSalt
--@user  varchar( max )
--as
--begin
--	select salt from usersGeneral where userName=@user and emailConfirmed='1' 
--end
--go


--create procedure compareHashedPasswords
--@newPasswordHash as varchar(max)
--as
--begin
--	if exists (select * from usersGeneral where passwordHash=@newPasswordHash)
--		begin
--			select	'1'
--		end
--	else
--		begin
--			select '0'
--		end
	
--end

--go


--create procedure getAccessLevel
--@user   as varchar(max)
--as 
--begin
--	declare @roleGUID as   varchar(50)
--	set @roleGUID = (select levelGUID from usersGeneral where userName=@user)
--	select levelName	from accessLevels  where levelGUID=@roleGUID
--end

--go
--create procedure  getUserGUID

--@user	as varchar(max)
--as 
--begin

--	select userGuid from usersGeneral where userName=@user
--end
--go 


--getLanguageDisplayName 'georgian'



--  HISTORY 2

--___________________________________________________________________________________
create procedure getLanguageGUID
@languageName  varchar(50)
as
begin
	select languageGUID from languages where languageSystemName=@languageName
end
go
--___________________________________________________________________________________
create procedure getLanguageDisplayName
@languageName  varchar(50)
as
begin
	select languageDisplayName from languages where languageSystemName=@languageName
end
go
--___________________________________________________________________________________
create procedure  getTranslatedVariableValue

@languageGUID  varchar(50),
@variableName  varchar(100)
as
begin
	select value from variables where variables.languageGUID=@languageGUID and variables.variableName=@variableName
end

go
--___________________________________________________________________________________