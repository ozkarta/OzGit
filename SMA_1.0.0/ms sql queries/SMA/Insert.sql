use smaDataBase
go
delete from languages
delete from variables
delete  from accessLevels
delete from usersGeneral

declare @en as varchar(50)
set @en=newid()
declare @ge  varchar(50)
set @ge =newid()
declare @ru  varchar(50)
set @ru=newid()
insert into languages(languageGUID,languageSystemName,languageDisplayName)
values(@en,N'english',N'English'),(@ge,N'georgian',N'ქართული'),(@ru,N'russian',N'русский')

insert into variables(languageGUID,variableGUID,variableName,value)

values  ------------------------------------------
		--			DEFAULT
		--------------ENG-----------------------------
		(@en,newid(),'home','Home'),
		(@en,newid(),'homeTitle','SMA  Home Page Title'),

		(@en,newid(),'about','About'),
		(@en,newid(),'aboutTitle','About page title'),

		(@en,newid(),'contact','Contact'),
		(@en,newid(),'contactTitle','Contact page title'),

		(@en,newid(),'login','Log In'),
		(@en,newid(),'register','Register'),

		-----------------GEO----------------------------
		
		(@ge,newid(),'home',N'სახლი'),
		(@ge,newid(),'homeTitle',N'SMA სახლი'),

		(@ge,newid(),'about',N'ჩვენს შესახებ'),
		(@ge,newid(),'aboutTitle',N'კომპანიის შესახებ'),

		(@ge,newid(),'contact',N'საკონტაქტო ინფორმაცია'),
		(@ge,newid(),'contactTitle',N'ჩვენი საკონტაქტო ინფორმაცია'),

		(@ge,newid(),'login',N'სისტემაში შესვლა'),
		(@ge,newid(),'register',N'რეგისტრაცია'),
		-----------------------------------------------------------
		--  LogIn + Registration 
		--------------------------------------------------------------
		(@en,newid(),'default_language','Default Language'),
		(@en,newid(),'registration_type','Registration Type'),
		(@en,newid(),'registration_user_name','User Name'),
		(@en,newid(),'registration_first_name','First Name'),
		(@en,newid(),'registration_last_name','Last Name'),
		(@en,newid(),'registration_phone_number','Contact Phone Number'),
		(@en,newid(),'registration_email','EMAIL'),
		(@en,newid(),'registration_passport_id','Passport Document ID'),
		(@en,newid(),'registration_password','Password'),
		(@en,newid(),'registration_confirm_password','Confirm Password'),
		(@en,newid(),'register_button','Register'),
		(@en,newid(),'register_window_title','Sign Up  On   '),
		(@en,newid(),'register_page_title','Registration On Ozzle'),
		(@en,newid(),'log_in_window_title','Log In  '),
		(@en,newid(),'log_in_user_name','User Name'),
		(@en,newid(),'log_in_password','Password'),
		(@en,newid(),'log_in_button','Log In'),
		(@en,newid(),'log_in_page_title','Log In  Ozzle'),
		
		(@ge,newid(),'default_language',N'ვებ საიტის ენა'),
		(@ge,newid(),'registration_type',N'რეგისტრაციის ტიპი'),
		(@ge,newid(),'registration_user_name',N'მომხმარებლის  ნიკი'),
		(@ge,newid(),'registration_first_name',N'სახელი'),
		(@ge,newid(),'registration_last_name',N'გვარი'),
		(@ge,newid(),'registration_phone_number',N'საკონტაკტო ტელეფონი'),
		(@ge,newid(),'registration_email',N'ელეკტრონული ფოსტა'),
		(@ge,newid(),'registration_passport_id',N'პირადი ნომერი'),
		(@ge,newid(),'registration_password',N'პაროლი'),
		(@ge,newid(),'registration_confirm_password',N'დაადასტურეთ პაროლი'),
		(@ge,newid(),'register_button',N'რეგისტრაცია'),
		(@ge,newid(),'register_window_title',N'რეგისტრაციის ფორმა  '),
		(@ge,newid(),'register_page_title',N'რეგისტრაცია   Ozzle - ზე'),
		(@ge,newid(),'log_in_window_title',N'ავტორიზაცია'),
		(@ge,newid(),'log_in_user_name',N'მომხმარებლის სახელი'),
		(@ge,newid(),'log_in_password',N'პაროლი'),
		(@ge,newid(),'log_in_button',N'სისტემაში შესვლა'),
		(@ge,newid(),'log_in_page_title',N'ავტორიზაცია  Ozzle - ზე'),		
		------------------------------------------------
		--client  space  
		------------------------------------------------
		(@en,newid(),'client_jobs',N'My Created Jobs'),
		(@en,newid(),'client_applies',N'Applies'),
		(@en,newid(),'client_create_job',N'Create New Job'),
		(@en,newid(),'client_company_list',N'Company List'),
		(@en,newid(),'client_subscribes',N'Subscribe'),
		(@en,newid(),'client_portfolio',N'Portfolio'),
		(@en,newid(),'client_messages',N'Messages'),
		(@en,newid(),'client_history',N'History'),
		
		
		(@ge,newid(),'client_jobs',N'ჩემი გამოცხადებული სამუშაოები'),
		(@ge,newid(),'client_applies',N'გამოხმაურებები'),
		(@ge,newid(),'client_create_job',N'ახალი სამუშაოს დამატება'),
		(@ge,newid(),'client_company_list',N'კომპანიები'),
		(@ge,newid(),'client_subscribes',N'გამოწერები'),
		(@ge,newid(),'client_portfolio',N'პორტფოლიო'),
		(@ge,newid(),'client_messages',N'შეტყობინებები'),
		(@ge,newid(),'client_history',N'ისტორია'),
		--------------------------------------------------------
		--Worker Area 
		--------------------------------------------------------
		(@en,newid(),'worker_current_jobs',N'Current Jobs'),
		(@en,newid(),'worker_job_history',N'Job History'),
		(@en,newid(),'worker_my_company',N'My Company'),
		(@en,newid(),'worker_find_jobs',N'Find Jobs'),
		(@en,newid(),'worker_portfolio',N'Portfolio'),
		(@en,newid(),'worker_messages',N'Messages'),
		(@en,newid(),'worker_scheduler',N'Scheduler'),
		(@en,newid(),'worker_subscribes',N'Subscribes'),

		(@ge,newid(),'worker_current_jobs',N'მიმდინარე სამუშაოები'),
		(@ge,newid(),'worker_job_history',N'სამუშაოს ისტორია'),
		(@ge,newid(),'worker_my_company',N'ჩემი კომპანია'),
		(@ge,newid(),'worker_find_jobs',N'შამუშაოს პოვნა'),
		(@ge,newid(),'worker_portfolio',N'პორტფოლიო'),
		(@ge,newid(),'worker_messages',N'შეტყობინებები'),
		(@ge,newid(),'worker_scheduler',N'განრიგი'),
		(@ge,newid(),'worker_subscribes',N'გამოწერები'),
		--------------------------------------------------------
		--HR   AREA
		--------------------------------------------------------
		(@en,newid(),'HR_workers',N'Workers'),
		(@en,newid(),'HR_vacancies',N'Vacancies'),
		(@en,newid(),'HR_company',N'Company'),
		(@en,newid(),'HR_find_jobs',N'Find Jobs'),
		(@en,newid(),'HR_subscribes',N'Subscribes'),
		(@en,newid(),'HR_messages',N'Messages'),
		(@en,newid(),'HR_portfolio',N'Portfolio'),

		(@ge,newid(),'HR_workers',N'პერსონალი'),
		(@ge,newid(),'HR_vacancies',N'ვაკანსიები'),
		(@ge,newid(),'HR_company',N'კომპანია'),
		(@ge,newid(),'HR_find_jobs',N'სამუშაოს ძებნა'),
		(@ge,newid(),'HR_subscribes',N'გამოწერები'),
		(@ge,newid(),'HR_messages',N'მესიჯები'),
		(@ge,newid(),'HR_portfolio',N'პორტფოლიო'),
		--------------------------------------------------------
		--Company Manager
		--------------------------------------------------------
		(@en,newid(),'cm_workers',N'Workers'),
		(@en,newid(),'cm_hrs',N'Human Resources'),
		(@en,newid(),'cm_company_info',N'My Company'),
		(@en,newid(),'cm_history',N'Hostory'),
		(@en,newid(),'cm_messages',N'Messages'),
		(@en,newid(),'cm_subscribes',N'Subscribes'),
		(@en,newid(),'cm_partners',N'Partners'),
		(@en,newid(),'cm_charts',N'Charts'),
		(@en,newid(),'cm_portfolio',N'Portfolio'),
		(@en,newid(),'cm_contact_to_administration',N'Contact To System Administration'),


		(@ge,newid(),'cm_workers',N'თანამშრომლები'),
		(@ge,newid(),'cm_hrs',N'ვებერები'),
		(@ge,newid(),'cm_company_info',N'კომპანია'),
		(@ge,newid(),'cm_history',N'ისტორია'),
		(@ge,newid(),'cm_messages',N'მესიჯები'),
		(@ge,newid(),'cm_subscribes',N'გამოწერები'),
		(@ge,newid(),'cm_partners',N'პარტნიორები'),
		(@ge,newid(),'cm_charts',N'ვიზუალიზაცია'),
		(@ge,newid(),'cm_portfolio',N'პორტფოლიო'),
		(@ge,newid(),'cm_contact_to_administration',N'კონტაქტი ადმინისტრაციასთან'),
		--------------------------------------------------------
		--SMA Administrator
		--------------------------------------------------------
		(@en,newid(),'SMA_ADMIN_company_list',N'Company List'),
		(@en,newid(),'SMA_ADMIN_client_list',N'Client List'),
		(@en,newid(),'SMA_ADMIN_compliants',N'Compliants'),
		(@en,newid(),'SMA_ADMIN_site_managment',N'Web  Site Management'),
		(@en,newid(),'SMA_ADMIN_requests',N'Partnership Requests'),
		(@en,newid(),'SMA_ADMIN_support',N'Support'),
		(@en,newid(),'SMA_ADMIN_messages',N'Messages'),
		(@en,newid(),'SMA_ADMIN_portfolio',N'Portfolio'),
		(@en,newid(),'SMA_ADMIN_schedule',N'Schedule'),

		(@ge,newid(),'SMA_ADMIN_company_list',N'კომპანიები'),
		(@ge,newid(),'SMA_ADMIN_client_list',N'კლიენტები'),
		(@ge,newid(),'SMA_ADMIN_compliants',N'საჩივრები'),
		(@ge,newid(),'SMA_ADMIN_site_managment',N'საიტის მენეგმენტი'),
		(@ge,newid(),'SMA_ADMIN_requests',N'პარტნიორობის შემოთავაზებები'),
		(@ge,newid(),'SMA_ADMIN_support',N'სუპორტი'),
		(@ge,newid(),'SMA_ADMIN_messages',N'შეტყობინებები'),
		(@ge,newid(),'SMA_ADMIN_portfolio',N'პორტფოლიო'),
		(@ge,newid(),'SMA_ADMIN_schedule',N'განრიგი')
		--------------------------------------------------------
		--SMA Manager
		--------------------------------------------------------

		--------------------------------------------------------
		--
		--------------------------------------------------------


