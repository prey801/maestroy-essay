// Script to create an admin user for testing
// Run this with: node admin/create-admin.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

// User model
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    marketing: { type: Boolean, default: false },
    agreedToTerms: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
const bcrypt = require('bcryptjs');
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/maestroy-essay');
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@maestroessay.com' });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Email: admin@maestroessay.com');
            console.log('Password: admin123');
            process.exit(0);
        }

        // Create admin user
        const adminUser = new User({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@maestroessay.com',
            password: 'admin123',
            role: 'admin',
            marketing: false,
            agreedToTerms: true
        });

        await adminUser.save();
        
        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@maestroessay.com');
        console.log('🔒 Password: admin123');
        console.log('');
        console.log('You can now login to the admin dashboard at:');
        console.log('🌐 http://localhost:5000/admin/admin.html');
        
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

createAdminUser();
