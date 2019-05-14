# devHub back-end

***

### Package Installation

    PSQL (Local):
    npm install pg 
    psql CREATE DATABASE [dbname]
    psql [dbname] < [schema.sql location]
***

    PSQL(Heroku) - Requires localPSQL SETUP:
    If heroku not added as remote (check with git remote -v):
    git remote add heroku https://final-back-end.herokuapp.com/
    Then:
    heroku pg:push devhubdb postgresql-fitted-51386 --app final-back-end
***