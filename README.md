# BeyondChats Assignment

🚀 **Live Preview**: [https://beyondchats-assignment-fawn.vercel.app/](https://beyondchats-assignment-fawn.vercel.app/)

A fully responsive, component-rich admin dashboard and chat management interface built with **Next.js**, **Tailwind CSS**, and integrated with **Gemini AI API**.

---

## 📌 Features

- 💬 AI-powered chat interface using Gemini API  
- 📊 Admin dashboard with analytics, ticket, and inventory management  
- 🧑‍💼 Agent and customer management panels  
- 🧾 Order lookup, ticket history, and profile sections  
- 🎨 Built with reusable UI components for scalability  
- 🌙 Light/Dark mode toggle with theme provider  
- 📱 Fully responsive for desktop and mobile

---

## 🛠 Tech Stack

- **Frontend Framework**: Next.js (App Router)  
- **Styling**: Tailwind CSS  
- **AI Integration**: Gemini AI API  
- **Package Manager**: PNPM  
- **Type Safety**: TypeScript  
- **UI Components**: Custom + Headless UI-style reusable components

---

## 📁 Project Structure
<pre> ```divesdk-beyondchats-assignment/
├── app/                    # App Router pages, layouts, and styling
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
│
├── components/             # Feature components and UI building blocks
│   ├── admin-dashboard.tsx
│   └── ui/                 # Reusable UI primitives (buttons, modals, forms, etc.)
│       ├── button.tsx
│       └── card.tsx
│
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── lib/                    # Utility functions
│   └── utils.ts
│
├── public/                 # Static assets
├── styles/                 # Global CSS
│   └── globals.css
│
├── tailwind.config.ts      # Tailwind CSS config
├── next.config.mjs         # Next.js config
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # PNPM lock file
└── tsconfig.json           # TypeScript config
 ``` </pre>

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Diveshdk/beyondchats-assignment
cd beyondchats-assignment
2. Install Dependencies
bash
Copy
Edit
pnpm install
3. Run the Development Server
bash
Copy
Edit
pnpm dev
Visit http://localhost:3000 in your browser to view the app.

🧪 Gemini AI API Setup
To enable AI responses via Gemini:

Get your API key from Google AI Studio.

Store it securely in a .env file (not committed to version control):

env
Copy
Edit
GEMINI_API_KEY=your_key_here
Use the key in the fetch/request functions that interact with the Gemini API.

🔐 Environment Variables
env
Copy
Edit
GEMINI_API_KEY=your_google_gemini_api_key
📸 Preview
(Upload and link a screenshot here for better presentation)

✍️ Author
Made with 💡 by divesdhk
