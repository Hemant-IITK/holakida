const nodemailer = require ('nodemailer');
let mailOptionsForSignup={
    from:'jhooteid@gmail.com',
    to:'',
    subject:'Verification from QuickCure',
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
                mailOptionsForSignup.to = req.body.email;
                let tempForSignup = "https://quickcure.azurewebsites.net/confirm/"+ data + '/' + hash;
                  mailOptionsForSignup.html ="<a href='"+tempForSignup+"'>Click here to Confirm Your Account</a>"; 
                  transporterForSignup.sendMail(mailOptionsForSignup,(err,info)=>{
                  if(err){
                    res.json({response:'Account Cannot Be Created'});}
                  else {
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