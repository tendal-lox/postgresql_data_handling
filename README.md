# Postgresql data management for sample users

![N|Solid](https://miro.medium.com/v2/resize:fit:4800/0*YRyorfvieEPqUGW9)

## Summary of what this module does!
Sample list of users will receive from https://jsonplaceholder.typicode.com/users

An array of users data will receive by get request to `localhost:3000/`.

Our dataBase has two table. The first table which called individual_profile contains name, username and userId. The second table is called users address contains street, city, userId, geo-lat and geo-lng.

By get request to `localhost:3000/members`, you can access to merged data of all users that contains properties of each table.

## DataBase Features
- Duplicate data is not stored in the dataBase
- Each query handle by pool connection
- Using the pg module as a postgreSQL node.js driver

## Web Server Features
- Using express as a web server

> Note: There is still no api documentation like `swagger` in version 1.1.0 of this module.

### AXIOS as a default API call module
The default timeout for each request is 1000 milliseconds. If no response is received within this time, axios will resend the request a second time.

This operation is done up to 5 times. The interval between each failed request is 2000 milliseconds. After 5 times it will reject response promise.

## Install Guide
This module requires [Node.js](https://nodejs.org/) v16+ to run.
At first, you have to implement dataBase tables.

```sh
git clone https://github.com/tendal-lox/postgresql_data_handling.git
cd postgresql_data_handling
npm start
```

### TECH

- [Node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [PostgreSQL] - SQL dataBase
- [Axios] - great UI boilerplate for modern web apps
- [Async.js]
- dotenv
- Nodemon

## License
ISC

   [Node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [PostgreSQL]: <https://www.postgresql.org/>
   [Axios]: <https://axios-http.com/>
   [Async.js]: <http://caolan.github.io/async/v3/>