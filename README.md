# 业务部实习生成长导航系统

基于 React + Node.js + CloudBase + DeepSeek 的实习生成长管理平台。

## 技术栈

- **前端**: React + Vite + TypeScript + Tailwind CSS
- **后端**: Node.js + Express
- **数据库**: CloudBase 云数据库
- **AI**: DeepSeek API
- **认证**: JWT Token

## 项目结构

```
intern-navigation-system/
├── frontend/          # React前端
│   ├── src/
│   │   ├── components/   # 组件
│   │   ├── pages/        # 页面
│   │   ├── services/     # API服务
│   │   ├── context/      # React Context
│   │   └── styles/       # 样式
│   └── package.json
├── backend/           # Node.js后端
│   ├── src/
│   │   ├── routes/       # API路由
│   │   ├── controllers/  # 控制器
│   │   ├── models/       # 数据模型
│   │   ├── middleware/   # 中间件
│   │   ├── services/     # 业务逻辑
│   │   └── ai/          # AI服务
│   └── package.json
└── docs/              # 文档
```

## 快速开始

### 1. 安装依赖

```bash
# 前端依赖
cd frontend
npm install

# 后端依赖
cd backend
npm install
```

### 2. 配置环境变量

编辑 `backend/.env` 文件：

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here
ADMIN_INIT_KEY=your_admin_init_key_here
MENTOR_KEY=mentor_secret_key_here
HR_KEY=hr_secret_key_here
```

### 3. 启动开发服务器

```bash
# 启动后端 (端口 5000)
cd backend
npm run dev

# 启动前端 (端口 3000)
cd frontend
npm run dev
```

### 4. 访问应用

打开浏览器访问 http://localhost:3000

## 功能模块

### 实习生端
- On Boarding 引导流程
- 任务地图
- AI 助手
- 学习平台
- 进度追踪
- 论坛交流

### 导师端
- 实习生数据看板
- 带教方案生成
- 任务监测预警
- 实习生管理

### HR 端
- 数据分析
- 招聘标准管理
- 密钥管理
- 转正预测

## 开发说明

- 前端开发服务器会自动代理 `/api` 请求到后端
- 所有 API 路由需要携带 JWT Token 进行认证
- AI 对话通过 DeepSeek API 实现

## 许可证

MIT
