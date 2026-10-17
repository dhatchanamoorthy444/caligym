# Caligym Project Conversion Plan

## Context
The Caligym project has existing static HTML files that need to be converted to a full Next.js application with all requested features. There's a mix of completed React components and incomplete Next.js implementation that needs to be integrated and expanded.

## Problem
The project currently has:
1. Static HTML files in `/pages/` directory (index.html, skills.html, dashboard.html, settings.html, privacy.html, terms.html, refund.html, cookies.html)
2. Some React components already created (Hero, SkillCard, Testimonials, ThreeDExerciseDemo, etc.)
3. Partial Next.js implementation in app/ directory
4. Need to implement full legal compliance, design system, authentication, payments, and AI integrations

## Recommended Approach

### Phase 1: Core HTML-to-Next.js Conversion

**Priority 1: Convert main landing page (index.html -> app/page.tsx)**
- Convert HTML structure to Next.js components using existing React components
- Extract repeated UI patterns into reusable components
- Convert JavaScript functions to React state hooks and event handlers
- Convert CSS in HTML to Tailwind CSS classes

**Priority 2: Convert legal compliance pages (privacy, terms, refund, cookies)**
- Convert static HTML to Next.js pages with proper metadata
- Implement required legal compliance features:
  - Age verification modal logic
  - Cookie consent banner with localStorage
  - Form consent checkboxes
  - Data minimization implementation
  - Third-party SDK audit

**Priority 3: Convert skills page (skills.html -> app/skills/page.tsx)**
- Convert tiered skill library structure to SkillCardGrid component
- Implement unlock mechanics (email unlock, paid membership)
- Convert tutorial modals to React components

### Phase 2: Component Architecture

**1. Design System Components**:
- Create base component library in `src/components/ui/`
- Implement brand colors: Navy (#0F172A), Orange (#F97316), Slate (#64748B)
- Typography system: Sora/Outfit for headings, Lexend/Open Sans for body
- Component rules: No harsh gradients, solid colors with shadows, mixed radii

**2. Authentication System**:
- Implement email/password authentication
- Add 18+ age verification modal
- Create login/signup page (already partially implemented)
- Set up session management

**3. Payment Integration**:
- Integrate Stripe for payments
- Implement subscription plans (Coach, Master)
- Add billing cycle toggles (monthly/annual)

### Phase 3: Advanced Features

**1. AI Integration**:
- Implement Moblin for form validation
- Set up Aceternity LLM for coaching feedback
- Create AI coaching dashboard with recommendations

**2. Three.js Integration**:
- Complete interactive exercise demos
- Implement muscle activation heatmaps
- Add exercise models and animations

**3. Dashboard Features**:
- Progress tracking system
- AI recommendations engine
- Settings with preferences and account management

## Files to Modify

### Static HTML Files to Convert:
- `/pages/index.html` → `app/page.tsx` (main landing)
- `/pages/skills.html` → `app/skills/page.tsx` (skills library)
- `/pages/dashboard.html` → `app/dashboard/page.tsx` (progress tracking)
- `/pages/settings.html` → `app/settings/page.tsx` (preferences)
- `/pages/privacy.html` → `app/privacy/page.tsx` (already partially done)
- `/pages/terms.html` → `app/terms/page.tsx` (already partially done)
- `/pages/refund.html` → `app/refund/page.tsx` (new)
- `/pages/cookies.html` → `app/cookies/page.tsx` (new)

### New Components to Create:
- `src/components/DesignSystem.tsx` (brand guidelines)
- `src/components/EmailUnlockForm.tsx` (for email-based unlocks)
- `src/components/ThreeDPlayer.tsx` (video/demo player)
- `src/components/CookieConsentBanner.tsx` (legal compliance)
- `src/components/AgeVerificationModal.tsx` (18+ verification)

### Backend Setup:
- PostgreSQL via Supabase configuration
- Authentication endpoints
- Progress tracking API
- Payment webhook handlers

## Verification Steps

### 1. Legal Compliance Check:
- [ ] Privacy policy page with data minimization
- [ ] Terms of service with 18+ verification
- [ ] Refund policy implementation
- [ ] Cookie policy with consent banner
- [ ] Age verification modal
- [ ] Email unsubscribe links
- [ ] Third-party SDK audit completed

### 2. Design System Compliance:
- [ ] Brand colors (Navy, Orange, Slate)
- [ ] Typography system (Sora/Outfit, Lexend/Open Sans)
- [ ] No harsh gradients
- [ ] Solid colors with shadows
- [ ] Mixed radii implementation
- [ ] 30+ anti-patterns avoided

### 3. Feature Testing:
- [ ] Authentication and account management
- [ ] Payment integration (Stripe)
- [ ] AI coaching feedback system
- [ ] Three.js interactive demos
- [ ] Mobile responsiveness
- [ ] Skeleton loaders and loading states

### 4. User Experience:
- [ ] Age verification flow
- [ ] Cookie consent management
- [ ] Skill unlock mechanics (email and paid)
- [ ] Progress tracking dashboard
- [ ] Settings and preferences

## Technical Considerations

1. **Migration Strategy**:
   - Convert gradually from HTML to React components
   - Reuse existing React components where possible
   - Maintain functionality while improving architecture

2. **Component Patterns**:
   - Use forwardRef for custom form inputs
   - Implement motion with framer-motion
   - Use Tailwind CSS for styling
   - Follow accessibility standards (WCAG 2.1 AA)

3. **Performance Optimization**:
   - Implement code splitting
   - Add skeleton loaders
   - Optimize for mobile devices
   - Use Next.js optimizations (React Server Components)

## Timeline

**Week 1**: Convert HTML to Next.js components (landing page, legal pages)
**Week 2**: Implement design system and authentication
**Week 3**: Add payment integration and AI coaching
**Week 4**: Complete Three.js demos and dashboard features
**Week 5**: Testing, bug fixes, and deployment preparation

This plan provides a systematic approach to convert the static HTML implementation to a full-featured Next.js application while maintaining all existing functionality and implementing the required features from the CLAUDE.md specification.