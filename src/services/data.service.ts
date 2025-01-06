import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoesModel } from '../app/models/shoes-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:3000/shoes"

  constructor(private http: HttpClient) { }

  getShoes(): Observable<ShoesModel[]> {
    return this.http.get<ShoesModel[]>(this.url);
  }

  addShoe(reg: ShoesModel): Observable<ShoesModel> {
    return this.http.post<ShoesModel>(this.url, reg);
  }

  deleteShoe(reg: ShoesModel): Observable<ShoesModel> {
    return this.http.delete<ShoesModel>(`${this.url}/${reg.id}`);
  }
}
