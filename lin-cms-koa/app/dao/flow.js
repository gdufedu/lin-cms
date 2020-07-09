import {FlowModel} from '../model/flow';
import { NotFound } from 'lin-mizar';
class Flow {
    static async createFlow(v) {
        const res = await FlowModel.create({
            index: v.get('body.index'),
            type:v.get('body.type'),
            art_id:v.get('body.art_id'),
            status:v.get('body.status')
        });
        return res;
    }
    static async getFlowList() {
        return await FlowModel.findAll({
            order:['index']
        });
    }
    static async editFlow(id, index, type, art_id, status) {
        const flow = await FlowModel.findByPk(id);
        if (!flow) {
            throw new NotFound();
        }
        await flow.update({index, type, art_id, status});
    }
    static async delFlow(id) {
        const flow = await FlowModel.findByPk(id);
        if (!flow) {
            throw new NotFound();
        }
        await flow.destroy();
    }
}
export {Flow as FlowDao};