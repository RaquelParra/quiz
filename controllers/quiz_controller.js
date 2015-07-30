var models = require ('../models/models.js');
exports.load= function (req, res, next, quizId){ 
   models.Quiz.findById(quizId).then(
    function(quiz) {
     if (quiz) {
       req.quiz = quiz;
       next();
     } else { next(new Error('No existe quizId = ' + quizId));}
   }
   ).catch(function(error) {next(error);});
};
exports.show= function (req,res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
  res.render('quizes/show', {quiz: req.quiz} );
  }) 
};
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta){
     resultado = 'Correcto';
  }
  res.render('quizes/answer' , {quiz: req.quiz, respuesta: resultado});
};

exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs', {quizes: quizes});
}).catch(function(error) {next(error);})
};

exports.new = function(req,res) {
  var quiz = models.Quiz.build(//crea objeto quiz
   {pregunta: "Pregunta", respuesta: "Respuesta"}
  );
  res.render('quizes/new', {quiz : quiz});
};

exports.create = function(req, res){
  var quiz = models.Quiz.build (req.body.quiz);
   quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
     res.redirect('/quizes');
  })
};

