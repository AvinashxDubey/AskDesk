const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    }
    catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error' })
    }
}

const changeUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['admin', 'user', 'agent'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User role updated successfully', user });
    }
    catch (err) {
        console.error('Error updating user role:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getAllUsers, changeUserRole };