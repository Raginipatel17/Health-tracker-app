# 🏃‍♂️‍➡️🏋️🚴‍♂️HealthTrackerApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

The Health Tracker App is a simple and efficient tool for tracking workouts, exercises, and fitness progress. Users can log their daily workouts, store exercise details (e.g., type, reps, duration), and retrieve past workout history. The app leverages local storage to save workout details, ensuring easy access and persistence. With a user-friendly interface, it helps individuals stay consistent with their fitness goals and track improvements over time.
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
## Running Tests
Run the following command to execute unit tests and generate a coverage report:

For Angular (Jasmine/Karma):
```bash
  ng test --code-coverage
```

 
## Code Coverage Report

| File           | % Stmts | % Branch | % Funcs | % Lines |
|---------------|--------|---------|--------|--------|
| app/Components/header | 100%   | 100%    | 100%   | 100%   |
| app/Components/workoutform| 100%   | 87.5%    | 100%   | 100%   |
| app/Components/workoutlist| 97.36%   | 88.88%    | 100%   | 97.22%   |
|app/Components/work-progress| 72.72%   | 83.33%    | 50%   | 72.72%   |




## Overall Coverage

Statements   : 95.18% ( 79/83 )<br>
Branches     : 86.95% ( 20/23 )<br>
Functions    : 90% ( 18/20 )<br>
Lines        : 94.8% ( 73/77 )     

### **🔹 How This README Helps**
✔ **Clear setup steps** to install and run locally  
✔ **How to check coverage report** manually  
✔ **Public repo link for easy access**  

## 🛠️ Setup & Run Locally

### 1️⃣ **Clone the Repository**
```sh
https://github.com/Raginipatel17/Health-tracker-app.git
cd unit-test-coverage-example
```
### 2️⃣ **Install Dependencies**
```
npm install
```

### 3️⃣ **Run Tests with Coverage Reports**
```
ng test --no-watch --code-coverage
```
Or 
```
ng test
```
