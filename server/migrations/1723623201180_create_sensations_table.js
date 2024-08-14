import mongoose from 'mongoose';

const up = async () => {
  const db = mongoose.connection;
  await db.createCollection('sensations', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['type', 'description', 'receptor_id'],
        properties: {
          type: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          description: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          receptor_id: {
            bsonType: 'objectId',
            description: 'must be an objectId and is required'
          },
        }
      }
    }
  });
  await db.collection('sensations').createIndex({ receptor_id: 1 }, { unique: false });
};

const down = async () => {
  const db = mongoose.connection;
  await db.dropCollection('sensations');
};

module.exports = { up, down };