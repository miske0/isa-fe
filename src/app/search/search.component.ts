import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MovieModel } from '../../models/movie.model';
import { NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatTableModule,NgIf,MatButtonModule, LoadingComponent, RouterLink, MatInputModule, MatFormFieldModule, FormsModule, MatCardModule, MatSelectModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = ['title', 'runtime', 'startDate', 'shortDescription', 'createdAt', 'pricePerTicket', 'actions'];
  allData: MovieModel[] = [];
  dataSource: MovieModel[] = [];
  private searchInput$: Subject<string> = new Subject<string>();

  constructor(public utils: UtilsService) {
    MovieService.getMovies().then(rsp => {
      this.allData = rsp.data;
      this.dataSource = [];
    });

    this.searchInput$
      .pipe(debounceTime(500))
      .subscribe(input => {
        this.performSearch(input);
      });
  }

  public doSearch(e: any) {
    const input = e.target.value;
    this.searchInput$.next(input);
  }

  private performSearch(input: string) {
    const value = input.toLowerCase().trim();
    if (!value) {
      this.dataSource = [];
      return;
    }

    this.dataSource = this.allData.filter(movie =>
      movie.title.toLowerCase().includes(value) ||
      movie.shortDescription?.toLowerCase().includes(value) ||
      movie.runTime.toString().includes(value) ||
      movie.createdAt?.toLowerCase().includes(value)
    );
  }
}
