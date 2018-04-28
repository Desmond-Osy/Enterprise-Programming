import { Component } from '@angular/core';


@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    Authenticated: boolean = false;

    isAuthenticated(): boolean {
        if (localStorage.getItem('token') == '') {
            return false
        }
        else {
            return true 
        }
        
    }
}
