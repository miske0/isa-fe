import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatCardActions } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-projekcija',
  imports: [MatCardActions,NgIf, MatTableModule, NgFor, RouterLink, LoadingComponent],
  templateUrl: './allmovies.component.html',
  styleUrl: './allmovies.component.css'
})
export class AllmoviesComponent {
    displayedColumns: string[] = ['title', 'shortDescription', 'genre', 'runTime', 'startDate', 'price', 'actors', 'actions']; // Ažurirane kolone
    dataSource: any[] = [];
    public movies: any | null = null
    public error: string | null = null
  
    constructor( public utils: UtilsService) {
      MovieService.getMovies(0, 15).then(rsp => {
        console.log('API Response:', rsp.data); 
        this.dataSource = rsp.data; 
      });
    }
  }


