import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { onboardingService } from '../../services/onboardingService';
import { FaCheck, FaArrowRight, FaArrowLeft, FaRobot, FaGraduationCap, FaRocket, FaClock, FaStar } from 'react-icons/fa';

export default function OnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const data = await onboardingService.getStatus();
      setCurrentStep(data.progress.currentStep);
    } catch (err) {
      console.error('Failed to load onboarding progress:', err);
    }
  };

  const handleNext = async () => {
    setLoading(true);
    setError('');
    
    try {
      await onboardingService.completeStep(currentStep);
      
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1);
      } else {
        // Onboarding 完成，跳转到仪表盘
        navigate('/ai');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    {
      id: 1,
      title: '欢迎确认',
      icon: FaStar,
      description: '让我们先确认一下你的基本信息',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 2,
      title: '工作台导览',
      icon: FaRocket,
      description: '了解平台的6个核心模块',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: '工作目标展示',
      icon: FaGraduationCap,
      description: '查看导师设定的初始目标',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'AI助手体验',
      icon: FaRobot,
      description: '体验AI助手的神奇功能',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 5,
      title: '实习计划激活',
      icon: FaClock,
      description: '激活你的实习倒计时',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 6,
      title: '完成准备',
      icon: FaCheck,
      description: '一切准备就绪，出发！',
      color: 'from-success to-primary'
    }
  ];

  const renderStepContent = () => {
    const step = steps[currentStep - 1];
    const Icon = step.icon;

    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">👋</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              你好，{user?.name}！
            </h2>
            <p className="text-text-secondary text-lg">
              欢迎加入 <span className="text-primary font-semibold">{user?.department}</span> 部
            </p>
            
            <div className="bg-surface p-6 rounded-2xl border border-border max-w-md mx-auto text-left">
              <h3 className="font-semibold mb-4 text-center">📋 您的信息</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">邮箱</span>
                  <span className="font-medium">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">部门</span>
                  <span className="font-medium">{user?.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">实习类型</span>
                  <span className="font-medium">
                    {user?.intern_type === 'summer' ? '🌞 暑期实习' : '📅 日常实习'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">性格</span>
                  <span className="font-medium">{user?.mbti || '未设置'}</span>
                </div>
              </div>
            </div>

            <p className="text-text-secondary">
              请确认以上信息是否正确，如有需要可以在个人资料中修改
            </p>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">🚀 工作台导览</h2>
            <p className="text-text-secondary">了解平台的6个核心模块</p>
            
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { icon: '📋', title: '任务地图', desc: '管理您的工作目标' },
                { icon: '📚', title: '学习平台', desc: '学习专业技能' },
                { icon: '🤖', title: 'AI 助手', desc: '智能问题解答' },
                { icon: '📊', title: '进度追踪', desc: '跟踪实习进度' },
                { icon: '🔔', title: '信息通知', desc: '重要提醒' },
                { icon: '💬', title: '论坛', desc: '与同学交流' }
              ].map((module, i) => (
                <div 
                  key={i}
                  className="bg-surface p-4 rounded-xl border border-border hover:border-primary transition cursor-pointer group"
                >
                  <div className="text-4xl mb-2">{module.icon}</div>
                  <h3 className="font-semibold group-hover:text-primary transition">
                    {module.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{module.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">🎯 工作目标</h2>
            <p className="text-text-secondary">查看导师为您设定的目标</p>
            
            <div className="bg-surface p-8 rounded-2xl border border-border max-w-lg mx-auto">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">等待目标分配</h3>
              <p className="text-text-secondary">
                您的导师正在为您准备第一批工作目标。
                <br />
                目标将在导师分配后显示在这里。
              </p>
            </div>

            <div className="bg-primary/10 p-4 rounded-xl border border-primary/30 max-w-lg mx-auto">
              <p className="text-primary text-sm">
                💡 <strong>提示：</strong>完成 On Boarding 后，您可以在任务地图中查看最新的工作目标
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">🤖 AI 助手体验</h2>
            <p className="text-text-secondary">体验 AI 助手的神奇功能</p>
            
            <div className="bg-surface p-6 rounded-2xl border border-border max-w-lg mx-auto">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">您的专属成长助手</h3>
              <p className="text-text-secondary mb-4">
                AI 助手可以帮助您：
              </p>
              <div className="text-left space-y-2">
                {[
                  '💼 解答工作相关问题',
                  '📚 提供学习建议和资源',
                  '🎯 协助制定目标计划',
                  '💪 情绪支持和压力疏导'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 p-4 rounded-xl border border-primary/30 max-w-lg mx-auto">
              <p className="text-primary text-sm">
                💡 <strong>示例问题：</strong>"如何快速融入团队？"、"推荐一些学习资源"
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">⏱️ 实习计划</h2>
            <p className="text-text-secondary">激活您的实习倒计时</p>
            
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 rounded-2xl border border-primary/30 max-w-lg mx-auto">
              <div className="text-8xl mb-4">⏱️</div>
              <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                90
              </div>
              <p className="text-2xl text-text-secondary">天</p>
            </div>

            <p className="text-text-secondary">
              让我们一起度过充实而精彩的实习时光！
            </p>

            <div className="bg-surface p-4 rounded-xl border border-border max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2">
                <span className="text-success">✅</span>
                <span>实习开始日期：{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
              准备就绪！
            </h2>
            <p className="text-text-secondary">
              恭喜您完成 On Boarding！
            </p>
            
            <div className="bg-surface p-6 rounded-2xl border border-border max-w-md mx-auto">
              <h3 className="font-semibold mb-4">✅ 已完成清单</h3>
              <div className="space-y-3">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                        <FaCheck className="text-white text-sm" />
                      </div>
                      <span className="font-medium">{s.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded-xl max-w-md mx-auto">
              <div className="bg-background rounded-xl p-4">
                <p className="text-white font-semibold">
                  🚀 准备开始您的实习之旅！
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-surface rounded-2xl p-8 shadow-xl border border-border">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">
              步骤 {currentStep} / 6
            </span>
            <span className="text-sm text-text-secondary">
              {Math.round((currentStep / 6) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`w-3 h-3 rounded-full transition ${
                s.id <= currentStep 
                  ? 'bg-primary' 
                  : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px] flex flex-col justify-center">
          {renderStepContent()}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-error text-sm text-center mb-4">
            {error}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1 || loading}
            className="px-6 py-3 bg-surface border border-border rounded-xl hover:border-primary transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FaArrowLeft />
            <span>上一步</span>
          </button>
          
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
          >
            <span>{loading ? '处理中...' : currentStep === 6 ? '进入工作台' : '下一步'}</span>
            {!loading && <FaArrowRight />}
          </button>
        </div>
      </div>
    </div>
  );
}
