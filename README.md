# 🧩 Playwright Web & API Automation Assessment

This project demonstrates **End-to-End Web Automation** and **API Automation** using **Playwright** with the **Page Object Model (POM)** design pattern. It automates user registration, product purchase flow, and API testing for a new user.

## 📁 Project Structure

(├── api/
│ └── CreateAccountAPI.js # Handles API call for new user registration
│
├── fixtures/
│ ├── HelperFunction.ts # Contains reusable helper functions
│ └── user_credentials.json # Stores new user registration details
│
├── node_modules/ # Project dependencies
│
├── pages/ # Page Object Model (POM) implementation
│ ├── HomePage.ts
│ ├── LoginPage.ts
│ ├── ProductsPage.ts
│ ├── CheckoutAndPlaceOrderPage.ts
│ └── PaymentAndConfirmationPage.ts
│
├── playwright-report/ # Auto-generated HTML test report
├── test-results/ # Contains traces, screenshots, and videos for failed tests
│
├── tests/
│ ├── Task1_E2E_PurchaseFlow.spec.ts # End-to-End purchase flow with new user registration
│ └── Task2_apiAutomation.spec.ts # API automation for user registration
│
├── package.json # Project dependencies and scripts
├── playwright.config.ts # Playwright test configuration
└── README.md # Project documentation)


---

## 🚀 Features

- ✅ **Playwright Test Runner**
- ✅ **POM (Page Object Model)** architecture
- ✅ **API testing** via Playwright request context
- ✅ **Reusable utilities** for modular automation
- ✅ **Automatic HTML report generation**
- ✅ **Artifacts (screenshots, traces, invoice files)** saved for each test
- ✅ **GitHub Actions CI/CD integration**

---

## 💻 Local Setup & Execution Guide

Follow these steps to install and run this project locally.

### 1️⃣ Prerequisites
Before running the project, make sure you have:
- **Node.js** (version ≥ 18)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### 2️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd <project-folder>

### 3️⃣ Install Dependencies
npm install

### 4 Playwright requires its own browsers to run tests. Install them with:
npx playwright install --with-deps

### 5️⃣ Run Tests
### ▶ Run All Tests
npx playwright test

### ▶ Run Specific Test File
npx playwright test tests/Task1_E2E_PurchaseFlow.spec.ts

### ▶ Run in Headed Mode (Visible Browser)
npx playwright test --headed

### ▶ Run in Debug Mode
npx playwright test --debug

### 6️⃣ View Test Report

### After test execution:
npx playwright show-report



