const themeConfig = require('./config/theme/index.js')
const navConf = require('./config/nav')
const sidebarConf = require('./config/sidebar')
const pluginsConf = require('./config/plugins/index')
module.exports = {
    //注意，此处需要填写你部署在nginx下的文件夹名称，如果是根目录，那么可以注释掉此行，注释掉后本地打开index.html无法访问
    //base: "/blog/",
    title: "小虎聊编程",
    description: '点赞、转发、收藏',
    dest: './dist',
    port: '7777',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
		['meta', { name: 'keywords', content: '小虎聊编程,vuepress,自建博客,小虎' }],
		['meta', { name: 'description', content: '专属于自学者的在线学习平台,这里有编程领域最完善最「体系化的」Java学习视频、如果你是小白快加入我们一起学最全最「体系化的」java知识吧，官方交流QQ群：827553720' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "小虎"}],
		["link", { rel: "stylesheet", href: "/css/style.css" }],//显示nav小logo
		["script", { charset: "utf-8", src: "/js/custom.js" }],//加载右侧菜单栏图片
        // 百度统计
        /*
        ['script', {}, `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?e312f85a409131e18146064e62b19798";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        `],
        */
    ],
    theme: 'reco',
    themeConfig: {
        type: 'blog',
        smoothScroll: true,
        // 博客设置
		/*
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认 “分类”
            },
            tag: {
                location: 3, // 在导航栏菜单中所占的位置，默认3
                text: '标签' // 默认 “标签”
            }
        },*/
        /*
        valineConfig: {
            // your appId
            appId: 'AwhnPnTxxzGzoHsz',
            // your appKey
            appKey: '0M6f1PazzzalVIukU',
            recordIP:true,
            placeholder:'来都来了，冒个泡再走呗...',
            visitor:true,
        },
        */
        authorAvatar: '/avatar.png',
        // 最后更新时间
        lastUpdated: '2021-04-07', // string | boolean
        //repo: 'it235',
        // 如果你的文档不在仓库的根部
        //docsDir: 'docs',
        // 可选，默认为 master
        //docsBranch: 'source',
        //editLinks: true,
        //editLinkText: '在 GitHub 上编辑此页！',
        // 作者
        author: '小虎',
        // 项目开始时间
        startYear: '2022',
        nav: navConf,
        sidebar: sidebarConf,
		sidebarDepth: 2,
        // 自动形成侧边导航
		sidebar: 'auto',
        // logo: '/head.png',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // ICP备案
        record: '闽ICP备2023015363号',
        recordLink: 'https://beian.miit.gov.cn/',
		// 公网安备备案
        cyberSecurityRecord: '闽公网安备35010402351545',
        cyberSecurityLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=xxx05177',
		//友链
        friendLink: [
            {
                title: '小虎聊编程',
                desc: 'Enjoy when you can, and endure when you must.',
                email: 'xxx@qq.com',
                link: 'https://www.it235.com'
            },
            {
                title: '小虎的课堂',
                desc: '小虎的课堂',
                avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                link: 'https://how.ke.qq.com/'
            },
        ]
    },
    markdown: {
        lineNumbers: true
    },
    plugins: pluginsConf
}