/*
declare @counter as integer
set @counter=1
insert into accessLevels(levelGUID,levelName,[level])
	values(newid(),'VISITOR',@counter)
	set @counter=@counter+1
insert into accessLevels(levelGUID,levelName,[level])
	values(newid(),'CLIENT',@counter)
	set @counter=@counter+1
insert into accessLevels(levelGUID,levelName,[level])
	values(newid(),'COMPANYWORKER',@counter)
	set @counter=@counter+1
insert into accessLevels(levelGUID,levelName,[level])
	values(newid(),'COMPANYHR',@counter)
	set @counter=@counter+1
insert into accessLevels(levelGUID,levelName,[level])
	values(newid(),'COMPANYMANAGER',@counter)
	set @counter=@counter+1
insert into accessLevels(levelGUID,levelName,[level])
	values(newid(),'SMAADMINISTRATOR',@counter)
	set @counter=@counter+1
insert into accessLevels(levelGUID,levelName,[level])
	values(newid(),'SMAMANAGER',@counter)
	set @counter=@counter+1
*/





--insert into usersGeneral
--select '8F6A4B38-7C66-4498-A5FA-9259D09347F0',newid(),(select levelGUID from accessLevels where levelName='visitor'),'ozbegi3@gmail.com',1,'agxiZ8+UL9GeeXhNNhCcPaqGd/QM/lLKd5hHy+UgFeE=','3bh6MaLFHWovRhzUf4fmLxf8IwmnEffzkMHo0fqqkew=','',1,0,'ozkartaVisitor','ozbegi','kartvelishvili','',getdate() 
--go
--insert into usersGeneral
--select '8F6A4B38-7C66-4498-A5FA-9259D09347F0',newid(),(select levelGUID from accessLevels where levelName='Client'),'ozbegi3@gmail.com',1,'agxiZ8+UL9GeeXhNNhCcPaqGd/QM/lLKd5hHy+UgFeE=','3bh6MaLFHWovRhzUf4fmLxf8IwmnEffzkMHo0fqqkew=','',1,0,'ozkartaClient','ozbegi','kartvelishvili','',getdate() 
--go
--insert into usersGeneral
--select '8F6A4B38-7C66-4498-A5FA-9259D09347F0',newid(),(select levelGUID from accessLevels where levelName='CompanyWorker'),'ozbegi3@gmail.com',1,'agxiZ8+UL9GeeXhNNhCcPaqGd/QM/lLKd5hHy+UgFeE=','3bh6MaLFHWovRhzUf4fmLxf8IwmnEffzkMHo0fqqkew=','',1,0,'ozkartaWorker','ozbegi','kartvelishvili','',getdate()
--go
--insert into usersGeneral
--select '8F6A4B38-7C66-4498-A5FA-9259D09347F0',newid(),(select levelGUID from accessLevels where levelName='CompanyHR'),'ozbegi3@gmail.com',1,'agxiZ8+UL9GeeXhNNhCcPaqGd/QM/lLKd5hHy+UgFeE=','3bh6MaLFHWovRhzUf4fmLxf8IwmnEffzkMHo0fqqkew=','',1,0,'ozkartaCHR','ozbegi','kartvelishvili','',getdate()
--go
--insert into usersGeneral
--select '8F6A4B38-7C66-4498-A5FA-9259D09347F0',newid(),(select levelGUID from accessLevels where levelName='CompanyManager'),'ozbegi3@gmail.com',1,'agxiZ8+UL9GeeXhNNhCcPaqGd/QM/lLKd5hHy+UgFeE=','3bh6MaLFHWovRhzUf4fmLxf8IwmnEffzkMHo0fqqkew=','',1,0,'ozkartaCManager','ozbegi','kartvelishvili','',getdate() 
--go
--insert into usersGeneral
--select '8F6A4B38-7C66-4498-A5FA-9259D09347F0',newid(),(select levelGUID from accessLevels where levelName='SMAAdministrator'),'ozbegi3@gmail.com',1,'agxiZ8+UL9GeeXhNNhCcPaqGd/QM/lLKd5hHy+UgFeE=','3bh6MaLFHWovRhzUf4fmLxf8IwmnEffzkMHo0fqqkew=','',1,0,'ozkartaSMAAdmin','ozbegi','kartvelishvili','',getdate() 
--go
--insert into usersGeneral
--select '8F6A4B38-7C66-4498-A5FA-9259D09347F0',newid(),(select levelGUID from accessLevels where levelName='SMAManager'),'ozbegi3@gmail.com',1,'agxiZ8+UL9GeeXhNNhCcPaqGd/QM/lLKd5hHy+UgFeE=','3bh6MaLFHWovRhzUf4fmLxf8IwmnEffzkMHo0fqqkew=','',1,0,'ozkartaSMAManager','ozbegi','kartvelishvili','',getdate() 
--go
declare @n1 varchar(50)=newid()
declare @n2 varchar(50)=newid()
declare @n3 varchar(50)=newid()

