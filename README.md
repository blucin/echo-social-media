# Echo: A Social Media Application

Echo is a social media application developed as part of a mini project for the 6th semester. The project is built using Next.js, Tailwind CSS, and Shadcn UI.

> **⚠️ WIP Project: You might want to check the `dev` branch for the latest changes.**
 **Link to development branch: 👉 [click me](https://github.com/blucin/echo-social-media/tree/dev) 👈**

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

2. Populate `.env` in the project root (not in the `src` folder) with the values from `.env.example`. ⚠️ Docker compose won't work without this step.

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

