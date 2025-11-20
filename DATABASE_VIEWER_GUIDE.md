# Database Viewer Guide

This guide explains how to view and query the database tables in the Product Feedback System.

---

## 🚀 Quick Start

### View All Database Data

```bash
cd packages/backend
npm run db:view
```

This will display:
- ✅ All users (10 users)
- ✅ All products (40 products)
- ✅ All reviews with status
- ✅ Moderation history
- ✅ Statistics and summaries

### Interactive Query Tool

```bash
cd packages/backend
npm run db:query
```

This provides an interactive menu to:
- View table schemas
- Run predefined queries
- Execute custom SQL queries
- View statistics

---

## 📊 Database Tables

### 1. Users Table

**Columns:**
- `id` - Primary key
- `email` - Unique email address
- `password_hash` - Hashed password (bcrypt)
- `display_name` - User's display name
- `photo_url` - Profile photo URL (optional)
- `auth_provider` - 'email' or 'google'
- `role` - 'user' or 'moderator'
- `created_at` - Timestamp

**Sample Data (10 users):**
```
ID: 1
  Email: moderator@example.com
  Display Name: System Moderator
  Role: moderator
  
ID: 2
  Email: user@example.com
  Display Name: Test User
  Role: user

... (8 more users)
```

### 2. Products Table

**Columns:**
- `id` - Primary key
- `name` - Product name
- `description` - Product description
- `category` - Product category
- `image_url` - Product image URL
- `average_rating` - Calculated average (0-5)
- `total_reviews` - Count of approved reviews
- `created_at` - Timestamp

**Sample Data (40 products across 4 categories):**

**Electronics (15 products):**
- Wireless Bluetooth Headphones
- Smart Watch Pro
- Portable Power Bank 20000mAh
- 4K Webcam
- Wireless Gaming Mouse
- USB-C Hub Adapter
- Mechanical Keyboard RGB
- Portable Bluetooth Speaker
- Wireless Charging Pad
- HD Monitor 27 inch
- Laptop Stand Aluminum
- External SSD 1TB
- Smart LED Light Bulbs
- Wireless Earbuds Pro
- Tablet 10 inch

**Home & Kitchen (13 products):**
- Stainless Steel Coffee Maker
- Air Fryer XL
- Vacuum Cleaner Robot
- Electric Kettle
- Blender Pro
- Non-Stick Cookware Set
- Smart Thermostat
- LED Desk Lamp
- Memory Foam Pillow
- Storage Organizer Set
- Instant Pot Multi-Cooker
- Cordless Stick Vacuum
- Smart Doorbell Camera

**Sports & Fitness (7 products):**
- Yoga Mat Premium
- Resistance Bands Set
- Adjustable Dumbbells
- Running Shoes
- Water Bottle Insulated
- Fitness Tracker Band
- Foam Roller

**Books & Media (5 products):**
- E-Reader Tablet
- Noise-Cancelling Earbuds
- Streaming Media Player
- Vinyl Record Player
- Book Light Rechargeable

### 3. Reviews Table

**Columns:**
- `id` - Primary key
- `product_id` - Foreign key to products
- `user_id` - Foreign key to users
- `user_name` - Display name (denormalized)
- `rating` - Star rating (1-5)
- `review_text` - Review content (10-1000 chars)
- `status` - 'pending', 'approved', or 'rejected'
- `created_at` - Submission timestamp
- `moderated_at` - Moderation timestamp
- `moderator_id` - Foreign key to users (moderator)

**Sample Data (8 pre-seeded reviews):**
```
✅ Review #1 - APPROVED
  Product: Wireless Bluetooth Headphones
  User: Test User
  Rating: ⭐⭐⭐⭐⭐ (5/5)
  Text: "Excellent headphones! The noise cancellation is amazing..."
  Created: [timestamp]

⏳ Review #4 - PENDING
  Product: Portable Power Bank 20000mAh
  User: Jane Smith
  Rating: ⭐⭐⭐⭐ (4/5)
  Text: "Charges my phone multiple times before needing a recharge..."
  Created: [timestamp]
```

### 4. Moderation History Table

**Columns:**
- `id` - Primary key
- `review_id` - Foreign key to reviews
- `moderator_id` - Foreign key to users
- `action` - 'approve', 'reject', or 'remove'
- `reason` - Optional reason text
- `timestamp` - Action timestamp

**Sample Data:**
```
✅ Action #1 - APPROVE
  Review ID: 1
  Moderator: System Moderator
  Timestamp: [timestamp]
```

---

## 🔍 Query Examples

### Using npm run db:query

After running `npm run db:query`, you can:

**1. View All Users:**
```
Choice: 5
```

**2. View All Products:**
```
Choice: 6
```

**3. View Pending Reviews:**
```
Choice: 8
```

**4. Custom SQL Query:**
```
Choice: 11
Enter query: SELECT * FROM products WHERE category = 'Electronics'
```

### Using SQLite Command Line

```bash
# Open database
sqlite3 packages/backend/database/feedback.db

# List all tables
.tables

# View table schema
.schema users

# Query data
SELECT * FROM users;
SELECT * FROM products WHERE category = 'Electronics';
SELECT * FROM reviews WHERE status = 'pending';

# Exit
.quit
```

---

## 📈 Common Queries

### Count Products by Category

```sql
SELECT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY count DESC;
```

