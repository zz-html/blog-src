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
					{text: 'JavaEE', link: '/技术文章/java高级/javaee'},
                    {text: 'dev', link: '/技术文章/dev/frp'}
				]
			},
            {
				text: '前端',
                link: '/技术文章/vue/vue01'
			},
            {
				text: 'C',
				link: '/技术文章/c/AppAttack'
			}, 
            {
				text: 'python',
				link: '/技术文章/python/python'
			},                       
        ]
    },
    {
        text: '综合分享', link: '/综合分享/', icon: 'reco-faq',
        items: [
			{text: '综合分享', link: '/综合分享/life'},
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