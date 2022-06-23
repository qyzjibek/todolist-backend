import { MongoClient as mongo } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
let db;

const connect = () => {
    mongo.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, client) => {
            if (err) {
                console.error(err);
                return;
            }
            db = client.db("tasks");
        }
    )
}

const getDB = () => db;

export { connect, getDB };