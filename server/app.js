var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
// var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/marios_pizza';
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

app.get('/currentFloor', function(req,res){

  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
    }
    else {
      console.log('app.post/currentFloor connected');
      var resultsArray=[];
      var queryResults=client.query('SELECT floor.table_name, floor.capacity, floor.server_id, floor.status FROM floor');
      queryResults.on('row',function(row){
        resultsArray.push(row);
      });
      console.log(resultsArray);
      queryResults.on('end',function(){
        done();
        return res.send(resultsArray);
      }); // end queryResults.on('end')
    }// end else
  }); // end pg.connect
}); // end app.get currentFloor

app.get('/currentEmployee', function(req,res){

  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
    }
    else {
      console.log('app.post/currentEmployee connected');
      var resultsArray=[];
      var queryResults=client.query('SELECT first_name, last_name, id FROM employee');
      queryResults.on('row',function(row){
        resultsArray.push(row);
        console.log(resultsArray);
      });
      queryResults.on('end',function(){
        done();
        return res.send(resultsArray);
      }); // end queryResults.on('end')
    }// end else
  }); // end pg.connect
}); // end app.get currentEmployee


//add table to floor table
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
});//app.post addTable

//add emplpyee to employee table
app.post('/addEmployee', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var data= req.body;
    if (err){
      console.log(err);
    }
    else {
      console.log(data);
      console.log('app.post/addEmployee connected');
      client.query('INSERT INTO employee (first_name,last_name) VALUES ($1,$2)',[data.firstName,data.lastName]);
      res.sendStatus(200);
    }//else
  });//pg.connect
});//app.post addEmployee

//update server id in floor table
app.post('/changeEmployee', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var data= req.body;
    if (err){
      console.log(err);
    }
    else {
      console.log(data);
      console.log('app.post/changeEmployee connected');
      client.query('UPDATE floor SET server_id = ($1) WHERE id = ($2)',[data.new_id,data.table_id]);
      res.sendStatus(200);
    }//else
  });//pg.connect
});//app.post changeEmployee

// update floor status in floor table
app.post('/changeStatus', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var data= req.body;
    if (err){
      console.log(err);
    }
    else {
      console.log(data);
      console.log('app.post/changeEmployee connected');
      client.query('UPDATE floor SET status = ($1) WHERE id = ($2)',[data.new_status,data.table_id]);
      res.sendStatus(200);
    }//else
  });//pg.connect
});//app.post changeStatus
