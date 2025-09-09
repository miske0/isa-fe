import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { MovieService } from '../../services/movie.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [MatCardModule, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public genreList: any [] = []
  public email = ''
  public password = ''
  public repeatPassword = ''
  public firstName = ''
  public lastName = ''
  public phone = ''
  public adress = ''
  public genre = ''
  
  public doSignup() {
    console.log('Kliknuto na signup dugme');

    if (this.email == '' || this.password == '') {
        console.log('Greška: Email i password su obavezni!');
        alert('Email and password are required');
        return;
    }

    if (this.password !== this.repeatPassword) {
        console.log('Greška: Lozinke se ne poklapaju!');
        alert('Passwords dont match');
        return;
    }

    console.log('Svi podaci su validni, pokušavam kreiranje korisnika...');

    const isCreated = UserService.createUser({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        address: this.adress,
        genre: this.genre,
        favoriteGenre: this.genre,
        orders: []
    });

    if (isCreated) {
        console.log('Korisnik uspešno kreiran!');
        alert('Registration successful! Redirecting to login page...');
        this.router.navigate(['/login']); 
    } else {
        console.log('Greška: Korisnik sa ovim emailom već postoji!');
        alert('User with this email already exists');
    }
  }

    public constructor(public router : Router){
    MovieService.getGenres()
    .then(rsp => this.genreList = rsp.data)
  }
}
