# ToolsHub Pakistan

Free online calculators, unit converters, and file tools — built with React + Vite.
Every tool runs **entirely in the browser** (client-side), so no backend server or
hosting cost is needed to run it. Nothing users upload is ever sent anywhere.

## What's included (30 tools)

**Calculators:** GPA, CGPA, Percentage-to-GPA, Age, BMI, Loan/EMI, Salary Tax (Pakistan), Percentage
**Converters:** Length, Weight, Currency, Temperature, Marla/Kanal
**Text & Code:** Word Counter, Case Converter, JSON Formatter, Base64 Encoder/Decoder, Password Generator, QR Code Generator
**File Tools:** Image to PDF, PDF Merge/Split, ZIP Create, ZIP Extract, Word to PDF, PDF to Word, Excel to PDF, PDF to Excel
**Image Tools:** Image Compressor, Image Format Converter, Passport Photo Maker, Image Resizer

Plus: Home, About, Contact, Privacy Policy, and a Guides (blog) section with 3
starter articles — all needed for AdSense approval.

## Getting Started (in VS Code)

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

This creates a `dist/` folder — upload the contents of this folder to any static
hosting (Hostinger, Netlify, Vercel, GitHub Pages, etc.) when you're ready to buy
domain + hosting.

## Setting up the backend (Firebase — free)

The site now includes real user accounts, login/signup, and an admin dashboard
that shows registered users and which tools they used. This runs on
**Firebase** (Google's free-tier backend service) — no separate server or
paid hosting needed to run it.

1. Go to https://console.firebase.google.com and create a free project.
2. In your project, go to **Build → Authentication → Get started**, then
   enable the **Email/Password** sign-in method.
3. Go to **Build → Firestore Database → Create database**, start in
   **production mode**, pick a region close to Pakistan (e.g. `asia-south1`).
4. Go to **Project settings → General → Your apps → Add app → Web (</>)**,
   register the app, and copy the `firebaseConfig` object it gives you.
5. Paste those values into `src/firebase.js` in this project, replacing the
   placeholder `YOUR_API_KEY` etc.
6. Set Firestore security rules (Firestore Database → Rules) so users can only
   write their own data and reads are limited appropriately. A starting point:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /toolUsage/{docId} {
         allow create: if true;
         allow read: if request.auth != null;
       }
       match /admins/{userId} {
         allow read: if request.auth != null;
         allow write: if false; // add admins manually from the Firebase console
       }
     }
   }
   ```

### Making yourself an admin

After you sign up once through the site's `/signup` page:
1. Go to Firestore Database in the Firebase console.
2. Create a collection called `admins`.
3. Add a document whose **Document ID** is your account's **User UID**
   (find it in Authentication → Users) — the document's contents can be empty
   or `{ role: "admin" }`.
4. Log out and log back in on the site — you'll now see an **Admin** link in
   the navbar, linking to `/admin`, showing registered users and tool usage.

Every tool page automatically logs a usage event (tool name, timestamp, and
the user's email if logged in, or "anonymous" if not) to Firestore's
`toolUsage` collection, which the admin dashboard reads from.

## Known limitations — read before launch

- **Word↔PDF and Excel↔PDF conversions** extract and rebuild plain text/rows only.
  Complex formatting, tables, images, and multi-column layouts are **not**
  preserved perfectly — this is a genuine technical limitation of doing these
  conversions entirely in the browser, not a bug. Set expectations with users
  accordingly (a short note is already shown under each of these tools).
- **Currency Converter** uses example rates you must edit yourself, or wire to a
  live exchange-rate API (e.g. exchangerate-api.com) before launch.
- **Salary Tax Calculator** uses illustrative tax slabs — confirm current FBR
  slabs before relying on it for real filings.
- **Contact form** currently just confirms locally. Connect it to a real email
  service (Formspree, EmailJS, or your own backend) before launch.
- The production JS bundle is large (~1MB gzipped) because of the PDF/DOCX/XLSX
  libraries. For better performance later, consider code-splitting each tool
  with `React.lazy()` so libraries only load when their specific tool is opened.

## Before applying for AdSense

1. Buy a domain and hosting, deploy the `dist/` build.
2. Update all `toolshub.pk` references in `src/components/SEO.jsx`,
   `public/robots.txt`, and `public/sitemap.xml` to your real domain.
3. Let the site sit live for a few weeks with organic content/traffic before
   applying — brand-new sites are commonly rejected.
4. Make sure About, Contact and Privacy Policy pages are reachable (they already
   are, via the footer).

## Project structure

```
src/
  components/   Navbar, Footer, ToolLayout, ToolCard, SEO
  pages/        Home, Category, About, Contact, Privacy, Blog
  pages/tools/  One file per tool
  pages/blog/   Guide articles
  utils/        toolsData.js — central registry of every tool (edit here to add more)
```

To add a new tool: create a component in `src/pages/tools/`, add an entry to
`src/utils/toolsData.js`, and add a `<Route>` in `src/App.jsx`.
