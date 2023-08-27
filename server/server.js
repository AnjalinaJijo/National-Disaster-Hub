
require('dotenv').config();
require('express-async-errors')

const express=require('express');
const app=express();
// const mongoose=require('mongoose');
const cors=require('cors')
const corsOptions = require('./config/corsOptions');
// const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const path=require('path');
//express handles your API
//mongoose handle database
//cors 

const PORT=process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
// app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//BUILD IN MIDDLEWARE to handle urlencoded data
//in other words form data
//'content-type:application/x-www-form-urlencoded'
app.use(express.urlencoded({extended:false}));

//build in middleware for JSON
app.use(express.json());

//middleware for cookies
app.use(cookieParser())

//build in middleware that serve static files
// app.use(express.static(path.join(__dirname,'/public')));

//custom middleware
// app.use((req,res,next)=>{
//     console.log(`${req.method} ${req.path}`);
//     next();
// })


// routes
app.use('/', require('./routes/root'));
app.use('/partner', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/find',require('./routes/findPerson'));
app.use('/checkin',require('./routes/checkin'));



app.use(verifyJWT);
// app.use('/employees', require('./routes/api/employees'));
// app.use('/users', require('./routes/api/users'));


// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

// app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error',(err)=>{
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

// const per=require("./models/per");
// app.get('/per',async(req,res)=>{
//     const per=await per.find();
//     res.json(per);
// })



// app.use('/register', require('./routes/register'));
// app.use('/auth',require('./routes/auth'));

// app.listen(PORT,()=>console.log("server started on port 3500"))