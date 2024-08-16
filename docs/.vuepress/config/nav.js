module.exports = [
    {
        text: '本站指南', link: '/guide/', icon: 'reco-eye'
    },
    {
        text: '技术分享', link: '/技术文章/', icon: 'reco-api',
        items: [
            {
				text: 'Java',
				items: [
					{text: 'JavaSE', link: '/技术文章/java/javase'},
					{text: 'JavaEE', link: '/技术文章/java高级/javaee'},
				]
			},
            {
				text: '前端',
				items: [
					{text: '前端基础', link: '/技术文章/vue/vue01'},
				]
			},
            {
				text: 'C',
				items: [
					{text: '协议基础', link: '/技术文章/流媒体/协议'},
                    {text: 'FFmpeg', link: '/技术文章/流媒体/FFmpeg'},
                    {text: 'SDL', link: '/技术文章/流媒体/SDL'},
                    {text: 'Webrtc', link: '/技术文章/流媒体/Webrtc'},
				]
			}, 
            {
				text: 'python',
				items: [
                    {text: 'python', link: '/技术文章/python/python'},
					{text: 'django', link: '/技术文章/python/django'},
				]
			},                       
        ]
    },
    {
        text: '生活分享', link: '/生活分享/', icon: 'reco-faq',
        items: [
			{text: '生活分享', link: '/生活分享/life'},
        ]
    },
    {
        text: '博客', icon: 'reco-blog',
        items: [
            {text: '小虎', link: 'https://zz-html.github.io/', icon: 'reco-blog'},
        ]
    },
	{ text: '时间轴', link: '/timeline/', icon: 'reco-date' }
]