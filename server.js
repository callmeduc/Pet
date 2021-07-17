import mongoose from 'mongoose'
import app from './app.js'
import dotenv from 'dotenv'
dotenv.config()


const port = process.env.PORT || 4010
// Connect the database
const database = process.env.DATABASE
mongoose.connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(con => {
    console.log('DB connection Successfully!');
});


app.listen(port, () => console.log(`Application is running on port ${port}!`))