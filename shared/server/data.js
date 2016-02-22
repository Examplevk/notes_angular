import express  from 'express';
import {MongoClient, ObjectID} from 'mongodb';


let router = express.Router();

let database;
let collection;
MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) {
        throw err;
    }
    database = db;
    collection =  db.collection('notes');
    collection.createIndex({ "expireAt": 1}, { expireAfterSeconds: 0 }, function(err) {

    });
});

router.get('/getallnotes', function(req,res){
    collection.find().toArray(function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        });
})

router.post('/createnote', function(req, res){

    let date = new Date(req.body.expire_time);

    collection.insert({"expireAt": date, text: req.body.text, user: req.user._id, color: "#fff", users: []});

    let cursor = collection.find({ text: req.body.text});
    cursor.each(function(err,doc){
        if (err) {
            throw err;
        }
        if(doc != null) {
            res.json(doc);
        }
    })



})
router.post('/deletenote', function(req,res){
    let _id  = ObjectID(req.body._id);

    collection.deleteOne({ _id: _id },function(err, results){
        if (err) {
            throw err;
        }
        res.json({"status": "ok"})
    });

   //let id = Number(req.body.id);
   //res.json({"id": id})
})
router.post('/editnote', function(req, res){
    let _id =  ObjectID(req.body._id);
    let text = req.body.text;
    let color = req.body.color;
    let id = Number(req.body.id);

    collection.updateOne({_id: _id},{$set:{text: text, color: color}}, function(err,result){
        if (err) {
            throw err;
        }
        console.log(result._handle, 'from edit');
        collection.find({_id: _id}).each(function(err, doc){
            if (err) {
                throw err;
            }
            if(doc != null){
                res.json({id: id, note: doc});
            }
        })
    })
})

router.post('/getusersnotes', function(req,res){

            collection.find({ $or: [ {  user: req.user._id }, { users: req.user._id } ] }).toArray(function(err, result) {
                if (err) {
                    throw err;
                }
                res.send(result);
            });
})

router.post('/getallusers', function(req, res){
   database.collection('accounts').find().toArray(function(err, result){
         Promise.all(
            result.map((user, index) => new Promise((resolve, reject) => {
                 user.shared_notes_id =[];
                collection.find({users: user._id}).toArray((err, data) => {
                    if(err) reject(err)
                    if (!data.length) {
                        resolve(user)
                    }
                    data.map((note, index) =>{
                        user.shared_notes_id.push(note._id);
                        resolve(user);
                    })
                })
            }))
        ).then(data =>  {console.log(data); res.send(data)}).catch(err => console.log(err))

    })
})
router.post('/addusertonote', function(req, res){
    let id_user = req.body.id_user;
    let _id_user = ObjectID(req.body._id_user);
    let _id_note = ObjectID(req.body._id_note);
    console.log('Code in ADDusernote',_id_note);
    collection.find({_id: _id_note}).each(function(err,doc){
        if (err) {
            throw err;
        }
        if(doc != null) {
            let usersArray = doc.users;
            console.log(doc, 'Array users from db');
            usersArray.push(_id_user);
            collection.updateOne({_id: _id_note},{ $set: {"users": usersArray}}, function(err, results){
                if(err) throw err;

                res.json( {id: id_user, note_id: _id_note});
            });


        }
    })
})



module.exports = router;