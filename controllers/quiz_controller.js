//GET  /quizes/question
exports.question=function(req,res){
	res.render('quizes/question',{pregunta:'Capital de Italia'});
};
exports.answer=function(req,res){
	if(req.query.respuesta==='Roma' || req.query.respuesta==='roma'){
		res.render('quizes/answer',{respuesta:'Correcto'});
	}else{
		res.render('quizes/answer',{respuesta:'Incorrecto'});
	}
};
exports.autor=function(req,res){
	res.render('autor',{nombre:'Luis albeiro Hernandez'});
	//res.render('quizes/autor',{nombre:'Capital de Italia'});
	//res.render('/autor/autor',{});
};
