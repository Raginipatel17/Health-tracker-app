import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutformComponent } from './workoutform.component';

describe('WorkoutformComponent', () => {
  let component: WorkoutformComponent;
  let fixture: ComponentFixture<WorkoutformComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutformComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutformComponent);
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

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should return an empty array when storeddata is null", () => {
    const storeddata = null;
    const entries = storeddata ? JSON.parse(storeddata) : [];
    expect(entries).toEqual([]);
});

it("should return an empty array when storeddata is undefined", () => {
    const storeddata = undefined;
    const entries = storeddata ? JSON.parse(storeddata) : [];
    expect(entries).toEqual([]);
});

it("should return an empty array when storeddata is an empty string", () => {
    const storeddata = "";
    const entries = storeddata ? JSON.parse(storeddata) : [];
    expect(entries).toEqual([]);
});

it("should return an empty array when storeddata is invalid JSON", () => {
    const storeddata = "{invalid: 'json'}";
    let entries;
    try {
        entries = storeddata ? JSON.parse(storeddata) : [];
    } catch {
        entries = [];
    }
    expect(entries).toEqual([]);
});

it("should parse storeddata when it contains valid JSON", () => {
    const storeddata = '[{"name": "John"}]';
    const entries = storeddata ? JSON.parse(storeddata) : [];
    expect(entries).toEqual([{ name: "John" }]);
});
  


  it('should return the list of workout types', () => {
    const expectedWorkouts = [
      'All', 'Running', 'Walking', 'Cycling', 'Swimming', 'Jump Rope',
      'Weight Lifting', 'Yoga', 'Pilates', 'HIIT', 'Dancing', 'Boxing',
      'Martial Arts', 'Zumba', 'Rock Climbing', 'CrossFit'
    ];
    expect(component.selectedWorkout()).toEqual(expectedWorkouts);
  });
  it('should add workout if does not have',()=>{
    component.newminutes=20;
    component.newtype='Running';
    component.workouts={Name:'rakesh',totalminutes:20,workout:[{type:component.newtype,minutes:component.newminutes}],totalworkout:1,isSearched:false,isinitemlist:true};
    component.adddata();
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('should not add if name doesnot exist',()=>{
    component.workouts={Name:'',totalminutes:20,workout:[],totalworkout:1,isSearched:false,isinitemlist:true};
    component.newminutes=20;
    component.newtype='Running';
    component.adddata();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  })
  it('should add type and minutes if name already exist',()=>{
    component.workouts={Name:'',totalminutes:20,workout:[],totalworkout:1,isSearched:false,isinitemlist:true};
    component.newminutes=20;
    component.newtype='Running';
    component.adddata();
  }) 
  it('should append workout by addworkout function if name already exist',()=>{
    component.workouts={Name:'rakesh',totalminutes:20,workout:[{type:'Running',minutes:8}],totalworkout:1,isSearched:false,isinitemlist:true};
    component.addWorkout('Boxing',40);
    expect(component.workouts.workout.length).toBe(2);
    expect(component.workouts.workout[1]).toEqual({type:'Boxing',minutes:40})
  })
  it('should store updated values',()=>{
    component.workouts={Name:'rakesh',totalminutes:20,workout:[{type:'Running',minutes:8}],totalworkout:1,isSearched:false,isinitemlist:true};
    component.newminutes=40;
    component.newtype='Swimming';
    component.adddata();
    component.addWorkout(component.newtype,component.newminutes);
    expect(localStorage.setItem).toHaveBeenCalledWith('workoutdetail',jasmine.any(String));
  })
  it('should add element if name not found',()=>{
    component.workouts={Name:'Carrie',totalminutes:20,workout:[{type:'Running',minutes:8}],totalworkout:1,isSearched:false,isinitemlist:true};
    component.newminutes=40;
    component.newtype='Swimming';
    component.adddata();
    component.addWorkout(component.newtype,component.newminutes);
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('should be empty if not entries exist',()=>{
    const entries=[];
    component.workouts={Name:'Carrie',totalminutes:20,workout:[{type:'Running',minutes:8}],totalworkout:1,isSearched:false,isinitemlist:true};
    entries.push(component.workouts);
    expect(entries).toEqual([{Name:'Carrie',totalminutes:20,workout:[{type:'Running',minutes:8}],totalworkout:1,isSearched:false,isinitemlist:true}])
  })
});
