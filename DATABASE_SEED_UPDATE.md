# Database Seed Data Update

## Summary of Changes

The database seed data has been updated to include more products and users for a richer testing and demonstration experience.

---

## Updated Seed Data

### Products: 40 Total ✅

**Previous:** 30 products  
**Updated:** 40 products (+10 products)

#### Product Distribution by Category:

1. **Electronics** - 15 products
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
   - **NEW:** Laptop Stand Aluminum
   - **NEW:** External SSD 1TB
   - **NEW:** Smart LED Light Bulbs
   - **NEW:** Wireless Earbuds Pro
   - **NEW:** Tablet 10 inch

2. **Home & Kitchen** - 13 products
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
   - **NEW:** Instant Pot Multi-Cooker
   - **NEW:** Cordless Stick Vacuum
   - **NEW:** Smart Doorbell Camera

3. **Sports & Fitness** - 7 products
   - Yoga Mat Premium
   - Resistance Bands Set
   - Adjustable Dumbbells
   - Running Shoes
   - Water Bottle Insulated
   - **NEW:** Fitness Tracker Band
   - **NEW:** Foam Roller

4. **Books & Media** - 5 products
   - E-Reader Tablet
   - Noise-Cancelling Earbuds
   - Streaming Media Player
   - Vinyl Record Player
   - Book Light Rechargeable

---

### Users: 10 Total ✅

**Previous:** 4 users (1 moderator + 3 regular users)  
**Updated:** 10 users (1 moderator + 9 regular users)

#### User List:

1. **moderator@example.com** - System Moderator (Moderator role)
2. **user@example.com** - Test User
3. **john.doe@example.com** - John Doe
4. **jane.smith@example.com** - Jane Smith
5. **mike.johnson@example.com** - Mike Johnson *(NEW)*
6. **sarah.williams@example.com** - Sarah Williams *(NEW)*
7. **david.brown@example.com** - David Brown *(NEW)*
8. **emily.davis@example.com** - Emily Davis *(NEW)*
9. **chris.wilson@example.com** - Chris Wilson *(NEW)*
10. **lisa.anderson@example.com** - Lisa Anderson *(NEW)*

**All user accounts use password:** `user123`  
**Moderator account uses password:** `admin123`

---

## Files Modified

1. **packages/backend/scripts/seed-data.js**
   - Added 10 new products across different categories
   - Updated total from 30 to 40 products
   - Maintained category distribution

2. **packages/backend/scripts/init-db.js**
   - Added 6 new user accounts
   - Updated total from 4 to 10 users
   - All users use same test password for easy testing

---

## Benefits of Increased Data

### More Products (40)

**Advantages:**
- Better demonstration of search functionality
- More realistic product catalog
- Better testing of pagination
- Improved category filtering demonstration
- More diverse product types
- Better performance testing with larger dataset

**Use Cases:**
- Test search with more results
- Demonstrate category filtering
- Test scrolling performance
- Show pagination in action
- More products for users to review

### More Users (10)

**Advantages:**
- More realistic user base
- Better testing of review distribution
- Multiple users for testing concurrent actions
- Diverse user names for review display
- Better moderation workflow testing

**Use Cases:**
- Multiple users submitting reviews
- Testing review attribution
- Demonstrating user activity
- Testing moderation with multiple reviewers
- Simulating real-world usage patterns

---

## Database Initialization

To initialize the database with the new seed data:

```bash
cd packages/backend
npm run db:init
```

This will:
1. Create/reset the database
2. Create schema with all tables
3. Seed 40 products
4. Create 10 user accounts
5. Add sample reviews
6. Update product statistics

---

## Testing the New Data

### Test Products

**Search for:**
- "laptop" - should find Laptop Stand
- "smart" - should find Smart Watch, Smart Thermostat, Smart Doorbell, Smart LED Bulbs
- "wireless" - should find multiple wireless products
- "fitness" - should find Fitness Tracker Band

**Filter by Category:**
- Electronics: 15 products
- Home & Kitchen: 13 products
- Sports & Fitness: 7 products
- Books & Media: 5 products

### Test Users

**Login with any user:**
```
Email: mike.johnson@example.com
Password: user123
```

**All users can:**
- Browse products
- Submit reviews
- View their submissions

**Only moderator can:**
- Access moderation dashboard
- Approve/reject reviews
- Remove reviews

---

## Sample Data Statistics

### Products
- **Total:** 40 products
- **Categories:** 4 categories
- **Images:** All products have Unsplash images
- **Descriptions:** All products have detailed descriptions

### Users
- **Total:** 10 users
- **Moderators:** 1
- **Regular Users:** 9
- **Auth Method:** Email/password
- **All Active:** Yes

### Reviews (Sample)
- **Total Sample Reviews:** 8 reviews
- **Approved:** 6 reviews
- **Pending:** 2 reviews
- **Products with Reviews:** 7 products
- **Users with Reviews:** 3 users

---

## Data Quality

### Products
- ✅ Unique names
- ✅ Detailed descriptions
- ✅ Valid categories
- ✅ High-quality images
- ✅ Realistic product types
- ✅ Diverse price points implied

### Users
- ✅ Unique email addresses
- ✅ Realistic names
- ✅ Proper role assignment
- ✅ Secure password hashing
- ✅ Valid email format

---

## Future Enhancements

### Potential Additions

**More Products:**
- Could expand to 50-100 products
- Add more categories (Clothing, Beauty, Automotive)
- Include product prices
- Add product specifications

**More Users:**
- Could add 20-50 users
- Include user profiles
- Add user avatars
- Include user bio/description

**More Reviews:**
- Pre-populate more reviews
- Distribute reviews across all products
- Include variety of ratings (1-5 stars)
- Add more pending reviews for moderation testing

**Additional Data:**
- Product tags/keywords
- Product brands
- User preferences
- Review helpfulness votes
- Product availability status

---

## Migration Notes

### Existing Databases

If you have an existing database:

**Option 1: Fresh Start (Recommended)**
```bash
# Delete existing database
rm packages/backend/database/feedback.db

# Reinitialize with new data
npm run db:init
```

**Option 2: Keep Existing Data**
- New seed data only applies to fresh initialization
- Existing products and users remain unchanged
- Manually add new products/users if needed

---

## Verification

After running `npm run db:init`, verify:

```bash
# Check product count
sqlite3 packages/backend/database/feedback.db "SELECT COUNT(*) FROM products;"
# Should return: 40

# Check user count
sqlite3 packages/backend/database/feedback.db "SELECT COUNT(*) FROM users;"
# Should return: 10

# List all categories
sqlite3 packages/backend/database/feedback.db "SELECT DISTINCT category FROM products;"
# Should return: Electronics, Home & Kitchen, Sports & Fitness, Books & Media

# List all users
sqlite3 packages/backend/database/feedback.db "SELECT email, display_name, role FROM users;"
# Should list all 10 users
```

---

## Summary

✅ **Products increased from 30 to 40** (+10 products)  
✅ **Users increased from 4 to 10** (+6 users)  
✅ **Better category distribution**  
✅ **More realistic testing environment**  
✅ **Improved demonstration capabilities**  

The database now provides a richer, more realistic dataset for testing and demonstrating the Product Feedback System.

---

**Updated:** [Current Date]  
**Version:** 1.1.0  
**Status:** Ready for use
