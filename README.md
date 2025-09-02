CampusConnect - Backend Quickstart
---------------------------------

1. Copy the backend/ folder contents into your repo's backend/ directory.

2. Create a .env file based on .env.example:
   cp .env.example .env
   Fill in MONGO_URI and JWT_SECRET

3. Install:
   cd backend
   npm install

4. Start:
   npm run dev

5. Available endpoints:
   POST /api/auth/register
   POST /api/auth/login
   GET  /api/posts
   POST /api/posts
   POST /api/posts/:postId/like
   POST /api/posts/:postId/comment
   GET  /api/events
   POST /api/events (admin only)
   POST /api/events/:id/register
   POST /api/chatbot/ask

6. Notes:
   - Use Authorization: Bearer <token> for protected routes.
   - To create an admin, set role: 'admin' during registration or update the DB directly.
