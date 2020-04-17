import { Injectable } from '@nestjs/common';
import { observable, Subscription, range, of, forkJoin, from } from 'rxjs';
import { map, filter, take, pluck,combineLatest, tap, } from 'rxjs/operators';
import * as _ from 'lodash';


@Injectable()
export class TestService {

    student = [
        { name:"sam", no:"123"},
        { name:"vivian", no:"124"},
        { name:"kkk", no:"999"}
    ]

    constructor(){
        this.test();
    }

    test(){
        var a = range(1, 50).pipe(
            filter(x => x % 10 === 0),
            map(x => x + x),
            take(1),       
          );
        
        var b= from(this.student)
        .pipe(
            // tap(x=>console.log(x)),
            map(x=>x.name),
            take(1)
        );   
      
        b.subscribe(x=>{
            console.log(x)
        })

    }

    updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
        console.log(fieldsToUpdate);
        return { ...todo, ...fieldsToUpdate };
    }
}

interface Todo {
    title: string;
    description: string;
}
class inputDto{
    [key:string]:any;
}