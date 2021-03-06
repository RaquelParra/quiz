var models = require ('../models/models.js');
exports.load= function (req, res, next, quizId){ 
   models.Quiz.find({
     where : { id: Number(quizId) },
     include: [{ model: models.Comment }]
    }).then(
    function(quiz) {
     if (quiz) {
       req.quiz = quiz;
       next();
     } else { next(new Error('No existe quizId = ' + quizId));}
   }
   ).catch(function(error) {next(error);});
};
exports.show= function (req,res){
  models.Quiz.find(req.params.quizId).then(function(quiz){
  res.render('quizes/show', {quiz: req.quiz, errors: []} );
  }) 
};
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta){
     resultado = 'Correcto';
  }
  res.render('quizes/answer' , {quiz: req.quiz, respuesta: resultado, errors: []});
};

exports.index = function(req, res){
      var options = {};
    options.order = [['pregunta', 'ASC']];
    if (req.query.search) {
        var busqueda = '%' + req.query.search.replace(' ', '%') + '%';
        options.where = {pregunta: {like: busqueda}};
    }
  models.Quiz.findAll(options).then(function(quizes){
    res.render('quizes/index.ejs', {quizes: quizes, errors: []});
}).catch(function(error) {next(error);})
};

exports.new = function(req,res) {
  var quiz = models.Quiz.build(//crea objeto quiz
   {pregunta: "Pregunta", respuesta: "Respuesta",opcion: "opcion"}
  );
  res.render('quizes/new', {quiz : quiz, errors : []});
};

exports.create = function(req, res){
  var quiz = models.Quiz.build (req.body.quiz);
  quiz.validate().then(
   function(err){
    if (err) {
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    } else{
     quiz.save({fields: ["pregunta", "respuesta","opcion"]}).then(function(){
        res.redirect('/quizes');})
      }
   }
  )
};

exports.edit = function(req, res) {
  var quiz = req.quiz; //autoload instancia quiz
  res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function(req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.opcion = req.body.quiz.opcion;

  req.quiz.validate().then(
     function(err) {
        if (err) {
           res.render('quizes/edit', {quiz: req.quiz, errors : err.errors});
        } else {
          req.quiz .save( {fields: ["pregunta", "respuesta","opcion"]}).then( function() {
             res.redirect('/quizes');})
    }
   }
 )
};

exports.destroy = function(req,res) {
   req.quiz.destroy().then (function() {
       res.redirect('/quizes');
    }).catch(function(error){next(error)});
};
