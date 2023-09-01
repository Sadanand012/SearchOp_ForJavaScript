const mongo = require('mongoose');

const dbconnect = () =>{
    const connectionParams = { useNewUrlParser: true};
    mongo.connect(process.env.DB, connectionParams);

    mongo.connection.on("connected", () =>{ console.log("Connected to database successfully");})

    mongo.connection.on("error", (err) =>{
        console.log("error occurse: ", err);
    })
    mongo.connection.on("disconnected", ()=>{ console.log("MongoDB disconnected");})
}
module.exports = dbconnect;