const mysql = require('mysql');
let con;
module.exports = () => {
    if(con){
        console.log('Girdi');
        return con;
    }
    else{
     con = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'db',
      });


      con.connect(function (eror) {
        if (eror) {
          console.log(eror);
        } else {
          console.log('DB connected');
        }
      });

      return con;
    }
}


