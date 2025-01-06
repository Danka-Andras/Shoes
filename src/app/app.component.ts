import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoesModel } from './models/shoes-model';
import { DataService } from '../services/data.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AppComponent {
  shoes: ShoesModel[] = [];
  newShoeForm: FormGroup;

  constructor(private dataService: DataService) {
    this.newShoeForm = new FormGroup({
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      size: new FormControl(40, Validators.required),
      color: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      category: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.dataService.getShoes().subscribe({
      next: (data: ShoesModel[]) => {
        this.shoes = data;
      },
      error: (err) => console.log(err)
    });
  }

  saveNew() {
    if (this.newShoeForm.valid) {
      const shoe = this.newShoeForm.value;
      this.dataService.addShoe(shoe).subscribe({
        next: (data: ShoesModel) => {
          this.shoes.push(data);
          this.resetForm();
        },
        error: (err) => console.log(err)
      });
    }
  }

  resetForm() {
    this.newShoeForm.reset({
      size: 40,
      price: 0
    });
  }

  deleteShoe(shoe: ShoesModel) {
    this.dataService.deleteShoe(shoe).subscribe({
      next: () => {
        this.shoes = this.shoes.filter(s => s.id !== shoe.id);
      },
      error: (err) => console.log(err)
    });
  }
}
