import { Component } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-ticket',
  imports: [MatCardModule, NgIf, MatSelectModule, RouterLink, NgFor],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  public movie: MovieModel | null = null

  public constructor(private route: ActivatedRoute, public utils: UtilsService, private router: Router) {
    route.params.subscribe(params => {
      console.log('Movie ID:', params['id']);  
      MovieService.getMoviesById(params['id'])
        .then(rsp => {
          console.log('API Response:', rsp.data);  
          this.movie = rsp.data;
        })
        .catch(error => {
          console.error('Error fetching movie:', error);  
        });
    });
  }
  public doOrder() {
    if (!this.movie || !this.movie.movieGenres || this.movie.movieGenres.length === 0) {
        console.error("Movie genres are empty or undefined.");
        return;
    }    
    const genreNames = this.movie.movieGenres
        .map((genreObj, index) => {
            if (genreObj && genreObj.genre && genreObj.genre.name) {
                return genreObj.genre.name; 
            } else {
                console.warn(`Missing genre or name in movieGenres at index ${index}`);
                return undefined; 
            }
        })
        .filter(name => name !== undefined) 
        .join(', ') || 'Unknown';  


    const order = {
        id: new Date().getTime(),
        movieId: this.movie.movieId,
        title: this.movie.title,
        genre: genreNames, 
        count: 1,
        pricePerItem: "1000", 
        startDate: this.movie.startDate,
        status: "ordered" as "ordered",
        rating: null
    };  

    const success = UserService.createOrder(order);
    if (success) {
        console.log("Order successfully placed:", order);
    } else {
        console.log("Failed to place order. User might not be logged in.");
    }

   
}
}
