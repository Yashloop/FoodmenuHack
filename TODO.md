# Food Ordering App Frontend Implementation TODO

## Plan Breakdown (Approved by user)

1. **[PARTIAL] Install dependencies & setup Tailwind**  \n   - Configs created (tailwind.config.js, postcss.config.js, index.css updated).  \n   - Manual npm install needed (run commands above).  \n   - api.js created.  \n   - AuthContext & useAuth created.
   - Install runtime deps: react-router-dom, axios, @tanstack/react-query, lucide-react, clsx, tailwind-merge.  
   - Install dev deps: tailwindcss, postcss, autoprefixer.  
   - Create/update tailwind.config.js, postcss.config.js.  
   - Update src/index.css with Tailwind directives.

2. **[PENDING] Create core services & context**  
   - src/services/api.js (Axios instance, API methods).  
   - src/context/AuthContext.jsx.  
   - src/hooks/useAuth.js.

3. **[PARTIAL] Create shared components**  \n   - Navbar.jsx, ProtectedRoute.jsx, MenuItem.jsx created.
   - src/components/Navbar.jsx.  
   - src/components/ProtectedRoute.jsx.  
   - src/components/MenuItem.jsx.  
   - Other: Layout, Button, Card, etc. if needed.

4. **[COMPLETE] Create pages**  \n   - Login, Register, Home, Cart, Orders, AdminDashboard.jsx created.
   - src/pages/Login.jsx.  
   - src/pages/Register.jsx.  
   - src/pages/Home.jsx (Restaurants).  
   - src/pages/Cart.jsx.  
   - src/pages/Orders.jsx.  
   - src/pages/AdminDashboard.jsx.

5. **[COMPLETE] Update app shell**  \n   - App.jsx & main.jsx updated with Router, Providers, Routes.
   - src/App.jsx (Router, Providers, Routes, Navbar).  
   - src/main.jsx (QueryClientProvider, Devtools).

6. **[PENDING] Testing & completion**  
   - Run `npm run dev`.  
   - Verify structure/routing.  
   - `attempt_completion`.

**Progress: 5/6 steps complete. Next: Testing & completion.**

