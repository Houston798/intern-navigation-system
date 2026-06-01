export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: '未授权访问' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: '权限不足',
        message: `此操作需要以下角色之一: ${roles.join(', ')}`
      });
    }
    
    next();
  };
}

export const requireMentor = requireRole('mentor');
export const requireHR = requireRole('hr');
export const requireIntern = requireRole('intern');
export const requireMentorOrHR = requireRole('mentor', 'hr');
export const requireAllRoles = requireRole('intern', 'mentor', 'hr');
