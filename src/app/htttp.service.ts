import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Card } from "./card.model";


@Injectable({providedIn: 'root'})

export class Http {
  constructor(private http: HttpClient){}

  postData(data: Card){
    return this.http.post('https://httprequeststudy-default-rtdb.firebaseio.com/cards.json',data)
  }

  getData(){
    return this.http.get<{[key:string]: Card}>('https://httprequeststudy-default-rtdb.firebaseio.com/cards.json')
  }

  clearAll(){
    return this.http.delete('https://httprequeststudy-default-rtdb.firebaseio.com/cards.json')
  }

  deleteItem(item: string){
    return this.http.delete(`https://httprequeststudy-default-rtdb.firebaseio.com/cards/${item}.json`)
  }
}
