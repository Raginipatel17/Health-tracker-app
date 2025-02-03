import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-workoutform',
  imports: [FormsModule, NgFor],
  templateUrl: './workoutform.component.html',
  styleUrl: './workoutform.component.css',
})
export class WorkoutformComponent {
  workoutTypes: string[] = [
    'All',
    'Running',
    'Walking',
    'Cycling',
    'Swimming',
    'Jump Rope',
    'Weight Lifting',
    'Yoga',
    'Pilates',
    'HIIT',
    'Dancing',
    'Boxing',
    'Martial Arts',
    'Zumba',
    'Rock Climbing',
    'CrossFit',
  ];

  selectedWorkout() {
    return this.workoutTypes;
  }

  workouts = {
    Name: '',
    totalworkout: 1,
    workout: [
      { type: '', minutes: 0 }
    ],
    totalminutes: 0,
    isSearched: false,
    isinitemlist: true
  };
  newtype:string='';
  newminutes:number=0;
  adddata() {
    alert('Workout is added');
    let storeddata:any=localStorage.getItem('workoutdetail');
    let  entries=storeddata?JSON.parse(storeddata):[];
    if((this.workouts.Name!=='')){
      for(let i=0;i<entries.length;i++){
        if(entries[i].Name==this.workouts.Name){
          entries[i].totalworkout++;
          entries[i].workout.push({type:this.newtype, minutes:this.newminutes})
          entries[i].totalminutes += this.newminutes;
          this.addWorkout(this.newtype,this.newminutes);
          localStorage.setItem("workoutdetail",JSON.stringify(entries));
          return;
        }
      }
      this.addWorkout(this.newtype,this.newminutes);
      this.workouts.totalminutes += this.newminutes;
        entries.push({...this.workouts});
        localStorage.setItem("workoutdetail",JSON.stringify(entries));
        
      }
    console.log(this.workouts)
    this.workouts={Name:'',workout: [{ type: '', minutes: 0 }],totalworkout:1,isSearched:false,isinitemlist:true,totalminutes:0};
    
  }
  addWorkout(newType: string, newMinutes: number) {
    if (this.workouts.workout[0].type==='' && this.workouts.workout.length>0) {
      this.workouts.workout[0]={type:newType,minutes:newMinutes};
    } else {
      this.workouts.workout.push({type:newType,minutes:newMinutes});
    }
  }
}
