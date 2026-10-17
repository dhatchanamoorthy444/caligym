# Caligym - Premium Calisthenics Coaching Platform

## Overview
This project is a premium, legally-compliant calisthenics coaching platform with evidence-based exercise progression, AI-powered coaching feedback, and interactive 3D visualizations.

## Stack
- Frontend: Next.js 14+, React 18.3, Tailwind CSS, Aceternity UI
- 3D: Three.js + @react-three/fiber
- Backend: PostgreSQL via Supabase (free tier)
- AI Integration: Moblin (form validation), Aceternity LLM, Playwright MCP for motion capture
- Authentication: Email/password + Stripe payments

## Current State
Static HTML implementation exists but needs full conversion to Next.js application with all features.

## Legal Compliance
20 non-negotiable requirements implemented:
- Privacy Policy (/privacy)
- Terms of Service (/terms) with 18+ verification
- Refund Policy (/refund)
- Cookie Policy (/cookies)
- Cookie Consent Banner
- Form consent checkboxes
- Data minimization (email, name, fitness level, age only)
- Third-party SDK audit (Stripe, Vercel Analytics, Firebase)
- Accessibility (WCAG 2.1 AA)
- Business details footer
- Age verification modal
- Email unsubscribe links
- Licensed assets verification
- Data deletion requests
- Disability modifications

## Design System
Brand colors: Navy (#0F172A), Orange (#F97316), Slate (#64748B)
Typography: Sora/Outfit for headings, Lexend/Open Sans for body
Component rules: No harsh gradients, solid colors with shadows, mixed radii, etc.

## Features
1. Landing page with hero, problem/solution, skills showcase, pricing, testimonials, FAQ
2. Skills library with 3 tiers (free, email-unlocked, paid)
3. Dashboard with progress tracking and AI recommendations
4. Settings with preferences and account management
5. Interactive Three.js exercise demos
6. Mobile-responsive with skeleton loaders

## Key Challenges
- Converting static HTML to dynamic Next.js app
- Implementing AI integrations (Moblin for validation, Aceternity for coaching)
- Creating Playwright automation for exercise demos
- Full legal compliance implementation
- Design system compliance (30+ anti-patterns to avoid)
- Authentication and payment integration

## Next Steps
1. Convert static HTML to Next.js components
2. Implement design system and brand guidelines
3. Set up backend with PostgreSQL/Supabase
4. Integrate free LLM models
5. Create Three.js animations
6. Implement authentication and payments
7. Full legal compliance verification
8. Testing and deployment