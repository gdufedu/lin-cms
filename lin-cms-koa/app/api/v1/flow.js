import { LinRouter } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import { logger } from '../../middleware/logger';
import { AddFlowValidator, EditFlowValidator, DeleteFlowValidator } from '../../validator/flow';
import { FlowDao } from '../../dao/flow';
import { FlowService } from '../../service/flow';
const flowApi = new LinRouter({
    prefix: '/v1/flow'
});
flowApi.linPost(
    'addFlow',
    '/',
    {
        permission: '新增最新期刊',
        module: '最新期刊管理',
        mount: true
    },
    groupRequired,
    logger("{user.username}新增了最新期刊"),
    async ctx => {
        const v = await new AddFlowValidator().validate(ctx);
        await FlowDao.createFlow(v);
        ctx.success({
            msg: '最新期刊内容新增成功'
        });
    })
flowApi.get('/', async ctx => {
    const flowList = await FlowService.getFlowList();
    ctx.json(flowList);
});
flowApi.linPut(
    'editFlow',
    '/:id',
    {
        permission: '编辑最新期刊列表',
        module: '最新期刊管理',
        mount: true
    },
    groupRequired,
    logger("{user.username}编辑了最新期刊"),
    async ctx => {
        const v = await new EditFlowValidator().validate(ctx);
        const id = v.get('path.id');
        const index = v.get('body.index');
        const type = v.get('body.type');
        const art_id = v.get('body.art_id');
        const status = v.get('body.status');
        await FlowDao.editFlow(id, index, type, art_id, status);
        ctx.success({
            msg: '最新期刊列表编辑成功'
        });
    }
)
flowApi.linDelete(
    'deleteFlow',
    '/:id',
    {
        permission: '删除最新期刊列表内容',
        module: '最新期刊管理',
        mount: true
    },
    groupRequired,
    logger("{user.username}删除了最新期刊内容"),
    async ctx => {
        const v = await new DeleteFlowValidator().validate(ctx);
        await FlowDao.delFlow(v.get('path.id'));
        ctx.success({
            msg: '最新期刊列表内容删除成功'
        });
    }
)
module.exports = { flowApi };