
var models = require('../models/models.js');
//autoload - factoriza el codigo si ruta incluye: quizId
exports.load=function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz){
				req.quiz=quiz;
				next();
			}else{
				next(new Error('No existe quizid='+ quizId));
			}
		}
	).catch(function(error){next (error);})
};

//GET /quizes
exports.index = function(req, res, next){
  var busqueda = req.query.search || null;
  var resultados;
  if(busqueda){
    busqueda=busqueda.replace(" ","%");
    busqueda="%"+busqueda+"%";
    resultados = models.Quiz.findAll({
      where:{$or:{pregunta:{$like:busqueda},tema:{$like:busqueda}} },
      order: 'pregunta'
    });
  }else{
    resultados = models.Quiz.findAll({order: 'pregunta'});
  }
  resultados.then(function(quizes){
    res.render('quizes/index', {quizes:quizes, errors:[]});
  }).catch(function(err){ next(err)});
};

//GET  /quizes/question
exports.show=function(req,res){
		res.render('quizes/show',{quiz:req.quiz, errors:[]});
};

exports.answer=function(req,res){
	var resultado='Incorrecto';
		if(req.query.respuesta===req.quiz.respuesta){
			resultado='Correcto';
		}
			res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado, errors:[]});
};

//GET  /quizes/new
exports.new = function(req, res){
  var quiz = models.Quiz.build({
    pregunta: "Pregunta", respuesta: "Respuesta"
  });
  res.render('quizes/new', {quiz: quiz, errors:[]});
};

// POST /quizes/create
exports.create = function(req, res){
  var quiz=models.Quiz.build(req.body.quiz);
  var errors = quiz.validate();
  //quiz.validate().then(function(err){
    if(errors){
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    }else{
      quiz.save({fields:["tema","pregunta","respuesta"]}).then(function(){
        res.redirect('/quizes')});
    };
};

//GET /quizes/:quizId(\\d+)/edit
exports.edit = function(req, res){
  var quiz = req.quiz;

  res.render('quizes/edit', {quiz: quiz, errors:[]});
}

//PUT /quizes/:quizId
exports.update = function(req, res){
  req.quiz.tema = req.body.quiz.tema;
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  var errors= req.quiz.validate()
   // .then(function(err){
  //var errors = quiz.validate();
  if(errors){
    res.render('quizes/edit', {quiz: req.quiz, errors: errors.errors});
  }else{
    req.quiz.save({fields:["tema","pregunta","respuesta"]})
      .then(function(){ res.redirect('/quizes')});
  }
    //});
}

//DELETE /quizes/:quizId
exports.destroy = function(req, res){
  req.quiz.destroy().then(function(){
    res.redirect('/quizes');
  }).catch(function(err){ next(err); });
}


exports.autor=function(req,res){
	res.render('autor',{nombre:'Luis albeiro Hernandez P'});	
};
