# Contributing to Sylhet Advocates Directory

Thank you for your interest in contributing to the Sylhet Advocates Directory! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background or identity.

### Expected Behavior
- Be respectful and considerate
- Use inclusive language
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- A code editor (VS Code recommended)
- Basic knowledge of Next.js, React, and TypeScript

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sylhet-advocate-directory.git
   cd sylhet-advocate-directory
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/sylhet-advocate-directory.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

6. **Set up database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Before Starting Work

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Sync with upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### During Development

1. **Make small, focused commits**
   - Each commit should represent a single logical change
   - Write clear commit messages (see Commit Guidelines)

2. **Test your changes**
   ```bash
   npm run build    # Ensure build succeeds
   npm run lint     # Check for linting errors
   ```

3. **Keep your branch up to date**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Types of Contributions

We welcome various types of contributions:

- **Bug Fixes**: Fix issues or unexpected behavior
- **Features**: Implement new functionality
- **Documentation**: Improve or add documentation
- **Performance**: Optimize existing code
- **UI/UX**: Enhance user interface and experience
- **Tests**: Add or improve test coverage
- **Refactoring**: Improve code structure without changing functionality

## Coding Standards

### TypeScript Guidelines

1. **Always use TypeScript**
   - No `any` types unless absolutely necessary
   - Define interfaces for all data structures
   - Use type inference where possible

2. **Example**
   ```typescript
   // Good
   interface AdvocateProfile {
     id: number;
     fullName: string;
     email: string | null;
   }

   const advocate: AdvocateProfile = {
     id: 1,
     fullName: "John Doe",
     email: null
   };

   // Bad
   const advocate: any = { ... };
   ```

### React Component Guidelines

1. **Functional Components**
   - Use functional components with hooks
   - No class components

2. **Component Structure**
   ```tsx
   // Component.tsx
   'use client'; // if client component

   import { useState } from 'react';
   import { Button } from '@/components/ui/button';

   interface ComponentProps {
     title: string;
     onAction: () => void;
   }

   export function Component({ title, onAction }: ComponentProps) {
     const [state, setState] = useState(false);

     return (
       <div>
         <h1>{title}</h1>
         <Button onClick={onAction}>Action</Button>
       </div>
     );
   }
   ```

3. **Server vs Client Components**
   - Default to Server Components
   - Use Client Components only when needed:
     - useState, useEffect, or other hooks
     - Event handlers
     - Browser-only APIs

### Styling Guidelines

1. **Use Tailwind CSS**
   - Prefer utility classes over custom CSS
   - Use responsive utilities (sm:, md:, lg:, etc.)
   - Follow mobile-first approach

2. **Example**
   ```tsx
   <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
     <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
       Title
     </h1>
   </div>
   ```

3. **Custom Styles**
   - Only when Tailwind utilities are insufficient
   - Add to component files, not global CSS

### File Organization

```
app/
├── advocates/[id]/page.tsx    # Dynamic routes
├── api/                       # API routes
├── search/page.tsx            # Static routes
components/
├── advocates/                 # Feature-specific components
├── search/                    # Feature-specific components
└── ui/                        # Shared UI components
lib/
├── prisma.ts                  # Database client
└── utils.ts                   # Utility functions
prisma/
├── schema.prisma              # Database schema
└── seed.ts                    # Seed data
```

### Naming Conventions

- **Components**: PascalCase (`AdvocateCard.tsx`)
- **Functions**: camelCase (`getAdvocates()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RESULTS`)
- **Interfaces**: PascalCase with descriptive names (`AdvocateProfile`)
- **Files**: kebab-case for pages (`advocate-profile.tsx`)

## Commit Guidelines

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(search): add sorting by consultation fee

Implement sort option to order advocates by consultation fee (low to high).
Adds new query parameter 'sortBy=fee' to the search API.

Closes #123
```

```
fix(profile): correct phone number display format

Phone numbers were displaying without proper formatting.
Now shows in format: +880 1XXX-XXXXXX

Fixes #456
```

### Commit Best Practices

1. **Write clear, concise messages**
2. **Use present tense** ("add feature" not "added feature")
3. **Reference issues** when applicable
4. **Explain why, not just what**

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**
   ```bash
   npm run build
   npm run lint
   ```

2. **Update documentation**
   - Update README if adding features
   - Add JSDoc comments for new functions
   - Update FEATURES.md for user-facing changes

3. **Check your changes**
   - Review your own code first
   - Remove console.logs and debug code
   - Ensure no commented-out code

### Creating Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**
   - Use a clear, descriptive title
   - Follow the PR template
   - Link related issues

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Code refactoring

   ## Changes Made
   - Detailed list of changes
   - Another change

   ## Testing
   - How to test these changes
   - What was tested

   ## Screenshots (if applicable)
   [Add screenshots here]

   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No new warnings
   - [ ] Build passes
   - [ ] Works on mobile devices

   ## Related Issues
   Closes #123
   ```

### After Submitting

1. **Respond to feedback**
   - Address review comments promptly
   - Ask for clarification if needed
   - Make requested changes

2. **Keep PR updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   git push origin feature/your-feature-name --force
   ```

## Issue Guidelines

### Reporting Bugs

Use the bug report template:

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other solutions you've thought about

**Additional Context**
Mockups, examples, etc.
```

## Code Review Process

### For Contributors

- Be patient and respectful
- Respond to all comments
- Ask questions if unclear
- Make requested changes promptly

### For Reviewers

- Be constructive and respectful
- Explain the "why" behind suggestions
- Approve when ready, request changes when needed
- Use GitHub's review features

## Questions?

- Open an issue with the "question" label
- Reach out to maintainers
- Check existing documentation

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

---

Thank you for contributing to Sylhet Advocates Directory! 🎉
