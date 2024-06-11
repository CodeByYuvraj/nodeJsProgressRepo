const mongoose = require('mongoose');

const connetcDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/collage-db',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`db connected: ${conn.connection.host}`)
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connetcDB;