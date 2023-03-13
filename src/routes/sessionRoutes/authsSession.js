const express = require("express");
const passport = require("passport");
const sessionsMongo = express.Router();
const usersMongoDAO = require("../../daos/users/daoUsersMongo"); // Par crear usuario en base de datos
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
// const { checkLogged } = require("../../middlewares/validateAuth");

let user = [];

//serializacion y deserializacion
passport.serializeUser((user, done) => {
    return done(null, user.id)
});

passport.deserializeUser((id, done) => {
    usersMongoDAO.findById(id, (err, userDB) => {
        return done(err, userDB)
    })
})

passport.use("signUpStrategy", new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email"
    },
    (res, req, username, password, done) => {
        usersMongoDAO.findOne({ username: username }, (err, userDB) => {
            if (err) return done(err, false, { message: `Hubo un error al buscar el usuario ${err} ` });
            if (userDB) return done(null, false, { message: `El usuario ya existe` })
            const newUser = {
                username: username,
                password: bcrypt.hashSync(password, 8)
            };
            usersMongoDAO.create(newUser, (err, userCreated) => {
                if (err) return done(err, false, { message: `Hubo un error al crear el usuario ${err}` });
                return done(null, userCreated, { message: "Usuario creado exitosamente" })
            })
        })
        //res.status(200).cookie(user, JSON.stringify(user), { sameSite: "none", secure: true }).send("Registro exitoso");
    }
    
));

sessionsMongo.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

// sessionsMongo.post("/signup", passport.authenticate("signUpStrategy", {
//     failureRedirect: "/registro",
//     failureMessage: true,

// }), (req, res) => {
//     user.push(req.body);
//     res.status(200).cookie(user, JSON.stringify(user), { sameSite: "none", secure: true }).send("Registro exitoso")
// });

sessionsMongo.post("/signup",(req,res)=>{

    passport.authenticate("signUpStrategy",(error,user,info)=>{
    
    console.log("aca?",error,user,info);
    
    if(error) return res.json({message:info.message});
    
    if(!user) return res.json({message:info.message});
    
    res.json({user, message:info.message});
    
    })(req,res);//pasamos a authenticate los argumentos req,res, y next para que se puedan utilizar dentro de este método.
    
    });

sessionsMongo.get("/registro", (req, res) => {
    let errMsg = req.session.messages ? req.session.messages[0] : "";
    console.log("errores", errMsg);
    res.send({ error: errMsg });
    req.session.messages = [];
});

sessionsMongo.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;
        usersMongoDAO.findOne({ username: email }, (err, userDB) => {
            if (err) res.send(err, { message: `Hubo un error al buscar el usuario ${err} ` });
            if (!userDB) res.send({ message: `El usuario no existe` });
            const compare = bcrypt.compareSync(password, userDB.password);
            if (compare) {
                user.push(req.body);
                res.send({ message: `Hola de nuevo ${userDB.username}` })
            }
            else {
                res.send({ message: `La contraseña no es correcta` })
            }
        })

    } catch (error) {
        return res.status(400).send({
            error: `An error occurred ${error.message}`,
        });
    }
});

sessionsMongo.get("/user", async (req, res) => {
    try {
        let errMsg = req.session.messages ? req.session.messages[0] : "";
        console.log(req.session.messages);
        console.log("errores", errMsg);
        // res.send({ error: errMsg });
        // req.session.messages = [];
        const username = user[0];
        console.log("user", username);
        if (username) {
            res.status(200).send(username)
        } else {
            res.send({ error: "No existe usuario" })
        }
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred ${error.message}`,
        });
    }
});

sessionsMongo.delete("/logout", (req, res) => {
    try {
        user = [];
        req.session.destroy((error) => {
            if (error) {
                res.redirect("/")
            } else {
                res.send("logout")
            }
        })
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred ${error.message}`,
        });
    }
});

module.exports = sessionsMongo