USE master
IF EXISTS(select * from sys.databases where name='smaDataBase')
begin
	DROP DATABASE smaDataBase
end

go

CREATE DATABASE smaDataBase
go
		
use smaDataBase
go


----------------------------------------------------------------------------------


create  table  [languages]
(
	[languageGUID]					varchar(50) not null,
	[languageSystemName]					Nvarchar(50) not null,
	[languageDisplayName]			nvarchar(500) not null
)
go
create table [variables]
(
	[languageGUID]					varchar(50) not null,
	[variableGUID]					varchar(50) not null,
	[variableName]					Nvarchar(100) not null,
	[value]							Nvarchar(max) not null
)

go
create table countriesIso
(
	[countryGUID]				varchar(50) not null,
	[Comman Name]				varchar(500) not null,
	[Formal Name]				varchar(500) not null,
	[Type]						varchar(500) not null,
	[Capital]					varchar(500) not null,
	[ISO 4217 Currency Code]	varchar(500) not null,
	[ISO 4217 Currency Name]	varchar(500) not null,
	[ITU-T Telephone Code]		varchar(100) not null,
	[ISO 3166-12 Letter Code]   varchar(100) not null,
	[ISO 3166-13 Letter Code]	varchar(100) not null,
	[IANA Country Code TLD]		varchar(100) not null
)


GO

create table [accessLevels]
(
	[levelGUID]						varchar(50) not null,
	[level]							int not null,
	[levelName]						varchar(50),
)
go
CREATE TABLE [usersGeneral] 
(
	[LanguageGUID]					varchar(50) not null,						--  As  Default Language  
	[userGUID]                      VARCHAR (50)   NOT NULL default newid(),
	[levelGUID]						varchar(50) not null,
	---------------------Autorization
    
    [email]							NVARCHAR (256) not NULL,
    [emailConfirmed]				BIT            NOT NULL default 0,
    [passwordHash]					NVARCHAR (MAX) not NULL,
    [salt]					NVARCHAR (MAX) not NULL,
    [phoneNumber]					NVARCHAR (MAX) not NULL,
    [phoneNumberConfirmed]			BIT            NOT NULL DEFAULT 0,
    [accessFailedCount]				INT            NOT NULL default 0,
    [userName]						NVARCHAR (256) NOT NULL,
	
	---------------------General Info
	[firstName]							Nvarchar(500) not null,
	[lastName]		    				Nvarchar(1000) not null,	
	[passportID]						nvarchar(20) not null,


	--------------------Auto  Generated
	[registerDate]						datetime  default getdate()
	
);

go 

create table clientProfile
(
	[CountryGUID]						varchar(50) not null,
	[City]								varchar(100) not null,
	[Address1]							varchar(100) not null,
	[Address2]							varchar(100) not null,
	[PassportId]						varchar(20) not null,

	[clientGUID]						varchar(50) not null,
	[userGUID]							varchar(50) not null

)
go
create table workerProfile
(
	[CountryGUID]						varchar(50) not null,
	[City]								varchar(100) not null,
	[Address1]							varchar(100) not null,
	[Address2]							varchar(100) not null,
	[PassportId]						varchar(20) not null,

	[School]							nvarchar(500) not null,
	[schoolBeginDate]					datetime not null,
	[SchoolEndDate]						datetime not null,
	[University]						nvarchar(500) not null,
	[UniversityBeginDate]				datetime not null,
	[UniversityEndDate]					datetime not null,
	[Faculty]							nvarchar(500) not null,
	[CurrentProfession]					nvarchar(500) not null,
	
	[CompanyGUID]						nvarchar(50) not null,
	[Sallery]							nvarchar(10) not null,

	[ScheduleGUID]						varchar(50) not null,

	[WorkerGUID]						varchar(50) not null,
	[userGUID]							varchar(50) not null

)
go
create table HRProfile
(
	[CountryGUID]						varchar(50) not null,
	[City]								varchar(100) not null,
	[Address1]							varchar(100) not null,
	[Address2]							varchar(100) not null,
	[PassportId]						varchar(20) not null,

	[School]							nvarchar(500) not null,
	[schoolBeginDate]					datetime not null,
	[SchoolEndDate]						datetime not null,
	[University]						nvarchar(500) not null,
	[UniversityBeginDate]				datetime not null,
	[UniversityEndDate]					datetime not null,
	[Faculty]							nvarchar(500) not null,
	[CurrentProfession]					nvarchar(500) not null,
	
	[CompanyGUID]						nvarchar(50) not null,
	[Sallery]							nvarchar(10) not null,

	[HRGUID]							varchar(50) not null,
	[userGUID]							varchar(50) not null
)
go
create table  job
(
	[jobGUID]							varchar(50) not null,
	[jobTitle]							nvarchar(150) not null,
	[jobDescription]					nvarchar(100) not null,

	[IsFixedPrice]						bit default 0,
	[IsHourly]							bit default 0,

	[fixedPrice]						varchar(10) not null,
	[hourly]							varchar(10) not null,
	[currencyGUID]						varchar(50) not null,

	[beginDate]							datetime  not null,
	[endDate]							datetime not null,

	[jobTypeGroupGUID]					varchar(50) not null

)
go

create table mediaForJob
(
	[mediaGUID]							varchar(50) not null,
	[jobGUID]							varchar(50) not null,
	[mediaType]							varchar(50) not null,
	[mediaLink]							varchar(max) not null,
	[mediaName]							varchar(500) not null,
	[mediaExtension]					varchar(20) not null

)
go

create table interviews
(
	[interviewGUID]						varchar(50) not null,
	[jobGUID]							varchar(50) not null,

	[candidateHRGUID]					varchar(50) not null,
	[suggestedPrice]					varchar(10) not null,
	[isGranted]							bit default 0 ,
	[candidateMotivationLetter]			nvarchar(max),

)

create table schedule
(
	[ScheduleGUID]						varchar(50) not null

)
go
