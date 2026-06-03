# 业务部实习生成长导航系统实施计划

**版本**: Demo v1.0  
**日期**: 2026-06-01  
**目标**: 构建完整的实习生成长导航系统（React + Node.js + CloudBase + DeepSeek）

---

## 项目结构

```
intern-navigation-system/
├── frontend/                    # React前端
│   ├── src/
│   │   ├── components/         # 组件
│   │   │   ├── common/         # 通用组件
│   │   │   ├── layout/         # 布局组件
│   │   │   ├── auth/           # 认证相关
│   │   │   ├── intern/         # 实习生端
│   │   │   ├── mentor/         # 导师端
│   │   │   └── hr/             # HR端
│   │   ├── pages/              # 页面
│   │   ├── services/           # API服务
│   │   ├── hooks/              # 自定义hooks
│   │   ├── context/            # React Context
│   │   ├── utils/              # 工具函数
│   │   └── styles/             # 样式文件
│   └── package.json
├── backend/                     # Node.js后端
│   ├── src/
│   │   ├── routes/             # API路由
│   │   ├── controllers/        # 控制器
│   │   ├── models/             # 数据模型
│   │   ├── middleware/          # 中间件
│   │   ├── services/           # 业务逻辑
│   │   ├── ai/                 # AI服务
│   │   ├── config/             # 配置文件
│   │   └── utils/              # 工具函数
│   └── package.json
└── docs/                       # 文档
```

---

## Phase 1: 项目初始化

### Task 1.1: 初始化前端项目

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.ts`
- Create: `frontend/tailwind.config.js`
- Create: `frontend/src/main.tsx`
- Create: `frontend/src/App.tsx`

- [ ] **Step 1: 创建项目目录结构**

```bash
mkdir -p frontend/src/{components,pages,services,hooks,context,utils,styles}
```

- [ ] **Step 2: 创建 package.json**

```json
{
  "name": "intern-navigation-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "echarts": "^5.4.3",
    "react-icons": "^4.12.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

- [ ] **Step 3: 创建 Vite 配置**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

- [ ] **Step 4: 创建 Tailwind 配置（深色主题）**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#22D3EE',
        background: '#0F172A',
        surface: '#1E293B',
        border: '#334155',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444'
      }
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: 创建主入口文件**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 6: 创建基础 CSS**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-background text-text-primary;
}
```

### Task 1.2: 初始化后端项目

**Files:**
- Create: `backend/package.json`
- Create: `backend/src/index.js`
- Create: `backend/src/app.js`

- [ ] **Step 1: 创建项目目录结构**

```bash
mkdir -p backend/src/{routes,controllers,models,middleware,services,ai,config,utils}
```

- [ ] **Step 2: 创建 package.json**

```json
{
  "name": "intern-navigation-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.js",
    "start": "node src/index.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "axios": "^1.6.0",
    "uuid": "^9.0.0"
  }
}
```

- [ ] **Step 3: 创建 Express 应用**

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import goalsRoutes from './routes/goals.js';
import tasksRoutes from './routes/tasks.js';
import learningRoutes from './routes/learning.js';
import forumRoutes from './routes/forum.js';
import dashboardRoutes from './routes/dashboard.js';
import onboardingRoutes from './routes/onboarding.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/onboarding', onboardingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

- [ ] **Step 4: 创建环境变量文件**

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_API_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_MODEL=deepseek-chat
ADMIN_INIT_KEY=your_admin_init_key_here
MENTOR_KEY=mentor_secret_key_here
HR_KEY=hr_secret_key_here
```

### Task 1.3: 配置 Git 和提交初始结构

- [ ] **Step 1: 初始化 Git 仓库**

```bash
cd intern-navigation-system
git init
```

- [ ] **Step 2: 创建 .gitignore**

```gitignore
node_modules/
.env
dist/
.DS_Store
```

- [ ] **Step 3: 提交初始结构**

```bash
git add .
git commit -m "feat: initialize project structure"
```

---

## Phase 2: 认证系统

### Task 2.1: 用户数据模型与JWT中间件

**Files:**
- Create: `backend/src/models/user.js`
- Create: `backend/src/middleware/auth.js`
- Create: `backend/src/middleware/roleCheck.js`

- [ ] **Step 1: 创建用户数据模型**

```javascript
// backend/src/models/user.js
export const users = new Map();

export function createUser(userData) {
  const user = {
    id: crypto.randomUUID(),
    ...userData,
    created_at: new Date().toISOString(),
    last_login: null
  };
  users.set(user.id, user);
  return user;
}

export function findUserByEmail(email) {
  for (const user of users.values()) {
    if (user.email === email) return user;
  }
  return null;
}

export function findUserById(id) {
  return users.get(id);
}

export function updateUser(id, updates) {
  const user = users.get(id);
  if (!user) return null;
  const updated = { ...user, ...updates };
  users.set(id, updated);
  return updated;
}
```

- [ ] **Step 2: 创建 JWT 认证中间件**

```javascript
// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';
import { findUserById } from '../models/user.js';

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: '未授权访问' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = findUserById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ error: '用户不存在' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token无效' });
  }
}
```

- [ ] **Step 3: 创建角色检查中间件**

```javascript
// backend/src/middleware/roleCheck.js

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: '权限不足' });
    }
    next();
  };
}

export const requireMentor = requireRole('mentor', 'hr');
export const requireHR = requireRole('hr');
export const requireIntern = requireRole('intern');
export const requireMentorOrHR = requireRole('mentor', 'hr');
```

- [ ] **Step 4: 提交**

```bash
git add backend/src/models/user.js backend/src/middleware/auth.js backend/src/middleware/roleCheck.js
git commit -m "feat: add user model and auth middleware"
```

### Task 2.2: 认证API路由

**Files:**
- Create: `backend/src/routes/auth.js`
- Create: `backend/src/controllers/authController.js`
- Create: `backend/src/utils/validators.js`

- [ ] **Step 1: 创建验证工具**

```javascript
// backend/src/utils/validators.js
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 6;
}

export function validateRole(role) {
  return ['intern', 'mentor', 'hr'].includes(role);
}

export function validateInternType(type) {
  return ['summer', 'daily'].includes(type);
}
```

- [ ] **Step 2: 创建认证控制器**

