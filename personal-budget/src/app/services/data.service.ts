import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export type MyBudget = {
  title: string;
  budget: number;
}

export type DataSource = {
  myBudget: MyBudget[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  fetchData(): Observable<DataSource> {
    return this.http.get<DataSource>('http://localhost:3000/budget');
  }
}
