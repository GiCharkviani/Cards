import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortener"
})

export class Subs implements PipeTransform{
  transform(value: any, sub:number){
    if(value.length){
     return value.substr(0,sub) + "..."
    }
    return value
  }
}
