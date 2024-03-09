```
clone repo into {local}/xampp/htdocs

launch xampp and setup database in phpmyadmin
    create user and databse with same name, assign full privileges
    import {repo}/db/tables.sql from into database
    change config in {repo}/db/connection.js

cd into repo root folder
run $npm install

run $node server.js
browse to http://localhost:3000/

```
