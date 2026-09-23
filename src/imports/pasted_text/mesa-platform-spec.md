# Build Mesa — Restaurant Ordering & Reservation Platform

Build a production-quality portfolio web application called **Mesa**, a fictional modern Filipino restaurant ordering and reservation platform.

The goal is to demonstrate strong frontend development, database design, authentication, business logic, responsive UI, Supabase integration, admin dashboard development, and real-world restaurant workflows.

The application should feel like a real product, not a generic CRUD demo.

---

## 1. Tech Stack

Use:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Supabase

  * PostgreSQL
  * Authentication
  * Storage
  * Row Level Security
* React Hook Form
* Zod
* TanStack Query where useful
* Lucide React for icons

Do not introduce unnecessary frameworks or dependencies.

Use Supabase directly rather than Prisma unless there is a clear technical reason to introduce an ORM.

Use environment variables for Supabase credentials.

---

# 2. Brand

Restaurant name:

**Mesa**

Positioning:

> Modern Filipino food, made for the table.

Visual direction:

* Modern
* Warm
* Premium but approachable
* Food-focused
* Mobile-first
* Clean typography
* Large food photography
* Subtle animations
* Strong visual hierarchy
* Avoid generic SaaS styling
* Avoid excessive gradients
* Avoid excessive rounded cards
* Avoid overly complicated UI

The website should feel like a real modern restaurant.

Use Philippine-inspired food and restaurant content for the demo data.

Use realistic Philippine peso pricing.

Example:

* ₱180
* ₱250
* ₱320
* ₱450

---

# 3. User Roles

Implement:

### Guest

Can:

* Browse restaurant
* Browse menu
* View menu item details
* Add items to cart
* Customize items
* Checkout
* Make reservation
* Subscribe to newsletter

No account required for basic ordering/reservation.

### Customer

Authenticated user can:

* View profile
* View order history
* View reservation history
* Cancel eligible reservations
* Manage favorites

### Admin

Admin can:

* Manage menu
* Manage menu categories
* Manage item options/add-ons
* Manage orders
* Manage reservations
* Manage homepage content
* Manage promotions
* Manage testimonials
* View subscribers
* Manage restaurant settings
* View activity logs

---

# 4. Pages

Create the following routes:

## Public

`/`

Home page.

`/menu`

Digital menu.

`/menu/:id`

Menu item details.

`/order`

Online ordering.

`/checkout`

Checkout.

`/order/:id`

Order confirmation/details.

`/reservations`

Reservation booking.

`/about`

Restaurant story.

`/contact`

Contact information.

`/login`

Login.

`/register`

Registration.

## Customer

`/account`

Customer dashboard.

`/account/orders`

Order history.

`/account/reservations`

Reservation history.

`/account/favorites`

Favorites.

## Admin

`/admin`

Dashboard.

`/admin/orders`

Orders.

`/admin/orders/:id`

Order details.

`/admin/reservations`

Reservations.

`/admin/menu`

Menu management.

`/admin/categories`

Category management.

`/admin/promotions`

Promotions.

`/admin/content`

Homepage CMS.

`/admin/testimonials`

Testimonials.

`/admin/subscribers`

Subscribers.

`/admin/settings`

Restaurant settings.

`/admin/activity`

Audit/activity logs.

---

# 5. Homepage

Create a highly polished restaurant landing page.

Sections:

### Hero

* Large food image or video
* Restaurant name
* Short tagline
* Primary CTA: Order Online
* Secondary CTA: Reserve a Table

### Restaurant introduction

Short story about Mesa.

### Featured dishes

Show 3–6 featured menu items.

### Restaurant information

Display:

* Address
* Opening hours
* Contact
* Social links

### Promotion

Show active restaurant promotion.

### Testimonials

Display customer reviews.

### Instagram/social section

Create a visually appealing social media section.

External social content can be represented with demo cards if real API integration is not available.

### Newsletter signup

Collect:

* Email
* Optional phone
* Marketing consent

### Footer

Include:

* Navigation
* Address
* Contact
* Opening hours
* Social links
* Privacy
* Terms

---

# 6. Menu

Create categories:

* Starters
* Main Dishes
* Rice
* Noodles
* Desserts
* Drinks

Menu cards should display:

* Image
* Name
* Description
* Price
* Dietary tags
* Availability
* Favorite button

Support:

* Category filtering
* Search
* Dietary filtering
* Featured items
* Sold-out items

---

# 7. Menu Item Customization

Menu items may contain:

* Variations
* Add-ons
* Options

Example:

Classic Burger:

Base:

₱250

Add-ons:

* Extra cheese +₱30
* Bacon +₱50
* Fried egg +₱35
* Fries +₱80

Calculate the final price dynamically.

Validate selections before adding to cart.

---

# 8. Cart

Cart must support:

* Add item
* Remove item
* Increase quantity
* Decrease quantity
* Item notes
* Selected options
* Subtotal
* Discount
* Service fee if configured
* Tax if configured
* Total

Persist the cart locally for guest users.

---

# 9. Checkout

Allow guest checkout.

Collect:

