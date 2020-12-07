//importing required files
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

var port = process.env.PORT || 4000

app.use( express.static( "public" ) );


// creating connection to database
const connection=mysql.createConnection({
    host:'bldupv1ocsigbu5ddtpn-mysql.services.clever-cloud.com',
    user:'uahtvzuvhjnpsr1a',
    password:'j6tbt4pV0pTjKN1PDj8V',
    database:'bldupv1ocsigbu5ddtpn'
});

//checking for response whether databse connected or not
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected successfully!');
}); 

//setting views file(for displaying frontend pages)
app.set('views',path.join(__dirname,'views'));
			
//set view engine(we are using ejs for frontend)
app.set('view engine', 'ejs');

// for taking values from frontend pages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// route(address) for mainpage , we are sending homepage frontend file from here in res.render statement
app.get('/',(req, res) => {
    let logo = 'mainlogo.jpg'
    let sql = "SELECT * FROM questions";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('homepage', {
            title : 'Crack Your Next Technical Interview',
            questions : rows,
            logo : logo
        });
    });
});

// route for dashboard page
app.get('/dashboard',(req, res) => {
    let sql = "SELECT * FROM questions";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('dashboard', {
            title : 'Dashboard',
            questions : rows
        });
    });
});

// route for add question page
app.get('/add',(req, res) => {
    res.render('add', {
        title : 'Add Question :'
    });
});

// route for edit question page
app.get('/edit/:questionId',(req, res) => {
    const questionId = req.params.questionId;
    let sql = `Select * from questions where id = ${questionId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        console.log(result)
        console.log("edit")
        console.log(result)
        res.render('edit', {
            title : 'Edit details :',
            question : result[0]
        });
    });
});

// route for view question page
app.get('/question/:questionId',(req, res) => {
    const questionId = req.params.questionId;
    let sql = `Select * from questions where id = ${questionId}`;
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        console.log(questionId)
        console.log(rows)
        res.render('questionview', {
            title : '',
            questions : rows
        });
    });
});



// function for saving question to DB
app.post('/save',(req, res) => { 
    let data = {companyName: req.body.companyName, topicName: req.body.topicName, question: req.body.question, answer: req.body.answer};
    let sql = "INSERT INTO questions SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/dashboard');
    });
});

// function for updating question 
app.post('/update',(req, res) => {
    let questionId = req.body.id;
    let companyName = req.body.companyName;
    let topicName = req.body.topicName;
    let question = req.body.question;
    let answer = req.body.answer;
    let sql = "UPDATE questions SET companyName = ? , topicName = ?, question = ?, answer = ? WHERE questions.id = ?";
    console.log(req.body)
    let query = connection.query(sql,[companyName, topicName, question, answer, questionId],(err, results) => {
      if(err) throw err;
      res.redirect('/dashboard');
    });
});


// function for deleting question
app.get('/delete/:questionId',(req, res) => {
    const questionId = req.params.questionId;
    let sql = `DELETE from questions where id = ${questionId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/dashboard');
    });
});







// routes for showing company wise question pages


app.get('/amazon',(req, res) => {
    let logo = 'amazonlogo.png'
    let sql = "SELECT * FROM questions where companyName='AMAZON'";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('company', {
            title : 'Amazon Interview Questions',
            questions : rows,
            logo : logo
        });
    });
});

app.get('/microsoft',(req, res) => {
    let logo = 'microsoftlogo.png';
    let sql = "SELECT * FROM questions where companyName='MICROSOFT'";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('company', {
            title : 'Microsoft Interview Questions',
            questions : rows,
            logo : logo
        });
    });
});

app.get('/google',(req, res) => {
    let logo = 'googlelogo.png';
    let sql = "SELECT * FROM questions where companyName='GOOGLE'";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('company', {
            title : 'Google Interview Questions',
            questions : rows,
            logo: logo
        });
    });
});

app.get('/tcs',(req, res) => {
    let logo = 'tcslogo.png';
    let sql = "SELECT * FROM questions where companyName='TCS'";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('company', {
            title : 'TCS Interview Questions',
            questions : rows,
            logo : logo
        });
    });
});

app.get('/infosys',(req, res) => {
    let logo = 'infosyslogo.png'
    let sql = "SELECT * FROM questions where companyName='INFOSYS'";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('company', {
            title : 'Infosys Interview Questions',
            questions : rows,
            logo : logo
        });
    });
});



app.get('/paypal',(req, res) => {
    let logo = 'paypallogo.png'
    let sql = "SELECT * FROM questions where companyName='PAYPAL'";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('company', {
            title : 'Paypal Interview Questions',
            questions : rows,
            logo : logo
        });
    });
});

app.get('/paytm',(req, res) => {
    let logo = 'paytmlogo.png'
    let sql = "SELECT * FROM questions where companyName='PAYTM'";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('company', {
            title : 'Paytm Interview Questions',
            questions : rows,
            logo : logo
        });
    });
});









// listening/connecting  server 
app.listen(port, () => {
    console.log(`Server is running at port ${4000}`);
});