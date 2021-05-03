import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    // database와 연결짓는 기능 = service

    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    
    }

    getOne(id: string): Movie {
        const movie =  this.movies.find(movie=> movie.id === id); // string to number;

        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`); // 예외처리 구문 httpException 확장
        }

        return movie;
    }

    deleteOne(id:string) {
        this.getOne(id);    // 위에서 지정한 getOne() 불러와서 사용할 수도 있음. 예외처리용

        this.movies = this.movies.filter(movie => movie.id !== id);    // filter()는 값을 복사하므로 이전 값에 다시 덮어쓰기

        // delete 후 boolean 반환 없앰
    }

    createMovie(movieData: Movie){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id:string, updateData:Movie){
        const movie = this.getOne(id); // id 동일한 movie 찾아오고
        // this.deleteOne(id);            // id 지우고
        // this.createMovie(updateData);  // updateData 통해서 새로 생성하기
        this.movies.push({...movie, ...updateData})  // 지우지 말고 내용 덮어쓰기
    }

}
