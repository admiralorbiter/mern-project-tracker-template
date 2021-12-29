/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.projects.remove({});

const projectsDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2019-01-15'),
    due: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2019-01-16'),
    due: new Date('2019-02-01'),
    title: 'Missing bottom border on panel',
  },
];

db.projects.insertMany(projectsDB);
const count = db.projects.count();
print('Inserted', count, 'projects');

db.counters.remove({ _id: 'projects' });
db.counters.insert({ _id: 'projects', current: count });

db.projects.createIndex({ id: 1 }, { unique: true });
db.projects.createIndex({ status: 1 });
db.projects.createIndex({ owner: 1 });
db.projects.createIndex({ created: 1 });
