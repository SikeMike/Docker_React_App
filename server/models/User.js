const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['single', 'multiple', 'write'],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    default: undefined,
  },
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  givenAnswer: {
    type: mongoose.Schema.Types.Mixed,
    default: "",
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  questions: [QuestionSchema],
});

module.exports = mongoose.model('User', UserSchema);
