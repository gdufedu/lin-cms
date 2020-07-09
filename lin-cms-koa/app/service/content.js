import { MovieModel } from "../model/movie";
import { MovieDao } from '../dao/movie';
import { MusicDao } from '../dao/music';
import { SentenceDao } from '../dao/sentence';
import { NotFound, config } from "lin-mizar";

class Content {
    static async getContentList() {
        const movieList = await MovieDao.getMovieList();
        const musicList = await MusicDao.getMusicList();
        const sentenceList = await SentenceDao.getSentenceList();
        let res = [];
        res.push.apply(res, movieList);
        res.push.apply(res, musicList);
        res.push.apply(res, sentenceList);
        res.sort((a, b) => b.created_at.localeCompare(a.created_at));
        return res;
    }
    static async addContent(v) {
        switch (v['type']) {
            case 100:
                delete v['url']
                await MovieDao.addMovie(v);
                break;
            case 200:
                await MusicDao.addMusic(v);
                break;
            case 300:
                delete v['url']
                await SentenceDao.addSentence(v);
                break;
            default:
                throw new NotFound({ msg: '内容类型不存在' });
        }
    }
    static async editContent(id, params) {
        params['image'] = params['image'].split(config.getItem('localMainImgUrlPrefix'))[1];
        switch (params['type']) {
            case 100:
                delete params['url'];
                await MovieDao.editMovie(id, params);
                break;
            case 200:
                await MusicDao.editMusic(id, params);
                break;
            case 300:
                delete params['url'];
                await SentenceDao.editSentence(id, params);
                break;

            default:
                throw new NotFound({ msg: '内容类型不存在' });
        }
    }
    static async deleteContent(id, type) {
        switch (type) {
            case 100:
                await MovieDao.deleteMovieById(id);
                break;
            case 200:
                await MusicDao.deleteMusicById(id);
                break;
            case 300:
                await SentenceDao.deleteSentenceById(id);
                break;

            default:
                throw new NotFound('内容类型不存在');
        }
    }
}
export { Content as ContentService };