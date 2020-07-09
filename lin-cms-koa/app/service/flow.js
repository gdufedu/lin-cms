import { FlowDao } from '../dao/flow';
import {MovieModel} from '../model/movie';
import {MusicModel} from '../model/music';
import {SentenceModel} from '../model/sentence';
class Flow {
    static async getFlowList() {
        const flowList = await FlowDao.getFlowList();
        if (flowList.length === 0) {
            return flowList;
        }
        const newFlowList = [];
        for (let i = 0; i < flowList.length; i++) {
            let detail;
            switch (flowList[i].type) {
                case 100:
                    detail = await MovieModel.findByPk(flowList[i].art_id);
                    break;
                case 200:
                    detail = await MusicModel.findByPk(flowList[i].art_id);
                    break;
                case 300:
                    detail = await SentenceModel.findByPk(flowList[i].art_id);
                    break;

                default:
                    break;
            }
            flowList[i].setDataValue('detail', detail);
            newFlowList.push(flowList[i]);
        }
        return newFlowList;
    }
}
export { Flow as FlowService };