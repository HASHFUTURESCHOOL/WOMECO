
# WOMECO Website

This project contains the source code for the World Meaningful Education Council (WOMECO) website.

## Project Structure

- `server`: The backend Node.js application.
- `client`: The frontend React application (public website).
- `admin`: The frontend React application (admin panel).

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A [MongoDB](https://www.mongodb.com/) database. You can use a local installation or a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 2. Backend Setup

1.  Open the `server/.env` file and add your MongoDB connection string:

    ```
    MONGO_URI=your_mongodb_connection_string
    ```

2.  Open a terminal, navigate to the `server` directory, and install the dependencies:

    ```bash
    cd server
    npm install
    ```

3.  Start the backend server:

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:5000`.

### 3. Frontend Setup (Public Website)

1.  Open a new terminal, navigate to the `client` directory, and install the dependencies:

    ```bash
    cd client
    npm install
    ```

2.  Start the client application:

    ```bash
    npm start
    ```

    The public website will be running on `http://localhost:3000`.

### 4. Admin Panel Setup

1.  Open a new terminal, navigate to the `admin` directory, and install the dependencies:

    ```bash
    cd admin
    npm install
    ```

2.  Start the admin panel application:

    ```bash
    npm start
    ```

    The admin panel will be running on `http://localhost:3001` (or another available port).

## Next Steps

- The website is a functional scaffold with a public-facing site and an admin panel for content management.
- The public site features a modern design with a homepage, about page, programs page, and contact page.
- The news page dynamically fetches articles from the backend.
- The admin panel allows for full CRUD (Create, Read, Update, Delete) operations on articles.
- The backend server provides a RESTful API for articles.

## Next Steps

- **Implement User Authentication:** Secure the admin panel with a proper login system (e.g., using JWT - JSON Web Tokens).
- **Expand Content Management:** Add content management features for other parts of the website (e.g., programs, events).
- **Database Seeding:** A script is provided to seed the database with initial data (admin user, sample articles, sample programs). Run `npm run seed` in the `server` directory.
- **Deployment:** Deploy the applications to a cloud hosting service.
- **Testing:** Add unit and integration tests to ensure the stability of the applications.
