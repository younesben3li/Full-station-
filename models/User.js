const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'الاسم مطلوب'],
    },
    email: {
        type: String,
        required: [true, 'البريد الإلكتروني مطلوب'],
        unique: true,
        match: [/.+@.+\..+/, 'يرجى إدخال بريد إلكتروني صالح'],
    },
    phone: {
        type: String,
        required: [true, 'رقم الهاتف مطلوب'],
    },
    password: {
        type: String,
        required: [true, 'كلمة المرور مطلوبة'],
        minlength: [6, 'يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    station: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    }
});

// Password hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password matching method
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
