const ParsedArgs= require("minimist");

const arguments= process.argv.slice(2);
const args=ParsedArgs(arguments, {
    alias:{
        p:"port"
    },
    default:{
        p:8080
    }
});

const {port}= args;
const newArgs= port;
module.exports=newArgs