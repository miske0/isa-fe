import { UserModel } from "../models/user.model"
import { OrderModel } from "../models/order.model"

export class UserService {

    static retrieveUsers(): UserModel[] {
        if (!localStorage.getItem('users')) {
            const arr: UserModel[] = [
                {
                    email: 'user@example.com',
                    firstName: 'Milos',
                    lastName: 'Jovanovic',
                    phone: '0601234567',
                    address: 'Beogradska',
                    password: 'password',
                    genre: 'drama',
                    favoriteGenre: 'drama',
                    orders:[]
                }
            ]

            localStorage.setItem('users', JSON.stringify(arr))
        }

        return JSON.parse(localStorage.getItem('users')!)
    }

    static login(email: string, password: string): boolean {

        for (let user of this.retrieveUsers()) {
            if (user.email === email && user.password === password) {
                localStorage.setItem('active', user.email)
                return true
            }
        }

        return false

    }

    static getActiveUser(): UserModel | null {

        if (!localStorage.getItem('active'))
            return null

        for (let user of this.retrieveUsers()) {
            if (user.email == localStorage.getItem('active')) {
                return user
            }
        }

        return null
    }

    static createOrder(order: OrderModel) {
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.orders.push(order)
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }

        return false
    }

    static createUser(model: UserModel) {
        console.log('Pozvana createUser() sa modelom:', model);
    
        const users = this.retrieveUsers();
        console.log('Trenutni korisnici:', users);
    
        for (let u of users) {
            if (u.email === model.email) {
                console.log('Greška: Korisnik sa ovim emailom već postoji!');
                return false;
            }
        }
    
        users.push(model);
        console.log('Novi korisnički niz nakon dodavanja:', users);
    
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Korisnik sačuvan u localStorage!');
        
        return true;
    }

    static changeOrderStatus(state: 'ordered' | 'paid' | 'canceled', id: number) {
        const active = this.getActiveUser()
        if (active) {
            const arr = this.retrieveUsers()
            for (let user of arr) {
                if (user.email == active.email) {
                    for (let order of user.orders) {
                        if (order.id == id) {
                            order.status = state
                        }
                    }
                    localStorage.setItem('users', JSON.stringify(arr))
                    return true
                }
            }
        }
        return false
    }
}