const contentRouter = {
    name: null,
    title: '期刊管理',
    type: 'folder',
    icon: 'iconfont icon-tushuguanli',
    order:3,
    inNav: true,
    children: [
        {
            title: '内容管理',
            type:'view',
            name:'content',
            route: '/content/list',
            filePath:'view/content/List.vue',
            inNav: true,
            icon:'iconfont icon-tushuguanli'
        },
        {
            title: '最新期刊',
            type:'view',
            name:'flow',
            route: '/content/flow',
            filePath:'view/content/Flow.vue',
            inNav: true,
            icon:'iconfont icon-tushuguanli'
        }
    ]
};
export default contentRouter;