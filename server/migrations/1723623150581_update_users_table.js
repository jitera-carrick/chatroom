import mongoose from 'mongoose';

const up = async () => {
  const db = mongoose.connection;
  await db.collection('users').updateMany({}, {
    $set: {
      password_hash: '',
      roomId: null
    }
  });
};

const down = async () => {
  const db = mongoose.connection;
  await db.collection('users').updateMany({}, {
    $unset: {
      password_hash: '',
      roomId: ''
    }
  });
};

module.exports = { up, down };