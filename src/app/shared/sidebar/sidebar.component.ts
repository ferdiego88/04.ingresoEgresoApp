import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, OnDestroy {

  user!: Usuario
  userSubs: Subscription = new Subscription
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe( ({user}) => {
      this.user = user
    })
  }

  logout() {
    this.authService.logout()
      .then( () => {
        this.router.navigate(['/login']);
      } )
  }

}
