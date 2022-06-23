import express, { request } from "express";
import bodyParser from "body-parser";
import { connect, getDB } from "./db.js";
import { ObjectId } from "mongodb";

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connect();

// Sorted Collection
app.get('/tasks', (req, res) => {
    getDB()
    .collection('tasks')
    .find({})
    .sort("priority")
    .toArray((err, result) => {
        if (err) {
            res.status(500).json({ err: err });
            return;
        }
        res.status(200).json(result);
    });
});

// Search
app.get('/search/:label', (req, res) => {
    console.log(req.params.label); 
    getDB()
    .collection('tasks')
    .find({ label: req.params.label })
    .toArray((err, result) => {
        if (err) {
            res.status(500).json({ err: err });
            return;
        }
        res.status(200).json(result);
    });
});

// Create Task
app.post('/task', (req, res) => {
    const {label, priority} = req.body;

    getDB()
    .collection('tasks')
    .insertOne({ 'label': label, 'priority': priority}, (err) => {
        if (err) {
            res.status(500).json({err: err});
            return;
        }

        res.status(200).send();
    });
});

// Delete task
app.delete('/task/:id', (req, res) => {
    
    getDB()
    .collection('tasks')
    .deleteOne({ _id: new ObjectId(req.params.id) }, (err) => {
        if (err) {
            res.status(500).json({ err: err });
            return;
        }

        res.status(200).send();
    });
})

// Update Task
app.put('/task/:id', (req, res) => {
    const { label, priority } = req.body;

    getDB()
    .collection('tasks')
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: {
        label: label,
        priority: priority
    }}, (err) => {
        if (err) {
            res.status(500).json({err: err});
            return;
        }

        res.status(200).send();
    });
})

// Зарезирвируй порт и слушай его, потом выполняй команды
app.listen(port, () => {
    console.log('Server started');
})