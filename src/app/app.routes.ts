import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AllmoviesComponent } from './allmovies/allmovies.component';
import { MovieComponent } from './movie/movie.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'allmovies', component: AllmoviesComponent },
    { path: 'allmovies/:id/movie', component: MovieComponent },
    { path: 'search', component: SearchComponent },
    { path: 'user', component: UserComponent },
    { path: '**', redirectTo: '' }
]