* Customer name
* Email
* Phone
* Pickup date
* Pickup time
* Order notes

Show complete order summary.

Payment can initially be simulated.

Supported demo payment methods:

* Pay at pickup
* GCash
* Maya

Clearly label simulated payment methods if real payment processing is not implemented.

After checkout:

Create order in Supabase.

Display confirmation page.

---

# 10. Order Status

Implement:

```text
Pending
Confirmed
Preparing
Ready for Pickup
Completed
Cancelled
```

Admin can update order status.

Customer can view the current status.

Use clear status badges and timestamps.

---

# 11. Reservations

Reservation form:

* Name
* Email
* Phone
* Date
* Time
* Party size
* Special request

Reservation rules:

* Restaurant opening hours
* Restaurant closing hours
* Maximum restaurant capacity
* Maximum party size
* Reservation slot duration
* Blocked dates
* Blocked times
* Prevent overbooking

Statuses:

```text
Pending
Confirmed
Completed
Cancelled
No-show
```

Show useful availability information to customers.

Prevent two reservations from exceeding the configured capacity.

---

# 12. Restaurant Settings

Admin can configure:

* Restaurant name
* Logo
* Description
* Address
* Phone
* Email
* Social links
* Opening hours
* Reservation capacity
* Reservation slot duration
* Maximum party size
* Pickup settings
* Tax/service fee settings

Do not hardcode these values into components when they can be managed through Supabase.

---

# 13. Admin Dashboard

Dashboard should show:

* Today's orders
* Today's revenue
* Today's reservations
* Subscriber count
* Pending orders
* Pending reservations

Also include charts for:

* Orders over time
* Revenue over time
* Popular menu items
* Reservation volume

Include:

### Recent Orders

Customer, order number, time, total, status.

### Upcoming Reservations

Customer, party size, time, status.

Make the dashboard responsive.

---

# 14. Menu Management

Admin can:

* Create category
* Edit category
* Delete category
* Create menu item
* Edit menu item
* Delete menu item
* Upload image
* Set price
* Set description
* Set dietary tags
* Mark featured
* Mark available
* Mark sold out
* Manage options/add-ons

Use Supabase Storage for images.

Include image preview before saving.

---

# 15. Homepage CMS

Allow admin to edit:

### Hero

* Heading
* Subtitle
* Image
* CTA

### About section

* Heading
* Description
* Image

### Featured menu

Admin can select featured menu items.

### Promotion

* Title
* Description
* Image
* Start date
* End date
* Active state

### Testimonials

* Customer name
* Review
* Rating
* Photo

The homepage should retrieve this information from Supabase rather than hardcoded content.

---

# 16. Promotions

Allow admins to create promotions.

Fields:

* Name
* Description
* Discount type
* Discount value
* Start date
* End date
* Active
* Applicable menu items

Support:

* Percentage discount
* Fixed discount

Validate promotion dates.

Apply valid promotions during checkout.

---

# 17. Customer Accounts

Use Supabase Auth.

Support:

* Email/password
* Logout
* Login
* Registration
* Password reset

Customer dashboard:

* Profile
* Orders
* Reservations
* Favorites

Do not force users to create accounts before ordering.

---

# 18. Favorites

Authenticated users can favorite menu items.

Display favorite items at:

`/account/favorites`

Use a proper database relationship rather than storing favorites only in localStorage.

---

# 19. Newsletter

Create subscriber functionality.

Store:

* Email
* Phone if provided
* Marketing consent
* Source
* Created timestamp

Prevent duplicate subscriptions.

---

# 20. Database

Design a normalized PostgreSQL database.

Suggested tables:

```text
restaurants
profiles
restaurant_hours
restaurant_closures

menu_categories
menu_items
menu_item_options
menu_item_option_values

orders
order_items
order_item_options

reservations

subscribers

favorites

promotions
promotion_items

homepage_sections
testimonials

notifications

audit_logs
```

Use UUID primary keys.

Include:

* created_at
* updated_at

where appropriate.

Use foreign keys.

Use indexes where useful.

Use database constraints for important business rules.

---

# 21. Supabase Security

Implement Row Level Security.

Guests:

* Can read public restaurant information
* Can read available menu items
* Can create orders
* Can create reservations
* Can subscribe

Customers:

* Can read their own orders
* Can read their own reservations
* Can update eligible own reservations
* Can manage their own favorites
* Cannot access other customers' records

Admins:

* Can manage restaurant data
* Can manage menus
* Can manage orders
* Can manage reservations
* Can manage CMS content
* Can view subscribers
* Can view audit logs

Do not rely only on frontend role checks.

Database RLS must enforce access.

---

# 22. Storage

Use Supabase Storage for:

* Menu images
* Restaurant logo
* Hero images
* Homepage images
* Testimonial images

Use appropriate storage policies.

Optimize images before upload where practical.

---

# 23. Email

Prepare the application for transactional email using Resend.

Emails:

### Order confirmation

Include:

* Order number
* Customer
* Items
* Pickup time
* Total

### Reservation confirmation

Include:

