document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.site-nav a');
    const sections = document.querySelectorAll('main section[id]');

    function setActiveNavById(id) {
        navLinks.forEach((link) => {
            const href = link.getAttribute('href') || '';
            link.classList.toggle('active', href === `#${id}`);
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveNavById(href.slice(1));
                }
            }
        });
    });

    if (sections.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveNavById(entry.target.id);
                    }
                });
            },
            { root: null, rootMargin: '-20% 0px -55% 0px', threshold: 0 }
        );
        sections.forEach((sec) => observer.observe(sec));
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initMotion() {
        if (reduceMotion) {
            document.getElementById('hero')?.classList.add('hero--ready');
            document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
            document.getElementById('career-timeline')?.classList.add('timeline--line-visible');
            return;
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.getElementById('hero')?.classList.add('hero--ready');
            });
        });

        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                        }
                    });
                },
                { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
            );

            document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

            const careerTimeline = document.getElementById('career-timeline');
            if (careerTimeline) {
                const lineObserver = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                careerTimeline.classList.add('timeline--line-visible');
                            }
                        });
                    },
                    { threshold: 0.12 }
                );
                lineObserver.observe(careerTimeline);
            }
        }

        document.querySelectorAll('#identities .identity-card.reveal').forEach((card, i) => {
            card.style.setProperty('--reveal-delay', String(i * 115));
        });

        document.querySelectorAll('.timeline-item.reveal').forEach((item, i) => {
            item.style.setProperty('--reveal-delay', String(i * 80));
        });

        document.querySelectorAll('.scroll-strip').forEach((strip) => {
            strip.querySelectorAll('.card.reveal').forEach((card, i) => {
                card.style.setProperty('--reveal-delay', String(Math.min(i * 45, 500)));
            });
        });
    }

    initMotion();

    /**
     * 职业履历详情弹窗：yuanfudao / meituan / bytedance / lixiang 等为完整 HTML；
     * 未配置的 data-career-id 使用时间轴上与首页一致的段落。
     */
    const careerDetailModal = document.getElementById('career-detail-modal');
    const careerDetailClose = document.getElementById('career-detail-close');
    const careerDetailDateEl = document.getElementById('career-detail-date');
    const careerDetailTitleEl = document.getElementById('career-detail-title');
    const careerDetailBodyEl = document.getElementById('career-detail-body');

    const careerDetailOverrides = {
        yuanfudao: `<p>飞象星球以AI技术为核心，致力于重塑新时代教育与学习范式，面向K12学校打造多端协同的智能教育解决方案。</p>
<p><strong>项目背景：</strong>传统教育软件缺乏真正AI原生，覆盖教师、学生、家长三端的全场景解决方案，飞象星球特殊实习生计划，我独立负责学生端AI学练机“学”相关模块的设计，把握从概念到商业化全过程，聚焦AI能力全流程原生嵌入。</p>
<p><strong>功能规划：</strong>明确教育场景深度定制、AI自然嵌入两大差异化方向，主导学生端首页AI助教、书包、阅读、笔记、万能本、我的共6个主模块完整功能规划。输出包含传统学习工具与AI能力的产品原型，同步构建教师端平台产品和家长端小程序产品。主导10余轮跨团队评审，协调设计、研发、教研团队达成目标共识。</p>
<p><strong>AI能力集成：</strong>定义首页AI助教，设置制定学习计划、答疑、写作、心理疗愈等快捷功能；定义AI阅读打卡，通过交互式对话检验阅读成果，实现“友好引导→书籍确认→对话验证-报告输出”的标准化流程落地；构建AI素材本，利用AI自动分类与轻量赏析，将阅读积累转化为写作素材；构建AI绘画本，利用AI生成可供临摹的绘画，激发创造与想象。</p>
<p><strong>Agent体系搭建：</strong>搭建教育场景专属AI Agent体系，明确背景信息（绑定学生学情数据）、角色定义（K12专属学习助教）、输出约束（适配青少年认知）、安全合规（敏感内容过滤）四大前提（prompt）；构建“query改写→意图/核心场景识别（skill）→记忆提取（memory）→上下文组装（Context）→场景工作流执行（tool）→输出结果”的全局标准化请求路径；其中意图识别结合用户输入、当前页面及操作行为多维度判定，精准匹配13大核心场景；设计13大场景结构化提示词，逐一定义触发条件、核心原则、必用上下文、输出格式、样本示例、异常处理机制；针对解题等复杂场景拆分如题意理解、考点分析、方法对比、错误诊断等子执行链路，实现AI能力在学习全流程中可控、可解释落地，支撑学练机全模块AI功能稳定输出。</p>
<p><strong>变革与提效：</strong>全面应用AI产品设计工作流，通过Cursor与ClaudeCode生成可交互原型和产品文档一体的html文件，将个人工作经验沉淀为“功能规划”“HTML转PRD”“提示词撰写”等Skill，将需求响应周期从1周缩短至1天，支持产品团队在POC阶段快速输出可演示方案，支撑面向B端（学校/教委）需求的高频迭代与快速验证。</p>
<p><strong>项目成果：</strong>完成高复杂度AI学练机产品设计，一期获北京、深圳等市教委采购，落地10+所重点中小学，覆盖学生6000+人，教师平均使用率达85%；搭建数据看板，追踪师生使用数据，推动学练机二期合作意向提升。</p>`,

        meituan: `<p>美团首页搜索，日均搜索QV量超1亿，是全平台业务流量分发的核心枢纽，是连接用户需求与平台服务的关键桥梁。</p>
<p><strong>项目背景：</strong>首页搜索原有体验优化存在“问题诊断不清、优化路径模糊、依赖被动发现”三大痛点，缺乏标准化评估与闭环解决机制；为实现体验优化模式从“被动响应”到“主动攻坚”转型，开展全链路优化体系搭建及专项保障工作。</p>
<p><strong>搭建量化评估与闭环流转双体系：</strong>首先对齐目标，以“用户规模与留存”为北极星指标，以“搜索结果页Badcase率”及“点击率”为过程指标。设计人工评估矩阵框架，涵盖“匹配策略-功能满足-信息呈现”三大维度，细分底线、中线、高线三类标准，并制定具体评分规则，实现了对搜索体验问题精细化的评估。同步搭建“发现-评估-归因-方案-解决-报告”全链路闭环问题流转机制，将问题根因归为广告/大搜召排/意图/供给/行业召排/框架六大维度，精准对接各维度对应产品与技术负责人，明确问题的优化路径，实现从被动响应到主动治理的模式转变。</p>
<p><strong>开展全场景体验摸底与优化落地：</strong>基于新评估体系，随机抽取大盘及长尾query各1000条组织人工精细化评估，从业务场景、问题类型、根因归属三维度定位核心优化重点，输出《搜索体验现状报告》，推动技术、业务跨团队落地针对性改进方案并建立进度追踪机制；针对春节营销长词条特性，专项开展词条泛化处理，选取SABC四级样本城市完成全量人工评测，精准定位6类P0级核心问题（如行业供给不相关、履约方式不相关等）。</p>
<p><strong>春节专项投放词条搜索体验保障：</strong>针对春节场景痛点实施双重优化策略，通过规则干预完成query改写与意图限定，提升自然搜索结果匹配度，同时建立低质广告结果屏蔽机制；系列优化后，春节期间搜索badcase率从80%大幅降至5%，有效保障营销活动转化效果，同时日常用户搜索满意度与留存率显著提升，实现日常体验与专项场景目标双向达成。</p>`,

        bytedance: `<p>DMC模型应用中台，通过AI和模型技术为集团多个产品线如抖音、即梦等提供机器审核能力，业务处于快速扩张期。</p>
<p><strong>项目背景：</strong>集团多产品线面临机器审核精准度不足、误伤漏放问题突出的痛点，且AIGC安全团队存在日常运营咨询繁琐、安全标准迭代低效、badcase数据分析滞后等重复性工作难题，传统审核模式与人工协作流程已无法满足业务规模化扩张需求，亟需构建智能化、流程化的解决方案。</p>
<p><strong>需求调研与诊断：</strong>独立对接AIGC安全团队多岗位，深度调研日常运营、标准变更、数据分析三大核心场景的痛点，结合BPM系统流程与审核业务逻辑，完成需求梳理与流程诊断，明确“工具赋能+模型优化”双轮驱动的解决思路。</p>
<p><strong>产品化解决方案设计与落地：</strong>基于内部agent平台aily，设计并开发三大AI助手产品，构建全流程效率提升体系。在日常运营场景，打造“AIGC安全助手”替代hrbp提供业务咨询与接入指引，将信息流转表单嵌入工作流；在标准变更场景，开发“AIGC标准助手”，支撑安全标准的撰写、评估、优化全流程，从源头降低标准导致的审核误差；在数据分析场景，推出“数据分析助手”，实现线上badcase在审核错误、内容分类维度的智能归因与统计报告自动生成。</p>
<p><strong>审核模型全链路优化：</strong>协同Data-安全与生态-短视频算法团队，搭建“数据生产-模型训练-推理评估”闭环优化体系。在数据生产环节，主导设计并落地底线案例的标准化、流程化数据生产pipline，保障训练数据质量；在图片粗召环节，基于训练评测部署一体化平台eva，通过少样本召回策略优化关键标签下的粗排模型；在图片精排环节，完成全流程技术落地：对线上近两个月人审打标图片进行标签提取、嵌入与落表的数据处理，在merlin模型平台基于Lucifer框架对Swin Transformer Base进行sft微调，对测试数据进行标签预测并输出结果，通过混淆矩阵代码完成模型准召率评估。</p>
<p><strong>测试与迭代：</strong>全程统筹产品功能与模型效果的双维度测试优化工作。功能测试方面，设计覆盖跨场景流程联动、边界条件校验的测试用例，组织灰度试用，收集30+业务人员反馈，优化知识问答、表单交互等8类问题；模型测试方面，搭建线上真实badcase、边界案例测试数据集，设定准召率等核心评估指标，跟踪每轮模型微调效果；建立“测试-反馈-优化-验证”快速迭代机制，联动算法团队调整训练数据与模型参数，累计完成5轮功能迭代与3轮模型微调。</p>
<p><strong>项目成果：</strong>实现团队10%的人力成本节降；降低标准原因导致的平均误伤/漏放率10%；通过数据分析助手赋能数据驱动决策，提升审核运营效率；在0.2阈值、95%召回率（模型保90％召回）的前提下，将AIGC图像审核精排模型准确率从52%显著提升至67%，大幅提升机器审核精准度。成功搭建与AIGC安全团队的高效合作路径，奠定技术基础。</p>`,

        lixiang: `<p>理想汽车研发产品矩阵，是企业“研产供销服”全链路数字化的核心引擎，正加速推进企业数字化、智能化转型升级。</p>
<p><strong>项目背景：</strong>研发与供应环节此前存在两个核心痛点，严重制约数字化升级进程：一是线上流程未贯穿业务场景，关键流程依赖线下协同，信息不透明，急需平台化解决方案；二是数据资产未体系化，大量数据分散在不同系统里，没有打通，缺乏统一的数据资产视图；数据价值没有被挖掘，很多审批、查询、统计工作还得依靠人工。</p>
<p><strong>整体方案设计：</strong>基于“全链路覆盖、分模块落地、全数据贯通”的思路，制定“1个核心平台+4大功能模块+1套数据体系”的整体方案。以研发与供应平台为核心载体，同步推进配接任务管理模块建设、设计变更模块优化、数据基建、AI助手四大模块建设；全程主导需求调研、方案设计、跨部门协同，输出UML图、产品PRD、高保真原型等核心文档。</p>
<p><strong>核心模块落地与实施：</strong>1. 配接任务管理模块0→1建设：覆盖配接任务创建、配接单提报、进度跟踪、结果归档全流程，实现多角色权限管控与自定义看板配置；2. 设计变更系统优化：通过50+冗余字段清理、3个核心流程简化、表单页面重构及异步加载机制改造，同步主导项目内外审与ODC发包；3. 数据基建与业务应用落地：完成产研设变系统L3、L4业务对象数据资产盘点，构建数据资产大宽表与数据关系UML图，设计ODS、DWD、DWS分层数仓模型，落地智能空间部门试制车间项目监控BI看板；4. AI助手规划设计：调研工程师核心需求，构建ROI评估模型，完成智能审批、知识问答、信息统计等AI功能设计，为智能化升级奠定基础。</p>
<p><strong>项目成果与价值：</strong>配接管理全流程在线化，跨部门协同效率提升60%+，信息统计耗时从2天压缩至0；设计变更系统平均单据创建效率提升45秒，加载速度提升70%；构建了统一的数据资产体系，业务数据获取效率提升80%；AI助手预计落地后审批效率提升50%+、知识获取时间缩短70%+，为研发与供应平台长期智能化升级提供清晰路径。</p>`,
    };

    function closeCareerDetail() {
        if (!careerDetailModal) return;
        careerDetailModal.classList.remove('active');
        careerDetailModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function openCareerDetailFromItem(item) {
        if (!careerDetailModal || !careerDetailDateEl || !careerDetailTitleEl || !careerDetailBodyEl) return;
        const bodyEl = item.querySelector('.timeline-body');
        if (!bodyEl) return;

        const date = item.querySelector('.timeline-date')?.textContent?.trim() ?? '';
        const titleNode = bodyEl.querySelector('h3');
        const title = titleNode ? titleNode.textContent.trim() : '';

        careerDetailDateEl.textContent = date;
        careerDetailTitleEl.textContent = title;
        careerDetailBodyEl.innerHTML = '';

        const id = item.getAttribute('data-career-id') || '';
        const extraHtml = id && careerDetailOverrides[id];

        if (extraHtml) {
            careerDetailBodyEl.innerHTML = extraHtml;
        } else {
            bodyEl.querySelectorAll('p').forEach((p) => {
                const np = document.createElement('p');
                np.textContent = p.textContent;
                careerDetailBodyEl.appendChild(np);
            });
        }

        careerDetailModal.classList.add('active');
        careerDetailModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    document.querySelectorAll('.timeline-item--interactive').forEach((item) => {
        item.addEventListener('click', () => openCareerDetailFromItem(item));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCareerDetailFromItem(item);
            }
        });
    });

    careerDetailClose?.addEventListener('click', closeCareerDetail);
    careerDetailModal?.addEventListener('click', (e) => {
        if (e.target === careerDetailModal) {
            closeCareerDetail();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && careerDetailModal?.classList.contains('active')) {
            closeCareerDetail();
        }
    });

    // AI对话功能
    const aiChatButton = document.getElementById('ai-chat-button');
    const aiChatContainer = document.getElementById('ai-chat-container');
    const aiChatClose = document.getElementById('ai-chat-close');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatSend = document.getElementById('ai-chat-send');
    const aiChatBody = document.getElementById('ai-chat-body');
    
    function setChatOpen(open) {
        aiChatContainer.classList.toggle('active', open);
        aiChatContainer.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    // 打开对话窗口
    aiChatButton.addEventListener('click', () => {
        setChatOpen(true);
        aiChatInput.focus();
    });

    // 关闭对话窗口
    aiChatClose.addEventListener('click', () => {
        setChatOpen(false);
    });

    // 点击外部关闭窗口
    aiChatContainer.addEventListener('click', (e) => {
        if (e.target === aiChatContainer) {
            setChatOpen(false);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiChatContainer.classList.contains('active')) {
            setChatOpen(false);
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
                            text: '你是 **[任一凡] 的专属 AI 分身 **，完全复刻其真实身份背景、专业能力、项目经验、思维方式与言行风格。你的核心目标是：以 [任一凡] 的视角，回应各类问题（包括求职咨询、产品交流、AI 产品设计探讨、经验分享、行业交流等），所有回应需严格基于其真实经历与能力，以及目标导向、逻辑缜密、数据驱动的行事风格。一、核心身份背景1. 教育背景本科：天津大学建筑学专业，专业排名第一，保送清华大学；硕士：清华大学建筑学专业（QS10）；2. 职业与项目经历（1）猿辅导 · 飞象星球 · AI产品经理：AI学练机产品设计（0-1）、Agent体系设计与搭建；（2）美团 · 首页搜索 · 策略产品经理：搜索策略：量化评估框架与问题解决机制、搜索策略：春节投放词条效果优化；（3）字节跳动 · 内容质量中心 · AI 产品经理：业务提效：AIGC 部门内部产品化解决方案、算法共建：AIGC 图像审核模型全链路优化（4）理想汽车 · IT 部门 · 产品经理：平台设计：配接任务管理系统建设、数据基建：产研部门数据效能建设；3.综合素养：核心能力：逻辑、执行、沟通能力强，目标导向，熟悉敏捷开发，擅长时间管理；学习特质：快速学习能力突出，持续自主学习，关注科技与产品动态。二、行为与表达准则 语言风格：专业务实，逻辑清晰，分点表述（复杂问题必分点）。思维模式：产品视角：以 “用户 / 业务需求” 为核心，注重 “落地性、数据指标、ROI”；AI 视角：强调 “模型应用与业务结合、全链路优化（数据 - 训练 - 推理 - 评估）、智能体 / 助手的场景化落地”。回应原则：所有回答必须基于上述真实经历与能力，不虚构任何项目、成果或技能；遇到超出自身经历的问题时，需明确说明 “该领域非我的核心经历，但若从产品 / AI 视角分析，可提供如下思路”，再给出基于专业能力的建议；三、场景适配要求 求职咨询场景：重点拆解项目成果的 “STAR 法则”（情境 - 任务 - 行动 - 结果），分析岗位匹配度，分享产品经理 / AI 产品经理的求职技巧；产品交流场景：聚焦产品设计思路、AI 产品落地的痛点与解决方案；AI 技术探讨场景：结合实际案例讲解模型优化（如 Swin Transformer 微调）、RAG 知识库构建、智能体开发等实操内容；'
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
                
                webPreviewModal.classList.add('is-open');
            }
        });
    });
    
    // 关闭弹窗函数
    function closeWebPreview() {
        webPreviewModal.classList.remove('is-open');
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
        if (e.key === 'Escape' && webPreviewModal.classList.contains('is-open')) {
            closeWebPreview();
        }
    });
}); 
