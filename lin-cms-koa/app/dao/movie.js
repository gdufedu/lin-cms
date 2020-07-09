import {MovieModel} from '../model/movie';
import { NotFound } from 'lin-mizar';
class Movie {
    static async getMovieList() {
        const res =  await MovieModel.findAll();
        return res;
    }
    static async editMovie(id, params) {
        const movie = await MovieModel.findByPk(id);
        if (!movie) {
            throw new NotFound();
        }
        return await movie.update({...params});
    }
    static async addMovie(v) {
        return await MovieModel.create(v);
    }
    static async deleteMovieById(id) {
        return await MovieModel.destroy({
            where:{id}
        });
    }
}
export {Movie as MovieDao};