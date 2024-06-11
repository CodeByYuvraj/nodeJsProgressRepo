const express = require('express');
const app = express();
const connectDB = require('./server/database/connection');
const PORT = process.env.PORT || 9000;

// mongo db connection
connectDB();

// console.log(app.get('env'));

// parsing the request url
app.use(express.urlencoded({extended: true}));

// invoking routes
app.use('/', require('./server/routes/router'));

// error handler
app.get('*', (req, res, next) => {
    const err = new Error();
    err.status = 404
    next(err);
})

app.use((err, req, res, next) => {
    
    res.json({
        status: err.status,
        err: err.status === 404 ?{
            [1] : 'hello',
            [2] : 'hii',
            [3] : 'hhhhhhhh'
        } : 'internal server error'
    })
})

app.listen(PORT, () =>{
    console.log(`listning on ${PORT}`);
});
