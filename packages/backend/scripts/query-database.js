const Database = require('better-sqlite3');
const path = require('path');
const readline = require('readline');

const DB_PATH = path.join(__dirname, '../database/feedback.db');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔍 Product Feedback System - Database Query Tool\n');
console.log('=' .repeat(80));

try {
  const db = new Database(DB_PATH, { readonly: true });

  console.log('\n📊 Available Tables:');
  console.log('  1. users');
  console.log('  2. products');
  console.log('  3. reviews');
  console.log('  4. moderation_history');
  console.log('\n💡 Quick Queries:');
  console.log('  5. Show all users');
  console.log('  6. Show all products');
  console.log('  7. Show all reviews');
  console.log('  8. Show pending reviews');
  console.log('  9. Show products by category');
  console.log('  10. Show user statistics');
  console.log('  11. Custom SQL query');
  console.log('  0. Exit');
  console.log('');

  function displayResults(rows, title) {
    console.log('\n' + '=' .repeat(80));
    console.log(title);
    console.log('=' .repeat(80));
    
    if (rows.length === 0) {
      console.log('No results found.\n');
      return;
    }

    console.log(`Found ${rows.length} row(s)\n`);
    
    rows.forEach((row, index) => {
      console.log(`Row ${index + 1}:`);
      Object.entries(row).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
      });
      console.log('');
    });
  }

  function promptUser() {
    rl.question('Enter your choice (0-11): ', (answer) => {
      const choice = parseInt(answer);

      try {
        switch (choice) {
          case 0:
            console.log('\n👋 Goodbye!\n');
            db.close();
            rl.close();
            return;

          case 1:
            const usersSchema = db.prepare("PRAGMA table_info(users)").all();
            displayResults(usersSchema, '📋 USERS TABLE SCHEMA');
            break;

          case 2:
            const productsSchema = db.prepare("PRAGMA table_info(products)").all();
            displayResults(productsSchema, '📋 PRODUCTS TABLE SCHEMA');
            break;

          case 3:
            const reviewsSchema = db.prepare("PRAGMA table_info(reviews)").all();
            displayResults(reviewsSchema, '📋 REVIEWS TABLE SCHEMA');
            break;

          case 4:
            const moderationSchema = db.prepare("PRAGMA table_info(moderation_history)").all();
            displayResults(moderationSchema, '📋 MODERATION_HISTORY TABLE SCHEMA');
            break;

          case 5:
            const users = db.prepare(`
              SELECT id, email, display_name, role, auth_provider, created_at 
              FROM users 
              ORDER BY id
            `).all();
            displayResults(users, '👥 ALL USERS');
            break;

          case 6:
            const products = db.prepare(`
              SELECT id, name, category, average_rating, total_reviews 
              FROM products 
              ORDER BY id
            `).all();
            displayResults(products, '📦 ALL PRODUCTS');
            break;

          case 7:
            const reviews = db.prepare(`
              SELECT r.id, r.user_name, p.name as product_name, r.rating, 
                     r.status, r.created_at
              FROM reviews r
              JOIN products p ON r.product_id = p.id
              ORDER BY r.created_at DESC
            `).all();
            displayResults(reviews, '⭐ ALL REVIEWS');
            break;

          case 8:
            const pendingReviews = db.prepare(`
              SELECT r.id, r.user_name, p.name as product_name, r.rating, 
                     r.review_text, r.created_at
              FROM reviews r
              JOIN products p ON r.product_id = p.id
              WHERE r.status = 'pending'
              ORDER BY r.created_at ASC
            `).all();
            displayResults(pendingReviews, '⏳ PENDING REVIEWS');
            break;

          case 9:
            const categories = db.prepare(`
              SELECT category, COUNT(*) as count, 
                     ROUND(AVG(average_rating), 2) as avg_rating
              FROM products
              GROUP BY category
              ORDER BY category
            `).all();
            displayResults(categories, '📁 PRODUCTS BY CATEGORY');
            break;

          case 10:
            const stats = db.prepare(`
              SELECT 
                (SELECT COUNT(*) FROM users) as total_users,
                (SELECT COUNT(*) FROM users WHERE role = 'moderator') as moderators,
                (SELECT COUNT(*) FROM products) as total_products,
                (SELECT COUNT(*) FROM reviews) as total_reviews,
                (SELECT COUNT(*) FROM reviews WHERE status = 'pending') as pending_reviews,
                (SELECT COUNT(*) FROM reviews WHERE status = 'approved') as approved_reviews,
                (SELECT COUNT(*) FROM moderation_history) as moderation_actions
            `).get();
            displayResults([stats], '📊 DATABASE STATISTICS');
            break;

          case 11:
            rl.question('\nEnter your SQL query: ', (query) => {
              try {
                const results = db.prepare(query).all();
                displayResults(results, '🔍 CUSTOM QUERY RESULTS');
              } catch (error) {
                console.log(`\n❌ Query Error: ${error.message}\n`);
              }
              promptUser();
            });
            return;

          default:
            console.log('\n❌ Invalid choice. Please enter a number between 0 and 11.\n');
        }
      } catch (error) {
        console.log(`\n❌ Error: ${error.message}\n`);
      }

      promptUser();
    });
  }

  promptUser();

} catch (error) {
  console.error('❌ Error connecting to database:', error.message);
  console.error('\nMake sure the database exists. Run: npm run db:init');
  rl.close();
  process.exit(1);
}
