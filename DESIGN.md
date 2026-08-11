---
name: Clinical Editorial
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#3e4948'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#6e7978'
  outline-variant: '#bec9c7'
  surface-tint: '#046a66'
  primary: '#005451'
  on-primary: '#ffffff'
  primary-container: '#0f6e6a'
  on-primary-container: '#9dede8'
  inverse-primary: '#85d4cf'
  secondary: '#5c5f62'
  on-secondary: '#ffffff'
  secondary-container: '#dee0e4'
  on-secondary-container: '#606366'
  tertiary: '#4b4a4a'
  on-tertiary: '#ffffff'
  tertiary-container: '#636262'
  on-tertiary-container: '#e1dede'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a1f1eb'
  primary-fixed-dim: '#85d4cf'
  on-primary-fixed: '#00201e'
  on-primary-fixed-variant: '#00504d'
  secondary-fixed: '#e0e2e6'
  secondary-fixed-dim: '#c4c7ca'
  on-secondary-fixed: '#191c1f'
  on-secondary-fixed-variant: '#44474a'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
typography:
  display-hero:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  section-gap: 48px
---

## Brand & Style

This design system is built for a high-end health-tech ecosystem, blending the authority of clinical excellence with the approachability of modern wellness. The aesthetic direction is **Sophisticated Minimalism** with an **Editorial** edge.

The personality is intentional and warm. By utilizing a soft, warm-white base instead of sterile grays, the UI feels human and inviting. The system relies on high-contrast color blocking and precise typography rather than heavy shadows to create hierarchy, resulting in a "Quiet Luxury" digital experience that feels bespoke and trustworthy.

## Colors

The palette is anchored by **Deep Teal**, used as a strategic surgical strike for primary actions and brand moments.

- **Primary (#0F6E6A):** Reserved for hero backgrounds, key CTAs, and active states.
- **Surface (#FDFCFA):** A warm, off-white base that eliminates the "blue-light" clinical feel of standard software.
- **Stroke (#E5E7EB):** A subtle, neutral gray used for the 1px borders that define the structure.
- **Text (#222222):** A soft black, providing high legibility without the harshness of pure #000000.

## Typography

The typography pairing is the cornerstone of the system's editorial feel.

**Epilogue** is utilized for headlines and display numbers. Its geometric yet character-heavy construction provides a modern, authoritative voice. For hero moments (like trackers), use **display-hero** with tight letter-spacing to mimic high-end magazine layouts.

**Inter** serves as the functional workhorse. It provides maximum legibility for clinical data, prescription details, and long-form medical guidance. Use **label-caps** for secondary metadata to create a clear visual distinction from body text.

## Layout & Spacing

This design system employs a **Fluid Grid** model with generous margins to evoke a sense of calm.

- **Desktop:** 12-column grid with a max-width of 1280px. Gutters are fixed at 24px to maintain an airy feel.
- **Mobile:** Single column with 20px side margins.
- **Rhythm:** All vertical spacing should be multiples of 8px. Use 48px or 64px gaps between major sections to prevent information density from feeling overwhelming.
- **Editorial Alignment:** Left-aligned headers are preferred. Avoid center-aligning long-form text.

## Elevation & Depth

Depth is achieved through **Flat Layering** and **Tonal Contrast** rather than physical shadows.

- **The 1px Border:** Most containers should use a 1px solid border (#E5E7EB) against the #FDFCFA background.
- **Color Blocking:** Use the Deep Teal (#0F6E6A) for high-importance "Hero Cards." In these instances, text should be reversed to white.
- **Shadows:** Avoid drop shadows entirely. If a "floating" effect is required for a modal, use a 1px border with a very subtle, high-diffusion ambient glow (0px 4px 20px rgba(0,0,0,0.04)).

## Shapes

The shape language is **Soft** and precise. A 0.25rem (4px) base radius is used for most UI elements, giving the product a tailored, high-end feel that avoids the "bubbliness" of consumer social apps.

- **Small Components (Inputs/Buttons):** 4px corner radius.
- **Large Components (Cards/Modals):** 8px or 12px (rounded-lg/xl) to provide a gentle container for content.

## Components

### Buttons

- **Primary:** Deep Teal background, white text, 4px radius. No gradients.
- **Secondary:** Transparent background, 1px border (#E5E7EB), black text.
- **Tertiary:** Text-only with a subtle underline or arrow icon.

### Cards

- **Hero Tracker:** Deep Teal background. Typography should be oversized (Display-Hero). Information is presented with high contrast (white or light mint accents).
- **Standard Card:** Surface color (#FDFCFA) with a 1px border. No shadow. Used for list items, health records, and settings.

### Form Fields

- Inputs should be 48px in height with a 1px border.
- Use Inter Medium for labels, positioned above the field.
- Focus state: Border color changes to Deep Teal with no "outer glow."

### Iconography

- Use **Duotone** or **Thin-line** icons. Icons should be 24px on a 32px bounding box. Lines should be 1.5px thick to match the precision of the typography.

### Lists

- Health data should be presented in clean, bordered rows.
- Use a 16px vertical padding between items to ensure touch targets are accessible for all users.
