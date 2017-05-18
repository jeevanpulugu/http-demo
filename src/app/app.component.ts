import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  people: Array<any>;
  next: string;
  errorMessage: string = '';

  constructor (public http: Http) {
    http.get('http://swapi.co/api/people')
    .map( res => res.json())
    .subscribe(
      data => {
        this.people = data.results;
        this.next = data.next;
      },
      error => {
        this.errorMessage = error.json()
        console.log(this.errorMessage);
      }
    );
  }

  gerMorePeople () {
    this.http.get(this.next)
    .map(res => res.json())
    .subscribe(
      data => {
        this.people.push(...data.results);
         this.next = data.next;
      }
    );

  }
}
