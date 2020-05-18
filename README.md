# Prequisite
###  1. `NodeJS 12.x`
###  2. `npx installed globally`

        yarn global add npx ( npm install -g npx)
       

# Running locally

        yarn (npm install)

        yarn run start (npm run start)


# Task

1. Play with the app and understand its functionality (More on that below)
2. Understand the Angular code
3. Implement the required REST endpoints in NodeJS (More on that below)
4. Data must be store in MongoDB

# Acceptance Criteria

1. NodeJS app must be built using ES6 and above.
2. Endpoints must be implemented using ExpressJS
3. Must use ExpressJS middlewares when appropriate, to avoid repeatability in the code (DRY)
4. Must use Mongoose and define proper schema to store data
5. App must have proper logging enabled for both development and production
6. App must not have any eslint errors/warnings (More on that below)

# Quotes App

1. Only registered users are allowed to use the app
2. Only the owner can edit and delete their quotes
3. Admin user can delete any quote and user
4. There is exactly 1 admin user
5. Admin user cannot delete itself
6. While playing with the app set `fakeServer: true` inside `src/app/environments/environment.ts`
7. While developing NodeJS app set `fakeServer: false` inside `src/app/environments/environment.ts`

# Mandatory eslint rules

## The app must be configured to use these eslint rules

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