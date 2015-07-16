var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
router.param('quizId',quizController.load);//autoload :quizId

//definicion de rutas de quises
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/autor',quizController.autor);
module.exports = router;
