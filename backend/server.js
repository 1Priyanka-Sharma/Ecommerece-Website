require('dotenv').config({path:'backend/.env'})

// Imported Express app
const app=require('./app');

// Database imported
const database=require('./mongoose_connection/database')
database();

app.listen(process.env.PORT || 3000,()=>{
    console.log(`We are listening to the port `)
})