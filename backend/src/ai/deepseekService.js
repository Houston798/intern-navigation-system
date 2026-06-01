import axios from 'axios';

class DeepSeekService {
  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY;
    this.baseUrl = 'https://api.deepseek.com/v1';
    this.model = 'deepseek-chat';
  }

  async chat(messages, options = {}) {
    const { temperature = 0.7, maxTokens = 1500 } = options;

    // 如果没有配置API密钥，返回模拟响应
    if (!this.apiKey || this.apiKey === 'your_deepseek_api_key_here') {
      console.warn('DeepSeek API key not configured, using mock response');
      return this.getMockResponse(messages);
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages,
          temperature,
          max_tokens: maxTokens
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30秒超时
        }
      );

      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content;
      }

      throw new Error('Invalid response from DeepSeek API');
    } catch (error) {
      console.error('DeepSeek API Error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw new Error('DeepSeek API 密钥无效，请检查配置');
      }
      
      if (error.response?.status === 429) {
        throw new Error('API 请求过于频繁，请稍后重试');
      }
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('AI 服务响应超时，请稍后重试');
      }
      
      throw new Error('AI 服务暂时不可用，请稍后重试');
    }
  }

  getMockResponse(messages) {
    // 获取最后一条用户消息
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    const userMessage = lastUserMessage?.content || '';

    // 简单的关键词匹配
    if (userMessage.includes('任务') || userMessage.includes('工作')) {
      return '好的，我理解了您关于工作任务的咨询。根据您的情况，我建议您先与导师确认具体的工作目标，然后按优先级分解成可执行的小任务。如果遇到困难，随时可以向我请教具体的解决方法。';
    }

    if (userMessage.includes('焦虑') || userMessage.includes('压力')) {
      return '我能理解您现在的感受。实习初期感到焦虑是很正常的，这是您在认真对待工作的表现。不妨试试以下方法：1）将大目标分解成小步骤；2）每天给自己一个小成就奖励；3）多和同事交流，你会发现大家都有类似的经历。记住，成长是一个渐进的过程。';
    }

    if (userMessage.includes('学习') || userMessage.includes('技能')) {
      return '关于学习提升，我建议您：1）先了解部门的核心业务知识；2）掌握常用的办公工具和软件；3）培养沟通协作能力。具体的资料我可以帮您推荐。请问您目前最想提升哪方面的能力？';
    }

    if (userMessage.includes('转正') || userMessage.includes('评估')) {
      return '转正是很多实习生关心的话题。通常评估会关注：工作成果与质量、学习能力与成长速度、团队协作与沟通、职业素养与态度。我的建议是：专注于做好每一项任务，展现您的主动性和学习能力，这些都是评估的重要加分项。';
    }

    // 默认回复
    return '感谢您的提问！作为您的成长助手，我很乐意帮助您。可以具体说说您现在遇到的问题或困惑吗？无论是工作技能、业务理解还是职业规划方面的问题，我都会尽力为您提供建议和帮助。';
  }
}

export default new DeepSeekService();
