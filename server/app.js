var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
// var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var pg = require('pg');
var connectionString ='postgress://localhost:5432/marios_pizza';
var port = process.env.PORT || 3030;

//addFloor
//add employee
//currentFloor
//currentEmployee
//changeStatus
//changeEmployee
app.use(bodyParser.urlencoded( {extended: false } ));
app.use(bodyParser.json());

// static folder

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve('public/index.html') );
});
app.use( express.static( 'public' ) );
// gets
app.post('/addTable', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var data= req.body;
    if (err){
      console.log(err);
    }
    else {
      console.log(data);
      console.log('app.post/addTable connected');
      client.query('INSERT INTO floor (table_name,capacity,server_id,status ) VALUES ($1,$2,$3,$4)',[data.table_name,data.capacity,data.server_id,data.status]);
      res.sendStatus(200);
    }//else
  });//pg.connect
});//app.post

app.post('/addEmployee', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var data= req.body;
    if (err){
      console.log(err);
    }
    else {
      console.log(data);
      console.log('app.post/addEmployee connected');
      client.query('INSERT INTO employee (first_name,last_name) VALUES ($1,$2)',[data.first_name,data.last_name]);
      res.sendStatus(200);
    }//else
  });//pg.connect
});//app.post
