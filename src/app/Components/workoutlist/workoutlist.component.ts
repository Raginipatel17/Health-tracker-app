import { NgFor, NgIf } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { every } from 'rxjs';

@Component({
  selector: 'app-workoutlist',
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './workoutlist.component.html',
  styleUrl: './workoutlist.component.css'
})
export class WorkoutlistComponent{
  workouttypeFilter:string[] =[
    'All',
    'Running', 'Walking', 'Cycling', 'Swimming', 'Jump Rope',
    'Weight Lifting', 'Yoga', 'Pilates', 'HIIT', 'Dancing',
    'Boxing', 'Martial Arts', 'Zumba', 'Rock Climbing', 'CrossFit'
  ];
  workoutlist:any=[];
  constructor(){
    const list=localStorage.getItem('workoutdetail');
    if(list){
      this.workoutlist=JSON.parse(list);
    }
  }
  workoutdemo=this.workoutlist;
  indexlist=[1,2,3,4,5,6,7,8,9,10];
  currentpage=1;
  startindex=0;
  perpageitem:number=10;
  
  get paginationitem(){
    this.startindex=(this.currentpage-1)*this.perpageitem;
    this.workoutdemo= this.workoutlist.slice(this.startindex,this.startindex+this.perpageitem);
    return this.workoutdemo;
  }
  previous(){
    if((this.currentpage>1)){
      this.currentpage--;
    }
  }
  next(){
    if(this.currentpage*this.perpageitem<this.workoutlist.length){
    this.currentpage++;
    }
  }
  get pages(){
      const startpage=this.currentpage;
      const lastpage=Math.ceil(this.workoutlist.length/this.perpageitem);
      let pages=Array.from({length:lastpage-startpage+1},(_,i)=>startpage+i)
      return pages;
  }
  selectpage(index:number){
    this.currentpage+=index;
  }
  pagination(event:any){
    this.perpageitem=parseInt(event.target.value);

  }
  search(event:any){
    (this.workoutdemo as any[]).forEach(e=>{
      if(e.Name.toLowerCase().includes(event.target.value.toLowerCase())){
          e.isSearched=true;

        }
        else{
          e.isSearched=false;
          e.isinitemlist=false;
        }
    })
  }
  
  workoutsearch(event:any){
      (this.workoutlist as any[]).map(e=>{
        if(event.target.value=='All'){
          e.isSearched=true;
        }
        else if(((e.workout as any[]).map(t=>t.type)).includes(event.target.value)){
            e.isSearched=true;
        }
        else{
          e.isSearched=false;
          e.isinitemlist=false;
        }
    }
  );
    }
  }
