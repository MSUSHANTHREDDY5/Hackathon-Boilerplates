const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = require('../config/db');
const { createUserWithPrivileges } = require('../services/authService');

const seedDatabase = async () => {
  console.log('[Seed] Seeding development test accounts...');

  const admin = await createUserWithPrivileges({
    name: 'Admin Test User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    permissions: ['users.read', 'users.create', 'users.update', 'reports.view']
  });

  const moderator = await createUserWithPrivileges({
    name: 'Moderator Test User',
    email: 'moderator@example.com',
    password: 'password123',
    role: 'moderator',
    permissions: ['users.read', 'reports.view']
  });

  const reader = await createUserWithPrivileges({
    name: 'Permission Reader User',
    email: 'reader@example.com',
    password: 'password123',
    role: 'user',
    permissions: ['users.read']
  });

  const standardUser = await createUserWithPrivileges({
    name: 'Standard User',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
    permissions: []
  });

  const result = {
    admin: admin.toSafeObject(),
    moderator: moderator.toSafeObject(),
    reader: reader.toSafeObject(),
    standardUser: standardUser.toSafeObject()
  };

  console.log('[Seed] Test accounts created successfully:');
  console.log('  - admin@example.com (role: admin)');
  console.log('  - moderator@example.com (role: moderator)');
  console.log('  - reader@example.com (role: user, permissions: ["users.read"])');
  console.log('  - user@example.com (role: user, permissions: [])');

  return result;
};

// Allow executing as a standalone CLI script: `node src/utils/seed.js`
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedDatabase();
      process.exit(0);
    } catch (err) {
      console.error('[Seed Error]:', err);
      process.exit(1);
    }
  })();
}

module.exports = { seedDatabase };