insert into productCategory
SELECT @n1 as [categoryGUID]
      ,'IntakeSystems' as [categoryName]
UNION
SELECT @n2 as [categoryGUID]
      ,'ElectricParts' as [categoryName]
UNION
SELECT @n3 as [categoryGUID]
      ,'SteeringRods' as [categoryName]

insert into  product
	SELECT @en as [languageGUID]
		  ,newid() as [productGUID]
		  ,getdate() as [effDate]
		  ,0 as [SequenceNum]
		  ,@n1 as [productCategoryGUID]
		  ,'HKS Air Filter'  as [productName]
		  ,'The Racing HKS Air Intake filter  for increasing car performance' as [productDescriptionShort]
		  ,'' as [productDescriptionLong]
		  ,10 as [productQuantityHist]
		  ,10 as [productQuantityAvailable]
		  ,35 as [warehousePrice]
		  ,35 as [warehousePriceFloor]
		  ,35 as [wareHousePriceCeiling]
		  ,55 as [sellingPrice]
		  ,55 as [sellingPriceFloor]
		  ,55 as [sellingPriceCeiling]
UNION
	SELECT @en as [languageGUID]
		  ,newid() as [productGUID]
		  ,getdate() as [effDate]
		  ,0 as [SequenceNum]
		  ,@n2 as [productCategoryGUID]
		  ,'Ignition Toggle Panel' as [productName]
		  ,'Racing  use only!!! excelent item  for your sport car' as [productDescriptionShort]
		  ,'' as [productDescriptionLong]
		  ,10 as [productQuantityHist]
		  ,10 as [productQuantityAvailable]
		  ,23 as [warehousePrice]
		  ,23 as [warehousePriceFloor]
		  ,23 as [wareHousePriceCeiling]
		  ,33 as [sellingPrice]
		  ,33 as [sellingPriceFloor]
		  ,33 as [sellingPriceCeiling]
