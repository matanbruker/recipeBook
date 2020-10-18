import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataSrorageService} from '../shared/data-srorage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isLogged = false;
  constructor(private dataStorageService: DataSrorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isLogged = !user ? false : true;
    });
  }

  onSave() {
    this.dataStorageService.storeRecipes();
  }

  onFetch() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
