const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const flash = require("req-flash");

// imports ------
var functions = require("./functions/functions");
var datas = require(`./db/data`);
const passport = require("passport");
const {
  findById,
  findByIdAndUpdate,
  deserializeUser,
  serializeUser,
} = require("./models/Users");
const MongoStore = require("connect-mongo");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//variavel de desenvolvimento
var estouEmDesenvolvimento = true;

app.use(
  session({
    cookie: process.env.DEVELOPMENT_SESSION
      ? null
      : { secure: true, maxAge: 4 * 60 * 60000, sameSite: none },
    secret: process.env.SEGREDINHO,
    resave: false,
    saveUninitialized: false,
    store: process.env.DEVELOPMENT_SESSION
      ? null
      : MongoStore.create(
          {
            mongoUrl: process.env.MONGO_URL,
          },
          (err, res) => {
            if (!err) {
              console.log(res);
            } else {
              consol.log(err);
            }
          }
        ),
  })
);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/vanillaLogin", async (req, res) => {
  console.log(req.query);
  const arrayFiltrado = await datas.usuarios().filter((each, index) => {
    return (
      each.password === req.query.password &&
      each.username === req.query.username
    );
  });

  res.send(arrayFiltrado);
});

app.post("/update/:identificador", (req, res) => {
  console.log(Object.keys(req.query));
  Product.findByIdAndUpdate(
    req.params.identificador,
    req.query,
    { multi: true },
    (err, objt) => {
      if (err) {
        res.send(`${functions.traduzir(err.message)}`);
      } else if (!objt) {
        res.send("nenhum objeto encontrado");
      } else {
        res.send("objt atualizado com sucesso");
      }
    }
  );
});
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var User = require(`./models/Users`);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var Product = require("./models/Products");
const { fa } = require("translate-google/languages");

app.get("/products", (req, res) => {
  Product.find({}, (err, objetosencontrados) => {
    res.send(objetosencontrados);
  });
});

app.get("/products/:identificador", (req, res) => {
  Product.findById(req.params.identificador, (err, objetoEncontrado) => {
    if (err) {
      res.send(err);
    } else if (!objetoEncontrado) {
      res.send("nenhum objeto encontrado");
    } else {
      res.send("seu objeto foi encontrado " + objetoEncontrado);
    }
  });
});

app.post("/products", (req, res) => {
  let objeto = {
    price: req.query.price,
    name: req.query.name,
    description: req.query.description,
    quantity: req.query.quantity,
    category: req.query.category,
  };
  let newProduct = new Product(objeto);

  newProduct.save((err, salvo) => {
    if (err) {
      res.send("deu erro");
    } else {
      res.send("novo produto salvo com sucesso");
    }
  });
});

app.post("/users", (req, res) => {
  let obejto = req.query;
  let newUser = new User(obejto);

  newUser.save((err, salvo) => {
    if (err) {
      res.send(Object.values(err.errors).map((val) => val.message));
    } else {
      res.send("usuario salvo com sucesso");
    }
  });
});
app.post("/registerusers", (req, res) => {
  if (req.query.username && req.query.password) {
    User.register(
      {
        username: req.query.username,
      },
      req.query.password,
      (err, registereduser) => {
        if (!err) {
          console.log(registereduser);
        } else {
          console.log(err);
        }
      }
    );
  } else {
    console.log("nome e senha sao obrigatorios");
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, object, info) => {
    if (err) {
      res.send(err);
    } else if (!object) {
      res.send({
        status: false,
        mensagem: "erro ao validar",
      });
    } else {
      req.logIn(object, (err) => {
        if (err) {
          res.send({
            status: false,
            mensagem: "falha ao logar",
          });
        } else {
          res.send({
            status: true,
            mensagem: "usuario logado com sucesso",
          });
        }
      });
    }
  })(req, res, next);
});

app.get("/", (req, res) => {
  res.send("voce esta acessand o servidor de yagopharma");
});
// app.post("/meuNome",(req , res)=>{
//     console.log(req.query.name)
//     //info que vem do postman e lida como req.query
//     res.send(req.query.name)

// })
// app.post("/numero",(req , res)=>{
//     const numero = parseFloat(req.query.numero)
//     //info que vem do postman e lida como req.query
//     var aoQuadrado = (functions.square(req.query.numero))
//     res.send(`${aoQuadrado}`)

// })

app.listen(4000, () => {
  console.log("servidor rodando");
});
