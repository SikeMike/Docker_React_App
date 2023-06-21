const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/:userId/generateQuestion', userController.generateQuestion);
router.post('/:userId/question', userController.storeQuestion);
router.get('/:userId/questions', userController.getQuestions);
router.post('/login', userController.login);
router.delete('/:userId/:questionId', userController.deleteQuestion);
router.put('/:userId/question', userController.updateAnswer);

module.exports = router;