**Expected Result:**
```
Electronics       | 15
Home & Kitchen    | 13
Sports & Fitness  | 7
Books & Media     | 5
```

### Find Products with Most Reviews

```sql
SELECT name, total_reviews, average_rating 
FROM products 
WHERE total_reviews > 0 
ORDER BY total_reviews DESC 
LIMIT 5;
```

### View All Pending Reviews

```sql
SELECT r.id, p.name as product, r.user_name, r.rating, r.created_at
FROM reviews r
JOIN products p ON r.product_id = p.id
WHERE r.status = 'pending'
ORDER BY r.created_at ASC;
```

### Get User Review Count

```sql
SELECT user_name, COUNT(*) as review_count
FROM reviews
GROUP BY user_name
ORDER BY review_count DESC;
```

### Find Products Without Reviews

```sql
SELECT id, name, category
FROM products
WHERE total_reviews = 0
ORDER BY category, name;
```

### Moderation Statistics

```sql
SELECT 
  u.display_name as moderator,
  COUNT(*) as total_actions,
  SUM(CASE WHEN action = 'approve' THEN 1 ELSE 0 END) as approvals,
  SUM(CASE WHEN action = 'reject' THEN 1 ELSE 0 END) as rejections
FROM moderation_history mh
JOIN users u ON mh.moderator_id = u.id
GROUP BY moderator;
```

---

## 🛠️ Database Management Commands

### Initialize Database

```bash
cd packages/backend
npm run db:init
```

This will:
- Create/reset database
- Create all tables
- Seed 40 products
- Create 10 users
- Add sample reviews

### View Database

```bash
npm run db:view
```

Shows complete database contents with formatting.

### Query Database

```bash
npm run db:query
```

Interactive query tool with menu options.

### Backup Database

```bash
# Create backup
cp packages/backend/database/feedback.db packages/backend/database/feedback.backup.db

# Or with timestamp
cp packages/backend/database/feedback.db packages/backend/database/feedback.$(date +%Y%m%d_%H%M%S).db
```

### Restore Database

```bash
# Restore from backup
cp packages/backend/database/feedback.backup.db packages/backend/database/feedback.db
```

---

## 📊 Database Statistics

After running `npm run db:view`, you'll see:

### Summary Statistics

```
Total Users: 10 (1 moderators, 9 regular users)
Total Products: 40 across 4 categories
Total Reviews: 8 (6 approved, 2 pending)
Total Moderation Actions: [varies]
```

### Products by Category

```
Electronics          15 (37.5%) ███████████████
Home & Kitchen       13 (32.5%) █████████████
Sports & Fitness      7 (17.5%) ███████
Books & Media         5 (12.5%) █████
```

### Products by Rating

```
5.0                   2 (5.0%)  ⭐⭐
4.0-4.9               4 (10.0%) ⭐⭐⭐⭐
3.0-3.9               0 (0.0%)  
2.0-2.9               0 (0.0%)  
1.0-1.9               0 (0.0%)  
0.0 (No reviews)     34 (85.0%) ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
```

---

## 🔐 Security Notes

### Password Hashes

User passwords are hashed using bcrypt with 10 salt rounds:
```
Password: user123
Hash: $2b$10$[random_hash]
```

Never display or log password hashes in production!

### Test Passwords

All test accounts use these passwords:
- **Moderator:** admin123
- **Regular Users:** user123

**Change these in production!**

---

## 💡 Tips

### Quick Data Verification

```bash
# Count records in each table
sqlite3 packages/backend/database/feedback.db "
  SELECT 'users' as table_name, COUNT(*) as count FROM users
  UNION ALL
  SELECT 'products', COUNT(*) FROM products
  UNION ALL
  SELECT 'reviews', COUNT(*) FROM reviews
  UNION ALL
  SELECT 'moderation_history', COUNT(*) FROM moderation_history;
"
```

### Export Data to CSV

```bash
# Export products to CSV
sqlite3 -header -csv packages/backend/database/feedback.db \
  "SELECT * FROM products;" > products.csv

# Export users (without passwords)
sqlite3 -header -csv packages/backend/database/feedback.db \
  "SELECT id, email, display_name, role FROM users;" > users.csv
```

### Pretty Print JSON

```bash
# Export as JSON
sqlite3 packages/backend/database/feedback.db \
  "SELECT json_object('id', id, 'name', name, 'category', category) 
   FROM products;" | jq
```

---

## 🐛 Troubleshooting

### Database Not Found

```
Error: SQLITE_CANTOPEN: unable to open database file
```

**Solution:**
```bash
cd packages/backend
npm run db:init
```

### Database Locked

```
Error: SQLITE_BUSY: database is locked
```

**Solution:**
- Close any open database connections
- Stop the backend server
- Try again

### Corrupted Database

```
Error: database disk image is malformed
```

**Solution:**
```bash
# Delete and reinitialize
rm packages/backend/database/feedback.db
npm run db:init
```

---

## 📚 Additional Resources

- **SQLite Documentation:** https://www.sqlite.org/docs.html
- **better-sqlite3 Docs:** https://github.com/WiseLibs/better-sqlite3
- **Database Schema:** See `packages/backend/src/database/schema.sql`

---

**Last Updated:** [Current Date]  
**Database Version:** 1.1.0  
**Total Records:** 58 (10 users + 40 products + 8 reviews)
