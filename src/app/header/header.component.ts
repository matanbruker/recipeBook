import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() featerSelected = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featerSelected.emit(feature);
  }

}
