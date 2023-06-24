let generator = import('../controllers/utils/generador.js');
const User = require('../models/User');

async function createUser(req, res) {
  try {
    const { name, password } = req.body;
    const user = new User({ name, password });

    const existingUser = await User.findOne({ name: name });

    if (existingUser) {
      return res.status(203).json({ success: false, message: 'Username already exists' });
    }

    await user.save();

    const currentUser = await User.findOne( {name: name} );

    res.status(201).send({ success: true, username: name, userID: currentUser._id });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}

async function login(req, res) {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name: name });

    if (!user) {
      return res.status(201).send({ success: false, message: 'Username does not exist' });
    } else if( user.password !== password) {
      return res.status(202).send({ success: false, message: 'Incorrect password' });
    }

    return res.status(200).send({ success: true, username: name, userID: user._id });

  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
}

async function getQuestions(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const questions = user.questions;
    res.status(200).send({ questions });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function storeQuestion(req, res) {
  console.log("userController.js : starting storeQuestion");
  try {
    const { userId } = req.params;
    const { type, question, options, correctAnswer } = req.body;
    console.log("userController.js : valor de type -> ", type);
    console.log("userController.js : valor de question -> ", question);
    console.log("userController.js : valor de options -> ", options);
    console.log("userController.js : valor de correctAnswer -> ", correctAnswer);
    const user = await User.findById(userId);
    console.log("userController.js : user encontrado -> ", user != null)
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    console.log("userController.js : empezando push")
    user.questions.push({ type, question, options, correctAnswer });
    await user.save();
    console.log("userController.js : cambios realizados")

    res.status(201).send({ message: 'Question stored successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function deleteQuestion(req, res) {
  try {
    const { userId, questionId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const question = user.questions.find((question) => question._id.toString() === questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    user.questions = user.questions.filter((question) => question._id.toString() !== questionId);
    await user.save();

    res.status(200).json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

async function updateAnswer(req, res) {
  try {
    const { userId } = req.params;
    const { question, givenAnswer } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(204).json({ success: false, message: 'User not found' });
    }

    const questionToUpdate = user.questions.find((q) => q.question === question);
    if (!questionToUpdate) {
      return res.status(205).json({ success: false, message: 'Question not found' });
    }

    // Update the givenAnswer for the question
    questionToUpdate.givenAnswer = givenAnswer;

    await user.save();

    res.status(200).json({ success: true, message: 'Answer saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

async function generateQuestion(req, res){
  try {
    const { category } = req.body;
    console.log("userController.js : antes de llamar a generator")
    let question = await (await generator).default(category);
    console.log("userController.js : despues de llamar a generator")
    console.log("userController.js : question tendría que tener valor ->", question != null)

    res.status(200).json({ success: true, message: 'Question created successfully', payload: question });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  storeQuestion,
  getQuestions,
  login,
  deleteQuestion,
  updateAnswer,
  generateQuestion,
};
