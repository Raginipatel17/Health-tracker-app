import { NgFor } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControlName } from '@angular/forms';
import Chart from 'chart.js/auto';
import { elementAt } from 'rxjs';
@Component({
  selector: 'app-work-progress',
  imports: [NgFor],
  templateUrl: './work-progress.component.html',
  styleUrl: './work-progress.component.css',
  
})
export class WorkProgressComponent{
  @ViewChild('myChart') myChart!: ElementRef;
  chart: any;
  workoutlist:any=[];
  constructor(){
    const list=localStorage.getItem('workoutdetail');
    if(list){
      this.workoutlist=JSON.parse(list);
    }
  }
  generateGraph(workout: any) {
    if (this.chart) {
      this.chart.destroy();
    }
    debugger;
    // Generate the new chart for the clicked workout
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'bar', 
      data: {
        labels: (workout?.workout as any[] || []).map(e => e.type), 
        datasets: [{
          label:"Total minutes of workout of "+workout.Name,
          data: (workout?.workout as any[] || []).map(e => e.minutes), 
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
    
}
}
