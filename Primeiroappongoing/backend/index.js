//jshint esversion:6

// NODE requires
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const session = require("express-session");
const flash = require("req-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");



//database setup Mongo Db setup
mongoose.connect(process.env.MONGO_URL),{
  useNewUrlParser : true,
  useUnifiedTopology:true,
};

//


app.use(
  cors({
    origin:"http://192.168.0.140:3000",
    Credentials:true,
  })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("trust proxy ",1);
 app.use(
  session({
    cookie:process.env.DEVELOPMENT
    ? null
    : {secure:true,maxAge:4*60*6000,sameSite:"none"},
    secret:process.env.SECRET,
    saveUninitialized:false,
    store:process.env.PORT
    ? MongoStore.create(
      {
        mongoUrl:process.env.MONGO_URL
      },
      {
        function(err,resposta){
          console.log(err,resposta);
        }
      }
    ):null
  })
 );
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
const User = require("./models/users");
const Product = require("./models/products");

passport.use(User.createStrategy())


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//findone() ira encontrar o primeiro objeto que atenda ao filtro ,ele retorna esse objeto
User.findOne({username:process.env.ADMIN_USERNAME},(err,obj)=>{
  if(err){
    console.log(err)
  }
  else if (obj){
    console.log(obj)
  }
  else if (!obj){
    User.register(
      {
        username:process.env.ADMIN_USERNAME,
        nomeDoUsuario:"yago",
        cidade:"Rio de Janeiro",
        telefone:21985121562
      },
      process.env.ADMIN_PASSWORD,
      function(err,userRegistrado){
        if(err){
          console.log(err)
        }
        else if (userRegistrado){
          console.log("usuario registrado com sucesso")
        }
      }
    )
  }

})

app.get("/horas",(req,res)=>{
  let horas = new Date()
  return res.send(horas)
})

app.get("/produtos",(req,res)=>{
  let newobject = new Product({
    nome:"disco interestelar",
    cost:20,
    destination:'lojadochico',
    category:"filme"
  });
  newobject.save((err,savedObject)=>{
    if(err){
      res.send({
        err:true,
        mensagem:"deu erro"
      })
    }
    else if(savedObject){
      res.send(
       savedObject
      )
    }
    else if(!savedObject){
      res.send({
        err:true,
        mensagem:"deu erro"})
    }

  })
})

app.post("/login",(req,res,next)=>{
  passport.authenticate("local",(err,obj)=>{
    if (err){
      return res.send({
        err:true,
        mensagem:"deu erro"
      })
    }
    else if(!obj){
      return res.send({
        err:true,
        mensagem:"usuario nao encontrado/senha invalida"
      })
    }
    else if(obj){
        req.logIn(obj,(err)=>{
          if(err){
            return res.send({
              err:true,
              mensagem:"erro na autenticaao"
            })
          }
          else {
            return res.send({
              err:false,
              mensagem:"usuario cadastrado"
            })
          }
        })
    }
  })(req,res,next);
})


app.get("/auth",(req,res)=>{
  res.send(req.isAuthenticated())
})

app.post("/logout",(req,res)=>{
  req.logOut((err)=>{
    if(err){
      res.send({
        erro:true,
        mensagem:"usuario preso na matrix",
        data:null
      })
    }
    else{
      res.send({
        erro:false,
        mensagem:"usuario derrotou as maquinas"
      })
    }
  })
})


app.post("/auth",(req,res)=>{
let isAuth = req.isAutheticated()
req.send(isAuth)
})


app.listen(process.env.PORT || 4000,()=>{
    console.log('o servidor esta conectado');
});
