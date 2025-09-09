import axios from 'axios';

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'YesMovies'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class MovieService {
    static async getMovies(page: number = 0, size: number = 10) {
        return client.request({
            url: '/movie',
            method: 'GET',
            params: {
                'page': page,
                'size': size,
                'sort': 'startDate, asc',
                'type': 'title'
            }
        })
    }

    static async getMoviesById(id: number) {
        return client.get(`/movie/${id}`)
    }

    static async getGenres() {
        return client.get('/genre')
    }
}