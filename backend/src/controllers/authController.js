import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, updateUser } from '../models/user.js';
import { generateToken } from '../middleware/auth.js';
import { validateEmail, validatePassword, validateRole, validateInternType } from '../utils/validators.js';

export async function register(req, res) {
  try {
    const { 
      email, 
      password, 
      role = 'intern', 
      name, 
      department, 
      mbti, 
      intern_type, 
      experience,
      mentor_key,
      hr_key,
      admin_key
    } = req.body;
    
    // 验证必填字段
    if (!email || !password || !name || !department) {
      return res.status(400).json({ 
        error: '缺少必填字段',
        required: ['email', 'password', 'name', 'department']
      });
    }
    
    // 验证邮箱格式
    if (!validateEmail(email)) {
      return res.status(400).json({ error: '无效的邮箱格式' });
    }
    
    // 验证密码长度
    if (!validatePassword(password)) {
      return res.status(400).json({ error: '密码至少6位' });
    }
    
    // 验证角色
    if (!validateRole(role)) {
      return res.status(400).json({ error: '无效的角色类型' });
    }
    
    // 检查邮箱是否已注册
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: '该邮箱已被注册' });
    }
    
    // 验证角色密钥
    if (role === 'mentor') {
      if (!mentor_key || mentor_key !== process.env.MENTOR_KEY) {
        return res.status(403).json({ error: '导师密钥无效' });
      }
    }
    
    if (role === 'hr') {
      if (!hr_key && !admin_key) {
        return res.status(403).json({ error: 'HR密钥或管理员密钥必填' });
      }
      if (hr_key !== process.env.HR_KEY && admin_key !== process.env.ADMIN_INIT_KEY) {
        return res.status(403).json({ error: '密钥无效' });
      }
    }
    
    // 实习生角色验证
    if (role === 'intern' && intern_type && !validateInternType(intern_type)) {
      return res.status(400).json({ error: '无效的实习类型' });
    }
    
    // 加密密码
    const password_hash = await bcrypt.hash(password, 10);
    
    // 创建用户
    const user = createUser({
      email,
      password_hash,
      role,
      name,
      department,
      mbti: mbti || null,
      intern_type: intern_type || null,
      experience: experience || null,
      onboarding_completed: false
    });
    
    // 生成 Token
    const token = generateToken(user);
    
    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        department: user.department,
        mbti: user.mbti,
        intern_type: user.intern_type,
        onboarding_completed: user.onboarding_completed
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: '服务器错误，请稍后重试' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: '邮箱和密码必填' });
    }
    
    // 查找用户
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    // 验证密码
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    // 更新最后登录时间
    updateUser(user.id, { last_login: new Date().toISOString() });
    
    // 生成 Token
    const token = generateToken(user);
    
    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        department: user.department,
        mbti: user.mbti,
        intern_type: user.intern_type,
        onboarding_completed: user.onboarding_completed
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: '服务器错误，请稍后重试' });
  }
}

export function getProfile(req, res) {
  const { password_hash, ...user } = req.user;
  res.json({ 
    user,
    message: '获取个人信息成功'
  });
}

export function updateProfile(req, res) {
  try {
    const { name, department, mbti, intern_type, experience } = req.body;
    const updates = {};
    
    if (name) updates.name = name;
    if (department) updates.department = department;
    if (mbti !== undefined) updates.mbti = mbti;
    if (intern_type !== undefined) updates.intern_type = intern_type;
    if (experience !== undefined) updates.experience = experience;
    
    const updatedUser = updateUser(req.user.id, updates);
    
    if (!updatedUser) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    const { password_hash, ...user } = updatedUser;
    
    res.json({
      message: '更新成功',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
}
