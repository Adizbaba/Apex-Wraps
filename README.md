# Apex Wraper

Premium automotive customization studio specializing in precision vehicle wrapping, paint protection, and high-impact commercial branding.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: Radix UI / Shadcn
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **AI**: Genkit
- **Email**: Resend

## Environment Variables

The project uses a `.env` file for sensitive configuration. Ensure it contains your API keys (this file is ignored by Git for security):

```env
RESEND_API_KEY=re_Ny7Jkyv2_B7Pty4xgs3YccauRtBaTo1tw
```

## How to Push to GitHub

To push this project to your GitHub repository **Apex-Wraps**, follow these steps in your terminal:

1. **Initialize Git**:
   ```bash
   git init
   ```

2. **Add all files**:
   ```bash
   git add .
   ```

3. **Commit your changes**:
   ```bash
   git commit -m "Initial commit of Apex Wraper project"
   ```

4. **Add the remote repository**:
   Replace `YOUR_GITHUB_USERNAME` with your actual username:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Apex-Wraps.git
   ```

5. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```
