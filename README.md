# Chuck Norris Jokes App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Apolofx/greencode-chuck
   cd greencode-chuck
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server

Start the development server with:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Implementation Notes

### **State Management and OOP Approach**
This project uses an **Object-Oriented Programming (OOP)** approach for state management. The state manager is designed to follow **clean architecture principles**, separating the **storage/repository layer** from the **domain layer**. This ensures that the state management logic is modular, testable, and easy to maintain.

- **Storage/Repository Layer**: Handles the persistence of data (e.g., storing jokes or fetching them from an API). In this project, **local storage** is used as the persistence layer to store jokes locally in the browser.
- **Domain Layer**: Contains the core business logic, ensuring that the application logic is decoupled from the storage mechanism.

### **Challenges with State Management**
The state manager is not natively linked to React's lifecycle, which introduces complexities in ensuring React components re-render when the state changes. To solve this, dummy "events" are emitted by swapping some components local state values. This approach ensures that React detects changes and updates the UI accordingly but is not the recommended way of doing this. This should be done with a state management library like Redux, Zustand or Mobx.

### **Lucide for Icons**
The project uses [Lucide](https://lucide.dev/) for simple yet consistent icons. Lucide provides a lightweight and customizable icon library that integrates seamlessly with the design of the application.

---

## Dependencies

- **Next.js**: Framework for building React applications.
- **Lucide**: Icon library for consistent and lightweight icons.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Local Storage**: Used as the persistence layer for storing jokes.

---

Feel free to reach out if you have any questions or need further clarification!