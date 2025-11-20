# Database Contents Preview

This document shows what data will be in the database after running `npm run db:init`.

---

## 📊 Database Summary

- **Total Users:** 10 (1 moderator + 9 regular users)
- **Total Products:** 40 (across 4 categories)
- **Sample Reviews:** 8 (6 approved + 2 pending)
- **Database File:** `packages/backend/database/feedback.db`

---

## 👥 USERS TABLE (10 users)

### User #1 - Moderator
```
ID: 1
Email: moderator@example.com
Password: admin123 (hashed with bcrypt)
Display Name: System Moderator
Role: moderator
Auth Provider: email
Photo URL: null
```

### User #2 - Regular User
```
ID: 2
Email: user@example.com
Password: user123 (hashed with bcrypt)
Display Name: Test User
Role: user
Auth Provider: email
Photo URL: null
```

### User #3
```
ID: 3
Email: john.doe@example.com
Password: user123
Display Name: John Doe
Role: user
Auth Provider: email
```

### User #4
```
ID: 4
Email: jane.smith@example.com
Password: user123
Display Name: Jane Smith
Role: user
Auth Provider: email
```

### User #5
```
ID: 5
Email: mike.johnson@example.com
Password: user123
Display Name: Mike Johnson
Role: user
Auth Provider: email
```

### User #6
```
ID: 6
Email: sarah.williams@example.com
Password: user123
Display Name: Sarah Williams
Role: user
Auth Provider: email
```

### User #7
```
ID: 7
Email: david.brown@example.com
Password: user123
Display Name: David Brown
Role: user
Auth Provider: email
```

### User #8
```
ID: 8
Email: emily.davis@example.com
Password: user123
Display Name: Emily Davis
Role: user
Auth Provider: email
```

### User #9
```
ID: 9
Email: chris.wilson@example.com
Password: user123
Display Name: Chris Wilson
Role: user
Auth Provider: email
```

### User #10
```
ID: 10
Email: lisa.anderson@example.com
Password: user123
Display Name: Lisa Anderson
Role: user
Auth Provider: email
```

---

## 📦 PRODUCTS TABLE (40 products)

### Electronics Category (15 products)

**Product #1**
```
Name: Wireless Bluetooth Headphones
Description: Premium noise-cancelling headphones with 30-hour battery life and superior sound quality.
Category: Electronics
Image: https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400
Average Rating: 0.0 (will update after reviews)
Total Reviews: 0 (will update after reviews)
```

**Product #2**
```
Name: Smart Watch Pro
Description: Advanced fitness tracking, heart rate monitoring, and smartphone notifications on your wrist.
Category: Electronics
Image: https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400
```

**Product #3**
```
Name: Portable Power Bank 20000mAh
Description: High-capacity portable charger with fast charging support for all your devices.
Category: Electronics
Image: https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400
```

**Product #4**
```
Name: 4K Webcam
Description: Crystal clear video calls with auto-focus and built-in noise-cancelling microphone.
Category: Electronics
```

**Product #5**
```
Name: Wireless Gaming Mouse
Description: Precision gaming mouse with customizable RGB lighting and programmable buttons.
Category: Electronics
```

**Product #6**
```
Name: USB-C Hub Adapter
Description: Multi-port hub with HDMI, USB 3.0, SD card reader, and power delivery.
Category: Electronics
```

**Product #7**
```
Name: Mechanical Keyboard RGB
Description: Premium mechanical keyboard with customizable RGB backlighting and tactile switches.
Category: Electronics
```

**Product #8**
```
Name: Portable Bluetooth Speaker
Description: Waterproof speaker with 360-degree sound and 12-hour battery life.
Category: Electronics
```

**Product #9**
```
Name: Wireless Charging Pad
Description: Fast wireless charging for all Qi-enabled devices with LED indicator.
Category: Electronics
```

**Product #10**
```
Name: HD Monitor 27 inch
Description: Ultra-slim bezel monitor with vibrant colors and adjustable stand.
Category: Electronics
```

**Product #31** (NEW)
```
Name: Laptop Stand Aluminum
Description: Ergonomic laptop stand with adjustable height and angle for better posture.
Category: Electronics
```

**Product #32** (NEW)
```
Name: External SSD 1TB
Description: Ultra-fast portable SSD with USB-C connection and shock resistance.
Category: Electronics
```

**Product #33** (NEW)
```
Name: Smart LED Light Bulbs
Description: WiFi-enabled color-changing bulbs with app and voice control.
Category: Electronics
```

**Product #34** (NEW)
```
Name: Wireless Earbuds Pro
Description: Premium earbuds with spatial audio and adaptive EQ technology.
Category: Electronics
```