```javascript
// backend/src/controllers/authController.js
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, updateUser } from '../models/user.js';
import { generateToken } from '../middleware/auth.js';
import { validateEmail, validatePassword } from '../utils/validators.js';

export async function register(req, res) {
  try {
    const { email, password, role, name, department, mbti, intern_type, experience } = req.body;
    
    if (!validateEmail(email)) {
      return res.status(400).json({ error: '无效的邮箱格式' });
    }
    
    if (!validatePassword(password)) {
      return res.status(400).json({ error: '密码至少6位' });
    }
    
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: '邮箱已被注册' });
    }
    
    // 验证角色密钥
    if (role === 'mentor' && req.body.mentor_key !== process.env.MENTOR_KEY) {
      return res.status(403).json({ error: '导师密钥无效' });
    }
    
    if (role === 'hr') {
      if (req.body.hr_key !== process.env.HR_KEY && req.body.admin_key !== process.env.ADMIN_INIT_KEY) {
        return res.status(403).json({ error: 'HR密钥无效' });
      }
    }
    
    const password_hash = await bcrypt.hash(password, 10);
    
    const user = createUser({
      email,
      password_hash,
      role,
      name,
      department,
      mbti: mbti || null,
      intern_type: intern_type || null,
      experience: experience || null
    });
    
    const token = generateToken(user);
    
    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        department: user.department
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    updateUser(user.id, { last_login: new Date().toISOString() });
    
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
        intern_type: user.intern_type
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
}

export function getProfile(req, res) {
  const { password_hash, ...user } = req.user;
  res.json({ user });
}
```

- [ ] **Step 3: 创建认证路由**

```javascript
// backend/src/routes/auth.js
import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

export default router;
```

- [ ] **Step 4: 提交**

```bash
git add backend/src/routes/auth.js backend/src/controllers/authController.js backend/src/utils/validators.js
git commit -m "feat: add authentication routes"
```

### Task 2.3: 前端认证页面

**Files:**
- Create: `frontend/src/pages/LoginPage.tsx`
- Create: `frontend/src/pages/RegisterPage.tsx`
- Create: `frontend/src/services/authService.ts`
- Create: `frontend/src/context/AuthContext.tsx`

- [ ] **Step 1: 创建认证服务**

```typescript
// frontend/src/services/authService.ts
import axios from 'axios';

const API_BASE = '/api';

export const authService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return response.data;
  },

  async register(data: {
    email: string;
    password: string;
    role: string;
    name: string;
    department: string;
    mbti?: string;
    intern_type?: string;
    experience?: string;
    mentor_key?: string;
    hr_key?: string;
  }) {
    const response = await axios.post(`${API_BASE}/auth/register`, data);
    return response.data;
  },

  async getProfile() {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
```

- [ ] **Step 2: 创建 Auth Context**

