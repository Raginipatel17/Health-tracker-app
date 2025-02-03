import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProgressComponent } from './work-progress.component';
import { Chart } from 'chart.js';

describe('WorkProgressComponent', () => {
  let component: WorkProgressComponent;
  let fixture: ComponentFixture<WorkProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(localStorage,'getItem').and.callFake((key:string):string|null =>{
      if(key==='workoutdetail'){
        return JSON.stringify([{Name:'rakesh',totalworkout:1,workout:[],totalminute:0}]);
      }
      return null;
    })
    spyOn(localStorage,'setItem');
    spyOn(window,'alert');
    spyOn(Chart.prototype,'destroy');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should parse the list into workoutlist', () => {
    const list = JSON.stringify({Name:'rakesh',totalminutes:20,totalworkout:1,isSearched:false,isinitemlist:true});
    const spyitem=spyOn(JSON,'parse').and.callThrough();
    component.workoutlist = JSON.parse(list);
    expect(component.workoutlist).toEqual({Name:'rakesh',totalminutes:20,totalworkout:1,isSearched:false,isinitemlist:true});
    expect(spyitem).toHaveBeenCalled();
  });
  it('should create chart',()=>{
    const workout=[{type:'running',minutes:40},{type:'swimming',minutes:10}];
    component.chart={
      destroy:jasmine.createSpy('destroy')
    }
    const spyitem=
    component.generateGraph(workout);
      expect(spyitem).toHaveBeenCalledWith(
      component.myChart.nativeElement,jasmine.objectContaining({
        type:'bar',
        data:jasmine.objectContaining({
          labels:['running','swimming'],
          dataset:jasmine.objectContaining({
            label:'Rakesh',
            data:[40,10],
          })
        })
      })
    )
    expect(component.chart.destroy).toHaveBeenCalled();
    expect(component.chart.data.labels).toEqual(['running','swimming']);
    expect(component.chart.data.dataset[0].data).toEqual([40,10]);
  })
  it('should take label data from workout',()=>{
    const workout=[{type:'running',minutes:40},{type:'swimming',minutes:10}];
  })
  it('should map workout types to labels correctly', () => {
    component.workoutlist = {
      workout: [
        { type: 'Cardio' },
        { type: 'Strength' },
        { type: 'Yoga' }
      ]
    };

    const labels = (component.workoutlist?.workout as any[]).map(e => e.type);
    expect(labels).toEqual(['Cardio', 'Strength', 'Yoga']);
  });

  it('should return an empty array when workout is undefined', () => {
    component.workoutlist = undefined;

    const labels = (component.workoutlist?.workout as any[] || []).map(e => e.type);
    expect(labels).toEqual([]);
  });

  it('should return an empty array when workout.workout is null', () => {
    component.workoutlist = { workout: null } as any;

    const labels = (component.workoutlist?.workout as any[] || []).map(e => e.type);
    expect(labels).toEqual([]);
  });

  it('should return an empty array when workout.workout is an empty array', () => {
    component.workoutlist = { workout: [] };

    const labels = (component.workoutlist?.workout as any[] || []).map(e => e.type);
    expect(labels).toEqual([]);
  });
  it('should map workout minutes to labels correctly', () => {
    component.workoutlist = {
      workout: [
        { minutes: 60},
        { minutes: 40 },
        { minutes: 58}
      ]
    };

    const labels = (component.workoutlist?.workout as any[] || []).map(e => e.minutes);
    expect(labels).toEqual([60, 40, 58]);
  });

  it('should return an empty array when workout is undefined', () => {
    component.workoutlist = undefined

    const labels = (component.workoutlist?.workout as any[] || []).map(e => e.minutes);
    expect(labels).toEqual([]);
  });

  it('should return an empty array when workout.workout is null', () => {
    component.workoutlist = { workout: null } as any;

    const labels = (component.workoutlist?.workout as any[] || []).map(e => e.minutes);
    expect(labels).toEqual([]);
  });

  it('should return an empty array when workout.workout is an empty array', () => {
    component.workoutlist = { workout: [] };

    const labels = (component.workoutlist?.workout as any[] || []).map(e => e.minutes);
    expect(labels).toEqual([]);
  });

});
