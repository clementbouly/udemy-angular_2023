import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.setEditMode();
  }

  setEditMode() {
    this.activatedRoute.params.subscribe((params) => {
      this.editMode = params.id != null;
      console.log({ editMode: this.editMode });
    });
  }
}
