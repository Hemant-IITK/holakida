const handleUploadingFile = (req,res,currentextention,db) => {
    const {id,hash} = req.params;
    console.log('this is id',id)
    const {description}  = req.body
    db.select('*').from('users').where({userid: id}).then(data => {
        if(data[0].upassword=== hash){
            db.select('*').from('patient_'+id).where({FILES: description}).then(data2 => {
                if(data2.length > 0){
                    res.json({Response: 'File with same name already exists'})
                } else {
                    db('patient_'+id).insert({FILES : description,path : 'http://localhost:3000/respond/uploads/patients/'+id+'/'+ description+''+currentextention+'/'+data[0].upassword+'',ext: currentextention}).then(data => console.log('hols',data))
                    res.json({Response: 'File Uploaded'});
                }
            })
        } else {
            res.json({Response: 'File Cannot Be uploaded'})
        }
    })
}
module.exports = {
    handleUploadingFile: handleUploadingFile
}