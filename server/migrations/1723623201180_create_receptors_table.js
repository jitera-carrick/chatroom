import mongoose from 'mongoose';

const up = async () => {
  const db = mongoose.connection;
  await db.createCollection('receptors', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['type', 'function', 'location'],
        properties: {
          type: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          function: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          location: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
        },
      },
    },
  });
};

const down = async () => {
  const db = mongoose.connection;
  await db.dropCollection('receptors');
};

module.exports = { up, down };