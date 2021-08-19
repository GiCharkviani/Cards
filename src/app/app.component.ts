
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Card } from './card.model';
import { Http } from './htttp.service';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  add:boolean = false
  loadingItem: boolean = false
  deletingItem:boolean = false

  cards: Card[] = [];//storage

  isLoading: boolean = false;
  error = ''


  clearing:boolean = false;


  idGot:number;

  constructor(private http: Http){}


  private gettingData(){
    this.http.getData().
    pipe(map((response)=>{
      const newArray = [];
      for(let i in response){
        newArray.push({...response[i], id:i})
      }
      return newArray
    })

    ).subscribe(response => {
      this.cards = response
      this.isLoading = false;
    },
    error => {
      this.error = error.error.error
    }
    )
  }

  ngOnInit(){
    this.isLoading = true;
    this.gettingData()

    setInterval(()=>{
      this.http.getData()
      .pipe(map(data=>{
        const array = [];
        for(let i in data){
          array.push(data[i])
        }
        return array
      }))
      .subscribe(
        data =>{
          this.cards = data
          this.isLoading = false;
        }
      )

    }, 2000)

  }

  onSubmit(form: NgForm){
    this.loadingItem = true
    const newCard = new Card(form.value.header, form.value.title, form.value.disc)

    this.http.postData(newCard).subscribe()

    form.reset()

    setTimeout(()=> {
      this.gettingData()
      this.loadingItem = false;
    }, 1000)

  }



  onDelete(id: string, index: number){
    this.deletingItem = true
    this.idGot = index;

    this.http.deleteItem(id).subscribe(res =>{
      console.log('Deleted, so: ' + res)
    })
    setTimeout(()=> {
      this.gettingData()
      this.idGot = null
      this.deletingItem = false
    }, 1000)
  }

  onClear(){
    this.clearing = true
    this.http.clearAll().subscribe()
    setTimeout(()=> {
      this.gettingData()
      this.clearing = false
    }, 1000)
  }



}
