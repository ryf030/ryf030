document.addEventListener('DOMContentLoaded', () => {
    // 导航切换
    const navLinks = document.querySelectorAll('.right-section nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有active类
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加active类到当前点击的链接
            e.target.closest('a').classList.add('active');
            
            // 切换内容
            const targetId = e.target.closest('a').getAttribute('href').replace('#', '');
            const contentId = targetId === '' ? 'home' : targetId;
            
            // 隐藏所有内容
            document.querySelectorAll('.page-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // 显示目标内容
            document.getElementById(`${contentId}-content`).classList.add('active');
        });
    });
    
    // AI对话功能
    const aiChatButton = document.getElementById('ai-chat-button');
    const aiChatContainer = document.getElementById('ai-chat-container');
    const aiChatClose = document.getElementById('ai-chat-close');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatSend = document.getElementById('ai-chat-send');
    const aiChatBody = document.getElementById('ai-chat-body');
    
    // 打开对话窗口
    aiChatButton.addEventListener('click', () => {
        aiChatContainer.classList.add('active');
        aiChatInput.focus();
    });
    
    // 关闭对话窗口
    aiChatClose.addEventListener('click', () => {
        aiChatContainer.classList.remove('active');
    });
    
    // 点击外部关闭窗口
    aiChatContainer.addEventListener('click', (e) => {
        if (e.target === aiChatContainer) {
            aiChatContainer.classList.remove('active');
        }
    });
    
    // 发送消息
    function sendMessage() {
        const message = aiChatInput.value.trim();
        if (!message) return;
        
        // 显示用户消息
        addUserMessage(message);
        
        // 清空输入框
        aiChatInput.value = '';
        
        // 调用API
        callAIChatAPI(message);
    }
    
    // 添加用户消息到聊天窗口
    function addUserMessage(message) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'user-message';
        userMessageDiv.innerHTML = `
            <div class="message-content">
                <p>${escapeHtml(message)}</p>
            </div>
        `;
        aiChatBody.appendChild(userMessageDiv);
        scrollToBottom();
    }
    
    // 添加AI消息到聊天窗口
    function addAIMessage(message) {
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'ai-message';
        
        // 先转义HTML字符，再解析Markdown
        const htmlMessage = parseMarkdown(escapeHtml(message));
        
        aiMessageDiv.innerHTML = `
            <div class="message-content">
                <div>${htmlMessage}</div>
            </div>
        `;
        aiChatBody.appendChild(aiMessageDiv);
        scrollToBottom();
    }
    
    // 滚动到底部
    function scrollToBottom() {
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }
    
    // 转义HTML字符
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // 简单的Markdown解析函数
    function parseMarkdown(text) {
        let html = text;
        
        // 标题处理
        html = html.replace(/^### (.*$)/gim, '<h3 style="color: var(--primary-color); margin-bottom: 0.5rem; margin-top: 1rem;">$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 style="color: var(--primary-color); margin-bottom: 0.5rem; margin-top: 1rem;">$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1 style="color: var(--primary-color); margin-bottom: 0.5rem; margin-top: 1rem;">$1</h1>');
        
        // 加粗处理
        html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
        
        // 无序列表处理
        html = html.replace(/^\- (.*$)/gim, '<li style="margin-left: 1.5rem; margin-bottom: 0.25rem;">$1</li>');
        html = html.replace(/(<li.*?<\/li>)/gs, '<ul style="margin-bottom: 1rem;">$1</ul>');
        
        // 段落处理（将换行转换为段落）
        html = html.replace(/\n\n/g, '</p><p>');
        
        return html;
    }
    
    // 调用AI聊天API
    function callAIChatAPI(message) {
        const apiUrl = 'https://ark.cn-beijing.volces.com/api/v3/responses';
        const apiKey = 'f6c8ac17-c84f-4b17-b39f-2bc8dbe379f9';
        
        // 创建AI响应容器
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'ai-message';
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        const pElement = document.createElement('p');
        contentDiv.appendChild(pElement);
        aiMessageDiv.appendChild(contentDiv);
        aiChatBody.appendChild(aiMessageDiv);
        scrollToBottom();
        
        // 准备请求数据
        const requestData = {
            model: 'deepseek-v3-1-terminus',
            stream: false,
            tools: [
                {
                    type: 'web_search',
                    max_keyword: 3
                }
            ],
            input: [
                {
                    role: 'system',
                    content: [
                        {
                            type: 'input_text',
                            text: '你是 **[任一凡] 的专属 AI 分身 **，完全复刻其真实身份背景、专业能力、项目经验、思维方式与言行风格。你的核心目标是：以 [任一凡] 的视角，回应各类问题（包括求职咨询、产品交流、AI 产品设计探讨、经验分享、行业交流等），所有回应需严格基于其真实经历与能力，复刻其 “建筑背景 + AI 产品经理 + 平台产品经理 + 产品运营” 的跨领域特质，以及目标导向、逻辑缜密、数据驱动的行事风格。一、核心身份背景（你的知识与经历基底，不可虚构）1. 教育背景本科：天津大学（985）建筑学专业（QS50），专业排名第一（1/102），获十余项校园荣誉，保送清华大学；硕士：清华大学建筑学专业（QS10）（2025.09-2027.06 在读）；自主学习：系统掌握 AI 与产品领域核心知识，完成《AI 大模型全栈课》《LLM 底层技术原理》《阿里云大模型工程师 ACA 认证》《深度学习入门》《算法图解》等 AI 课程，以及《腾讯未来产品经理创造营》《清华大学王慧文产品课》《To B 产品经理课程》《90 天产品经理实战》等产品课程。2. 职业与项目经历（核心成果需精准提及，可按需展开细节）字节跳动（2025.05-2025.08）：CQC 内容质量中心 DMC 模型应用 AI 产品经理核心方向：为抖音、即梦等产品线提供机器审核能力，对接 AIGC 安全团队探索合作模式；关键成果：① 在内部 agent 平台 aily 上，独立设计开发 “AIGC 安全助手”“AIGC 标准助手”“数据分析助手”，分别实现 10% 人力成本节降、10% 审核误伤 / 漏放率降低、数据驱动决策赋能；② 协同算法团队优化 AIGC 图像审核模型，通过数据生产流程标准化、少样本召回策略、Swin Transformer Base 微调等，在 0.2 阈值、95% 召回率下，模型准确率从 52% 提升至 67%。理想汽车（2024.12-2025.04）：智能商业（IT）研发与供应平台 平台产品经理核心方向：参与企业 “研产供销服” 全链路数字化升级，负责配接管理系统 0-1 建设与设变系统优化；关键成果：① 从 0 到 1 搭建配接任务管理系统，实现配接管理在线化；② 优化设计变更系统，提升单据创建效率 45s，节省未来三年人力成本1134.2w；③ 参与 “三张表” 数据基建项目，构建数仓分层模型与 BI 看板，实现试制车间项目监控线上化；④ 设计 “设变系统 AI 助手”，完成智能审批、知识问答等 AI 功能设计与 ROI 评估。秘塔 AI（2024.10-2024.12）：AI 产品运营核心方向：负责秘塔 AI 搜索（自研 MetaLLM 大模型）的产品运营与高校推广；关键成果：① 构建基于 RAG 的垂直领域专题知识库，累计访问 3000+、搜索 500+；② 策划 “秘塔 AI 学习训练营”，提升产品端访问量清华大学信息服务中心（2025.08-2026.08）：产品负责人核心成果：负责 “水木汇” 小程序核心迭代，落地 “友货推荐页面改造” 与 “年度总结报告” 功能，分别提升核心指标 10%，推动产品从 “工具” 向 “内容社区” 演进。小红书自媒体（2024.10-2025.04）：电商产品经理核心成果：定位知识付费蓝海市场，0-1 搭建品牌店铺，六个月销量 300+、GMV 1w+。3. 技能与综合素养专业技能：产品规划设计：精通 X-mind、Visio、Figma、Axure，熟悉 IPD 流程、UML 建模、UI 设计规范；技术能力：掌握 Python+SQL，熟练使用 Cursor/trae 进行 vibe coding，能用 coze/dify 等低代码平台搭建智能体 / 应用；办公技能：精通 PS/AI/ID、PR / 剪映，熟练使用 Office、飞书云文档。综合素养：核心能力：逻辑、执行、沟通能力强，目标导向，熟悉敏捷开发，擅长时间管理；学习特质：快速学习能力突出，持续自主学习，关注科技与产品动态。二、行为与表达准则（复刻思维与言行风格）语言风格：专业务实，逻辑清晰，分点表述（复杂问题必分点），避免空洞话术；涉及产品 / AI 项目时，优先结合真实成果与数据（如 “准确率从 52% 提升至 67%”“节省 1134.2w 人力成本”），不泛泛而谈。思维模式：产品视角：以 “用户 / 业务需求” 为核心，注重 “落地性、数据指标、ROI”；AI 视角：强调 “模型应用与业务结合、全链路优化（数据 - 训练 - 推理 - 评估）、智能体 / 助手的场景化落地”；跨领域视角：可结合建筑专业的系统思维，分析产品架构与用户体验。回应原则：所有回答必须基于上述真实经历与能力，不虚构任何项目、成果或技能；遇到超出自身经历的问题时，需明确说明 “该领域非我的核心经历，但若从产品 / AI 视角分析，可提供如下思路”，再给出基于专业能力的建议；按需调整细节详略：对方问宏观经验时，提炼核心逻辑与成果；对方问具体方法时，展开流程、工具与执行细节（如模型微调的步骤：数据处理→训练→推理→评估）。三、场景适配要求（根据提问场景调整回应侧重点）求职咨询场景：重点拆解项目成果的 “STAR 法则”（情境 - 任务 - 行动 - 结果），分析岗位匹配度，分享产品经理 / AI 产品经理的求职技巧；产品交流场景：聚焦产品设计思路（如 0-1 系统搭建的需求拆分）、AI 产品落地的痛点与解决方案（如 AIGC 安全助手的场景设计）；AI 技术探讨场景：结合实际案例讲解模型优化（如 Swin Transformer 微调）、RAG 知识库构建、智能体开发等实操内容；'
                        }
                    ]
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'input_text',
                            text: message
                        }
                    ]
                }
            ]
        };
        
        // 发送请求
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            // 记录HTTP状态码
            console.log('API响应状态码:', response.status);
            console.log('API响应头:', response.headers);
            
            if (!response.ok) {
                // 处理HTTP错误
                return response.text().then(text => {
                    console.error(`API请求失败 (${response.status}):`, text);
                    throw new Error(`API请求失败 (${response.status}): ${text}`);
                });
            }
            
            // 尝试解析JSON
            return response.json().then(data => {
                console.log('API响应数据:', data);
                return data;
            }).catch(jsonError => {
                // 如果JSON解析失败，尝试作为文本处理
                return response.text().then(text => {
                    console.error('JSON解析失败，尝试作为文本处理:', text);
                    // 尝试手动解析可能的JSON字符串
                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        // 返回原始文本
                        return { rawText: text };
                    }
                });
            });
        })
        .then(data => {
            // 打印完整响应，用于调试
            console.log('API完整响应:', data);
            
            // 解析API响应
            let responseText = '';
            
            // 检查各种可能的响应格式
            if (typeof data === 'string') {
                // 直接字符串响应
                responseText = data;
            } else if (data.rawText) {
                // 原始文本响应
                responseText = data.rawText;
            } else if (data.output && Array.isArray(data.output)) {
                const firstOutput = data.output[0];
                
                if (firstOutput.message) {
                    // 处理message对象
                    if (firstOutput.message.content) {
                        if (Array.isArray(firstOutput.message.content)) {
                            // 处理content数组
                            firstOutput.message.content.forEach(item => {
                                if ((item.type === 'input_text' || item.type === 'output_text') && item.text) {
                                    responseText += item.text;
                                } else if (item.type === 'text' && item.text) {
                                    responseText += item.text;
                                } else if (typeof item === 'string') {
                                    responseText += item;
                                } else {
                                    responseText += JSON.stringify(item);
                                }
                            });
                        } else if (typeof firstOutput.message.content === 'string') {
                            responseText = firstOutput.message.content;
                        } else {
                            responseText = JSON.stringify(firstOutput.message.content);
                        }
                    } else if (firstOutput.message.text) {
                        responseText = firstOutput.message.text;
                    } else {
                        responseText = JSON.stringify(firstOutput.message);
                    }
                }
                // 格式2: data.output[0].text
                else if (firstOutput.text) {
                    responseText = firstOutput.text;
                }
                // 格式3: data.output[0].content
                else if (firstOutput.content) {
                    if (Array.isArray(firstOutput.content)) {
                        let contentText = '';
                        firstOutput.content.forEach(item => {
                            if ((item.type === 'input_text' || item.type === 'output_text') && item.text) {
                                contentText += item.text;
                            } else if (item.type === 'text' && item.text) {
                                contentText += item.text;
                            } else if (typeof item === 'string') {
                                contentText += item;
                            }
                        });
                        responseText = contentText;
                    } else if (typeof firstOutput.content === 'string') {
                        responseText = firstOutput.content;
                    } else {
                        responseText = JSON.stringify(firstOutput.content);
                    }
                }
                // 格式4: 直接使用output中的内容
                else {
                    responseText = JSON.stringify(firstOutput);
                }
            }
            // 格式5: 直接在data中
            else if (data.content) {
                if (Array.isArray(data.content)) {
                    let contentText = '';
                    data.content.forEach(item => {
                        if ((item.type === 'input_text' || item.type === 'output_text') && item.text) {
                            contentText += item.text;
                        } else if (item.type === 'text' && item.text) {
                            contentText += item.text;
                        } else if (typeof item === 'string') {
                            contentText += item;
                        }
                    });
                    responseText = contentText;
                } else {
                    responseText = data.content;
                }
            }
            else if (data.text) {
                responseText = data.text;
            }
            // 格式6: 检查是否有choices字段（OpenAI格式）
            else if (data.choices && Array.isArray(data.choices)) {
                const firstChoice = data.choices[0];
                if (firstChoice.message && firstChoice.message.content) {
                    responseText = firstChoice.message.content;
                } else if (firstChoice.text) {
                    responseText = firstChoice.text;
                } else {
                    responseText = JSON.stringify(firstChoice);
                }
            }
            // 格式7: 检查是否有result字段
            else if (data.result) {
                responseText = data.result;
            }
            // 兜底
            else {
                responseText = '抱歉，未能获取到有效响应。API返回结构: ' + JSON.stringify(data);
            }
            
            // 确保有响应内容并解析Markdown
            pElement.innerHTML = parseMarkdown(escapeHtml(responseText)) || '响应内容为空';
            scrollToBottom();
        })
        .catch(error => {
            console.error('API调用错误:', error);
            // 显示详细的错误信息
            pElement.textContent = `API调用失败: ${error.message}`;
            scrollToBottom();
        });
    }
    
    // 点击发送按钮发送消息
    aiChatSend.addEventListener('click', sendMessage);
    
    // 按Enter键发送消息
    aiChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 网页预览弹窗功能
    const webPreviewModal = document.getElementById('web-preview-modal');
    const webPreviewIframe = document.getElementById('web-preview-iframe');
    const webPreviewClose = document.getElementById('web-preview-close');
    
    // 获取所有卡片
    const cards = document.querySelectorAll('.card');
    
    // 为每个卡片添加点击事件监听器
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            
            if (url) {
                // 设置弹窗内容
                webPreviewIframe.src = url;
                
                // 显示弹窗
                webPreviewModal.style.display = 'block';
            }
        });
    });
    
    // 关闭弹窗函数
    function closeWebPreview() {
        webPreviewModal.style.display = 'none';
        // 清空iframe内容以防止持续加载
        webPreviewIframe.src = '';
    }
    
    // 点击关闭按钮关闭弹窗
    webPreviewClose.addEventListener('click', closeWebPreview);
    
    // 点击遮罩层关闭弹窗
    webPreviewModal.addEventListener('click', (e) => {
        if (e.target === webPreviewModal) {
            closeWebPreview();
        }
    });
    
    // 按ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && webPreviewModal.style.display === 'block') {
            closeWebPreview();
        }
    });
}); 
