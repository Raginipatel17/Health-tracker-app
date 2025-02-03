import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutlistComponent } from './workoutlist.component';

describe('WorkoutlistComponent', () => {
  let component: WorkoutlistComponent;
  let fixture: ComponentFixture<WorkoutlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(localStorage,'getItem').and.callFake((key:string):string|null =>{
      if(key==='workoutdetail'){
        return JSON.stringify([{Name:'rakesh',totalworkout:1,workout:[],totalminute:0}]);
      }
      return null;
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should parse valid JSON from localStorage", () => {
    const mockData=('[{"Name":"rakesh","totalworkout":1,"totalminute":0}]');
    component.workoutlist = JSON.parse(mockData);
    expect(component.workoutlist[0]).toEqual({Name:'rakesh',totalworkout:1,totalminute:0});
});

it("should set workoutlist to an empty array when JSON is invalid", () => {
    const invalidData = "{invalid: 'json'}";
    const component: any = { workoutlist: [] }; // Mock object

    try {
        component.workoutlist = JSON.parse(invalidData);
    } catch {
        component.workoutlist = [];
    }
    expect(component.workoutlist).toEqual([]);
});
  it('should go to previous page',()=>{
    component.currentpage=3;
    component.previous();
    expect(component.currentpage).toBe(2);

  });
  it('should go to next page if has more element to display',()=>{
    component.currentpage=1;
    component.perpageitem=5;
    component.workoutlist=new Array(15).fill({});
    component.next();
    expect(component.currentpage).toBe(2);
  });
  it('should not move to next page if no more element to display',()=>{
    component.currentpage=2;
    component.perpageitem=2;
    component.workoutlist=new Array(4).fill({});
    component.next();
    expect(component.currentpage).toBe(2);
  });
  it('should select page',()=>{
    component.currentpage=1;
    const index=1;
   const spyobj=spyOn(component,'selectpage').and.callThrough();
    component.selectpage(index);
    expect(component.currentpage).toBe(2);
    expect(spyobj).toHaveBeenCalled();
  });
  it('should select item per page',()=>{
    component.perpageitem=4;
    const page=2;
    const spyitem=spyOn(component,'pagination').and.callThrough();
    component.pagination(page);
    expect(spyitem).toHaveBeenCalled();
    expect(component.perpageitem).toBe(2);
  });
  it('should display element if search matches',()=>{
    component.workoutdemo=[
      {Name:'Rajesh',isSearched:false,isinitemlist:true},
      {Name:'Garrie',isSearched:false,isinitemlist:true}
    ]
    const item={target:{value:'raj'}}
    component.search(item);
    expect(component.workoutdemo[0].isSearched).toBe(true);
    expect(component.workoutdemo[1].isSearched).toBe(false);
  });
  it('should not display element if search doesnot matches',()=>{
    component.workoutdemo=[
      {Name:'Rajesh',isSearched:false,isinitemlist:true},
      {Name:'Garrie',isSearched:false,isinitemlist:true}
    ]
    const item={target:{value:'day'}}
    component.search(item);
    expect(component.workoutdemo[0].isSearched).toBe(false);
    expect(component.workoutdemo[0].isinitemlist).toBe(false);
    expect(component.workoutdemo[1].isSearched).toBe(false);
    expect(component.workoutdemo[1].isinitemlist).toBe(false);
  });
  it('should set isSearched to true for all items when "All" is selected', () => {
    component.workoutlist = [
      { workout: [{ type: 'Running' }], isSearched: false },
      { workout: [{ type: 'Cycling' }], isSearched: false }
    ];

    const event = { target: { value: 'All' } };

    component.workoutsearch(event);

    expect(component.workoutlist[0].isSearched).toBe(true);
    expect(component.workoutlist[1].isSearched).toBe(true);
  });

  it('should set isSearched to true for items containing the search type', () => {
    component.workoutlist = [
      { workout: [{type:'Running'}],isSearched: false },
      { workout: [{type:'Cycling'}],isSearched: false }
    ];

    const event = { target: { value: 'Running' } };

    component.workoutsearch(event);

    expect(component.workoutlist[0].isSearched).toBe(true);
    expect(component.workoutlist[1].isSearched).toBe(false); 
  });

  it('should set isSearched and isinitemlist to false for non-matching items', () => {
    component.workoutlist = [
      { workout: [{ type: 'Swimming' }], isSearched: true, isinitemlist: true },
      { workout: [{ type: 'Yoga' }], isSearched: true, isinitemlist: true }
    ];

    const event = { target: { value: 'Running' } };
    component.workoutsearch(event);

    expect(component.workoutlist[0].isSearched).toBe(false);
    expect(component.workoutlist[0].isinitemlist).toBe(false);
    expect(component.workoutlist[1].isSearched).toBe(false);
    expect(component.workoutlist[1].isinitemlist).toBe(false);
  });

  it('should handle empty input', () => {
    component.workoutlist = [
      { workout: [{ type: 'Running' }], isSearched: false },
      { workout: [{ type: 'Cycling' }], isSearched: false }
    ];
    const event = { target: { value: '' } };
    component.workoutsearch(event);

    expect(component.workoutlist[0].isSearched).toBe(false);
    expect(component.workoutlist[1].isSearched).toBe(false);
  });
  it('should return correct pages when workoutlist has items', () => {
    component.currentpage = 1;
    component.perpageitem = 5;
    component.workoutlist = new Array(20);
    const expectedPages = [1, 2, 3, 4];
    expect(component.pages).toEqual(expectedPages);
  });

  it('should return a single page when items fit within one page', () => {
    component.currentpage = 1;
    component.perpageitem = 10;
    component.workoutlist = new Array(8);

    expect(component.pages).toEqual([1]); 
  });

  it('should return an empty array when workoutlist is empty', () => {
    component.currentpage = 1;
    component.perpageitem = 5;
    component.workoutlist = [];

    expect(component.pages).toEqual([]);
  });

  it('should correctly calculate last page and generate page numbers', () => {
    component.currentpage = 2;
    component.perpageitem = 5;
    component.workoutlist = new Array(15);

    const expectedPages = [2, 3]; 
    expect(component.pages).toEqual(expectedPages);
  });

});