UNION
		SELECT @en as [languageGUID]
		  ,newid() as [productGUID]
		  ,getdate() as [effDate]
		  ,0 as [SequenceNum]
		  ,@n3[productCategoryGUID]
		  ,'MOMO Steering Rod' as [productName]
		  ,'Perfect Performance With MOMO  racing steering wheel, Drive and go fuck yourself ' as [productDescriptionShort]
		  ,'' as [productDescriptionLong]
		  ,10 as [productQuantityHist]
		  ,10 as [productQuantityAvailable]
		  ,50 as [warehousePrice]
		  ,50 as [warehousePriceFloor]
		  ,50 as [wareHousePriceCeiling]
		  ,80 as [sellingPrice]
		  ,80 as [sellingPriceFloor]
		  ,80 as [sellingPriceCeiling]



select * from product

insert into productMediaFileInformation
select 
	@n1		as ProductGUID,
	newid() as MediaGUID,
	'ListImage' as MediaType,
	'resources/images/hkssuperpowerflow-ak005-cropcopy.jpeg' as MediaLocationURI
UNION
select 
	@n2		as ProductGUID,
	newid() as MediaGUID,
	'ListImage' as MediaType,
	'resources/images/hkssuperpowerflow-ak005-cropcopy.jpeg' as MediaLocationURI
UNION
select 
	@n3		as ProductGUID,
	newid() as MediaGUID,
	'ListImage' as MediaType,
	'resources/images/mh40rNm60BH2_aR5SvQ4M1Q.jpeg' as MediaLocationURI