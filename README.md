# routes-orders
 
# Overview

```sql
This is a application for managing transport orders and routes. It allows users 
to create, view, sort, and modify orders within different routes.
```

# Features

## Back-End (Node.js, Express, MySQL)

```sql
- Create, update, delete, and retrieve orders.
- Store order details such as sender, receiver, package count, and timestamps.
- Sort and manage orders efficiently.
```

## Front-End (React)

```sql
- Form to add new orders.
- List of existing orders with sender/receiver details.
- Sorting and filtering options.
```

# Technologies Used

```sql
- Back-End: Node.js, Express.js, MySQL
- Front-End: React.js, Axios
- Database: MySQL
```

# Environment Variables (.env)

```sql
ADMIN_USERNAME = "root"
ADMIN_PASSWORD = "kardokiyani1998"
DATABASE_NAME = "routes_db"
DIALECT = "mysql"
DIALECTMODEL = "mysql2"
PORT = "3000"
HOST = "localhost"
```

# Setup Instructions

## Back-End

### Install dependencies: 

```sql
npm install
```
### Start the backend server (with nodemon):

```sql
npm run dev
```

### Open new terminal before navigating to the Front-End folder

## Front-End

### Navigate to the Front-End folder:

```sql
cd order-system
```

### Start the React app:

```sql
npm run/npm run start
```