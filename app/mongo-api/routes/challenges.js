// Config

const express = require('express');
const router = express.Router();

// Middleware
const Joi = require('joi'); 

const challenges = [
    {id: 1, name: 'challenge sample 1'},
    {id: 2, name: 'challenge sample 2'},
    {id: 3, name: 'challenge sample 3'},
];


/**
 * 
 */
router.get('/', (req,res) => {
    res.send(challenges);
});


/**
 * 
 */
router.get('/:id', (req,res) => {
    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) return res.status(404).send('Challenge ID not found');
    res.send(challenge);
});

/**
 * @todo move to asyn methods for schema validation 
 * 
 * @
 */ 
router.post('/', (req,res) => {
    const {error} = validate_challenge(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const challenge = {
        id: challenges.length + 1,
        name: req.body.name
    };

    challenges.push(challenge);
    res.send(challenge);
});

/**
 * 
 */
router.put('/:id', (req,res) => {
    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) return res.status(404).send('Challenge ID not found');
    
    const {error} = validate_challenge(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    
    challenge.name = req.body.name;
    res.send(challenge);
});

/**
 * 
 */
router.delete('/:id', (req,res) => {
    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) return res.status(404).send('Challenge ID not found');

    const index = challenges.indexOf(challenge)
    challenges.splice(index,1)
    res.send(challenge)
});

/**
 * 
 */
function validate_challenge(challenge) {
    const challenges_schema = Joi.object({ 
        name: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9_ ]$'))
            .required(),
    })

    return result = challenges_schema.validate({ 
        name: challenge.name
    });

};


/**
 * 
 */
function locate_challenge(id) {
    const result = challenges.find(c => c.id === parseInt(id));
    if (!result) 
        return undefined;
    else 
        return result;

};

module.exports = router