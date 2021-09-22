function authenticator (req,res,next){
    console.log('Autheticating...');
    next();
};

module.exports = authenticator;
