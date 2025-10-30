# Smart Excalidraw

基于 AI 大语言模型的智能图表生成工具，使用 Excalidraw 实现自然语言到可视化图表的转换。

## ✨ 功能特性

- 🤖 **AI 驱动生成** - 支持 OpenAI 和 Anthropic 大模型，通过自然语言描述生成专业图表
- 🎨 **交互式画布** - 完整集成 Excalidraw，可实时查看和编辑生成的图表
- 📝 **代码编辑器** - 基于 Monaco 的代码编辑器，可查看和修改生成的 Excalidraw 代码
- ⚙️ **灵活配置** - 支持多种 LLM 提供商（OpenAI、Anthropic）的灵活配置
- 💾 **本地存储** - 配置信息保存在浏览器本地，无需后端数据库

## 📖 使用指南

在线网站 [http://localhost:3000](http://localhost:3000)

### 配置 LLM 提供商

1. 点击右上角的 **"配置 LLM"** 按钮
2. 填写配置表单：
   - **提供商名称**：为配置起一个友好的名称
   - **提供商类型**：选择 OpenAI 或 Anthropic
   - **Base URL**：API 端点地址（如 `https://api.openai.com/v1` 或 `https://api.anthropic.com/v1`）
   - **API Key**：你的 API 密钥
3. 点击 **"加载可用模型"** 获取可用模型列表
4. 从下拉菜单中选择一个模型或者自己填入模型id
5. 点击 **"保存配置"**

### 创建图表

1. **输入描述**：在聊天输入框中输入你的图表需求
   - 示例："创建一个用户认证流程图"

2. **查看生成的代码**：AI 会生成 Excalidraw 代码并显示在代码编辑器中

3. **查看图表**：图表会自动在画布上渲染

4. **编辑和调整**：
   - 在代码编辑器中修改代码
   - 点击"应用到画布"按钮更新图表


## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- pnpm（推荐）或 npm
- OpenAI 或 Anthropic 的 API 密钥

### 安装和运行

```bash
# 克隆项目
git clone <your-repo-url>
cd smart-excalidraw-next

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 运行生产版本
pnpm start

# 代码检查
pnpm lint
```





## 🛠️ 技术栈

- **框架**：Next.js 16 (App Router)
- **UI 框架**：Tailwind CSS 4
- **图表引擎**：@excalidraw/excalidraw
- **代码编辑器**：@monaco-editor/react
- **LLM 集成**：OpenAI & Anthropic APIs
- **React 版本**：React 19.2

## 📝 注意事项

- 所有配置信息存储在浏览器的 localStorage 中
- 除了与配置的 LLM 提供商通信外，不会向任何服务器发送数据
- 应用需要有效的 LLM API 密钥才能正常工作

## ❓ 常见问题

### 图表无法渲染

- 检查代码编辑器中生成的代码是否有语法错误
- 尝试手动点击"应用到画布"按钮
- 查看浏览器控制台中的错误信息

### 箭头连接不准确

- 系统会自动优化箭头连接点
- 确保元素的绑定关系在代码中正确定义
- 可以手动调整图形的位置以及箭头的位置来校正

## 📚 更多资源

- [Excalidraw 官方文档](https://docs.excalidraw.com/)
- [OpenAI API 文档](https://platform.openai.com/docs)
- [Anthropic API 文档](https://docs.anthropic.com/)
- [Next.js 文档](https://nextjs.org/docs)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**Powered by AI** 🚀 使用大语言模型将想法转化为可视化图表
