const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../database/feedback.db');

console.log('📊 Product Feedback System - Database Viewer\n');
console.log('=' .repeat(80));

try {
  const db = new Database(DB_PATH, { readonly: true });

  // ============================================================================
  // USERS TABLE
  // ============================================================================
  console.log('\n👥 USERS TABLE');
  console.log('=' .repeat(80));
  
  const users = db.prepare('SELECT * FROM users ORDER BY id').all();
  console.log(`Total Users: ${users.length}\n`);
  
  users.forEach(user => {
    console.log(`ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Display Name: ${user.display_name}`);
    console.log(`  Role: ${user.role}`);
    console.log(`  Auth Provider: ${user.auth_provider}`);
    console.log(`  Photo URL: ${user.photo_url || 'N/A'}`);
    console.log(`  Created: ${user.created_at}`);
    console.log('');
  });

  // ============================================================================
  // PRODUCTS TABLE
  // ============================================================================
  console.log('\n📦 PRODUCTS TABLE');
  console.log('=' .repeat(80));
  
  const products = db.prepare('SELECT * FROM products ORDER BY id').all();
  console.log(`Total Products: ${products.length}\n`);
  
  // Group by category
  const categories = {};
  products.forEach(product => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  Object.keys(categories).sort().forEach(category => {
    console.log(`\n📁 Category: ${category} (${categories[category].length} products)`);
    console.log('-'.repeat(80));
    
    categories[category].forEach(product => {
      console.log(`  [${product.id}] ${product.name}`);
      console.log(`      Description: ${product.description.substring(0, 60)}...`);
      console.log(`      Rating: ${product.average_rating.toFixed(1)} ⭐ (${product.total_reviews} reviews)`);
      console.log(`      Image: ${product.image_url ? 'Yes' : 'No'}`);
    });
  });

  // ============================================================================
  // REVIEWS TABLE
  // ============================================================================
  console.log('\n\n⭐ REVIEWS TABLE');
  console.log('=' .repeat(80));
  
  const reviews = db.prepare(`
    SELECT r.*, p.name as product_name 
    FROM reviews r 
    JOIN products p ON r.product_id = p.id 
    ORDER BY r.created_at DESC
  `).all();
  
  console.log(`Total Reviews: ${reviews.length}\n`);
  
  // Group by status
  const reviewsByStatus = {
    pending: reviews.filter(r => r.status === 'pending'),
    approved: reviews.filter(r => r.status === 'approved'),
    rejected: reviews.filter(r => r.status === 'rejected')
  };

  console.log(`Status Breakdown:`);
  console.log(`  ⏳ Pending: ${reviewsByStatus.pending.length}`);
  console.log(`  ✅ Approved: ${reviewsByStatus.approved.length}`);
  console.log(`  ❌ Rejected: ${reviewsByStatus.rejected.length}`);
  console.log('');

  // Show all reviews
  reviews.forEach(review => {
    const statusIcon = review.status === 'approved' ? '✅' : review.status === 'pending' ? '⏳' : '❌';
    console.log(`${statusIcon} Review #${review.id} - ${review.status.toUpperCase()}`);
    console.log(`  Product: ${review.product_name}`);
    console.log(`  User: ${review.user_name} (ID: ${review.user_id})`);
    console.log(`  Rating: ${'⭐'.repeat(review.rating)} (${review.rating}/5)`);
    console.log(`  Text: "${review.review_text.substring(0, 80)}${review.review_text.length > 80 ? '...' : ''}"`);
    console.log(`  Created: ${review.created_at}`);
    if (review.moderated_at) {
      console.log(`  Moderated: ${review.moderated_at} (by User ID: ${review.moderator_id})`);
    }
    console.log('');
  });

  // ============================================================================
  // MODERATION HISTORY TABLE
  // ============================================================================
  console.log('\n📋 MODERATION HISTORY TABLE');
  console.log('=' .repeat(80));
  
  const moderationHistory = db.prepare(`
    SELECT mh.*, u.display_name as moderator_name, r.id as review_id
    FROM moderation_history mh
    JOIN users u ON mh.moderator_id = u.id
    LEFT JOIN reviews r ON mh.review_id = r.id
    ORDER BY mh.timestamp DESC
  `).all();
  
  console.log(`Total Moderation Actions: ${moderationHistory.length}\n`);
  
  if (moderationHistory.length > 0) {
    moderationHistory.forEach(action => {
      const actionIcon = action.action === 'approve' ? '✅' : action.action === 'reject' ? '❌' : '🗑️';
      console.log(`${actionIcon} Action #${action.id} - ${action.action.toUpperCase()}`);
      console.log(`  Review ID: ${action.review_id}`);
      console.log(`  Moderator: ${action.moderator_name} (ID: ${action.moderator_id})`);
      if (action.reason) {
        console.log(`  Reason: ${action.reason}`);
      }
      console.log(`  Timestamp: ${action.timestamp}`);
      console.log('');
    });
  } else {
    console.log('  No moderation actions yet.\n');
  }

  // ============================================================================
  // STATISTICS
  // ============================================================================
  console.log('\n📊 DATABASE STATISTICS');
  console.log('=' .repeat(80));
  
  // Category distribution
  console.log('\n📁 Products by Category:');
  Object.keys(categories).sort().forEach(category => {
    const count = categories[category].length;
    const percentage = ((count / products.length) * 100).toFixed(1);
    const bar = '█'.repeat(Math.round(count / 2));
    console.log(`  ${category.padEnd(20)} ${count.toString().padStart(2)} (${percentage}%) ${bar}`);
  });

  // Rating distribution
  console.log('\n⭐ Products by Rating:');
  const ratingRanges = {
    '5.0': products.filter(p => p.average_rating === 5).length,
    '4.0-4.9': products.filter(p => p.average_rating >= 4 && p.average_rating < 5).length,
    '3.0-3.9': products.filter(p => p.average_rating >= 3 && p.average_rating < 4).length,
    '2.0-2.9': products.filter(p => p.average_rating >= 2 && p.average_rating < 3).length,
    '1.0-1.9': products.filter(p => p.average_rating >= 1 && p.average_rating < 2).length,
    '0.0 (No reviews)': products.filter(p => p.average_rating === 0).length
  };
  
  Object.entries(ratingRanges).forEach(([range, count]) => {
    const percentage = ((count / products.length) * 100).toFixed(1);
    const bar = '⭐'.repeat(Math.round(count / 3));
    console.log(`  ${range.padEnd(20)} ${count.toString().padStart(2)} (${percentage}%) ${bar}`);
  });

  // User roles
  console.log('\n👥 Users by Role:');
  const usersByRole = {
    moderator: users.filter(u => u.role === 'moderator').length,
    user: users.filter(u => u.role === 'user').length
  };
  
  Object.entries(usersByRole).forEach(([role, count]) => {
    const percentage = ((count / users.length) * 100).toFixed(1);
    console.log(`  ${role.padEnd(20)} ${count.toString().padStart(2)} (${percentage}%)`);
  });

  // Review statistics
  console.log('\n⭐ Review Statistics:');
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
    : 0;
  console.log(`  Average Rating: ${avgRating} ⭐`);
  console.log(`  Total Reviews: ${reviews.length}`);
  console.log(`  Pending Reviews: ${reviewsByStatus.pending.length}`);
  console.log(`  Approved Reviews: ${reviewsByStatus.approved.length}`);
  console.log(`  Rejected Reviews: ${reviewsByStatus.rejected.length}`);
  
  // Products with most reviews
  console.log('\n🏆 Top 5 Products by Review Count:');
  const topProducts = products
    .filter(p => p.total_reviews > 0)
    .sort((a, b) => b.total_reviews - a.total_reviews)
    .slice(0, 5);
  
  if (topProducts.length > 0) {
    topProducts.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name}`);
      console.log(`     ${product.total_reviews} reviews, ${product.average_rating.toFixed(1)} ⭐ average`);
    });
  } else {
    console.log('  No products with reviews yet.');
  }

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log('\n\n📈 SUMMARY');
  console.log('=' .repeat(80));
  console.log(`Total Users: ${users.length} (${usersByRole.moderator} moderators, ${usersByRole.user} regular users)`);
  console.log(`Total Products: ${products.length} across ${Object.keys(categories).length} categories`);
  console.log(`Total Reviews: ${reviews.length} (${reviewsByStatus.approved.length} approved, ${reviewsByStatus.pending.length} pending)`);
  console.log(`Total Moderation Actions: ${moderationHistory.length}`);
  console.log('');
  console.log('=' .repeat(80));
  console.log('✅ Database view complete!\n');

  db.close();

} catch (error) {
  console.error('❌ Error reading database:', error.message);
  console.error('\nMake sure the database exists. Run: npm run db:init');
  process.exit(1);
}