**Product #35** (NEW)
```
Name: Tablet 10 inch
Description: Lightweight tablet with high-resolution display and long battery life.
Category: Electronics
```

### Home & Kitchen Category (13 products)

**Product #11**
```
Name: Stainless Steel Coffee Maker
Description: Programmable coffee maker with thermal carafe and auto-shutoff feature.
Category: Home & Kitchen
```

**Product #12**
```
Name: Air Fryer XL
Description: Healthy cooking with rapid air technology, 8 preset cooking functions.
Category: Home & Kitchen
```

**Product #13**
```
Name: Vacuum Cleaner Robot
Description: Smart navigation, app control, and automatic charging for effortless cleaning.
Category: Home & Kitchen
```

**Product #14**
```
Name: Electric Kettle
Description: Fast boiling kettle with temperature control and keep-warm function.
Category: Home & Kitchen
```

**Product #15**
```
Name: Blender Pro
Description: High-powered blender for smoothies, soups, and nut butters with multiple speeds.
Category: Home & Kitchen
```

**Product #16**
```
Name: Non-Stick Cookware Set
Description: 10-piece cookware set with durable non-stick coating and heat-resistant handles.
Category: Home & Kitchen
```

**Product #17**
```
Name: Smart Thermostat
Description: Energy-saving thermostat with app control and learning capabilities.
Category: Home & Kitchen
```

**Product #18**
```
Name: LED Desk Lamp
Description: Adjustable brightness and color temperature with USB charging port.
Category: Home & Kitchen
```

**Product #19**
```
Name: Memory Foam Pillow
Description: Ergonomic pillow with cooling gel and hypoallergenic cover.
Category: Home & Kitchen
```

**Product #20**
```
Name: Storage Organizer Set
Description: Stackable storage bins with labels for closet and pantry organization.
Category: Home & Kitchen
```

**Product #36** (NEW)
```
Name: Instant Pot Multi-Cooker
Description: 7-in-1 programmable pressure cooker for quick and easy meals.
Category: Home & Kitchen
```

**Product #37** (NEW)
```
Name: Cordless Stick Vacuum
Description: Powerful cordless vacuum with HEPA filtration and LED display.
Category: Home & Kitchen
```

**Product #38** (NEW)
```
Name: Smart Doorbell Camera
Description: HD video doorbell with motion detection and two-way audio.
Category: Home & Kitchen
```

### Sports & Fitness Category (7 products)

**Product #21**
```
Name: Yoga Mat Premium
Description: Extra thick non-slip yoga mat with carrying strap and alignment marks.
Category: Sports & Fitness
```

**Product #22**
```
Name: Resistance Bands Set
Description: Five resistance levels for strength training and physical therapy.
Category: Sports & Fitness
```

**Product #23**
```
Name: Adjustable Dumbbells
Description: Space-saving dumbbells with quick weight adjustment from 5 to 52.5 lbs.
Category: Sports & Fitness
```

**Product #24**
```
Name: Running Shoes
Description: Lightweight running shoes with responsive cushioning and breathable mesh.
Category: Sports & Fitness
```

**Product #25**
```
Name: Water Bottle Insulated
Description: Stainless steel bottle keeps drinks cold for 24 hours or hot for 12 hours.
Category: Sports & Fitness
```

**Product #39** (NEW)
```
Name: Fitness Tracker Band
Description: Activity tracker with heart rate monitor and sleep tracking.
Category: Sports & Fitness
```

**Product #40** (NEW)
```
Name: Foam Roller
Description: High-density foam roller for muscle recovery and massage.
Category: Sports & Fitness
```

### Books & Media Category (5 products)

**Product #26**
```
Name: E-Reader Tablet
Description: Glare-free display with adjustable warm light and weeks of battery life.
Category: Books & Media
```

**Product #27**
```
Name: Noise-Cancelling Earbuds
Description: True wireless earbuds with active noise cancellation and touch controls.
Category: Books & Media
```

**Product #28**
```
Name: Streaming Media Player
Description: 4K HDR streaming with voice remote and access to thousands of channels.
Category: Books & Media
```

**Product #29**
```
Name: Vinyl Record Player
Description: Vintage-style turntable with built-in speakers and Bluetooth connectivity.
Category: Books & Media
```

**Product #30**
```
Name: Book Light Rechargeable
Description: Clip-on reading light with adjustable brightness and flexible neck.
Category: Books & Media
```

---

## ⭐ REVIEWS TABLE (8 sample reviews)

### Review #1 - APPROVED ✅
```
Product: Wireless Bluetooth Headphones (ID: 1)
User: Test User (ID: 2)
Rating: ⭐⭐⭐⭐⭐ (5/5)
Review Text: "Excellent headphones! The noise cancellation is amazing and the battery life is exactly as advertised."
Status: approved
Created: 7 days ago
Moderated: Yes
```

