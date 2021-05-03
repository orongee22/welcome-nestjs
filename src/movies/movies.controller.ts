import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // 컨트롤러 이름에 따른 라우터가 생성됨
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {

    }

    @Get()
    getAllMovies():Movie [] { // 전체 영화 목록 가져오기
        return this.moviesService.getAll();
    }

    // @Get('search')     // search가 id보다 밑에 있으면 'search'를 id로 인식하니까 위로 끌어올려야함
    // searchMovie(@Query('title') title: string){
    //     return `We are searching Movie to Title: ${title}`;
    // }

    @Get("/:id") // pathVariable
    getOneMovie(@Param("id") movieId:string): Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    createMovie(@Body() movieData) { // request body 값 가져오기
        return this.moviesService.createMovie(movieData);
    }

    @Delete("/:id")
    removeMovie(@Param("id") movieId: string){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch("/:id") // 일부분만 업데이트 할 경우, Put 은 전체 업데이트
    patchMovie(@Param('id') movieId: string, @Body() updateData){
        // return {
        //     id: movieId,
        //     ...updateData
        // };

        return this.moviesService.update(movieId, updateData);
    }


    
}
