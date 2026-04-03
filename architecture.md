# 🧾 GugolKo

> Track your gugol, plan your buwan, stay in control.

A flexible monthly budget tracking app built with an offline-first architecture, designed to support any type of income pattern — from monthly salaries to freelance earnings.

---

## 🧠 Overview

GugolKo helps users:

- Track income and expenses
- Manage monthly budgets
- Plan future finances
- Work fully offline
- Sync data across devices when online

---

## 💡 Core Philosophy

- Offline-first
- Simple over complex
- Local-first, cloud as sync layer
- Flexible income tracking (no strict schedules)
- Tracking first, automation later

---

## 🧩 Features (V1)

### 📅 Monthly Budget Profile

- Create a budget per month (e.g., April 2026)
- Includes:
  - Income entries
  - Expense transactions
  - Optional planned allocations

---

### 💰 Income Tracking (Flexible)

- Supports any income pattern:
  - Monthly salary
  - Semi-monthly (e.g., 15/30)
  - Weekly income
  - Freelance / irregular earnings

- Users can:
  - Manually add income entries
  - Optionally define an income frequency (for guidance only)

> The app does not enforce schedules — it remains flexible.

---

### 💸 Expense Tracking

- Add expenses anytime (offline-ready)

Fields:

- amount
- category (optional)
- note (optional)
- date
- source (optional: cash / bank / e-wallet)

---

### 🏷️ Categories

- User-defined
- Types:
  - income
  - expense

---

### 📊 Monthly Summary

- Total income
- Total expenses
- Remaining balance
- Category breakdown (charts)

---

### 🗓️ Future Budget Planning

- Create future months
- Options:
  - Blank
  - Duplicate previous month

> Used for planning only

---

### 📱 Offline-First Capability

- Fully usable without internet
- IndexedDB as primary storage
- Fast and responsive UI

---

### 🔄 Sync

- Manual or auto (on reconnect/login)
- Push local changes and pull updates
- Conflict resolution: last-write-wins

---

### 🔐 Authentication

- Register / Login
- Required only for sync
- App usable without account

---

### 🖥️ PWA Support

- Installable on mobile (Add to Home Screen)
- Works offline
- Accessible on desktop after sync

---

## ❌ Out of Scope (V1)

- Fund/wallet system
- Real-time sync
- Recurring automation
- Notifications
- AI insights
- Shared accounts
- Budget enforcement rules

---

# 🧱 Architecture

```
User
 ↓
PWA App (Next.js)
 ↓
IndexedDB (Dexie)
 ↕
Sync Service
 ↓
Backend API (NestJS + Fastify)
 ↓
PostgreSQL (Drizzle ORM)
```

---

# 📁 Project Structure

## Monorepo Layout

```
gugolko/
├── apps/
│   ├── web/                # Next.js PWA
│   └── api/                # NestJS backend
│
├── packages/
│   ├── db/                 # Drizzle schema & config
│   ├── shared/             # Types, constants
│
├── docs/                   # Architecture, diagrams
├── .env
├── package.json
```

---

## Frontend (apps/web)

```
src/
├── app/                    # Next.js app router
├── components/             # UI components
├── features/
│   ├── transactions/
│   ├── budget/
│   ├── sync/
│
├── lib/
│   ├── db/                 # Dexie setup
│   ├── api/                # API client
│
├── store/                  # Zustand store
```

---

## Backend (apps/api)

```
src/
├── modules/
│   ├── auth/
│   ├── transactions/
│   ├── categories/
│   ├── budget/
│   ├── sync/
│
├── database/
│   ├── schema/             # Drizzle schema
│   ├── client.ts
```

---

# ⚙️ Tech Stack

## Frontend

- Next.js (PWA)
- Zustand
- React Query
- Dexie (IndexedDB)

## Backend

- NestJS + Fastify
- Drizzle ORM
- PostgreSQL

---

# 🚀 Getting Started

## 1. Clone Repo

```bash
git clone https://github.com/your-username/gugolko.git
cd gugolko
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment

Create `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/gugolko
JWT_SECRET=your_secret
```

---

## 4. Run Database

Make sure PostgreSQL is running.

---

## 5. Run Backend

```bash
cd apps/api
npm run start:dev
```

---

## 6. Run Frontend

```bash
cd apps/web
npm run dev
```

---

# 🔄 API Overview

### Auth

```
POST /auth/register
POST /auth/login
```

---

### Transactions

```
GET    /transactions
POST   /transactions
PATCH  /transactions/:id
DELETE /transactions/:id
```

---

### Sync (Core)

```
POST /sync
```

#### Request:

```json
{
  "lastSyncedAt": 123456789,
  "changes": []
}
```

#### Response:

```json
{
  "serverChanges": [],
  "serverTime": 123456999
}
```

---

# 🔁 Sync Strategy

- Local-first writes (IndexedDB)
- Sync when online
- Conflict resolution:
  - Last-write-wins (`updated_at`)

- Soft deletes (`deleted_at`)

---

# 🧠 Design Decisions

### Local-First

- Works offline
- Faster UX
- Better mobile experience

---

### Flexible Income Model

- Supports any earning pattern
- No enforced schedules
- User-driven input

---

### Simple Sync

- Avoids complex edge cases
- Easier debugging
- More reliable

---

### No Fund System (Yet)

- Reduces complexity
- Focus on core tracking

---

# 🏁 Definition of Done (V1)

- Track income (any frequency)
- Add expenses offline
- View monthly summary
- Plan future month
- Sync across devices

---

# 🚀 Future Enhancements (V2)

- Recurring transactions
- Fund allocation system
- AI insights
- Notifications
- Budget limits
- Multi-device conflict improvements

---

# 📌 Final Note

GugolKo is designed to be:

- Simple
- Reliable
- Offline-first
- Flexible for any type of income

> A daily-use finance tracker that just works.
