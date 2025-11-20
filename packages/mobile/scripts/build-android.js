#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ANDROID_DIR = path.join(__dirname, '../android');
const APK_PATH = path.join(ANDROID_DIR, 'app/build/outputs/apk/release/app-release.apk');
const AAB_PATH = path.join(ANDROID_DIR, 'app/build/outputs/bundle/release/app-release.aab');

function log(message) {
  console.log(`\n📱 ${message}\n`);
}

function error(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function success(message) {
  console.log(`\n✅ ${message}\n`);
}

function checkPrerequisites() {
  log('Checking prerequisites...');

  // Check if Android directory exists
  if (!fs.existsSync(ANDROID_DIR)) {
    error('Android directory not found. Are you in the mobile package directory?');
  }

  // Check if gradle wrapper exists
  const gradlewPath = path.join(ANDROID_DIR, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
  if (!fs.existsSync(gradlewPath)) {
    error('Gradle wrapper not found. Please ensure Android project is properly set up.');
  }

  // Check if gradle.properties exists for release build
  const gradlePropsPath = path.join(ANDROID_DIR, 'gradle.properties');
  if (!fs.existsSync(gradlePropsPath)) {
    console.warn('⚠️  Warning: gradle.properties not found. Release signing may fail.');
    console.warn('   See ANDROID_DISTRIBUTION.md for setup instructions.');
  }

  success('Prerequisites check passed');
}

function cleanBuild() {
  log('Cleaning previous builds...');
  try {
    const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
    execSync(`cd ${ANDROID_DIR} && ${gradlew} clean`, { stdio: 'inherit' });
    success('Clean completed');
  } catch (err) {
    error('Clean failed: ' + err.message);
  }
}

function buildAPK() {
  log('Building release APK...');
  log('This may take a few minutes...');
  
  try {
    const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
    execSync(`cd ${ANDROID_DIR} && ${gradlew} assembleRelease`, { stdio: 'inherit' });
    
    if (fs.existsSync(APK_PATH)) {
      const stats = fs.statSync(APK_PATH);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      success(`APK built successfully!`);
      console.log(`📦 Size: ${sizeMB} MB`);
      console.log(`📁 Location: ${APK_PATH}`);
    } else {
      error('APK file not found after build');
    }
  } catch (err) {
    error('Build failed: ' + err.message);
  }
}

function buildAAB() {
  log('Building release AAB (App Bundle)...');
  log('This may take a few minutes...');
  
  try {
    const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
    execSync(`cd ${ANDROID_DIR} && ${gradlew} bundleRelease`, { stdio: 'inherit' });
    
    if (fs.existsSync(AAB_PATH)) {
      const stats = fs.statSync(AAB_PATH);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      success(`AAB built successfully!`);
      console.log(`📦 Size: ${sizeMB} MB`);
      console.log(`📁 Location: ${AAB_PATH}`);
    } else {
      error('AAB file not found after build');
    }
  } catch (err) {
    error('Build failed: ' + err.message);
  }
}

function showHelp() {
  console.log(`
📱 Android Build Script

Usage:
  node scripts/build-android.js [command]

Commands:
  apk       Build release APK (for direct distribution)
  aab       Build release AAB (for Google Play Store)
  both      Build both APK and AAB
  clean     Clean previous builds
  help      Show this help message

Examples:
  node scripts/build-android.js apk
  node scripts/build-android.js aab
  node scripts/build-android.js both

For more information, see ANDROID_DISTRIBUTION.md
  `);
}

// Main execution
const command = process.argv[2] || 'help';

switch (command.toLowerCase()) {
  case 'apk':
    checkPrerequisites();
    cleanBuild();
    buildAPK();
    break;
  
  case 'aab':
    checkPrerequisites();
    cleanBuild();
    buildAAB();
    break;
  
  case 'both':
    checkPrerequisites();
    cleanBuild();
    buildAPK();
    buildAAB();
    break;
  
  case 'clean':
    checkPrerequisites();
    cleanBuild();
    break;
  
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  
  default:
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}
