import { Component, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ErrorModel } from 'src/app/core/models/ErrorModel';


@Component({
  selector: 'app-error-model',
  templateUrl: './error-model.component.html',
  styleUrls: ['./error-model.component.css']
})
export class ErrorModelComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:ErrorModel) { }
}
