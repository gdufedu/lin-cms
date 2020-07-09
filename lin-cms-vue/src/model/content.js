import {get, post, _delete, put} from '../lin/plugin/axios';
class Content {
    static async getContentList() {
        const res =  await get('v1/content');
        return res;
    }
    static async addContent(data) {
        const res =  await post('v1/content', {...data});
        return res;
    }
    static async delContent(id, type) {
        const res =  await _delete(`v1/content/${id}`, {type});
        return res;
    }
    static async editContent(id, data) {
        const res =  await put(`v1/content/${id}`, {...data});
        return res;
    }
}
export {Content as ContentModel}