const dotenv = require('dotenv').config();
const Joi = require('joi'); 
const express = require('express')

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const challenges = [
    {id: 1, name: 'challenge demo 1'},
    {id: 2, name: 'challenge demo 2'},
    {id: 3, name: 'challenge demo 3'},
];

app.get('/api', (req,res) => {
    res.send('Hello World')
});

app.get('/api/challenges', (req,res) => {
    res.send(challenges);
});

app.get('/api/challenge/:id', (req,res) => {
    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) res.status(404).send('ERROR 404 Given Challenge ID was not found');
    res.send(challenge);
});

/**
 * @todo move to asyn post methods for schema validation 
 */ 
app.post('/api/challenges', (req,res) => {
    const {error} = validate_challenge(req.body)

    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }

    const challenge = {
        id: challenges.length + 1,
        name: req.body.name
    };

    challenges.push(challenge);
    res.send(challenge);
});

app.put('/api/challenges/:id', (req,res) => {
    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) res.status(404).send('ERROR 404 Given challenge ID was not found');

    const {error} = validate_challenge(req.body)

    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }
    
    challenge.name = req.body.name;
    res.send(challenge);
});

function validate_challenge(challenge) {
    const challenges_schema = Joi.object({ 
        name: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9_ ]*$'))
            .required(),
    })

    const result = challenges_schema.validate({ 
        name: challenge.name
    });
    
    return result;
};

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`));

