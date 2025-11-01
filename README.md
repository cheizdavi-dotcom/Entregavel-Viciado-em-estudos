# Procrastination Stopper PWA

This is a Next.js Progressive Web App for the "O Fim da Procrastinação" course, built with Firebase.

## Getting Started

### 1. Prerequisites

- Node.js (v18 or later)
- Firebase Account and a new Firebase project.

### 2. Environment Variables

Create a `.env.local` file in the root of the project and add your Firebase project configuration. You can find these values in your Firebase project settings (`Project Settings` > `General` > `Your apps` > `SDK setup and configuration`).

```
# Firebase Keys
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

For the seeding script, you'll need to create a service account in your Firebase project:
1. Go to `Project Settings` > `Service accounts`.
2. Click `Generate new private key`. This will download a JSON file.
3. Save this file as `service-account.json` in the root of your project. **IMPORTANT: Do not commit this file to version control.** Add it to your `.gitignore`.


### 3. Firebase Setup

Before running the app, you need to configure Firebase Authentication.

1.  **Enable Authentication Methods**:
    *   Go to the Firebase Console.
    *   Navigate to **Authentication** > **Sign-in method**.
    *   Enable the **Email/Password** provider.
    *   Enable the **Anonymous** provider.

2.  **Add Authorized Domains**:
    *   Still in the **Authentication** > **Settings** tab.
    *   Under **Authorized domains**, click **Add domain**.
    *   Add `localhost`. If you are deploying the app, add your production domain as well.

### 4. Install Dependencies

```bash
npm install
```

### 5. Seed the Database

Run the seed script to populate your Firestore database with the initial modules and lessons data.

```bash
npm run seed
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run seed`: Populates the Firestore database with initial data.
- `npm run deploy`: Deploys the app to Firebase Hosting (requires Firebase CLI to be installed and configured).

## Firebase Services

This project uses the following Firebase services:

- **Authentication**: Email/Password and Anonymous sign-in.
- **Firestore**: To store course content (`modules`, `lessons`) and user progress (`userProgress`).
- **Hosting**: To deploy the PWA.

### Firestore Security Rules

For the app to function correctly, you need to set up Firestore security rules. Go to your Firebase Console -> Firestore Database -> Rules and paste the following:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Modules and lessons are public
    match /modules/{moduleId} {
      allow read: if true;
      allow write: if false;
    }

    match /lessons/{lessonId} {
      allow read: if true;
      allow write: if false;
    }

    // User progress can only be read/written by the authenticated user themselves
    match /userProgress/{progressId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```
