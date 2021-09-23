// Config

const express = require('express');
const router = express.Router();

// Middleware
const Joi = require('joi'); 

const users = [
    {id: 1, name: 'user 1'},
    {id: 2, name: 'user 2'},
    {id: 3, name: 'user 3'},
];


/**
 * 
 */
router.get('/', (req,res) => {
    res.send(users);
});


/**
 * 
 */
router.get('/:id', (req,res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User ID not found');
    res.send(user);
});

/**
 * @todo move to asyn methods for schema validation 
 * 
 * @
 */ 
router.post('/', (req,res) => {
    const {error} = validate_user(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const user = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(user);
    res.send(user);
});

/**
 * 
 */
router.put('/:id', (req,res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User ID not found');
    
    const {error} = validate_user(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    
    user.name = req.body.name;
    res.send(user);
});

/**
 * 
 */
router.delete('/:id', (req,res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User ID not found');

    const index = users.indexOf(user)
    users.splice(index,1)
    res.send(user)
});

/**
 * 
 */
function validate_user(user) {
    const users_schema = Joi.object({ 
        name: Joi.string()
            .min(3)
            .max(30)
            // .pattern(new RegExp('^[a-zA-Z0-9_ ]$'))
            .required(),
    })

    return result = users_schema.validate({ 
        name: user.name
    });

};


module.exports = router