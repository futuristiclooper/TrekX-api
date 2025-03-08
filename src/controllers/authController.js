import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Login function
export const login = async (req, res) => {
  const { username, password } = req.body;

  // Dummy user for demonstration
  const user = { id: 1, username: 'admin' };
  const validPassword = await bcrypt.compare(password, '$2a$10$dummyhash'); // Compare with hashed password

  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
};