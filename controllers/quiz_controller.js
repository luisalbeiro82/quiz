
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
//GET  /quizes
exports.index=function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes:quizes});
	}).catch(function(error){next (error);})
};
exports.search=function(req,res){
		var filtro=('%' + req.query.search + '%').replace(/ /g, '%');
		models.Quiz.findAll({
			where: ["pregunta like ?", filtro],
			order: 'pregunta ASC'
		}).then(function(quizes) {
				res.render('quizes/search.ejs', {quizes: quizes, errors: []});
			}).catch(function(error) { next(error);})
		
};/*
exports.index = function(req, res) {
	if (req.query.search) {
		var criterio = ('%' + req.query.search + '%').replace(/ /g, '%');
		models.Quiz.findAll({
			where: ["pregunta like ?", criterio],
			order: 'pregunta ASC'
		}).then(function(quizes) {
				res.render('quizes/index', {quizes: quizes, errors: []});
			}).catch(function(error) { next(error);})
	}else {
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', {quizes: quizes, errors: []});
		}).catch(function(error) { next(error);})
	}
};*/

//GET  /quizes/question
exports.show=function(req,res){
		res.render('quizes/show',{quiz:req.quiz});
};
exports.answer=function(req,res){
	var resultado='Incorrecto';
		if(req.query.respuesta===req.quiz.respuesta){
			resultado='Correcto';
		}
			res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado});
};

exports.autor=function(req,res){
	res.render('autor',{nombre:'Luis albeiro Hernandez'});
	//res.render('quizes/autor',{nombre:'Capital de Italia'});
	//res.render('/autor/autor',{});
};
