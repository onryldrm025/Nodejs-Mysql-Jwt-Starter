var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const con = require('../helper/db')();



router.get('/', function(req, res, next) {
  con.query('Select * from users',(err,rows)=>{
    res.json({rows});
  })
});

router.post('/signup', function(req, res, next) {
  const {email,password} = req.body
  bcrypt.hash(password,10).then((hash)=>{
    const sql = `INSERT INTO users (id, email, sifre) VALUES('${null}','${email}','${hash}')`;
    con.query(sql,(err,rows)=>{
      if(err){
        console.log("Req data:",  req.data)
        res.json({err})
      }
      else{
        res.json({rows});
      }
    })
  })
});

router.post('/signin', function(req, res, next) {
  const {email,password} = req.body
  const sql = `SELECT * FROM users WHERE email='${email}'`;
    con.query(sql,(err,rows)=>{
      if(rows.length !=0){ 
        console.log("Req data:",  req.data)
        bcrypt.compare(password,rows[0].sifre).then((result)=>{
          if(result)
          {
            const payload={
              email,
            }
            const token = jwt.sign(payload,req.app.get('api_secret_key'))
            res.json({status:1,token})
          }
          else{
            res.json({err:'Kullanıcı bilgileri yanlış'});
          }
        })
      }
      else{
        res.json({err:'Kullanıcı bulunamadı'});
      }
    })
});

module.exports = router;
