# Parcel Management System

A beginner-friendly full-stack demo built with Spring Boot and Angular.

## Demo credentials

Use one of these on the login page:

- `admin / admin123`
- `user / user123`

## Backend

The backend runs on `http://localhost:8080`.

### Start it

```powershell
cd "E:\Code\Parcel Management System\parcel-management-backend"
mvn spring-boot:run
```

If you open `http://localhost:8080/`, the API returns a small welcome message instead of a browser login prompt.

## Frontend

The frontend runs on `http://localhost:4200`.

### Start it

```powershell
cd "E:\Code\Parcel Management System\parcel-management-frontend"
npm start
```

## What is included

- Login page with demo accounts
- Dashboard with quick actions
- Payment simulation screen
- Modern navbar, banner, cards, and footer
- Seeded demo users and a sample parcel on backend startup

## Notes

- The frontend talks to `http://localhost:8080/api`
- The sample parcel ID is `1`
- Java 21 is used for the backend

