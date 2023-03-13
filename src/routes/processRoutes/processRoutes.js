const express = require("express");
const processRoutes = express.Router();
const { fork } = require("child_process");
const process = require("process");

processRoutes.get("/info", async (req, res) => {
    try {
        const info={
            Arg:`Argumentos de entrada ${process.argv}`,
            Sistema:`Sistema ${process.platform}`,
            VersionNode:`Version de Node${process.version}`,
            Memoria:`Uso de memoria ${JSON.stringify(process.memoryUsage())}`,
            PathExe:`Path de ejecucion ${process.title}`,
            ProcessId:`Id del proceso ${process.pid}`,
            Carpeta:`Directorio ${process.cwd()}`,
        }
        res.send(info);
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read products ${error.message}`,
        });
    }
});

processRoutes.get("/random", async (req, res) => {
    try {
        const {number} = req.query;
        const child = fork("child.js");
        if(number){
            child.send(number);
        }else{
            child.send("Iniciar");
        }
        child.on("message", (childMsg) => {
            console.log("mensaje del hijo:", childMsg);
            childMsg=JSON.stringify(childMsg);  
            res.send(`Revision de numeros: ${childMsg}`);
        });
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read products ${error.message}`,
        });
    }
});

module.exports = processRoutes;