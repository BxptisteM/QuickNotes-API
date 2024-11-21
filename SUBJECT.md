
# Quick Notes: A Simple RESTful API POC

Welcome to **Quick Notes**, a project designed as a Proof of Concept (POC) to demonstrate the basics of building a RESTful API using Node.js and Express. This project covers key backend concepts such as user authentication, CRUD operations, and database integration with MongoDB.

---

## Project Overview

**Quick Notes** is a simple API for managing ideas in a fictitious application called "IdeaVault." It provides a complete backend solution with endpoints for user management and CRUD operations for ideas. The goal is to showcase the process of building a functional backend while keeping things efficient and understandable.

---

## Features

1. **User Authentication**:
   - User registration with email, password, and name.
   - User login with JWT-based authentication.
   - Secure routes using authentication middleware.

2. **Idea Management**:
   - **Create**: Add a new idea (title, description).
   - **Read**: Fetch all ideas created by the authenticated user.
   - **Update**: Modify the title or description of an existing idea.
   - **Delete**: Remove an idea.

3. **User Management**:
   - Retrieve and update user profile information (name, email, password).

4. **Endpoints**:
   - `/api/register`: Create a new user account.
   - `/api/login`: Authenticate a user and retrieve a JWT token.
   - `/api/me`: Access and update the logged-in user's profile.
   - `/api/ideas`: Perform CRUD operations on ideas.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB.
- **jsonwebtoken**: Token-based authentication.
- **bcryptjs**: Password hashing for secure authentication.

---

## Project Structure

```
/back
├── /routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── ideaRoutes.js
├── /models
│   ├── User.js
│   ├── Idea.js
├── /middleware
│   ├── authMiddleware.js
├── server.js
└── .env
```

---

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/api-nexus.git
   cd api-nexus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the `.env` file:
   ```env
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   PORT=<your_port>
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Test the endpoints using tools like **Postman** or **Insomnia**.

---

## Estimated Development Time

- Project setup: **1 hour**
- Authentication implementation: **2-3 hours**
- CRUD operations for ideas: **3-4 hours**
- Testing and documentation: **2 hours**

**Total**: ~10 hours

---

## Purpose

This project is intended to:
- Serve as a learning tool for backend development with Node.js and Express.
- Act as a demonstration of RESTful API concepts for clients and collaborators.
- Provide a foundation for future projects requiring similar functionalities.

---

Happy coding! 🚀
