# Pre Requisite
###  1. `NodeJS 12.x`
###  2. `npx installed globally`
###  3. `Understanding of Angular`

        yarn global add npx ( npm install -g npx)
       

# Running locally

        yarn (npm install)

        yarn run start (npm run start)

# Run on Stackblitz

        https://stackblitz.com/github/gtldhawalgandhi/quotes-app


# Assignment Task (2 weeks)

1. Play with the app and understand its functionality (More on that below)
2. Understand the Angular code
3. Implement the required REST endpoints in NodeJS (More on that below)
4. Data must be store in MongoDB

# Acceptance Criteria

1. NodeJS app must be built using ES6 and above.
2. Endpoints must be implemented using ExpressJS
3. Must use ExpressJS middlewares when appropriate, to avoid repeatability in the code (DRY)
4. Must use Mongoose and define proper schema to store data
5. App must have proper logging enabled for both development and production. Meaning less logging in production and more in development with the help of environment variables
6. App must not have any eslint errors/warnings (More on that below)
7. package.json must have "scripts" defined with appropriate commands
8. Dependencies should be appropriately placed in package.json
9. Classes, Methods & Functions should be documented using [JSDoc](https://jsdoc.app/howto-es2015-classes.html)
10. At least one API endpoint must have test written using JEST and supertest by mocking MongoDB as well as any other library you think requires mocking. Goal of this test is to ensure that calling certain endpoint (ex: GET request) returns expected data


# Mandatory eslint rules

## The NodeJS app must be configured to use these eslint rules

1.  "no-console": "error
2.  "require-atomic-updates": "error"
3.  "no-trailing-spaces": "error"
4.  "security/detect-object-injection": "error"
5.  "no-var": "error"
6.  "prefer-const": "warn"
7.  "quotes": ["warn", "single"]
8.  "prefer-object-spread": "warn"
9.  "prefer-template": "warn"
10. "semi": "warn"

# Quotes App (NodeJS)

1. Only registered users are allowed to use the app 
2. Only the owner can edit and delete their quotes 
3. Admin user can delete any quote and any user 
4. There is exactly 1 admin user 
5. Admin user cannot delete itself
6. Build appropriate METHODs (GET, PUT, POST, DELETE)

# Quotes App (Angular)

1. While playing with the app, set `fakeServer: true` inside `src/app/environments/environment.ts`
2. While developing NodeJS app, set `fakeServer: false` inside `src/app/environments/environment.ts`
3. To begin with, in the demo app register a new admin user by settings `username` as **admin** & `password` as **admin123**.


# IMPORTANT

### This assignment is about NodeJS & MongoDB only. Angular app is for reference purpose only

### But the end goal of the assignment is to make sure that the NodeJS app works perfectly alongside the angular app as expected