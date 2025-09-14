// 等待页面完全加载后再执行代码
document.addEventListener('DOMContentLoaded', function() {
    console.log('Language switch script loaded'); // 调试用，可以删除
    
    // 查找页面上所有的语言切换链接
    const languageLinks = document.querySelectorAll('a[hreflang]');
    
    // 如果找到了语言切换链接
    if (languageLinks.length > 0) {
        console.log('Found language links:', languageLinks.length); // 调试用
        
        // 为每个语言链接添加点击事件
        languageLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                // 阻止默认的链接跳转行为
                event.preventDefault();
                
                // 获取目标语言
                const targetLang = this.getAttribute('hreflang');
                console.log('Switching to language:', targetLang); // 调试用
                
                // 调用语言切换函数
                switchLanguage(targetLang);
            });
        });
    }
    
    // 语言切换的主要函数
    function switchLanguage(targetLang) {
        // 获取当前页面的完整路径
        const currentPath = window.location.pathname;
        const currentHost = window.location.origin;
        
        // 移除当前路径中的语言前缀，得到干净的路径
        let cleanPath = currentPath;
        
        // 如果当前在中文页面
        if (currentPath.startsWith('/zh-cn/')) {
            cleanPath = currentPath.replace('/zh-cn/', '/');
        }
        // 如果当前在英文页面（虽然英文没有前缀，但为了保险）
        else if (currentPath.startsWith('/en/')) {
            cleanPath = currentPath.replace('/en/', '/');
        }
        
        // 确保路径以 / 开头
        if (!cleanPath.startsWith('/')) {
            cleanPath = '/' + cleanPath;
        }
        
        // 根据目标语言构建新的URL
        let newURL;
        if (targetLang === 'zh-cn') {
            // 中文版本：添加 /zh-cn 前缀
            newURL = currentHost + '/zh-cn' + cleanPath;
        } else {
            // 英文版本：不需要前缀（默认语言）
            newURL = currentHost + cleanPath;
        }
        
        // 清理URL中的重复斜杠
        newURL = newURL.replace(/\/+/g, '/');
        
        // 如果URL以斜杠结尾且不是根目录，去掉末尾斜杠
        if (newURL.endsWith('/') && newURL.length > 1) {
            newURL = newURL.slice(0, -1);
        }
        
        console.log('Redirecting to:', newURL); // 调试用
        
        // 跳转到新页面
        window.location.href = newURL;
    }
});