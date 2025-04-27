# Kwizify Frontend

A Next.js application for generating quizzes from documents using AI.

## Features

- **Document Upload**: Upload PDF, TXT, and DOC files for analysis
- **AI-Powered Quiz Generation**: Automatically extract keywords and generate quizzes
- **User Authentication**: Sign up, log in, and manage your profile
- **Quiz Management**: Create, edit, and share quizzes
- **Interactive Quiz Player**: Take quizzes with score tracking

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Backend API running (see kwizify-api repository)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/kwizify.git
cd kwizify
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
   Create a `.env.local` file in the root directory and add:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app` - Next.js app router pages
- `src/components` - Reusable React components
- `src/hooks` - Custom React hooks
- `src/services` - API service functions
- `src/types` - TypeScript type definitions
- `src/utils` - Utility functions
- `src/providers` - Context providers

## Backend API

This frontend connects to a FastAPI backend. Make sure the kwizify-api backend is running before using this application.

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- JWT Authentication