const fs = require('fs');
const path = require('path');

// Check if dependencies are installed
let Database, bcrypt;
try {
  Database = require('better-sqlite3');
  bcrypt = require('bcrypt');
} catch (error) {
  console.error('❌ Error: Required dependencies not installed.');
  console.error('Please run: npm install');
  console.error('Then try again: npm run db:init');
  process.exit(1);
}

const { products } = require('./seed-data');

// Configuration
const DB_DIR = path.join(__dirname, '../database');
const DB_PATH = path.join(DB_DIR, 'feedback.db');
const SCHEMA_PATH = path.join(__dirname, '../src/database/schema.sql');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize database
console.log('🗄️  Initializing database...');
const db = new Database(DB_PATH);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Read and execute schema
console.log('📋 Creating tables...');
const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
db.exec(schema);

// Hash passwords
const SALT_ROUNDS = 10;
const moderatorPassword = bcrypt.hashSync('admin123', SALT_ROUNDS);
const userPassword = bcrypt.hashSync('user123', SALT_ROUNDS);

// Insert default users
console.log('👥 Creating default users...');
const insertUser = db.prepare(`
  INSERT INTO users (email, password_hash, display_name, auth_provider, role)
  VALUES (?, ?, ?, ?, ?)
`);

try {
  // Moderator account
  insertUser.run(
    'moderator@example.com',
    moderatorPassword,
    'System Moderator',
    'email',
    'moderator'
  );
  console.log('   ✓ Moderator account created (moderator@example.com / admin123)');

  // Test user account
  insertUser.run(
    'user@example.com',
    userPassword,
    'Test User',
    'email',
    'user'
  );
  console.log('   ✓ Test user account created (user@example.com / user123)');

  // Additional test users (8 more users for total of 10)
  const additionalUsers = [
    { email: 'john.doe@example.com', name: 'John Doe' },
    { email: 'jane.smith@example.com', name: 'Jane Smith' },
    { email: 'mike.johnson@example.com', name: 'Mike Johnson' },
    { email: 'sarah.williams@example.com', name: 'Sarah Williams' },
    { email: 'david.brown@example.com', name: 'David Brown' },
    { email: 'emily.davis@example.com', name: 'Emily Davis' },
    { email: 'chris.wilson@example.com', name: 'Chris Wilson' },
    { email: 'lisa.anderson@example.com', name: 'Lisa Anderson' }
  ];

  additionalUsers.forEach(user => {
    insertUser.run(
      user.email,
      userPassword,
      user.name,
      'email',
      'user'
    );
  });
  
  console.log(`   ✓ ${additionalUsers.length} additional test users created (Total: 10 users)`);
} catch (error) {
  console.error('   ✗ Error creating users:', error.message);
}

// Insert products
console.log('📦 Seeding products...');
const insertProduct = db.prepare(`
  INSERT INTO products (name, description, category, image_url)
  VALUES (?, ?, ?, ?)
`);

const insertMany = db.transaction((products) => {
  for (const product of products) {
    insertProduct.run(
      product.name,
      product.description,
      product.category,
      product.image_url
    );
  }
});

try {
  insertMany(products);
  console.log(`   ✓ ${products.length} products seeded successfully (40 products)`);
} catch (error) {
  console.error('   ✗ Error seeding products:', error.message);
}

// Insert sample reviews for demonstration
console.log('⭐ Creating sample reviews...');
const insertReview = db.prepare(`
  INSERT INTO reviews (product_id, user_id, user_name, rating, review_text, status, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const sampleReviews = [
  {
    product_id: 1,
    user_id: 2,
    user_name: 'Test User',
    rating: 5,
    review_text: 'Excellent headphones! The noise cancellation is amazing and the battery life is exactly as advertised.',
    status: 'approved',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    product_id: 1,
    user_id: 3,
    user_name: 'John Doe',
    rating: 4,
    review_text: 'Great sound quality and comfortable to wear for long periods. Only minor issue is the carrying case could be better.',
    status: 'approved',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    product_id: 2,
    user_id: 2,
    user_name: 'Test User',
    rating: 5,
    review_text: 'Perfect smartwatch for fitness tracking. The heart rate monitor is very accurate and the battery lasts for days.',
    status: 'approved',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    product_id: 3,
    user_id: 4,
    user_name: 'Jane Smith',
    rating: 4,
    review_text: 'Charges my phone multiple times before needing a recharge. A bit heavy but worth it for the capacity.',
    status: 'pending',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    product_id: 11,
    user_id: 3,
    user_name: 'John Doe',
    rating: 5,
    review_text: 'Makes perfect coffee every morning. The programmable timer is a game changer for busy mornings.',
    status: 'approved',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    product_id: 12,
    user_id: 2,
    user_name: 'Test User',
    rating: 5,
    review_text: 'Healthier cooking made easy! Food comes out crispy without all the oil. Highly recommend this air fryer.',
    status: 'approved',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    product_id: 21,
    user_id: 4,
    user_name: 'Jane Smith',
    rating: 5,
    review_text: 'Best yoga mat I have ever owned. Great grip and cushioning for all types of yoga practice.',
    status: 'approved',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    product_id: 5,
    user_id: 3,
    user_name: 'John Doe',
    rating: 3,
    review_text: 'Good mouse but the software for customization could be more user-friendly. Performance is solid though.',
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

try {
  for (const review of sampleReviews) {
    insertReview.run(
      review.product_id,
      review.user_id,
      review.user_name,
      review.rating,
      review.review_text,
      review.status,
      review.created_at
    );
  }
  console.log(`   ✓ ${sampleReviews.length} sample reviews created`);
} catch (error) {
  console.error('   ✗ Error creating sample reviews:', error.message);
}

// Update product statistics
console.log('📊 Updating product statistics...');
const updateStats = db.prepare(`
  UPDATE products 
  SET average_rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM reviews 
    WHERE reviews.product_id = products.id AND reviews.status = 'approved'
  ),
  total_reviews = (
    SELECT COUNT(*)
    FROM reviews 
    WHERE reviews.product_id = products.id AND reviews.status = 'approved'
  )
`);

try {
  updateStats.run();
  console.log('   ✓ Product statistics updated');
} catch (error) {
  console.error('   ✗ Error updating statistics:', error.message);
}

// Display summary
console.log('\n📈 Database Summary:');
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
const reviewCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get();
const pendingCount = db.prepare("SELECT COUNT(*) as count FROM reviews WHERE status = 'pending'").get();

console.log(`   Users: ${userCount.count}`);
console.log(`   Products: ${productCount.count}`);
console.log(`   Reviews: ${reviewCount.count} (${pendingCount.count} pending)`);

// Close database
db.close();

console.log('\n✅ Database initialization complete!');
console.log(`📁 Database location: ${DB_PATH}`);
console.log('\n🔐 Default Credentials:');
console.log('   Moderator: moderator@example.com / admin123');
console.log('   Test User: user@example.com / user123');
