import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const checkAuth = async(req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password -token -confirmado -createdAt -updatedAt -__v');
      return next();
    } catch (error) {
      return res.status(404).json({msg: 'Hubo un error'})
    }
  };

  if (!token) {
    const err = new Error('Token no valido');
    res.status(401).json({ msg: err.message });
  }
  next();
};
