# Caligym HTML-to-Next.js Conversion Strategy

## Overview
Convert static HTML implementation to full Next.js application with all requested features.

## Current State Analysis

### Static HTML Files Found:
- `pages/index.html` - Main landing page with hero, skills showcase, pricing, testimonials, FAQ
- `pages/skills.html` - Tiered skill library (Beginner/Free, Intermediate/Email, Advanced/Paid)
- `pages/dashboard.html` - Progress tracking dashboard
- `pages/settings.html` - Settings and preferences
- `pages/privacy.html` - Privacy policy
- `pages/terms.html` - Terms of service
- `pages/refund.html` - Refund policy
- `pages/cookies.html` - Cookie policy

### Existing React Components:
- `src/components/Hero.tsx` - Hero section
- `src/components/SkillCard.tsx` - Individual skill cards
- `src/components/Testimonials.tsx` - User testimonials
- `src/components/ThreeDExerciseDemo.tsx` - 3D exercise viewer
- `src/components/LoadingSkeleton.tsx` - Loading states
- `src/components/HeroVideo.tsx` - Hero video placeholder

### Existing Next.js Pages:
- `src/app/page.tsx` - Home page (React implementation exists)
- `src/app/login/page.tsx` - Login/signup
- `src/app/privacy/page.tsx` - Privacy policy
- `src/app/terms/page.tsx` - Terms of service

## Conversion Priorities

### Priority 1: Core Pages
1. **index.html → src/app/page.tsx** (enhance existing)
   - Convert HTML structure to Next.js/React
   - Reuse existing components (Hero, Testimonials, etc.)
   - Convert inline JavaScript to React hooks
   - Convert inline CSS to Tailwind CSS

2. **skills.html → src/app/skills/page.tsx** (NEW)
   - Convert tiered skill library structure
   - Implement SkillCardGrid component
   - Add unlock mechanics (email unlock, paid membership)

3. **dashboard.html → src/app/dashboard/page.tsx** (NEW)
   - Convert progress tracking interface
   - Add AI recommendations integration
   - Implement real-time updates

4. **settings.html → src/app/settings/page.tsx** (NEW)
   - Convert preferences and account management
   - Add notification settings
   - Include privacy controls

### Priority 2: Legal Compliance
5. **refund.html → src/app/refund/page.tsx** (NEW)
6. **cookies.html → src/app/cookies/page.tsx** (NEW)
   - Implement CookieConsentBanner component
   - Add age verification modal
   - Include form consent checkboxes

### Priority 3: Design System
- Implement brand colors: Navy (#0F172A), Orange (#F97316), Slate (#64748B)
- Typography: Sora/Outfit for headings, Lexend/Open Sans for body
- Component rules: No harsh gradients, solid colors with shadows

## Technical Approach

### Component Architecture:
1. **Base Components**: src/components/ui/ (button, card, input, etc.)
2. **Feature Components**: src/components/ (Hero, Skills, etc.)
3. **Pages**: src/app/ (Next.js pages)

### Conversion Pattern:
1. Extract repeated HTML structures into React components
2. Convert inline JavaScript functions to React hooks/state
3. Convert inline CSS to Tailwind CSS classes
4. Add TypeScript interfaces where missing
5. Maintain existing functionality while improving architecture

## Key Features to Implement

### Legal Compliance:
- Age verification modal (18+)
- Cookie consent banner with localStorage
- Form consent checkboxes
- Data minimization (email, name, fitness level, age only)
- Third-party SDK audit documentation
- Email unsubscribe links
- Disability modifications

### AI Integration:
- Moblin for form validation
- Aceternity LLM for coaching feedback
- AI recommendations in dashboard

### Payments:
- Stripe integration
- Subscription plans (Coach, Master)
- Billing cycle toggles (monthly/annual)

### Three.js:
- Interactive exercise demos
- Muscle activation heatmaps
- Multiple exercise types (pullup, pushup, squat, handstand)

## Verification Steps

### Legal Compliance:
1. [ ] Privacy policy with data minimization
2. [ ] Terms of service with age verification
3. [ ] Refund policy implementation
4. [ ] Cookie policy with consent
5. [ ] Age verification modal
6. [ ] Email unsubscribe functionality
7. [ ] Third-party SDK audit completed

### Design System:
1. [ ] Brand colors implemented
2. [ ] Typography system
3. [ ] No harsh gradients
4. [ ] Solid colors with shadows
5. [ ] Mixed radii
6. [ ] 30+ anti-patterns avoided

### Functionality:
1. [ ] Authentication (email/password)
2. [ ] Age verification flow
3. [ ] Cookie consent management
4. [ ] Skill unlock mechanics
5. [ ] Progress tracking
6. [ ] Settings and preferences
7. [ ] Payment processing
8. [ ] AI coaching feedback

## Migration Timeline

### Week 1: Core Conversion
- Convert index.html → app/page.tsx
- Convert skills.html → app/skills/page.tsx
- Convert dashboard.html → app/dashboard/page.tsx
- Set up basic component library

### Week 2: Design System & Authentication
- Implement design system
- Convert settings.html → app/settings/page.tsx
- Add authentication system
- Implement age verification

### Week 3: Legal Compliance
- Convert refund.html → app/refund/page.tsx
- Convert cookies.html → app/cookies/page.tsx
- Implement CookieConsentBanner
- Add all required legal elements

### Week 4: Advanced Features
- Add payment integration (Stripe)
- Implement AI coaching system
- Complete Three.js integration
- Advanced dashboard features

### Week 5: Testing & Deployment
- Test all conversions
- Verify legal compliance
- Performance optimization
- Deployment preparation

## Code Examples (Conversion Pattern)

### HTML Button → React Component:
```html
<!-- HTML -->
<button class="btn btn-primary" onclick="handleSignup()">Start Free Trial</button>
```

```tsx
/* React */
<CustomButton variant="primary" onClick={handleSignup}>
  Start Free Trial
</CustomButton>
```

### Inline JavaScript → React Hook:
```html
<!-- HTML -->
<script>
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  answer.classList.toggle('open');
}
</script>
```

```tsx
/* React */
const [openFaqs, setOpenFaqs] = useState<number[]>([]);

const toggleFaq = (index: number) => {
  setOpenFaqs(prev => 
    prev.includes(index) 
      ? prev.filter(i => i !== index) 
      : [...prev, index]
  );
};
```

## Critical Files to Modify

### Static HTML Files to Convert:
- `pages/index.html` → `src/app/page.tsx`
- `pages/skills.html` → `src/app/skills/page.tsx`
- `pages/dashboard.html` → `src/app/dashboard/page.tsx`
- `pages/settings.html` → `src/app/settings/page.tsx`
- `pages/refund.html` → `src/app/refund/page.tsx`
- `pages/cookies.html` → `src/app/cookies/page.tsx`

### New Components to Create:
- `src/components/DesignSystem.tsx` - Brand guidelines
- `src/components/CookieConsentBanner.tsx` - Legal compliance
- `src/components/AgeVerificationModal.tsx` - 18+ verification
- `src/components/EmailUnlockForm.tsx` - Email unlock functionality

## Next Steps

1. Begin with `index.html` conversion (most critical)
2. Use existing React components where possible
3. Follow design system guidelines
4. Maintain all existing functionality
5. Add TypeScript types throughout
6. Implement responsive design
7. Test thoroughly

This strategy provides a clear roadmap for converting the static HTML implementation to a full-featured Next.js application while maintaining all existing functionality and implementing the required features from the project requirements.