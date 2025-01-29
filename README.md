# Sanity Events Management

A full-stack event management platform built with Next.js, Sanity CMS, and Neon Database.

## Features

- 🎪 Event listing and details
- 👥 Speaker profiles
- 📝 Event registration
- 📧 Newsletter subscription
- 🎫 Ticket management
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **CMS**: Sanity.io
- **Database**: Neon (PostgreSQL)
- **ORM**: Drizzle
- **Infrastructure**: SST (AWS)
- **Package Manager**: npm
- **Monorepo**: Turborepo

## Project Structure

```
apps/
  ├── web/          # Next.js frontend application
  └── studio/       # Sanity Studio (Vite-based React app)
```

## Prerequisites

- Node.js 18+
- npm 10+
- Sanity.io account
- Neon Database account
- Vercel account (for frontend deployment)
- AWS account (optional, for SST deployment)

## Environment Variables

### Web App (.env)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
DATABASE_URL=
POOLED_DATABASE_URL=
```

### Sanity Studio (.env)
```
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development servers:
```bash
npm run dev
```

This will start both:
- Next.js frontend: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3333](http://localhost:3333)

## Deployment

### Frontend (Vercel)

The Next.js frontend is configured for deployment on Vercel. Since this is a monorepo, you'll need to:

1. Import your repository to Vercel
2. Set the root directory to `apps/web`
3. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add environment variables from `.env`
5. Deploy

### Sanity Studio

The Sanity Studio is a standalone Vite-based React application that can be deployed in two ways:

#### Option 1: Vercel Hosting (Recommended)

1. Create a new project in Vercel
2. Set the root directory to `apps/studio`
3. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables from `.env`
5. Set the following environment variables in Vercel:
   ```
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```
6. Deploy

Your studio will be available at `https://your-project.vercel.app`

#### Option 2: AWS via SST

The project includes SST configuration for deploying to AWS:

1. Configure AWS credentials:
```bash
aws configure
```

2. Deploy using SST:
```bash
cd apps/studio
npx sst deploy --stage prod
```

### Environment Variable Management with SST

When using SST, you can manage environment variables in three ways:

1. **Automatic Resource Linking**: SST can automatically connect your services
2. **Secret Management**: Use the SST CLI to set sensitive values
3. **Stage Configuration**: Set different values for development/production

See the [SST docs](https://sst.dev/docs/environment-variables/) for details.

## Database Management

```bash
# Generate database schema
npm run db:generate

# Push schema changes
npm run db:push

# Open database UI
npm run db:studio
```

## Development Workflow

1. Make changes to the schema in `apps/studio/schemas/`
2. Update Sanity Studio types: `cd apps/studio && npm run typegen`
3. Update database if needed: `cd apps/web && npm run db:push`
4. Test changes locally using `npm run dev`
5. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