### Review #2 - APPROVED ✅
```
Product: Wireless Bluetooth Headphones (ID: 1)
User: John Doe (ID: 3)
Rating: ⭐⭐⭐⭐ (4/5)
Review Text: "Great sound quality and comfortable to wear for long periods. Only minor issue is the carrying case could be better."
Status: approved
Created: 5 days ago
Moderated: Yes
```

### Review #3 - APPROVED ✅
```
Product: Smart Watch Pro (ID: 2)
User: Test User (ID: 2)
Rating: ⭐⭐⭐⭐⭐ (5/5)
Review Text: "Perfect smartwatch for fitness tracking. The heart rate monitor is very accurate and the battery lasts for days."
Status: approved
Created: 3 days ago
Moderated: Yes
```

### Review #4 - PENDING ⏳
```
Product: Portable Power Bank 20000mAh (ID: 3)
User: Jane Smith (ID: 4)
Rating: ⭐⭐⭐⭐ (4/5)
Review Text: "Charges my phone multiple times before needing a recharge. A bit heavy but worth it for the capacity."
Status: pending
Created: 1 day ago
Moderated: No
```

### Review #5 - APPROVED ✅
```
Product: Stainless Steel Coffee Maker (ID: 11)
User: John Doe (ID: 3)
Rating: ⭐⭐⭐⭐⭐ (5/5)
Review Text: "Makes perfect coffee every morning. The programmable timer is a game changer for busy mornings."
Status: approved
Created: 10 days ago
Moderated: Yes
```

### Review #6 - APPROVED ✅
```
Product: Air Fryer XL (ID: 12)
User: Test User (ID: 2)
Rating: ⭐⭐⭐⭐⭐ (5/5)
Review Text: "Healthier cooking made easy! Food comes out crispy without all the oil. Highly recommend this air fryer."
Status: approved
Created: 8 days ago
Moderated: Yes
```

### Review #7 - APPROVED ✅
```
Product: Yoga Mat Premium (ID: 21)
User: Jane Smith (ID: 4)
Rating: ⭐⭐⭐⭐⭐ (5/5)
Review Text: "Best yoga mat I have ever owned. Great grip and cushioning for all types of yoga practice."
Status: approved
Created: 6 days ago
Moderated: Yes
```

### Review #8 - PENDING ⏳
```
Product: Wireless Gaming Mouse (ID: 5)
User: John Doe (ID: 3)
Rating: ⭐⭐⭐ (3/5)
Review Text: "Good mouse but the software for customization could be more user-friendly. Performance is solid though."
Status: pending
Created: 2 days ago
Moderated: No
```

---

## 📋 MODERATION HISTORY TABLE

After reviews are moderated, this table will contain:

```
Action #1
  Review ID: 1
  Moderator: System Moderator (ID: 1)
  Action: approve
  Reason: null
  Timestamp: [when approved]

Action #2
  Review ID: 2
  Moderator: System Moderator (ID: 1)
  Action: approve
  Reason: null
  Timestamp: [when approved]

... (continues for all moderated reviews)
```

---

## 📊 Statistics After Initialization

### Products by Category
```
Electronics       : 15 products (37.5%)
Home & Kitchen    : 13 products (32.5%)
Sports & Fitness  : 7 products (17.5%)
Books & Media     : 5 products (12.5%)
```

### Users by Role
```
Moderators : 1 (10%)
Users      : 9 (90%)
```

### Reviews by Status
```
Approved : 6 (75%)
Pending  : 2 (25%)
Rejected : 0 (0%)
```

### Products with Reviews
```
Wireless Bluetooth Headphones : 2 reviews, 4.5 ⭐ average
Smart Watch Pro              : 1 review, 5.0 ⭐ average
Stainless Steel Coffee Maker : 1 review, 5.0 ⭐ average
Air Fryer XL                 : 1 review, 5.0 ⭐ average
Yoga Mat Premium             : 1 review, 5.0 ⭐ average
```

---

## 🚀 How to Initialize and View

### Step 1: Initialize Database
```bash
cd packages/backend
npm install  # Install dependencies first
npm run db:init
```

### Step 2: View Database
```bash
npm run db:view
```

### Step 3: Query Database
```bash
npm run db:query
```

---

## 📝 Notes

- All passwords are hashed using bcrypt with 10 salt rounds
- Test password for all regular users: `user123`
- Moderator password: `admin123`
- All timestamps are in ISO 8601 format
- Product ratings are calculated automatically from approved reviews
- Review counts are updated automatically when reviews are approved/rejected

---

**Last Updated:** [Current Date]  
**Database Version:** 1.1.0  
**Total Records:** 58 (10 users + 40 products + 8 reviews)
