# Mark Mizen's submission for Moneybox - Web Technical Task

This repository contains two main components:
1. **PocketBase CMS**: A lightweight backend service for managing product data using [PocketBase](https://pocketbase.io/).
2. **Next.js Frontend**: A modern React-based frontend for displaying and interacting with the product data.

## Project Structure
- `cms/`: Contains the PocketBase setup, including Dockerfile, data storage, and migration scripts.
- `web/`: Contains the Next.js application, including components, pages, and styles.
- `docker-compose.yml`: Configuration file to run both the PocketBase CMS and Next.js frontend using Docker Compose.

## Getting Started

_Note: Putting the API token and passwords in this file is to make it easier to view and assess the project. In a real-world scenario, you would want to manage these secrets more securely._

### Prerequisites

You can run this project using Docker and Docker Compose (see instructions below), or you can run the frontend locally with Node.js installed.

If you want to run the frontend locally, ensure you have:
- Node.js (version 20 or higher)
- pnpm
- git

### Running the full app with Docker Compose

1. Clone the repository
2. Navigate to the project directory
3. Create a `.env` file in the root directory with the following content:
   ```
   CMS_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJwYmNfMzE0MjYzNTgyMyIsImV4cCI6MTc5MDY5NjkxNSwiaWQiOiJ6Zm8wNnI1OTg4aW9qbnciLCJyZWZyZXNoYWJsZSI6ZmFsc2UsInR5cGUiOiJhdXRoIn0.nxjer_a8Hp3iQONtJhexVKqHIHsShvlqGqhVEsFkoVE
   ```

4. Start the services using Docker Compose:
   ```bash
   docker-compose up -d
   ```
5. Access the PocketBase admin interface at `http://localhost:8090` and log in using the default credentials:
    - Email: `admin@example.com`
    - Password: `password123`
6. Access the Next.js frontend at `http://localhost:3000`.

### Running without Docker

#### Running the Next.js Frontend Locally

1. Navigate to the `web` directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
    pnpm install
    ```
3. Create a `.env` file in the `web` directory with the following content:
   ```
   CMS_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJwYmNfMzE0MjYzNTgyMyIsImV4cCI6MTc5MDY5NjkxNSwiaWQiOiJ6Zm8wNnI1OTg4aW9qbnciLCJyZWZyZXNoYWJsZSI6ZmFsc2UsInR5cGUiOiJhdXRoIn0.nxjer_a8Hp3iQONtJhexVKqHIHsShvlqGqhVEsFkoVE
CMS_API_BASE=http://127.0.0.1:8090
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Open your browser and go to `http://localhost:3000`

#### Running PocketBase Locally

1. Download the PocketBase binary for your OS from the [official website](https://pocketbase.io/docs/).
2. Copy this binary into the `cms` directory.
3. Navigate to the `cms` directory:
   ```bash
   cd cms
   ```
4. Start PocketBase:
   ```bash
    ./pocketbase serve
    ```
5. Access the PocketBase admin interface at `http://localhost:8090` and log in using the default credentials:
    - Email: `admin@example.com`
    - Password: `password123`


## Editing Product Data

1. Access the PocketBase admin interface at `http://localhost:8090`.
2. Log in using the default credentials:
    - Email: `admin@example.com`
    - Password: `password123`
3. Navigate to the collections section and select the "products" collection, or the "product categories" collection.
4. You can add, edit, or delete products and categories as needed.
5. Additional users can be created in the "users" collection. The business users who will be using the CMS should be added here with lower permissions.

The relationship is currently configured as a 1-to-many relationship from categories to products, and needs to be configured from the categories side. This is not an ideal setup, as in an ideal world I would use a backend which allows for a taxonomy on the products, and an API which groups the products by category in a single request. Exactly how this is done would depend on the tool used, the requirements of the project as a whole, and the capabilities of the CMS team.

## Testing

For a real application, you would want a nice balance of unit tests, integration tests, and end-to-end tests. Given the time constraints of this task, I have only included some basic unit tests for the frontend.

I've prioritized unit testing three areas:
1. The carousel logic
2. The ProductsCarousel component
3. The product data fetching logic

To run the unit tests for the Next.js frontend, navigate to the `web` directory and run:

```bash
pnpm test
```

## Technologies Used

- **PocketBase**
- **Next.js**
- **Tailwind CSS**
- **TypeScript**
- **Vitest**
- **Docker**
- **pnpm**


### PocketBase
I chose PocketBase for its simplicity and ease of use. It provides a quick way to set up a backend with a built-in admin interface. It is quick to get up and running, and it supports SQLite out of the box. SQLite allows me to package the database and migrations alongside the application, making it easy for anyone to get the project running.

It also has a decent API which allows for easy integration with the Next.js frontend. The API is RESTful and supports filtering, sorting, and pagination out of the box. It would be easy to use this API from the Apps, however it may require a reverse proxy to add authentication headers properly without packaging them into the end users app. I honestly am not 100% sure how well this would work in a production scenario, but for this task, it seemed like a great fit.

Some of the other options I considered were:
- Strapi - Allows for dockerized setups, but felt a bit heavy for this task.
- Directus - Allows for dockerized setups, but felt a bit heavy for this task.
- Supabase - Good for real-time applications, but more complex to set up and run locally. 
- Firebase - Great for rapid development, but vendor lock-in is a concern, and not possible to run it locally.
- StoryBlok - Excellent for content management, but overkill for this project.
- Contentful - Powerful, but also more complex than needed. Also cloud based rather than self-hosted.

Having now used it, I'm not so sure about how well it would scale for larger applications, but for this task, it seemed like a great fit.

In a real-world scenario, I would consider the following:
- Data relationships and complexity
- Which business users will be using the CMS
- Hosting and scaling requirements
- Licensing and cost implications
- Community and support availability
- Long-term maintenance and updates

### NextJS
I chose to use NextJS for this project because it is an industry standard approach for building React applications. I am fairly confident with NextJS, and it has a decent developer experience.

If this wasn't a technical test, I would consider using Tanstack Start (which only just reached 1.0), or Astro, as I am not a big fan of the overall direction that NextJS has been taking recently in regards to React Server Components, the App Router, and limiting _some_ functionality to Vercel (see: the commented out incremental static regeneration).

### Tailwind CSS

I picked Tailwind CSS because it allows rapid development of responsive UIs. For a small project like this, it provides a great balance between flexibility and speed. 

For larger projects, I might consider a more structured CSS framework or component library. Vanilla-Extract would be my preferred choice for the developer experience of CSS-in-JS, but without the runtime overhead you normally get with this.

### TypeScript
I use Typescript for all projects now. It provides a great developer experience, and helps catch errors early in the development process. It also makes it easier to understand and make changes to the codebase, especially when working in a team.

### Vitest
I chose Vitest for unit tests for its speed and first class support for JS modules. It has a similar API to Jest, which makes it easy to use and understand for developers familiar with Jest.

### Docker
I chose to make sure that this was portable and easy to run to make it easier to evaluate. This means that I can provide a consistent environment for both the PocketBase CMS and the Next.js frontend, regardless of your local setup.

### pnpm
I chose pnpm for its performance benefits and efficient disk space usage. It is faster than npm and yarn, especially for projects where you're using Docker. Anyone with Node.js installed can easily use it as well since corepack is included with Node.js.

## Next Steps

### Improvements

These are some of the improvements I would make if I had more time:
- **E2E Tests**: Implement end-to-end tests using a framework like Playwright or Cypress to cover the full user journey.
- **Storybook**: Set up Storybook for component documentation and isolated testing.
- **Error Handling**: Improve error handling and user feedback in the frontend.
- **Accessibility**: Ensure that the frontend is fully accessible and meets WCAG standards.
- **Data modelling**: Improve the data modeling to better represent the relationships between products and categories.
- **UX improvements**: Enhance the UI/UX with better design and user interactions. Esspecially around swipe gestures on mobile devices.

### Deployment

These are the steps I would take to deploy this application to production:
- Set up CI/CD pipelines for automated testing and deployment. This should include static analysis, linting, and running tests on each pull request.
- Build and archive the build artifacts for both the CMS and frontend.
- Deploy the CMS to a suitable hosting provider, ensuring that the database is backed up regularly.
- Deploy the Next.js frontend to a node server. Vercel would be a good choice if using Next.js to enable all the features, but other providers like AWS, DigitalOcean, or Heroku would also work.
- Set up monitoring and logging for both the CMS and frontend to track performance and errors in production. OpenTelemetry would be a good choice for the backend, and Sentry for the frontend.

## Use of AI

In this project, I have utilized AI tools to assist with code generation. This is mostly for boilerplate code, such as setting up the Dockerfiles, docker-compose.yml, and some of the initial Next.js setup. I have also used AI to help with writing some of the documentation and tailwind CSS classes.

I have not just blindly accepted AI-generated code. Instead, I have reviewed and modified the code to ensure it meets the requirements and follows best practices.

My general approach has been to use AI to help with small parts of the codebase, rather than relying on it to generate large chunks of code. This has allowed me to maintain control over the overall structure and design of the application, while still benefiting from the efficiency and speed that AI can provide.

Most of the time, it's more of an enhanced code-completion tool, rather than a full code generation tool.


## Final note

I forgot to commit my changes incrementally, so the commit history is basically non-existent. Apologies for that. I would ideally have commited each logical change separately, and making sure to use meaningful commit messages.
