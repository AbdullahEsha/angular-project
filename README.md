# AngularProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

# Angular Project Documentation

## **Introduction**

This project is a basic Angular application demonstrating user authentication, component-based routing, and API communication. It includes `auth/login`, `home`, and `admin` components and uses `HttpClientModule` for API interactions and `localStorage` for token management.

---

## **Prerequisites**

Before starting, ensure you have the following installed on your system:

1. **Node.js**: [Download and install Node.js](https://nodejs.org/).
2. **Angular CLI**: Install globally via npm:
   ```bash
   npm install -g @angular/cli
   ```

---

## **Getting Started**

### **1. Create a New Angular Project**

1. Create a new Angular application:
   ```bash
   ng new my-app
   ```
2. Navigate to the project directory:
   ```bash
   cd my-app
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
   The application runs at `http://localhost:4200`.

---

### **2. Project Setup**

#### **Clear Entry File**

1. Open `src/app/app.component.html`.
2. Remove existing content and add the following:
   ```html
   <main class="main">
     <router-outlet></router-outlet>
   </main>
   ```
   This serves as the entry point for other components.

---

### **3. Add Components**

#### **3.1. Login Component**

1. Create the `auth/login` component:
   ```bash
   ng generate component auth/login
   ```
2. This component will handle user login.

#### **3.2. Home Component**

1. Create the `home` component for the index page:
   ```bash
   ng generate component home
   ```
2. This will serve as the landing page.

#### **3.3. Admin Component**

1. Create the `admin` component for admin functionality:
   ```bash
   ng generate component admin
   ```
2. This component will handle admin-related actions.

---

### **4. Routing Setup**

1. Create the routing configuration file `src/app/app.routes.ts`:

   ```typescript
   import { Routes } from "@angular/router";

   export const routes: Routes = [
     {
       path: "",
       async loadComponent() {
         const m = await import("./home/home.component");
         return m.HomeComponent;
       },
     },
     {
       path: "login",
       async loadComponent() {
         const m = await import("./auth/login/login.component");
         return m.LoginComponent;
       },
     },
     {
       path: "admin",
       async loadComponent() {
         const m = await import("./admin/admin.component");
         return m.AdminComponent;
       },
     },
     { path: "**", redirectTo: "" }, // Redirect undefined routes to home
   ];
   ```

2. Import the routes into `AppModule`:

   ```typescript
   import { provideRouter } from "@angular/router";
   import { routes } from "./app.routes";

   bootstrapApplication(AppComponent, {
     providers: [provideRouter(routes)],
   }).catch((err) => console.error(err));
   ```

---

### **5. API Integration**

#### **5.1. Install `HttpClientModule`**

Import `HttpClientModule` into your project for API requests:

```typescript
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [HttpClientModule],
})
export class AppModule {}
```

#### **5.2. Example API Request**

Example usage of `HttpClient` for API interaction:

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post("http://localhost:5000/api/v1/auth/login", credentials);
  }
}
```

---

### **6. Local Storage Usage**

#### **Storing Tokens**

Store the `accessToken` and user data in `localStorage` after login:

```typescript
localStorage.setItem("accessToken", token);
localStorage.setItem("user", JSON.stringify(user));
```

#### **Retrieving Tokens**

Retrieve the `accessToken` when making authenticated API requests:

```typescript
const token = localStorage.getItem("accessToken");
```

#### **Clearing Tokens**

Clear tokens during logout:

```typescript
localStorage.removeItem("accessToken");
localStorage.removeItem("user");
```

---

### **7. Project Commands**

#### **Start Development Server**

```bash
ng serve
```

#### **Build the Project**

```bash
ng build
```

#### **Test the Project**

```bash
ng test
```

---

## **Folder Structure**

```bash
my-app/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.css
│   │   │   │   ├── login.module.ts
│   │   │   ├── register/
│   │   │   │   ├── register.component.ts
│   │   │   │   ├── register.component.html
│   │   │   │   ├── register.component.css
│   │   │   │   ├── register.module.ts
│   │   ├── home/
│   │   │   ├── home.component.html
│   │   │   ├── home.component.ts
│   │   ├── admin/
│   │   │   ├── admin.component.html
│   │   │   ├── admin.component.ts
│   │   ├── app.routes.ts
│   ├── index.html
├── package.json
├── README.md
```

---

## **License**

[MIT License](LICENSE)

---

Feel free to contribute to this project by creating pull requests or opening issues.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
