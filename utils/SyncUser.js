const User  = require('../../models/user')

async function syncUser(firebaseUser) {
  let user = await User.findOne({ where: { firebaseUid: firebaseUser.uid } });

  if (!user) {
    user = await User.create({
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.name,
      profilePhoto: firebaseUser.photoURL
    });
  }

  return user;
}

module.exports = syncUser;
