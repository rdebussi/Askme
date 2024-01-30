//importando a biblioteca express
const express = require("express")
//iniciando o express
const app = express()
//importando a biblioteca body parser que permite ler dados enviados via form
const bodyParser = require("body-parser")
//importando a connection que foi deninida em database.js
const connection = require("./database/database")
//importando o model Ask que esta dentro da pasta database(model é uma representação da table do bd em JS)
const Ask = require("./database/Ask")
const Answer = require("./database/Answer")
const cors = require('cors')
app.use(cors())
// conectando a database
connection
    .authenticate()
    .then(() => {
        console.log("ok")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

//estou dizendo para o express usar o ejs como view engine
app.set('view engine','ejs')
app.use(express.static('public'))

//body parser: decodificar dados do form
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//criando rotas
app.get("/", (req, res) => {
    //findALL método responsável por buscar na tabela e listar - SELECT * FROM ask/ passando como JSON o método raw(imprime somente os dados)
    //then vai salvar em questions e imprimir essas mesmas questions
    //método order serve para ordenar - order: [['nome do campo', 'metodo de ordenação']]
    Ask.findAll({raw: true, order:[
        ['id', 'desc'] //asc para crescente
    ]}).then(questions =>{
        res.render("index.ejs", {
            questions: questions
        });
    })
});

app.get("/ask", (req, res) => {
    res.render("ask")
})

//usando express e body-parser para pegar os dados do form (é pego pelo name="" do input do form)
app.post("/saveask", (req, res) =>{
    var title = req.body.title
    var description = req.body.description
    //create salva os dados na tabela Ask
    Ask.create({
        title: title,
        description: description 
    }).then(()=>{
        //then é executado "após" o create
        //redirect serve para redirecionar para uma página após salvar os dados na tabela
        res.redirect("/")
    })

})

//criando a rota /ask com o parametro ID
// pegando o parametro id com req.params.id
// esse parametro vai ser comparado com o BD atraves do Ask model
//a comparação é feita com o Ask.findOne, passando o JSON de comparação "where: {id : id}" 
//se houver id na tabela igual o id pego pelo params, executa-se a confição verdadeira do IF no .then
app.get("/ask/:id", (req, res) => {
    console.log("ta chegando")
    var id = req.params.id
    Ask.findOne({
        where: {id : id}
    }).then(question => {
        if(question != undefined){

            Answer.findAll({
                where: {questionid : question.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("question", {
                    question : question,
                    respostas : respostas
                })
            })

            
        } else {
            res.redirect("/")
        }
    })
})

//criando a rota /answer com o método post pra pegar os dados do formulario
//salvando os dados no formulario nas variaveis usando bodyparser
//usando o create para passar os dados para o Model(que linka no bd)
//then redirect
app.post("/responder", (req, res) => {
    console.log(req)
    var corpo = req.body.corpo
    var questionid = req.body.questionid
    Answer.create({
        corpo: corpo,
        questionid: questionid
    }).then(()=> {
        res.redirect("/ask/"+ questionid)
    })
})

app.listen(8080,()=>{console.log("app rodando!")})