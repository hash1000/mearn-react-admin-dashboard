
# Admin Dashboard

Welcome to an Admin Dashboard app built using the MERN (MongoDB, Express, React, Node.js) stack and Material-UI (MUI) for the user interface. This project provides both normal user and admin modes, offering a wide range of features like Graphs to enhance the admin experience.


## Installation

Install admin-dashboard with npm


### Client-side usage(PORT: 3000)
```bash
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm run start        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

### Server-side usage(PORT: 5001)
```bash
$ cd server           // go to server folder
$ yarn # or npm i    // npm install packages
$ npm run start        // run it locally
```

    
## API Reference

#### Get status

```http
  GET /api/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api` | `string` | **Required**. http://localhost:5001  |

#### Get status Active { Database + server}



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`= mongodb-cluster-url
`PORT`=5001

