import jwt from 'jsonwebtoken';
import { findUserById } from '../models/user.js';

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未授权访问，请先登录' });
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Token无效或已过期' });
  }
  
  const user = findUserById(decoded.id);
  
  if (!user) {
    return res.status(401).json({ error: '用户不存在' });
  }
  
  req.user = user;
  req.token = token;
  next();
}

export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (decoded) {
      const user = findUserById(decoded.id);
      if (user) {
        req.user = user;
        req.token = token;
      }
    }
  }
  
  next();
}
