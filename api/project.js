const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function list() {
  const db = getDb();
  const projects = await db.collection('projects').find({}).toArray();
  return projects;
}

function validate(project) {
  const errors = [];
  if (project.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (project.status === 'Assigned' && !project.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { project }) {
  const db = getDb();
  validate(project);

  const newProject = Object.assign({}, issue);
  newProject.created = new Date();
  newProject.id = await getNextSequence('projects');

  const result = await db.collection('projects').insertOne(newProject);
  const savedProject = await db.collection('projects')
    .findOne({ _id: result.insertedId });
  return savedProject;
}

module.exports = { list, add };
