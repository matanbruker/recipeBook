import {Component} from '@angular/core';
import {DataSrorageService} from '../shared/data-srorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataSrorageService: DataSrorageService) {
  }

  onSave() {
    this.dataSrorageService.storeRecipes();
  }

  onFetch() {
    this.dataSrorageService.fetchRecipes().subscribe();
  }

}
