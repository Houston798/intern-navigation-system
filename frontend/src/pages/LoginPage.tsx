import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || '登录失败，请检查邮箱和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-2xl p-8 shadow-xl border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            实习生成长导航
          </h1>
          <p className="text-text-secondary">登录您的账号</p>
        </div>
        
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
            <div className="text-error text-sm text-center bg-error/10 py-2 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-text-secondary">
            还没有账号？{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