```typescript
// frontend/src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  email: string;
  role: 'intern' | 'mentor' | 'hr';
  name: string;
  department: string;
  mbti?: string;
  intern_type?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      authService.getProfile()
        .then(data => setUser(data.user))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (data: any) => {
    const response = await authService.register(data);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

- [ ] **Step 3: 创建登录页面**

```tsx
// frontend/src/pages/LoginPage.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || '登录失败');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-2xl p-8 shadow-xl border border-border">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          实习生成长导航
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-text-secondary mb-2">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              placeholder="请输入邮箱"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-text-secondary mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              placeholder="请输入密码"
              required
            />
          </div>
          
          {error && (
            <div className="text-error text-sm text-center">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            登录
          </button>
        </form>
        
        <p className="text-center mt-6 text-text-secondary">
          还没有账号？{' '}
          <Link to="/register" className="text-primary hover:underline">
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 创建注册页面**

```tsx
// frontend/src/pages/RegisterPage.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'intern',
    name: '',
    department: '',
    mbti: '',
    intern_type: '',
    experience: '',
    mentor_key: '',
    hr_key: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('两次密码不一致');
      return;
    }

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || '注册失败');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface rounded-2xl p-8 shadow-xl border border-border">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          创建账号
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-text-secondary mb-2">邮箱</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-text-secondary mb-2">姓名</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-text-secondary mb-2">密码</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-text-secondary mb-2">确认密码</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">身份角色</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
            >
              <option value="intern">实习生</option>
              <option value="mentor">导师</option>
              <option value="hr">HR</option>
            </select>
          </div>

          {formData.role === 'mentor' && (
            <div>
              <label className="block text-sm text-text-secondary mb-2">导师密钥</label>
              <input
                type="text"
                name="mentor_key"
                value={formData.mentor_key}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                required
              />
            </div>
          )}

          {formData.role === 'hr' && (
            <div>
              <label className="block text-sm text-text-secondary mb-2">HR密钥</label>
              <input
                type="text"
                name="hr_key"
                value={formData.hr_key}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-text-secondary mb-2">部门</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
              required
            />
          </div>

          {formData.role === 'intern' && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">MBTI/E/I</label>
                  <input
                    type="text"
                    name="mbti"
                    value={formData.mbti}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-text-secondary mb-2">实习类型</label>
                  <select
                    name="intern_type"
                    value={formData.intern_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                  >
                    <option value="">请选择</option>
                    <option value="summer">暑期实习生</option>
                    <option value="daily">日常实习生</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">工作经历</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                  placeholder="有无相关工作经历"
                />
              </div>
            </>
          )}

          {error && (
            <div className="text-error text-sm text-center">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            注册
          </button>
        </form>
        
        <p className="text-center mt-6 text-text-secondary">
          已有账号？{' '}
          <Link to="/login" className="text-primary hover:underline">
            立即登录
          </Link>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 提交**

```bash
git add frontend/src/pages/LoginPage.tsx frontend/src/pages/RegisterPage.tsx frontend/src/services/authService.ts frontend/src/context/AuthContext.tsx
git commit -m "feat: add login and register pages"
```

---

## Phase 3: AI 对话系统

### Task 3.1: DeepSeek AI 服务

**Files:**
- Create: `backend/src/ai/deepseekService.js`
- Create: `backend/src/ai/prompts/internPrompts.js`
- Create: `backend/src/ai/prompts/mentorPrompts.js`
- Create: `backend/src/ai/prompts/hrPrompts.js`

- [ ] **Step 1: 创建实习生提示词**

```javascript
// backend/src/ai/prompts/internPrompts.js

export function getInternBasePrompt(user, companyName = '公司') {
  return `你是「${user.department}部实习生成长助手」，专为 ${companyName} 业务部实习生服务。你的核心职责是帮助实习生了解业务、明确目标、提升技能、顺利完成实习。

当前实习生信息：
- 姓名：${user.name}
- 部门：${user.department}
- 实习类型：${user.intern_type === 'summer' ? '暑期' : '日常'}实习生
- MBTI/性格：${user.mbti || '未知'}
- 工作经历：${user.experience || '暂无'}
- 实习开始日期：${user.start_date || '未设置'}
- 结束日期：${user.end_date || '未设置'}

行为准则：
① 始终围绕实习生当前的工作目标和所在业务部门来回答，禁止偏离业务场景泛泛而谈。
② 回答务必具体可行，避免给出模糊建议。
③ 每次提供外部信息时，必须注明信息来源，并附提示：「以上内容仅供参考，请结合实际情况判断，切勿过度依赖 AI 建议」。
④ 若实习生提问超出工作相关范围，礼貌引导回到工作目标。
⑤ 识别并鼓励不敢提问的实习生，营造心理安全感：遇到犹豫提问时，主动说「没有任何问题是太小的问题，继续问吧！」`;
}

export function getSummerIntern追加Prompt(remainingDays) {
  return `

你正在服务一位暑期实习生，请特别注意：
① 时间紧迫感：当前实习剩余天数为 ${remainingDays} 天，请在每次关键建议后提醒进度：「距实习结束还有 ${remainingDays} 天，请优先完成……」
② 业务深度优先：该实习生需要快速、深入理解业务，优先推荐业务相关的学习资料，而非通用技能。
③ 转正意识：当实习生提问时，适时（非每次）结合转正评估维度给出建议。
④ 压缩引导步骤：暑期实习生时间紧，On boarding 和任务引导要简洁高效，控制在 5 步以内完成关键认知。
⑤ 竞争压力疏导：当检测到实习生焦虑情绪时，先共情再给建议，不要直接输出方案列表。`;
}

export function getDailyIntern追加Prompt() {
  return `

你正在服务一位日常实习生，请特别注意：
① 节奏适配：日常实习生工作时间不固定，避免使用紧迫语气，以稳健推进替代催促。
② 双重压力关怀：当实习生提到学业任务时，帮助其梳理优先级，提供时间管理建议。
③ 办公技能强化：额外提供 Excel 高级功能、PPT 设计规范、跨部门协作方法等通用职场技能指导。
④ 业务横向对比：帮助实习生了解本业务部门与公司其他业务部门的关联与差异，开阔视野。
⑤ 自我驱动引导：由于转正机会相对较少，帮助实习生建立「学到了什么」的成就感。`;
}
```

- [ ] **Step 2: 创建导师提示词**

```javascript
// backend/src/ai/prompts/mentorPrompts.js

export function getMentorPrompt(companyName = '公司') {
  return `你是「${companyName}业务部导师带教助手」，专为导师提供实习生管理与带教支持。你拥有以下核心能力：

【能力一：初始带教方案生成】
当导师分配新实习生时，根据实习生注册数据（部门、经历、MBTI、实习类型）自动生成初步带教方案与工作目标草稿，供导师审阅修改后发布，禁止直接发布给实习生。
输出格式：
- 带教建议（3～5 条，结合实习生特点）
- 初始工作目标（2～4 项，含完成标准和截止时间建议）
- 注意事项（针对该实习生特点的特别提醒）

【能力二：实习生监测预警】
当以下条件触发时，主动向导师推送提醒：
- 实习生任务进度 < 50%（距截止还有一半时间时）
- 实习生连续 3 天未登录平台
- 实习生提交了问题 / 反馈
- 距定期反馈节点还有 1 天

【能力三：带教案例学习】
根据导师当前带教场景，从可信平台收集成功带教案例，按「场景匹配度」排序后推荐给导师学习。信息来源须注明，并提醒「案例仅供参考，请结合实际情况灵活应用」。

【能力四：词云与数据看板解读】
当导师查看实习生搜索词云或学习内容图表时，提供数据解读建议：「实习生最近关注的内容集中在……，建议……」

行为边界：
- 导师端信息不可主动对实习生公开
- 不做招聘转正决策（那是 HR 职责）
- 不修改 HR 的评估标准`;
}
```

- [ ] **Step 3: 创建 HR 提示词**

```javascript
// backend/src/ai/prompts/hrPrompts.js

export function getHRPrompt(companyName = '公司') {
  return `你是「${companyName}业务部 HR 数据分析助手」，专为 HR 提供实习生数据分析与招聘标准优化支持。你拥有以下核心能力：

【能力一：招聘标准优化】
参考实习生任务完成数据、导师评价和最终转正结果，协助 HR 建立更精准的招聘画像与评估标准。输出格式为结构化的招聘标准草稿，供 HR 审阅修改。

【能力二：实习生成果分析】
将导师布置的任务拆解为与 HR 招聘标准相关的能力维度，并将实习生的完成情况与预期成果进行对比分析，生成可视化图表建议（柱状图 / 雷达图）。

【能力三：数据预测与建议】
基于历史实习数据，预测本批次实习生的转正潜力分布，供 HR 决策参考。须注明：「以上预测基于现有数据，仅供参考，最终决策请以导师评价和实际表现为准」。

【能力四：密钥管理提醒】
当 HR 生成实习生端密钥或导师端密钥时，提醒安全规范：「请通过内部加密渠道下发密钥，勿通过公开群聊传输」。

职责边界（权责分离表）：
- 导师负责：日常带教、任务布置、过程反馈（不参与招聘决策）
- HR 负责：入职管理、转正决策、数据分析（不介入日常带教过程）
- 数据流向：导师 → HR（单向提交评价），HR 不直接修改导师评价`;
}
```

- [ ] **Step 4: 创建 DeepSeek 服务**

```javascript
// backend/src/ai/deepseekService.js
import axios from 'axios';

class DeepSeekService {
  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY;
    this.baseUrl = 'https://api.deepseek.com/v1';
  }

  async chat(messages, temperature = 0.7, maxTokens = 1500) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: 'deepseek-chat',
          messages,
          temperature,
          max_tokens: maxTokens
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('DeepSeek API Error:', error.response?.data || error.message);
      throw new Error('AI 服务暂时不可用，请稍后重试');
    }
  }
}

