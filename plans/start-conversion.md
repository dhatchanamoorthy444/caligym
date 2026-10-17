# Starting the HTML-to-Next.js Conversion

## Current Status
The Caligym project has:
- ✅ Static HTML files in `/pages/` directory (8 files)
- ✅ Existing React components (6 components in `src/components/`)
- ✅ Partial Next.js implementation (4 pages in `src/app/`)
- ✅ Package.json with Next.js 14, React, Tailwind CSS, Three.js dependencies
- ✅ Design system foundation (tailwind.config.js)

## Conversion Priority List

### Week 1: Core Pages

1. **`pages/index.html` → `src/app/page.tsx`** (ENHANCE EXISTING)
   - Most critical - main landing page
   - Reuse existing Hero, Testimonials, SkillCard components
   - Convert HTML structure to Next.js components
   - Convert inline JavaScript to React hooks/state
   - Convert inline CSS to Tailwind CSS classes

2. **`pages/skills.html` → `src/app/skills/page.tsx`** (NEW)
   - Convert tiered skill library structure
   - Implement SkillCardGrid component
   - Add unlock mechanics (email unlock, paid membership)

3. **`pages/dashboard.html` → `src/app/dashboard/page.tsx`** (NEW)
   - Convert progress tracking interface
   - Add AI recommendations integration
   - Implement real-time updates

### Week 2: Design System & Authentication

4. **`pages/settings.html` → `src/app/settings/page.tsx`** (NEW)
   - Convert preferences and account management
   - Add notification settings
   - Include privacy controls

### Week 3: Legal Compliance

5. **`pages/refund.html` → `src/app/refund/page.tsx`** (NEW)
   - Convert refund policy page

6. **`pages/cookies.html` → `src/app/cookies/page.tsx`** (NEW)
   - Implement CookieConsentBanner component
   - Add age verification modal
   - Include form consent checkboxes

## Technical Stack

### Existing React Components:
- `src/components/Hero.tsx` - Hero section
- `src/components/SkillCard.tsx` - Individual skill cards
- `src/components/Testimonials.tsx` - User testimonials
- `src/components/ThreeDExerciseDemo.tsx` - 3D exercise viewer
- `src/components/LoadingSkeleton.tsx` - Loading states
- `src/components/HeroVideo.tsx` - Hero video placeholder

### Existing Next.js Pages:
- `src/app/page.tsx` - Home page (partially implemented)
- `src/app/login/page.tsx` - Login/signup
- `src/app/privacy/page.tsx` - Privacy policy
- `src/app/terms/page.tsx` - Terms of service

### Design System:
- `tailwind.config.js` - Brand colors, typography, component rules
- Colors: Navy (#0F172A), Orange (#F97316), Slate (#64748B)
- Typography: Sora/Outfit for headings, Lexend/Open Sans for body

## Conversion Pattern

### 1. HTML Structure → React Components
```html
<!-- HTML -->
<section class="hero">
  <h1>Master Bodyweight Mastery in 90 Days</h1>
  <button class="btn btn-primary">Start Free Trial</button>
</section>
```

```tsx
/* React */
<section className="section-padding relative">
  <div className="hero grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
      Master Bodyweight Mastery in 90 Days
    </h1>
    <CustomButton variant="primary">
      Start Free Trial
    </CustomButton>
  </div>
</section>
```

### 2. Inline JavaScript → React Hooks
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

### 3. Inline CSS → Tailwind CSS
```html
<!-- HTML -->
<div class="hero" style="max-width:1200px; margin:0 auto;">
```

```tsx
/* React */
<div className="hero max-w-7xl mx-auto">
```

## Key Features to Implement

### Legal Compliance (20 Requirements):
- [ ] Privacy Policy (/privacy)
- [ ] Terms of Service (/terms) with 18+ verification
- [ ] Refund Policy (/refund)
- [ ] Cookie Policy (/cookies)
- [ ] Cookie Consent Banner
- [ ] Form consent checkboxes
- [ ] Data minimization (email, name, fitness level, age only)
- [ ] Third-party SDK audit (Stripe, Vercel Analytics, Firebase)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Business details footer
- [ ] Age verification modal
- [ ] Email unsubscribe links
- [ ] Licensed assets verification
- [ ] Data deletion requests
- [ ] Disability modifications

### AI Integration:
- [ ] Moblin for form validation
- [ ] Aceternity LLM for coaching feedback
- [ ] AI recommendations in dashboard

### Payments:
- [ ] Stripe integration
- [ ] Subscription plans (Coach, Master)
- [ ] Billing cycle toggles (monthly/annual)

### Three.js:
- [ ] Interactive exercise demos
- [ ] Muscle activation heatmaps
- [ ] Multiple exercise types (pullup, pushup, squat, handstand)

## Component Architecture

### Base Components (src/components/ui/):
- `button.tsx` - CustomButton component
- `card.tsx` - CustomCard component
- `input.tsx` - CustomInput component
- etc.

### Feature Components (src/components/):
- `Hero.tsx` - Hero section
- `SkillCard.tsx` - Individual skill cards
- `SkillCardGrid.tsx` - Grid of skill cards
- `Testimonials.tsx` - User testimonials
- `ThreeDExerciseDemo.tsx` - 3D exercise viewer
- `LoadingSkeleton.tsx` - Loading states
- `HeroVideo.tsx` - Hero video placeholder

### Pages (src/app/):
- `page.tsx` - Home page (enhance)
- `skills/page.tsx` - Skills library (new)
- `dashboard/page.tsx` - Progress tracking (new)
- `settings/page.tsx` - Settings (new)
- `refund/page.tsx` - Refund policy (new)
- `cookies/page.tsx` - Cookie policy (new)

## Verification Steps

### 1. Legal Compliance Check:
- Privacy policy page with data minimization
- Terms of service with age verification
- Refund policy implementation
- Cookie policy with consent banner
- Age verification modal
- Email unsubscribe functionality
- Third-party SDK audit completed

### 2. Design System Compliance:
- Brand colors (Navy, Orange, Slate)
- Typography system (Sora/Outfit, Lexend/Open Sans)
- No harsh gradients
- Solid colors with shadows
- Mixed radii
- 30+ anti-patterns avoided

### 3. Functionality:
- Authentication and account management
- Age verification flow
- Cookie consent management
- Skill unlock mechanics (email and paid)
- Progress tracking dashboard
- Settings and preferences
- Payment processing
- AI coaching feedback

## Timeline

### Week 1: Core Conversion
- **`index.html → app/page.tsx`** (most critical)
- **`skills.html → app/skills/page.tsx`** (tiered skill library)
- **`dashboard.html → app/dashboard/page.tsx`** (progress tracking)
- Set up basic component library

### Week 2: Design System & Authentication
- Implement design system
- **`settings.html → app/settings/page.tsx`** (preferences)
- Add authentication system
- Implement age verification

### Week 3: Legal Compliance
- **`refund.html → app/refund/page.tsx`** (refund policy)
- **`cookies.html → app/cookies/page.tsx`** (cookie policy)
- Implement CookieConsentBanner
- Add all required legal elements

## Next Steps

1. **Start with `index.html` conversion** - this is the most critical page
2. **Use existing React components** where possible (Hero, Testimonials, etc.)
3. **Follow design system guidelines** for colors and typography
4. **Maintain all existing functionality** while improving architecture
5. **Add TypeScript types** throughout
6. **Implement responsive design**
7. **Test thoroughly** each conversion

The conversion strategy provides a clear roadmap for transforming the static HTML implementation into a full-featured Next.js application while maintaining all existing functionality and implementing the required features from the project specifications.