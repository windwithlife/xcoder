

class EnvHelper{
    constructor(){
        
    }
    isDebug(){
        const dev = process.env.NODE_ENV !== 'production';
        return dev;
    }
}

module.exports = new EnvHelper();