* Reservation number
* Date
* Time
* Party size
* Restaurant information

### Reservation cancellation

Include cancellation details.

If email integration is not configured, create a clean abstraction/service layer so it can be added later.

---

# 24. Error Handling

Implement proper:

* Loading states
* Error states
* Empty states
* Form validation
* Success messages
* Toast notifications
* Confirmation dialogs
* Network error handling

Never leave users staring at a blank screen.

---

# 25. Responsive Design

Mobile-first.

Test:

* 320px
* 375px
* 390px
* 768px
* 1024px
* 1440px

The ordering and reservation flows must be comfortable on mobile.

Use accessible buttons and form inputs.

---

# 26. Accessibility

Implement:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Proper labels
* Alt text
* Accessible dialogs
* Accessible form validation
* Sufficient contrast

---

# 27. SEO

Implement:

* Page titles
* Meta descriptions
* Open Graph metadata
* Social preview images
* Canonical URLs
* Sitemap
* robots.txt
* Restaurant schema.org structured data

Use realistic restaurant information.

---

# 28. Performance

Optimize:

* Images
* Lazy loading
* Database queries
* React rendering
* Bundle size

Avoid unnecessary client-side rendering.

Do not sacrifice usability for arbitrary performance optimizations.

---

# 29. Demo Data

Seed realistic Philippine restaurant data.

Create:

* 6 categories
* 30+ menu items
* Multiple add-ons
* Several promotions
* Testimonials
* Demo orders
* Demo reservations
* Demo subscribers

Use realistic Filipino dishes such as:

* Chicken Inasal
* Crispy Pork Belly
* Kare-Kare
* Sinigang
* Sisig
* Garlic Rice
* Pancit
* Halo-Halo
* Calamansi Juice
* Filipino-style coffee

Use realistic PHP prices.

---

# 30. Demo Mode

Create a portfolio-friendly demo experience.

Visitors should be able to explore the application without needing to create an account.

Include:

**Explore Demo**

and:

**View Admin Demo**

Admin demo should be safe/read-only or use a controlled demo account.

Do not expose real credentials.

---

# 31. UI Quality

The application must NOT look like a generic AI-generated dashboard.

Prioritize:

* Strong typography
* High-quality food imagery
* Consistent spacing
* Clear hierarchy
* Good mobile navigation
* Professional forms
* Thoughtful empty states
* Useful micro-interactions
* Subtle animations

Use reusable components.

Create a consistent design system for:

* Buttons
* Inputs
* Cards
* Badges
* Dialogs
* Tables
* Navigation
* Toasts
* Form controls

---

# 32. Development Rules

Build incrementally.

Do NOT generate the entire application in one giant file.

Use:

```text
components/
pages/
layouts/
hooks/
lib/
services/
types/
utils/
```

where appropriate.

Keep components reusable.

Keep business logic separate from UI where practical.

Use TypeScript types generated from Supabase.

Avoid `any` unless absolutely necessary.

Do not hardcode sensitive credentials.

Do not commit `.env` files.

---

# 33. Development Order

Build in this order:

### Phase 1

* Project setup
* Routing
* Tailwind
* Supabase connection
* Database schema
* Type generation
* Seed data

### Phase 2

* Restaurant homepage
* Menu
* Menu categories
* Menu item details

### Phase 3

* Cart
* Item customization
* Checkout
* Order creation
* Order confirmation

### Phase 4

* Reservations
* Availability rules
* Reservation creation
* Confirmation

### Phase 5

* Authentication
* Customer accounts
* Favorites
* Order history

### Phase 6

* Admin authentication
* Admin dashboard
* Order management
* Reservation management

### Phase 7

* Menu CMS
* Homepage CMS
* Promotions
* Testimonials
* Restaurant settings

### Phase 8

* RLS/security review
* Storage policies
* Email integration
* SEO
* Accessibility
* Performance
* Mobile QA

### Phase 9

* Demo mode
* Seed final data
* Deployment
* Portfolio case study

---

# 34. Important AI Coding Rule

Before implementing each major feature:

1. Explain the database changes required.
2. Explain the user flow.
3. Explain which files will be created/modified.
4. Implement the feature.
5. Check for TypeScript errors.
6. Check for obvious runtime errors.
7. Check responsive behavior.
8. Check Supabase RLS/security implications.
9. Do not modify unrelated parts of the application.

When something fails, diagnose the root cause before changing multiple unrelated files.

Do not replace working code unnecessarily.

---

# 35. Final Goal

Mesa should demonstrate that the developer can build a realistic restaurant platform with:

**Frontend**

React + TypeScript + Tailwind

**Backend**

Supabase + PostgreSQL

**Authentication**

Supabase Auth

**Database security**

Row Level Security

**Storage**

Supabase Storage

**Business logic**

Orders + reservations + availability + promotions

**Admin**

Restaurant management dashboard

**UX**

Mobile-first restaurant experience

**Production fundamentals**

SEO + accessibility + performance + error handling

The final result should be polished enough to use as a professional portfolio project and easy for a recruiter or client to understand within 2–5 minutes of exploring it.
