import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('name', 'test', 'https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/497741')];
  constructor() { }

  ngOnInit(): void {
  }

}
