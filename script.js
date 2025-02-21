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
}); 