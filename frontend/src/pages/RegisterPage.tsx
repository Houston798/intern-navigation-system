import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
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
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码至少需要6位');
      return;
    }

    setLoading(true);
    
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || '注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface rounded-2xl p-8 shadow-xl border border-border max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            创建账号
          </h1>
          <p className="text-text-secondary">加入实习生成长导航平台</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">邮箱 *</label>
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
              <label className="block text-sm text-text-secondary mb-2">姓名 *</label>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">密码 *</label>
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
              <label className="block text-sm text-text-secondary mb-2">确认密码 *</label>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">身份角色 *</label>
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
            
            <div>
              <label className="block text-sm text-text-secondary mb-2">部门 *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                required
              />
            </div>
          </div>

          {formData.role === 'mentor' && (
            <div>
              <label className="block text-sm text-text-secondary mb-2">导师密钥 *</label>
              <input
                type="text"
                name="mentor_key"
                value={formData.mentor_key}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                required
              />
              <p className="text-xs text-text-secondary mt-1">请输入导师专属密钥</p>
            </div>
          )}

          {formData.role === 'hr' && (
            <div>
              <label className="block text-sm text-text-secondary mb-2">HR密钥 *</label>
              <input
                type="text"
                name="hr_key"
                value={formData.hr_key}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                required
              />
              <p className="text-xs text-text-secondary mt-1">请输入HR专属密钥</p>
            </div>
          )}

          {formData.role === 'intern' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">MBTI/E/I</label>
                  <input
                    type="text"
                    name="mbti"
                    value={formData.mbti}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                    placeholder="如：INTJ、ENFP 或 E/I"
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
                  placeholder="有无相关实习或工作经验"
                />
              </div>
            </>
          )}

          {error && (
            <div className="text-error text-sm text-center bg-error/10 py-2 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-text-secondary">
            已有账号？{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
