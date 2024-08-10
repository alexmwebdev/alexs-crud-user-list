# Alex's User List website

This App provides CRUD support for an user list website system, and a frontend that shows all users.

## Backend

The backend includes a mock database in the db/mockData/users.js file. The backend uses an ORM system called [sequelize](https://sequelize.org/), works with multiple SQL databases like Postgres, mysql, mariadb, sqlite and Microsoft SQL Server. For this project I have decided to use Postgres.

## Frontend

The frontEnd will be served by the backend, so you will need to run both to see the app working. The frontend consists of HTML, CSS and Javascript. The app uses express to serve the static files. The frontend will allow you to create, update and delete users from the database.

## Installation


git clone https://github.com/ajsevillano/users-CRUD.git
cd users-CRUD
npm install

# .env file

Create an .env file with the following configurations:

DBHOST="localhost"
DBNAME="postgres"
DBUSER="postgres"
DBPORT="5432" 
DBPASSWORD="XanMan88!"
DBTYPE="postgres"

// Create the users table in the newly created database
npm run dbcreateusertable

// Insert dummy data from db/mockData/users.js into the users tbale
npm run dbpopulatetable

# Delete the table
//If you want to delete the user table, use the below command.
npm run dbdeletetable

# Start the website with the below command
npm run dev

The website is available on http://localhost:3000
```

**The Rest API will be running on**

http://localhost:3000/api/users


## Technical Details

### Backend Dependencies

- [Express](https://www.npmjs.com/package/express): Web-based Node framework
- [PG](https://www.npmjs.com/package/pg) : Non-blocking PostgreSQL client for Node.js.
- [Mysql2](https://www.npmjs.com/package/mysql2) : MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl and much more.
- [Nodemon](https://www.npmjs.com/package/nodemon): (Dev dependency) A utility that will monitor for any changes in your source and automatically restart your server.
- [Sequelize](https://sequelize.org/) : A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server Databases
- [DotEnv](https://www.npmjs.com/package/dotenv): (Dev dependency) - loads environment variables from a .env file.
- [Jest](https://www.npmjs.com/package/jest): (Dev dependency) A library for testing - I dont use this though

### Frontend

The front-end is entirely developed using HTML, CSS, and JavaScript.

## API END POINTS

This is a list of the end points used by the Api, tested using Postman

### Get all users endpoint

```javascript
localhost: 3000 / api / users;
```

### Get user by Id endpoint

localhost:3000/api/users/:id

### Create endpoint

localhost: 3000 /
  api /
  users /
  // You will need to provide the data in the body of the request

  {
    firstName: 'Example',
    lastName: 'Example',
    email: 'example@example.com',
    catchphrase: 'Example catchphrase',
  };
```

### Update endpoint


localhost:3000/api/users/:id

// You will need to provide the data in the body of the request

{
firstName: 'Example',
lastName: 'Example',
email:'example@example.com',
catchphrase: 'Example catchphrase',
}
```

### Delete endpoint

localhost:3001/api/users/:id
