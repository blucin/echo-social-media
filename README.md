# Echo: A Social Media Application

Echo is a social media application developed as part of a mini project for the 6th semester. The project is built using Next.js, Tailwind CSS, and Shadcn UI.

> **✅ WIP Project: You are viewing the latest changes of the `dev` branch**

Other irrelevant details which are concerned with the project are mentioned below.

```
Subject:- Mini Project (102040601)
Title:- Echo: Social Media Application
Group No:- 20 
Enrollment No:- 12102110501003
Name:- Patel Akshar
```
## Before you start

1. Clone the repository
```bash
git clone git@github.com:blucin/echo-social-media.git
```

2. Populate `.env` in the project root (not in the `src` folder) with the values from `.env.example`.

```.env
# Replace KEY=<VALUE> with your own values, without any quotes
# ⚠️ Wrapping the value in quotes will cause errors

NEXTAUTH_URL=<YOUR_NEXTAUTH_URL> # or http://localhost:3000
NEXTAUTH_SECRET=<YOUR_NEXTAUTH_SECRET> # a random string > $ openssl rand -base64 32

AUTH_SECRET=<YOUR_AUTH_SECRET> # a random string like above > $ openssl rand -hex 32
AUTH_GOOGLE_ID=<YOUR_GOOGLE_CLIENT_ID> # Google Oauth Provider: https://next-auth.js.org/providers/google/
AUTH_GOOGLE_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>

# postgresql database (here: supabase)
# ⚠️ Don't include special characters in the password like @
# read more about warning2: https://github.com/orgs/supabase/discussions/4161
DATABASE_URL=postgresql://postgres:<YOUR_SUPABASE_KEY>@<YOUR_SUPABASE_URL>:5432/<YOUR_SUPABASE_DB>
```
> ⚠️ Docker compose won't work without this step.

3. Install NPM packages
```bash
npm install
```

## Running Locally

1. Run the development server
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running with Docker

1. Build and run the docker image using docker-compose
```bash
docker-compose build
docker-compose up
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. Stopping the docker container
```bash
docker-compose down
```

> Note: Project was tested with [podman](https://podman.io/) but it should work with docker as well.
> ```bash
> podman-compose build
> podman-compose up
> podman-compose down
> ```

