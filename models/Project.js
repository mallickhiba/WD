const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  pid: String,
  name: String,
  endDate: String,
  members: String,
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
  createdAt: {
      type: Date,
      default: Date.now
  }

  /*name: {  
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }] */
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
