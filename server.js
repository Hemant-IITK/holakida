  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const bcrypt = require('bcrypt-nodejs');
  const path = require('path');
  const mkdirp = require('mkdirp');
  let multer = require('multer');
  const random = require('random-string'); 
  const CheckingKeyForgotPassword = require('./controllers/CheckingKeyForgotPassword');
  const Login = require('./controllers/Login');
  const UploadingFile = require('./controllers/UploadingFile');
  const SignUp = require('./controllers/SignUp');
  const symptom_checker = require('./controllers/symptom_checker');
  const SearchDoctor = require('./controllers/SearchDoctor');
  const PatientAppointment = require('./controllers/PatientAppointment');
  const ForgotPassword = require('./controllers/ForgotPassword');
  const UploadingProfilePic = require('./controllers/UploadingProfilePic');
  const Logout = require('./controllers/Logout');
  const ConfirmingAppointment = require('./controllers/ConfirmingAppointment');
  const ConfirmingSignUp = require('./controllers/ConfirmingSignup');
  const MatchHash = require('./controllers/MatchHash');
  
  const app = express();
  app.use(cors());
  app.use(express.static(__dirname + '/build'));
  app.use(express.static(__dirname + '/images/imagesm'));
  app.use(express.static(__dirname + '/images/imagesf'));
  app.use(bodyParser.json());

  const  searchdata = {
    location:[],
    fee:[],
    speciality:[],
    symptoms:[]
  };
const db = require('knex')({
  client : 'mysql',
  connection: {
    host : 'quikcure.mysql.database.azure.com',
    user : 'serveradmin@quikcure',
    password : 'Utsav@123',
    database: 'information_project',
    port: 3306,
    ssl: true
  }});
  db.select('*').from('location').then(data => searchdata.location = data);
  db.select('*').from('feerange').then(data => searchdata.fee = data);
  db.select('*').from('speciality').then(data => searchdata.speciality = data);
  db.select('*').from('symptoms').then(data => searchdata.symptoms = data);
  let currentextension = '';
  const storageF = multer.diskStorage({

    destination: (req, file, cb) => {  
      cb(null, './uploads/patients/'+req.params.id);
    },
    filename: (req, file, cb) => {
      const newFilenames =`${req.body.description}${path.extname(file.originalname)}`;
      currentextension = path.extname(file.originalname);
      console.log(req.body,path.extname(file.originalname));
      cb(null, newFilenames);
    },
  });
  const uploadFile = multer({storage: storageF});

  const storageimageuserp = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log('profile updates');
      cb(null, './uploads/patients/'+req.params.id);
    },
    filename: (req, file, cb) => {
      const newFilename =`${'PatientsPic'}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });
  let uploadp = multer({storage: storageimageuserp,
    fileFilter: (req,file,callback) =>{
        const ext = path.extname(file.originalname);
        if(ext !== '.jpg'){
        return callback(new Error('Only Jpg images can be uploaded'));
    }
    callback(null,true);
    }
});
const nodemailer = require ('nodemailer');
let mailOptionsForSendMessage={
    from:'jhooteid@gmail.com',
    to:'',
    body:'',
    html: ''
  };
let transporterForSendingMessage = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'jhooteid@gmail.com',
      pass:'gmailk@pass'
    }
  });
  app.post('/symptom_check', function (req,res) {
    symptom_checker.json_extract(req,res);
  });
  app.get('/respond/uploads/patients/:id/:FILENAME/:hash(*)',(req,res) => {
    const {id, hash,FILENAME} = req.params;
    db('*').from('users').where({upassword: hash}).then(data => {
      if(data.length > 0){
        res.sendFile(__dirname+'/uploads/patients/'+id+'/'+FILENAME);
      } else {
        res.json({Response:'No such File Exist'});
      }
       
    })});
  app.post('/sendingmessage', (req,res) => {
    mailOptionsForSendMessage.to = req.body.email;
    mailOptionsForSendMessage.subject = 'QuickCure Support Team';
    mailOptionsForSendMessage.body = 'Dear ' + req.body.name + ' Your Message regarding '+ req.body.subject+' Has Been Received We Will Work On It. Thanks For Contribution';
    transporterForSendingMessage.sendMail(mailOptionsForSendMessage,(err,info)=>{
      if(err){
        res.json({response:'message received'});}
      else {
        res.json({response:'something wrong'});
      }
  })});
  app.post('/checkkey',(req,res) => {CheckingKeyForgotPassword.handleCheckKeyForgotPassword(req,res,db,bcrypt)});     
  app.get('/searchdata',(req,res) => {res.json(searchdata)}) ;
  app.post('/symptomsearch',(req,res) => res.json(searchdata));
  app.get('/:rand/uploads/patients/:userid/:ProfilePic',(req,res) =>{ res.sendFile(__dirname+'/uploads/patients/'+req.params.userid+'/PatientsPic.jpg')})  ;           
  app.post('/login',(req,res) => { Login.handleLogin(req,res,db,bcrypt)});      
  app.post('/signup',(req,res) => { SignUp.handleSignUp(req,res,db,bcrypt) });  
  app.post('/login/matchinghash',(req,res) => {MatchHash.handleMatchHash(req,res,db)});  
  app.post('/searchdoctor',(req,res) => { SearchDoctor.handleSearchDoctor(req,res,db)});
  app.post('/bookingappointment',(req,res) => {  PatientAppointment.handlePatientAppointment(req,res,db,bcrypt)});
  app.post('/uploads/file/:id/:hash(*)',uploadFile.single("selectedFile"),(req,res) => {UploadingFile.handleUploadingFile(req,res,currentextension,db)});
  app.get('/forgotpassword/resetingrequest/:email(*)',(req,res) => {ForgotPassword.handleForgotPassword(req,res,random,db)});
  app.post('/uploading/:id/:hash(*)',uploadp.single("selectedFile"),(req, res) => {UploadingProfilePic.handleProfilePic(req,res,db)});
  app.get('/signout/:id/:hash(*)',(req,res) => { Logout.handleLogout(req,res,db) });
  app.get('/images/:type/:id',(req,res)=> {res.sendFile(__dirname+'/images/'+req.params.type+'/'+req.params.id)})
  app.get('/appointmentbooking/:idofuser/:hash(*)',(req,res) => {ConfirmingAppointment.handleConfirmAppointment(req,res,db)});
  app.get('/confirm/:Id/:hash(*)',(req,res) => {ConfirmingSignUp.handleConfirmSignUp(req,res,db,mkdirp)});//
  app.get('/',(req,res) => res.sendFile(__dirname+ '/build/index.html'));
  app.listen(process.env.PORT || 3306,() => {
    console.log('App is Running On Port 3000');
  });    
