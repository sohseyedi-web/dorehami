# Comment Management System - Next.js Project

Overview
A modern comment management system built with Next.js 13+ and TypeScript, featuring a responsive design and real-time updates.

🚀 Features
Authentication with NextAuth.js
Horizontal scrollable table view
RTL support
State management with React Query
Comment moderation (approve/reject)
File upload support (PDF/Images)
Loading states and animations
Responsive design with Tailwind CSS
🛠️ Tech Stack

- Next.js 15+
- TypeScript
- Tailwind CSS
- React Query
- React Hot Toast

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/sohseyedi-web/dorehami
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

## 🗂️ Project Structure

src/
├── app/
│ ├── (admin)/
│ │ └── admin/
│ │ ├── \_components/
│ │ │ ├── Sidebar.tsx
│ │ │ ├── TableSearch.tsx
│ │ │ └── table/
│ │ │ ├── CommentTable.tsx
│ │ │ └── CommentTableRow.tsx
│ ├── (auth)/
│ │ └── join/
│ │ │ ├── page.tsx
│ ├── (main)/page.tsx
│ ├── api/
│ └── layout.tsx
├── styles/
├── hooks/
├── types/
└── providers/
└── utils/
└── middleware.ts

⚙️ Environment Variables
DATABASE_URL=
JWT_SECRET=secret code

# Admin Helper

email : dorehami@gmail.com
password : 123456789

📝 License
MIT

👥 Contributors
Dorehami Development Team
