import { Routes } from '@angular/router';
import { WorkoutformComponent } from './Components/workoutform/workoutform.component';
import { WorkoutlistComponent } from './Components/workoutlist/workoutlist.component';
import { WorkProgressComponent } from './Components/work-progress/work-progress.component';

export const routes: Routes = [
    {
        path:'',
        component:WorkoutformComponent
    },
    {
        path:'addworkout',
        component:WorkoutformComponent
    },
    {
        path:'workoutdetails',
        component:WorkoutlistComponent
    },
    {
        path:'workprogress',
        component:WorkProgressComponent
    },
];
