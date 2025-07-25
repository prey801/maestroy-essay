// scripts/testAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const testAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@maestroy.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found');
      return;
    }

    console.log('✅ Admin user found:');
    console.log('  Email:', admin.email);
    console.log('  Role:', admin.role);
    console.log('  Password hash length:', admin.password.length);

    // Test password comparison
    const testPassword = 'Admin123!@#';
    const isMatch = await admin.comparePassword(testPassword);
    
    console.log('✅ Password test result:', isMatch ? 'VALID' : 'INVALID');

    if (!isMatch) {
      console.log('🔧 Updating admin password...');
      admin.password = testPassword;
      await admin.save();
      console.log('✅ Admin password updated successfully');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

testAdmin();
