const handleMatchHash = (req,res,db) => {
    db.select('*').from('users').where({uemail:req.body.email}).then(data => {
        if(data.length > 0 ){
   
            if(req.body.password === data[0].upassword ){
              db('users').where({userid: data[0].userid}).update({isloggedin: 'true'}).then(response => {  
                db.select('*').from('patient_'+data[0].userid).then(data2 => {
                  res.json({Response: true,UserData:data[0],ListOfFiles: data2});
                });  
                
              });
              
            } else {
              res.json({Response: false})
            }

        } else{
          res.json({Response: false})
        }
      })
      console.log('metchhash');
}
module.exports = {
    handleMatchHash: handleMatchHash
}