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

- Next.js 15
- TypeScript
- Tailwind CSS
- NextAuth.js
- React Query
- React Hot Toast

📦 Installation# Clone the repository
git clone [your-repo-url]

# Install dependencies

npm install

# Create environment file

cp .env.example .env.local

# Run development server

npm run dev

🗂️ Project Structuresrc/
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

⚙️ Environment Variables
DATABASE_URL=
JWT_SECRET=secret code

📝 License
MIT

👥 Contributors
Dorehami Development Team
