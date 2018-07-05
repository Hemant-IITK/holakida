const nodemailer = require ('nodemailer');
let mailOptionsForForgotPassword = {
    from: 'jhooteid@gmail.com',
    to: '',
    subject : 'Reset Your Password',
    body:'',
    html:''
  }
  let transporterToResetPassword = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jhooteid@gmail.com',
      pass: 'gmailk@pass'
    }
  })
const handleForgotPassword = (req,res,random,db) => {
    const {email} = req.params;
    db.select('*').from('users').where({uemail: email})
    .then(data => {
      if(data.length > 0){
        let ran = random({
          length: 8,
          numeric: true,
          letters: true,
          special: true
        })
        db('forgotpassword').where({uemail: email}).del().then(c => {
          db('forgotpassword').insert([{userid: data[0].userid,uemail: email, randomstring: ran}]).then(data => console.log(data));
          mailOptionsForForgotPassword.to = email;
          mailOptionsForForgotPassword.html = '<p>Secret Key : </p><p>' + ran + '</p>'
          transporterToResetPassword.sendMail(mailOptionsForForgotPassword,(err,info) => {
            if(err){
              res.json('Something Went Wrong');
            } else {
              res.json({Response: 'MailSent'})
            }
          })
        })
      } 
    })
}
module.exports = {
    handleForgotPassword: handleForgotPassword
}