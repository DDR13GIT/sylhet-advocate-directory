# Sylhet Advocates Directory

A modern web-based platform designed to help users discover and connect with legal advocates practicing in Sylhet, Bangladesh. Built with Next.js 16, TypeScript, Prisma, and shadcn/ui.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)

## Features

### Core Functionality
- **Advanced Search & Filtering**: Search advocates by name, specialization, Bar Council ID, or location
- **Multi-criteria Filtering**: Filter by practice area, experience, court level, location, language, gender, and consultation fees
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Grid & List Views**: Toggle between different result display modes
- **Detailed Profiles**: Comprehensive advocate profiles with education, court admissions, and contact information
- **Real-time Search**: Fast search results with debouncing and optimized queries

### Technical Features
- **Server-Side Rendering**: Optimized for SEO and performance
- **Type-Safe Database**: Prisma ORM with full TypeScript support
- **Modern UI Components**: shadcn/ui component library
- **Optimized Images**: Next.js Image component for fast loading
- **API Routes**: RESTful API endpoints for data fetching

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Database**: PostgreSQL (Neon recommended)
- **ORM**: Prisma
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Documentation

- **[README.md](README.md)** - This file (overview and quick start)
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions with Neon Postgres
- **[FEATURES.md](FEATURES.md)** - Complete feature documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## Quick Start

For automated setup, run:
```bash
chmod +x setup.sh
./setup.sh
```

Or follow the manual setup below.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon Postgres recommended)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sylhet-advocate-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

   # For Neon Postgres, use the connection string provided by Neon
   # Example: postgresql://username:password@ep-xyz.region.aws.neon.tech/dbname?sslmode=require

   # Optional: For production
   NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
   ```

4. **Set up the database**

   Generate Prisma client:
   ```bash
   npm run db:generate
   ```

   Push the schema to your database:
   ```bash
   npm run db:push
   ```

   Seed the database with sample data:
   ```bash
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following main tables:

- **advocates**: Core advocate information
- **practice_areas**: Legal specializations
- **court_levels**: Court hierarchy
- **languages**: Spoken/written languages
- **locations**: Upazilas in Sylhet district
- **education**: Academic qualifications
- **advocate_practice_areas**: Many-to-many relationship
- **advocate_court_admissions**: Court enrollment details
- **advocate_languages**: Language proficiency
- **advocate_locations**: Service areas

## API Endpoints

### Search Advocates
```
GET /api/advocates/search
```
Query parameters:
- `q`: Search query
- `practiceAreas`: Practice area names (comma-separated)
- `experienceMin`, `experienceMax`: Experience range
- `courtLevels`: Court level names (comma-separated)
- `locations`: Location names (comma-separated)
- `languages`: Language names (comma-separated)
- `gender`: Gender filter
- `feeMin`, `feeMax`: Consultation fee range
- `availableOnly`: Boolean for availability
- `sortBy`: Sort order (relevance, experience, name, fee)
- `page`, `limit`: Pagination

### Get Filter Options
```
GET /api/filter-options
```
Returns all available filter options.

### Get Single Advocate
```
GET /api/advocates/[id]
```
Returns detailed information for a specific advocate.

## Project Structure

```
sylhet-advocate-directory/
├── app/
│   ├── advocates/
│   │   └── [id]/
│   │       └── page.tsx          # Advocate profile page
│   ├── api/
│   │   ├── advocates/
│   │   │   ├── search/
│   │   │   │   └── route.ts      # Search API
│   │   │   └── [id]/
│   │   │       └── route.ts      # Single advocate API
│   │   └── filter-options/
│   │       └── route.ts          # Filter options API
│   ├── search/
│   │   └── page.tsx              # Search results page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── not-found.tsx             # 404 page
├── components/
│   ├── advocates/
│   │   ├── advocate-card.tsx     # Grid view card
│   │   └── advocate-list-item.tsx # List view item
│   ├── search/
│   │   └── filter-sidebar.tsx    # Filter component
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed data
└── public/                       # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
```

## Customization

### Adding New Practice Areas

Edit `prisma/seed.ts` and add to the `practiceAreas` array, then run:
```bash
npm run db:seed
```

### Styling

The project uses Tailwind CSS with a custom color palette. Modify colors in:
- `app/globals.css` for global theme variables
- Individual components for specific styling

### Adding More Filter Options

1. Update the database schema in `prisma/schema.prisma`
2. Run `npm run db:push` to update the database
3. Update API routes in `app/api/`
4. Update the FilterSidebar component

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS 14+, Android 10+)

## Performance

- **Page Load Time**: < 2 seconds (LCP)
- **Time to Interactive**: < 3 seconds
- **Search Response**: < 500ms
- **Lighthouse Score Target**: > 90

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Database powered by [Prisma](https://www.prisma.io/)
- Hosted on [Vercel](https://vercel.com/)

---

**Note**: This is a demo application. For production use, implement proper authentication, authorization, and data validation.
