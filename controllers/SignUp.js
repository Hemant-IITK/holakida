const nodemailer = require ('nodemailer');
let mailOptionsForSignup={
    from:'jhooteid@gmail.com',
    to:'',
    subject:'Verifiction from QuickCure',
    body:'',
    html: ''
  };
let transporterForSignup = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'jhooteid@gmail.com',
      pass:'gmailk@pass'
    }
  });
const handleSignUp = (req,res,db,bcrypt) => {
    db.select('*').from('users').where({uemail: req.body.email}).then(data => {
        if(data.length > 0){
          res.json({response:'Cannot Create Account Email Already exists'})
        } else {
            bcrypt.hash(req.body.password,null,null, function(err,hash){
              db('pending').insert({email: req.body.email,
                  dob: req.body.dob, gender : req.body.gender
                  ,password: hash,name: req.body.name,
                    mobile : req.body.mobile.toString()})
              .then(data => {
                console.log(data,'this is data produced')
                mailOptionsForSignup.to = req.body.email;
                let tempForSignup = "https://quickcure.azurewebsites.net/confirm/"+ data + '/' + hash;
                  mailOptionsForSignup.html ="<form method='GET' action='"+tempForSignup+"'><button type='submit'>Click here to Confirm Your Account</button></form>"; 
                  transporterForSignup.sendMail(mailOptionsForSignup,(err,info)=>{
                  if(err){
                    console.log('unable to Send Message :',err);
                    res.json({response:'Account Cannot Be Created'});}
                  else {
                    console.log('your message has been successfully end :',info );
                    res.json({response:'Check Your email to verify Your Account'});
                  }
                });
              }); 
            })
            
          }
      })    
}
module.exports = {
    handleSignUp: handleSignUp
}