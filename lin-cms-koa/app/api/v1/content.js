import { LinRouter } from 'lin-mizar';
import { AddContentValidator, EditContentValidator, DeleteContentValidator } from '../../validator/content';
import { ContentService } from '../../service/content';
import { groupRequired } from '../../middleware/jwt';
import { logger } from '../../middleware/logger';
const contentApi = new LinRouter({
    prefix: '/v1/content'
});
contentApi.linPost(
    'addContent',
    '/',
    {
        permission: '添加期刊内容',
        module:'内容管理',
        mount:true
    },
    groupRequired,
    logger("{user.username}新增了期刊内容"),
    async ctx => {
        const v = await new AddContentValidator().validate(ctx);
        await ContentService.addContent(v.get('body'));
        ctx.success({
            msg: '期刊内容新增成功'
        });
    });
contentApi.get('/', async ctx => {
    const contentList = await ContentService.getContentList();
    ctx.json(contentList);
});
contentApi.linPut(
    'editContent',
    '/:id',
    {
        permission: '编辑期刊内容',
        module:'内容管理',
        mount:true
    },
    groupRequired,
    logger("{user.username}编辑了期刊内容"),
    async ctx => {
    const v = await new EditContentValidator().validate(ctx);
    const id = v.get('path.id');
    const params = v.get('body');
    await ContentService.editContent(id, params);
    ctx.success({
        msg: '期刊内容编辑成功'
    });
});
contentApi.linDelete(
    'delContent',
    '/:id',
    {
        permission: '删除期刊内容',
        module:'内容管理',
        mount:true
    },
    groupRequired,
    logger("{user.username}删除了期刊"),
    async ctx => {
    const v = await new DeleteContentValidator().validate(ctx);
    const id = v.get('path.id');
    const type = v.get('query.type');
    await ContentService.deleteContent(id, type);
    ctx.success({
        msg: '期刊内容删除成功'
    });
});
module.exports = { contentApi };