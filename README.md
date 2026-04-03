# Felino - Pizzeria Management System 🍕

Felino is a modern, full-stack web application designed for pizzeria management. It features a complete customer ordering flow, real-time payment processing simulation, and a powerful administrative dashboard for order and table management.

## 🚀 Features

### **For Customers**
- **Dynamic Menu**: Browsable menu categories and products fetched from the live backend API.
- **Cart & Checkout**: Seamless shopping experience with a real-time order creation flow.
- **Table Booking**: Easy reservations for in-house dining.
- **Payment Integration**: Simulated payment processing using the backend Payments API.

### **For Administrators**
- **Real-time Order Dashboard**: A Kanban-style board to track and update order status (New, Preparing, Ready, Completed).
- **Product Management**: Ability to manage the pizzeria's menu items and categories.
- **Order Analytics**: View detailed customer information, order totals, and payment status.
- **Drag-and-Drop Workflow**: Intuitive interface for moving orders through different processing stages.

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, FontAwesome 7.
- **Backend**: ASP.NET Core (.NET 10.0), Entity Framework Core.
- **Database**: SQL Server (LocalDB).
- **Styling**: Vanilla CSS with modern flexbox and grid layouts.

## 🏁 Getting Started

### **1. Prerequisites**
- [.NET 10.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js (v18+)](https://nodejs.org/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) or VS Code.

### **2. Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd Felino/Backend/Felino.Api
   ```
2. Restore and Build the project:
   ```bash
   dotnet restore
   dotnet build
   ```
3. Update the database (Entity Framework):
   - In Visual Studio **Package Manager Console**:
     ```powershell
     Update-Database
     ```
4. Run the project:
   - Press **F5** in Visual Studio or run:
     ```bash
     dotnet run
     ```
   The backend will be available at `http://localhost:8000`.

### **3. Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd Felino/Frontend/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

## 📂 Project Structure

- **/backend**: C# Web API project, controllers, services, and DTOs.
- **/frontend**: React application with context-based state management.
- **/data**: Initial migration seed data (pizzas, burgers, kebabs).

## 📄 License
This project is licensed under the MIT License.