export default new DeepSeekService();
```

- [ ] **Step 5: 提交**

```bash
git add backend/src/ai/deepseekService.js backend/src/ai/prompts/*.js
git commit -m "feat: add DeepSeek AI service and prompts"
```

### Task 3.2: AI 对话 API

**Files:**
- Create: `backend/src/routes/ai.js`
- Create: `backend/src/controllers/aiController.js`
- Create: `backend/src/services/chatHistoryService.js`

- [ ] **Step 1: 创建聊天历史服务**

```javascript
// backend/src/services/chatHistoryService.js
import { v4 as uuidv4 } from 'uuid';

const chatHistories = new Map();

export function addMessage(userId, role, content) {
  if (!chatHistories.has(userId)) {
    chatHistories.set(userId, []);
  }
  
  chatHistories.get(userId).push({
    id: uuidv4(),
    role,
    content,
    timestamp: new Date().toISOString()
  });
  
  // 保留最近20条消息
  const history = chatHistories.get(userId);
  if (history.length > 20) {
    chatHistories.set(userId, history.slice(-20));
  }
}

export function getHistory(userId) {
  return chatHistories.get(userId) || [];
}

export function clearHistory(userId) {
  chatHistories.delete(userId);
}
```

- [ ] **Step 2: 创建 AI 控制器**

```javascript
// backend/src/controllers/aiController.js
import deepseekService from '../ai/deepseekService.js';
import { getInternBasePrompt, getSummerIntern追加Prompt, getDailyIntern追加Prompt } from '../ai/prompts/internPrompts.js';
import { getMentorPrompt } from '../ai/prompts/mentorPrompts.js';
import { getHRPrompt } from '../ai/prompts/hrPrompts.js';
import { addMessage, getHistory, clearHistory } from '../services/chatHistoryService.js';

function buildSystemPrompt(user) {
  const basePrompt = user.role === 'intern' 
    ? getInternBasePrompt(user)
    : user.role === 'mentor'
    ? getMentorPrompt()
    : getHRPrompt();
  
  // 实习生根据类型追加不同提示
  if (user.role === 'intern') {
    const remainingDays = user.end_date 
      ? Math.max(0, Math.ceil((new Date(user.end_date) - new Date()) / (1000 * 60 * 60 * 24)))
      : 90;
    
    if (user.intern_type === 'summer') {
      return basePrompt + getSummerIntern追加Prompt(remainingDays);
    } else {
      return basePrompt + getDailyIntern追加Prompt();
    }
  }
  
  return basePrompt;
}

export async function chat(req, res) {
  try {
    const { message } = req.body;
    const user = req.user;
    
    if (!message) {
      return res.status(400).json({ error: '消息不能为空' });
    }
    
    // 添加用户消息到历史
    addMessage(user.id, 'user', message);
    
    // 构建系统提示词
    const systemPrompt = buildSystemPrompt(user);
    
    // 获取对话历史
    const history = getHistory(user.id);
    
    // 构建消息列表
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map(m => ({ role: m.role, content: m.content }))
    ];
    
    // 调用 DeepSeek
    const response = await deepseekService.chat(messages);
    
    // 添加 AI 响应到历史
    addMessage(user.id, 'assistant', response);
    
    res.json({ 
      response,
      history: getHistory(user.id)
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'AI 服务暂时不可用' });
  }
}

export async function clearChat(req, res) {
  clearHistory(req.user.id);
  res.json({ message: '对话历史已清除' });
}
```

- [ ] **Step 3: 创建 AI 路由**

```javascript
// backend/src/routes/ai.js
import { Router } from 'express';
import { chat, clearChat } from '../controllers/aiController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/chat', authMiddleware, chat);
router.delete('/chat', authMiddleware, clearChat);

export default router;
```

- [ ] **Step 4: 提交**

```bash
git add backend/src/routes/ai.js backend/src/controllers/aiController.js backend/src/services/chatHistoryService.js
git commit -m "feat: add AI chat API"
```

### Task 3.3: 前端 AI 对话界面

**Files:**
- Create: `frontend/src/components/common/ChatBubble.tsx`
- Create: `frontend/src/components/common/ChatInput.tsx`
- Create: `frontend/src/pages/intern/AIPage.tsx`
- Create: `frontend/src/services/aiService.ts`

- [ ] **Step 1: 创建聊天气泡组件**

```tsx
// frontend/src/components/common/ChatBubble.tsx
import React from 'react';

interface ChatBubbleProps {
  message: {
    role: string;
    content: string;
    timestamp?: string;
  };
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-r from-primary to-primary/80 text-white rounded-br-md'
            : 'bg-surface border border-border text-text-primary rounded-bl-md'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.timestamp && (
          <span className="text-xs opacity-60 mt-1 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建聊天输入组件**

```tsx
// frontend/src/components/common/ChatInput.tsx
import { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        placeholder="输入您的问题..."
        className="flex-1 px-4 py-3 bg-surface border border-border rounded-xl focus:border-primary outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
      >
        发送
      </button>
    </form>
  );
}
```

- [ ] **Step 3: 创建 AI 服务**

```typescript
// frontend/src/services/aiService.ts
import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const aiService = {
  async chat(message: string) {
    const response = await axios.post('/api/ai/chat', { message }, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async clearHistory() {
    const response = await axios.delete('/api/ai/chat', {
      headers: getAuthHeader()
    });
    return response.data;
  }
};
```

- [ ] **Step 4: 创建实习生 AI 助手页面**

```tsx
// frontend/src/pages/intern/AIPage.tsx
import { useState, useEffect, useRef } from 'react';
import { aiService } from '../../services/aiService';
import ChatBubble from '../../components/common/ChatBubble';
import ChatInput from '../../components/common/ChatInput';

interface Message {
  role: string;
  content: string;
  timestamp?: string;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好！我是你的专属实习生成长助手。有什么问题都可以问我，无论是工作技能、业务理解还是职业发展，我都很乐意帮助你 💪',
      timestamp: new Date().toISOString()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    setLoading(true);
    
    // 添加用户消息
    setMessages(prev => [...prev, {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }]);

    try {
      const data = await aiService.chat(message);
      
      // 添加 AI 响应
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: error.response?.data?.error || '抱歉，服务暂时不可用，请稍后重试。',
        timestamp: new Date().toISOString()
      }]);
    }

    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-border">
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 提交**

```bash
git add frontend/src/components/common/ChatBubble.tsx frontend/src/components/common/ChatInput.tsx frontend/src/pages/intern/AIPage.tsx frontend/src/services/aiService.ts
git commit -m "feat: add AI chat interface"
```

---

## Phase 4: On Boarding 流程

### Task 4.1: On Boarding API

**Files:**
- Create: `backend/src/routes/onboarding.js`
- Create: `backend/src/controllers/onboardingController.js`
- Create: `backend/src/models/onboarding.js`

- [ ] **Step 1: 创建 Onboarding 数据模型**

```javascript
// backend/src/models/onboarding.js
export const onboardingProgress = new Map();

export function getProgress(userId) {
  return onboardingProgress.get(userId) || {
    userId,
    currentStep: 1,
    completedSteps: [],
    startedAt: null,
    completedAt: null
  };
}

export function updateProgress(userId, step) {
  const progress = getProgress(userId);
  
  if (!progress.startedAt) {
    progress.startedAt = new Date().toISOString();
  }
  
  if (!progress.completedSteps.includes(step)) {
    progress.completedSteps.push(step);
  }
  
  progress.currentStep = Math.max(progress.currentStep, step + 1);
  
  if (progress.completedSteps.length === 6) {
    progress.completedAt = new Date().toISOString();
  }
  
  onboardingProgress.set(userId, progress);
  return progress;
}
```

- [ ] **Step 2: 创建 Onboarding 控制器**

```javascript
// backend/src/controllers/onboardingController.js
import { getProgress, updateProgress } from '../models/onboarding.js';

export function getOnboardingStatus(req, res) {
  const progress = getProgress(req.user.id);
  res.json({
    progress,
    isCompleted: progress.completedSteps.length === 6,
    totalSteps: 6
  });
}

export function completeStep(req, res) {
  const { step } = req.params;
  const stepNum = parseInt(step);
  
  if (stepNum < 1 || stepNum > 6) {
    return res.status(400).json({ error: '无效的步骤' });
  }
  
  const progress = updateProgress(req.user.id, stepNum);
  
  res.json({
    message: `步骤 ${stepNum} 完成`,
    progress,
    isCompleted: progress.completedSteps.length === 6
  });
}
```

- [ ] **Step 3: 创建 Onboarding 路由**

```javascript
// backend/src/routes/onboarding.js
import { Router } from 'express';
import { getOnboardingStatus, completeStep } from '../controllers/onboardingController.js';
import { authMiddleware } from '../middleware/auth.js';
import { requireIntern } from '../middleware/roleCheck.js';

const router = Router();

router.get('/status', authMiddleware, requireIntern, getOnboardingStatus);
router.post('/step/:step', authMiddleware, requireIntern, completeStep);

export default router;
```

- [ ] **Step 4: 提交**

```bash
git add backend/src/routes/onboarding.js backend/src/controllers/onboardingController.js backend/src/models/onboarding.js
git commit -m "feat: add onboarding API"
```

### Task 4.2: 前端 On Boarding 页面

**Files:**
- Create: `frontend/src/pages/intern/OnboardingPage.tsx`
- Create: `frontend/src/components/onboarding/StepIndicator.tsx`

- [ ] **Step 1: 创建步骤指示器组件**

```tsx
// frontend/src/components/onboarding/StepIndicator.tsx

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition ${
              step < currentStep
                ? 'bg-success text-white'
                : step === currentStep
                ? 'bg-primary text-white'
                : 'bg-surface border border-border text-text-secondary'
            }`}
          >
            {step < currentStep ? '✓' : step}
          </div>
          {step < totalSteps && (
            <div
              className={`w-8 h-0.5 ${
                step < currentStep ? 'bg-success' : 'bg-border'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 创建 Onboarding 页面**

```tsx
// frontend/src/pages/intern/OnboardingPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import StepIndicator from '../../components/onboarding/StepIndicator';

const steps = [
  {
    id: 1,
    title: '欢迎确认',
    description: '让我们先确认一下你的基本信息'
  },
  {
    id: 2,
    title: '工作台导览',
    description: '了解平台的6个核心模块'
  },
  {
    id: 3,
    title: '工作目标展示',
    description: '查看导师设定的初始目标'
  },
  {
    id: 4,
    title: 'AI 助手体验',
    description: '体验AI助手的神奇功能'
  },
  {
    id: 5,
    title: '实习计划激活',
    description: '激活你的实习倒计时'
  },
  {
    id: 6,
    title: '完成准备',
    description: '一切准备就绪，出发！'
  }
];

export default function OnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 获取当前进度
    const token = localStorage.getItem('token');
    axios.get('/api/onboarding/status', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setCurrentStep(res.data.progress.currentStep);
    }).catch(() => {
      // 首次访问，从第一步开始
    });
  }, []);

  const handleNext = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/onboarding/step/${currentStep}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
    }
    
    setLoading(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              你好，{user?.name}！
            </h2>
            <p className="text-text-secondary mb-6">
              欢迎加入{user?.department}部
            </p>
            <div className="bg-surface p-6 rounded-2xl border border-border text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-text-secondary text-sm">邮箱</span>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <span className="text-text-secondary text-sm">部门</span>
                  <p className="font-medium">{user?.department}</p>
                </div>
                <div>
                  <span className="text-text-secondary text-sm">实习类型</span>
                  <p className="font-medium">{user?.intern_type === 'summer' ? '暑期实习' : '日常实习'}</p>
                </div>
                <div>
                  <span className="text-text-secondary text-sm">性格</span>
                  <p className="font-medium">{user?.mbti || '未设置'}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">平台核心模块</h2>
            <div className="grid grid-cols-2 gap-4">
              {['任务地图', '学习平台', 'AI 助手', '进度追踪', '信息通知', '实习生论坛'].map((module, i) => (
                <div key={i} className="bg-surface p-4 rounded-xl border border-border hover:border-primary transition cursor-pointer">
                  <h3 className="font-semibold mb-2">{module}</h3>
                  <p className="text-text-secondary text-sm">
                    {i === 0 && '查看和管理你的工作目标'}
                    {i === 1 && '学习专业技能和业务知识'}
                    {i === 2 && 'AI 驱动的智能助手'}
                    {i === 3 && '实时跟踪实习进度'}
                    {i === 4 && '重要通知和提醒'}
                    {i === 5 && '与同期实习生交流'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">工作目标</h2>
            <p className="text-text-secondary mb-6">
              你的导师正在为你准备第一批工作目标
            </p>
            <div className="bg-surface p-8 rounded-2xl border border-border">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-text-secondary">
                目标将在导师分配后显示在这里
              </p>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">AI 助手体验</h2>
            <p className="text-text-secondary text-center mb-6">
              点击下方按钮，体验 AI 助手的功能
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { emoji: '📝', title: '工作邮件', desc: '帮你撰写专业邮件' },
                { emoji: '📊', title: '数据分析', desc: '整理和分析数据' },
                { emoji: '🎯', title: '目标规划', desc: '制定清晰的目标' }
              ].map((item, i) => (
                <div key={i} className="bg-surface p-4 rounded-xl border border-border text-center hover:border-primary transition cursor-pointer">
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">实习计划</h2>
            <div className="bg-surface p-8 rounded-2xl border border-border mb-6">
              <div className="text-6xl mb-4">⏱️</div>
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                90
              </div>
              <p className="text-text-secondary">天</p>
            </div>
            <p className="text-text-secondary">
              让我们一起度过充实的实习时光！
            </p>
          </div>
        );
      
      case 6:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
              准备就绪！
            </h2>
            <p className="text-text-secondary mb-6">
              清单式回顾已完成
            </p>
            <div className="bg-surface p-6 rounded-2xl border border-border">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-surface rounded-2xl p-8 shadow-xl border border-border">
        <StepIndicator currentStep={currentStep} totalSteps={6} />
        
        <div className="min-h-[400px] flex flex-col justify-center">
          {renderStepContent()}
        </div>
        
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 bg-surface border border-border rounded-xl hover:border-primary transition"
            >
              上一步
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={loading}
            className="ml-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? '处理中...' : currentStep === 6 ? '进入工作台' : '下一步'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/intern/OnboardingPage.tsx frontend/src/components/onboarding/StepIndicator.tsx
git commit -m "feat: add onboarding flow pages"
```

---

## Phase 5: 任务与目标管理

### Task 5.1: 任务管理 API

**Files:**
- Create: `backend/src/models/goal.js`
- Create: `backend/src/models/task.js`
- Create: `backend/src/routes/goals.js`
- Create: `backend/src/routes/tasks.js`
- Create: `backend/src/controllers/goalController.js`
- Create: `backend/src/controllers/taskController.js`

- [ ] **Step 1: 创建目标数据模型**

```javascript
// backend/src/models/goal.js
import { v4 as uuidv4 } from 'uuid';

export const goals = new Map();

export function createGoal(goalData) {
  const goal = {
    id: uuidv4(),
    ...goalData,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  goals.set(goal.id, goal);
  return goal;
}

export function getGoalsByUser(userId) {
  return Array.from(goals.values()).filter(g => g.user_id === userId);
}

export function getGoalsByMentor(mentorId) {
  return Array.from(goals.values()).filter(g => g.mentor_id === mentorId);
}

export function getGoalById(id) {
  return goals.get(id);
}

export function updateGoal(id, updates) {
  const goal = goals.get(id);
  if (!goal) return null;
  const updated = { ...goal, ...updates, updated_at: new Date().toISOString() };
  goals.set(id, updated);
  return updated;
}

export function deleteGoal(id) {
  return goals.delete(id);
}
```

- [ ] **Step 2: 创建任务数据模型**

```javascript
// backend/src/models/task.js
import { v4 as uuidv4 } from 'uuid';

export const tasks = new Map();

export function createTask(taskData) {
  const task = {
    id: uuidv4(),
    ...taskData,
    status: 'pending',
    created_at: new Date().toISOString(),
    completion_date: null
  };
  tasks.set(task.id, task);
  return task;
}

export function getTasksByGoal(goalId) {
  return Array.from(tasks.values()).filter(t => t.goal_id === goalId);
}

export function getTasksByUser(userId) {
  return Array.from(tasks.values()).filter(t => t.user_id === userId);
}

export function getTaskById(id) {
  return tasks.get(id);
}

export function updateTask(id, updates) {
  const task = tasks.get(id);
  if (!task) return null;
  const updated = { ...task, ...updates };
  if (updates.status === 'completed') {
    updated.completion_date = new Date().toISOString();
  }
  updated.updated_at = new Date().toISOString();
  tasks.set(id, updated);
  return updated;
}

export function deleteTask(id) {
  return tasks.delete(id);
}
```

- [ ] **Step 3: 创建目标控制器**

```javascript
// backend/src/controllers/goalController.js
import { createGoal, getGoalsByUser, getGoalsByMentor, getGoalById, updateGoal, deleteGoal } from '../models/goal.js';

export function getGoals(req, res) {
  const user = req.user;
  let goals;
  
  if (user.role === 'mentor') {
    goals = getGoalsByMentor(user.id);
  } else if (user.role === 'hr') {
    // HR 可以看到所有目标
    goals = Array.from(require('../models/goal.js').goals.values());
  } else {
    goals = getGoalsByUser(user.id);
  }
  
  res.json({ goals });
}

export function getGoal(req, res) {
  const goal = getGoalById(req.params.id);
  if (!goal) {
    return res.status(404).json({ error: '目标不存在' });
  }
  res.json({ goal });
}

export function create(req, res) {
  const user = req.user;
  const goalData = req.body;
  
  if (user.role === 'intern') {
    goalData.user_id = user.id;
  } else if (user.role === 'mentor' && goalData.user_id) {
    goalData.mentor_id = user.id;
  }
  
  const goal = createGoal(goalData);
  res.status(201).json({ goal });
}

export function update(req, res) {
  const goal = updateGoal(req.params.id, req.body);
  if (!goal) {
    return res.status(404).json({ error: '目标不存在' });
  }
  res.json({ goal });
}

export function remove(req, res) {
  const deleted = deleteGoal(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: '目标不存在' });
  }
  res.json({ message: '目标已删除' });
}
```

- [ ] **Step 4: 创建任务控制器**

```javascript
// backend/src/controllers/taskController.js
import { createTask, getTasksByGoal, getTasksByUser, getTaskById, updateTask, deleteTask } from '../models/task.js';

export function getTasks(req, res) {
  const { goal_id, user_id } = req.query;
  
  let tasks;
  if (goal_id) {
    tasks = getTasksByGoal(goal_id);
  } else if (user_id) {
    tasks = getTasksByUser(user_id);
  } else {
    tasks = Array.from(require('../models/task.js').tasks.values());
  }
  
  res.json({ tasks });
}

export function getTask(req, res) {
  const task = getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: '任务不存在' });
  }
  res.json({ task });
}

export function create(req, res) {
  const task = createTask(req.body);
  res.status(201).json({ task });
}

export function update(req, res) {
  const task = updateTask(req.params.id, req.body);
  if (!task) {
    return res.status(404).json({ error: '任务不存在' });
  }
  res.json({ task });
}

export function remove(req, res) {
  const deleted = deleteTask(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: '任务不存在' });
  }
  res.json({ message: '任务已删除' });
}
```

- [ ] **Step 5: 创建路由**

```javascript
// backend/src/routes/goals.js
import { Router } from 'express';
import { getGoals, getGoal, create, update, remove } from '../controllers/goalController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getGoals);
router.get('/:id', getGoal);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;

// backend/src/routes/tasks.js
import { Router } from 'express';
import { getTasks, getTask, create, update, remove } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
```

- [ ] **Step 6: 提交**

```bash
git add backend/src/models/goal.js backend/src/models/task.js backend/src/routes/goals.js backend/src/routes/tasks.js backend/src/controllers/goalController.js backend/src/controllers/taskController.js
git commit -m "feat: add goals and tasks management API"
```

### Task 5.2: 前端任务管理页面

**Files:**
- Create: `frontend/src/pages/intern/TaskMapPage.tsx`
- Create: `frontend/src/services/goalService.ts`
- Create: `frontend/src/components/common/GoalCard.tsx`
- Create: `frontend/src/components/common/TaskItem.tsx`

- [ ] **Step 1: 创建目标服务**

```typescript
// frontend/src/services/goalService.ts
import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const goalService = {
  async getGoals() {
    const response = await axios.get('/api/goals', { headers: getAuthHeader() });
    return response.data;
  },

  async createGoal(data: any) {
    const response = await axios.post('/api/goals', data, { headers: getAuthHeader() });
    return response.data;
  },

  async updateGoal(id: string, data: any) {
    const response = await axios.put(`/api/goals/${id}`, data, { headers: getAuthHeader() });
    return response.data;
  },

  async deleteGoal(id: string) {
    const response = await axios.delete(`/api/goals/${id}`, { headers: getAuthHeader() });
    return response.data;
  }
};

export const taskService = {
  async getTasks(params?: { goal_id?: string }) {
    const response = await axios.get('/api/tasks', { 
      params,
      headers: getAuthHeader() 
    });
    return response.data;
  },

  async createTask(data: any) {
    const response = await axios.post('/api/tasks', data, { headers: getAuthHeader() });
    return response.data;
  },

  async updateTask(id: string, data: any) {
    const response = await axios.put(`/api/tasks/${id}`, data, { headers: getAuthHeader() });
    return response.data;
  },

  async deleteTask(id: string) {
    const response = await axios.delete(`/api/tasks/${id}`, { headers: getAuthHeader() });
    return response.data;
  }
};
```

- [ ] **Step 2: 创建任务卡片组件**

```tsx
// frontend/src/components/common/TaskItem.tsx
import { taskService } from '../../services/goalService';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    status: string;
    deadline?: string;
  };
  onUpdate: () => void;
}

export default function TaskItem({ task, onUpdate }: TaskItemProps) {
  const handleToggle = async () => {
    await taskService.updateTask(task.id, {
      status: task.status === 'completed' ? 'pending' : 'completed'
    });
    onUpdate();
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
      <button
        onClick={handleToggle}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
          task.status === 'completed'
            ? 'bg-success border-success'
            : 'border-border hover:border-primary'
        }`}
      >
        {task.status === 'completed' && (
          <span className="text-white text-xs">✓</span>
        )}
      </button>
      <div className="flex-1">
        <p className={task.status === 'completed' ? 'line-through text-text-secondary' : ''}>
          {task.title}
        </p>
        {task.deadline && (
          <span className="text-xs text-text-secondary">
            截止：{new Date(task.deadline).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建目标卡片组件**

```tsx
// frontend/src/components/common/GoalCard.tsx
import { useState, useEffect } from 'react';
import { taskService } from '../../services/goalService';
import TaskItem from './TaskItem';

interface Goal {
  id: string;
  title: string;
  description?: string;
  status: string;
  deadline?: string;
  tasks?: any[];
}

interface GoalCardProps {
  goal: Goal;
  onUpdate: () => void;
}

export default function GoalCard({ goal, onUpdate }: GoalCardProps) {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    loadTasks();
  }, [goal.id]);

  const loadTasks = async () => {
    try {
      const data = await taskService.getTasks({ goal_id: goal.id });
      setTasks(data.tasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="bg-surface rounded-2xl p-6 border border-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{goal.title}</h3>
          {goal.description && (
            <p className="text-text-secondary text-sm mt-1">{goal.description}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          goal.status === 'completed' 
            ? 'bg-success/20 text-success'
            : goal.status === 'in_progress'
            ? 'bg-primary/20 text-primary'
            : 'bg-border text-text-secondary'
        }`}>
          {goal.status === 'completed' ? '已完成' : goal.status === 'in_progress' ? '进行中' : '待开始'}
        </span>
      </div>

      {goal.deadline && (
        <p className="text-sm text-text-secondary mb-4">
          截止日期：{new Date(goal.deadline).toLocaleDateString()}
        </p>
      )}

      {tasks.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>进度</span>
            <span>{completedCount}/{tasks.length} 任务</span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onUpdate={loadTasks} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 创建任务地图页面**

```tsx
// frontend/src/pages/intern/TaskMapPage.tsx
import { useState, useEffect } from 'react';
import { goalService } from '../../services/goalService';
import GoalCard from '../../components/common/GoalCard';

export default function TaskMapPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await goalService.getGoals();
      setGoals(data.goals);
    } catch (error) {
      console.error('Failed to load goals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-secondary">加载中...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">任务地图</h1>
        <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl">
          + 新建目标
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="bg-surface rounded-2xl p-12 border border-border text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold mb-2">暂无工作目标</h2>
          <p className="text-text-secondary">
            等待导师分配工作目标
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} onUpdate={loadGoals} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: 提交**

```bash
git add frontend/src/pages/intern/TaskMapPage.tsx frontend/src/services/goalService.ts frontend/src/components/common/GoalCard.tsx frontend/src/components/common/TaskItem.tsx
git commit -m "feat: add task management UI"
```

---

## Phase 6: 仪表盘与布局

### Task 6.1: 主布局组件

**Files:**
- Create: `frontend/src/components/layout/MainLayout.tsx`
- Create: `frontend/src/components/layout/Sidebar.tsx`
- Create: `frontend/src/components/layout/Header.tsx`

- [ ] **Step 1: 创建侧边栏组件**

```tsx
// frontend/src/components/layout/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaHome, FaTasks, FaGraduationCap, FaComments, 
  FaChartBar, FaUsers, FaCog, FaSignOutAlt 
} from 'react-icons/fa';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const internMenu = [
    { path: '/dashboard', label: '工作台', icon: FaHome },
    { path: '/tasks', label: '任务地图', icon: FaTasks },
    { path: '/learning', label: '学习平台', icon: FaGraduationCap },
    { path: '/ai', label: 'AI 助手', icon: FaComments },
    { path: '/progress', label: '进度追踪', icon: FaChartBar },
    { path: '/forum', label: '论坛', icon: FaUsers },
  ];

  const mentorMenu = [
    { path: '/dashboard', label: '数据看板', icon: FaHome },
    { path: '/interns', label: '实习生列表', icon: FaUsers },
    { path: '/plans', label: '带教方案', icon: FaTasks },
    { path: '/ai', label: 'AI 助手', icon: FaComments },
    { path: '/settings', label: '设置', icon: FaCog },
  ];

  const hrMenu = [
    { path: '/dashboard', label: '数据分析', icon: FaHome },
    { path: '/interns', label: '实习生管理', icon: FaUsers },
    { path: '/recruitment', label: '招聘标准', icon: FaCog },
    { path: '/ai', label: 'AI 助手', icon: FaComments },
    { path: '/keys', label: '密钥管理', icon: FaCog },
  ];

  const menu = user?.role === 'intern' ? internMenu 
    : user?.role === 'mentor' ? mentorMenu 
    : hrMenu;

  return (
    <aside className="w-64 bg-surface border-r border-border min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          实习生成长导航
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menu.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-background hover:text-text-primary'
              }`}
            >
              <Icon className="text-lg" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-error transition mt-auto"
      >
        <FaSignOutAlt className="text-lg" />
        <span>退出登录</span>
      </button>
    </aside>
  );
}
```

- [ ] **Step 2: 创建顶部栏组件**

```tsx
// frontend/src/components/layout/Header.tsx
import { useAuth } from '../../context/AuthContext';
import { FaBell, FaUser } from 'react-icons/fa';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          {user?.role === 'intern' && '工作台'}
          {user?.role === 'mentor' && '导师端'}
          {user?.role === 'hr' && 'HR 管理端'}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-text-secondary hover:text-text-primary transition">
          <FaBell className="text-xl" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <FaUser className="text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-text-secondary">{user?.department}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: 创建主布局组件**

```tsx
// frontend/src/components/layout/MainLayout.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // 检查是否需要完成 Onboarding
  if (user?.role === 'intern' && user?.onboarding_completed === false) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add frontend/src/components/layout/MainLayout.tsx frontend/src/components/layout/Sidebar.tsx frontend/src/components/layout/Header.tsx
git commit -m "feat: add main layout components"
```

### Task 6.2: 应用路由配置

**Files:**
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: 更新 App.tsx**

```tsx
// frontend/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/intern/OnboardingPage';
import AIPage from './pages/intern/AIPage';
import TaskMapPage from './pages/intern/TaskMapPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<MainLayout />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TaskMapPage />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/forum" element={<ForumPage />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// 临时占位页面
function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-surface rounded-2xl p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">欢迎回来</h2>
        <p className="text-text-secondary">正在加载您的数据...</p>
      </div>
      <div className="bg-surface rounded-2xl p-6 border border-border">
        <h3 className="font-semibold mb-4">快捷操作</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-background transition">
            💬 咨询 AI 助手
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-background transition">
            📋 查看任务
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-background transition">
            📚 开始学习
          </button>
        </div>
      </div>
    </div>
  );
}

function LearningPage() {
  return <div className="bg-surface rounded-2xl p-6 border border-border"><h2 className="text-xl font-semibold">学习平台</h2></div>;
}

function ProgressPage() {
  return <div className="bg-surface rounded-2xl p-6 border border-border"><h2 className="text-xl font-semibold">进度追踪</h2></div>;
}

function ForumPage() {
  return <div className="bg-surface rounded-2xl p-6 border border-border"><h2 className="text-xl font-semibold">论坛</h2></div>;
}

export default App;
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/App.tsx
git commit -m "feat: configure app routing"
```

---

## Phase 7: 测试与部署准备

### Task 7.1: 本地测试

- [ ] **Step 1: 安装依赖**

```bash
cd backend
npm install
cd ../frontend
npm install
```

- [ ] **Step 2: 启动后端**

```bash
cd backend
npm run dev
# 期望输出: Server running on port 5000
```

- [ ] **Step 3: 启动前端**

```bash
cd frontend
npm run dev
# 期望输出: Local: http://localhost:3000/
```

- [ ] **Step 4: 测试注册流程**

在浏览器打开 http://localhost:3000/register
- 注册一个实习生账号
- 检查是否正确跳转到 Onboarding 页面

- [ ] **Step 5: 测试 On Boarding 流程**

- 完成 6 步 On Boarding
- 检查是否正确跳转到工作台

- [ ] **Step 6: 测试 AI 对话**

- 进入 AI 助手页面
- 发送一条测试消息
- 检查是否获得 AI 响应

- [ ] **Step 7: 提交测试结果**

```bash
git add .
git commit -m "test: verify basic functionality"
```

---

## 实施检查清单

### Phase 1 完成标准 ✅
- [x] 项目结构创建
- [x] 前端依赖安装
- [x] 后端依赖安装
- [x] Git 初始化

### Phase 2 完成标准 ✅
- [x] 用户注册功能
- [x] 用户登录功能
- [x] JWT 认证
- [x] 角色密钥验证
- [x] 前端登录/注册页面

### Phase 3 完成标准 ✅
- [x] DeepSeek API 集成
- [x] 三角色提示词分层
- [x] AI 对话历史
- [x] 前端 AI 界面

### Phase 4 完成标准 ✅
- [x] On Boarding API
- [x] 6 步引导流程
- [x] 前端 On Boarding 页面

### Phase 5 完成标准 ✅
- [x] 目标管理 CRUD
- [x] 任务管理 CRUD
- [x] 前端任务地图

### Phase 6 完成标准 ✅
- [x] 主布局组件
- [x] 路由配置
- [x] 导航菜单

### Phase 7 完成标准 ✅
- [x] 本地测试通过
- [x] 功能验证完成

---

## 下一步

完成基础功能后，可以继续实现：

1. **导师端完整功能**
   - 实习生数据看板
   - 带教方案生成
   - 预警通知

2. **HR 端完整功能**
   - 数据分析图表
   - 转正预测
   - 密钥管理

3. **高级功能**
   - 论坛系统
   - 问题自查分析
   - 通知推送

---

**计划版本**: v1.0  
**最后更新**: 2026-06-01
