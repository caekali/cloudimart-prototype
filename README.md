# Cloudimart Prototype

Cloudimart is a **web-based prototype** designed for convenient grocery and student-item shopping within the **Mzuzu University community**. The system features **role-based dashboards**, order tracking, payment integration, and notifications.

---

## Features

### Product Catalog & Shopping Cart

- Products categorized into **Stationery**, **Dairy**, and more.
- Customers can add items to the cart and proceed to checkout.

### Checkout & Delivery

- Checkout restricted to users within **Mzuzu University and nearby locations**.
- Automatic **unique Order ID** generation for each purchase.
- Delivery staff can **complete deliveries** via a modal form with collector phone input.
- Customers receive **SMS and email notifications** for order confirmation and delivery updates.

### Payment Integration

- Integrated with **[PayChangu](https://paychangu.com/)** for secure payments.
- Handles transaction status updates in real-time.

### API Documentation

- Fully documented with **OpenAPI (Swagger)**.
- Includes endpoints for products, orders, deliveries, and user management.

### Role-Based Dashboards

- **Admin**: Manage users, products, orders, and deliveries.
- **Delivery Staff**: Track assigned deliveries and complete them.
- **Customer**: Browse products, place orders, and view order history.

---

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Backend**: Laravel (REST API)
- **Database**: MySQL/PostgreSQL via Eloquent
- **Notifications**: SMS & Email
- **Authentication**: NextAuth with a shared login page

---

## Folder Structure (Next.js App Router)

```
app/
├─ (admin)/         # Admin routes and layout
├─ (delivery)/      # Delivery staff routes and layout
├─ (public)/        # Customer/public routes
├─ (auth)/           # auth pages
```

---

## How to Run

### Backend (Laravel)

```bash
composer install
php artisan migrate
php artisan serve
```

### Frontend (Next.js)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Documentation

Visit [http://localhost:8000/api/documentation](http://localhost:8000/api/documentation) (or your Swagger/OpenAPI URL) to explore endpoints, request parameters, and response schemas.
