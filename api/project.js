const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function get(_, {id}){
  const db = getDb();
  const project = await db.collection('projects').findOne({id});
  return project;
}

async function list(_, { status, effortMin, effortMax }) {
  const db = getDb();
  const filter = {};
  if(status)filter.status = status;

  if(effortMin!==undefined || effortMax!==undefined){
    filter.effort = {};
    if(effortMin!==undefined) filter.effort.$gte = effortMin;
    if(effortMax!==undefined) filter.effort.$lte = effortMax;
  }
  const projects = await db.collection('projects').find(filter).toArray();
  return projects;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if(changes.title || changes.description || changes.status || changes.effort){
    const project = await db.collection('projects').findOne({id});
    Object.assign(project, changes);
    validate(project);
  }
  await db.collection('projects').updateOne({id}, {$set: changes});
  const savedProject = await db.collection('projects').findOne({id});
  return savedProject;
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

  const newProject = Object.assign({}, project);
  newProject.created = new Date();
  newProject.id = await getNextSequence('projects');

  const result = await db.collection('projects').insertOne(newProject);
  const savedProject = await db.collection('projects')
    .findOne({ _id: result.insertedId });
  return savedProject;
}

async function remove(_, { id }) {
  const db = getDb();
  const project = await db.collection('projects').findOne({id});
  if(!project) return false;
  project.deleted = new Date();

  let result = await db.collection('deleted_projects').insertOne(project);
  if(result.insertedId){
    result = await db.collection('projects').deleteOne({id});
    return result.deletedCount === 1;
  }
  return false;
}

module.exports = { list, add, get, update, delete: remove };
