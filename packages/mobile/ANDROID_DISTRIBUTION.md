# Android App Distribution Guide

This guide explains how to build and distribute the Product Feedback System Android app.

## Prerequisites

- Android Studio installed on Windows 10 Pro
- Java Development Kit (JDK) 11 or higher
- Android SDK with Build Tools
- Node.js and npm installed
- Project dependencies installed (`npm install`)

## Build Configurations

The app is configured with two build variants:

### Debug Build
- Used for development and testing
- Includes debugging tools
- Signed with debug keystore
- Larger APK size

### Release Build
- Optimized for production
- Minified and obfuscated (optional)
- Requires release keystore
- Smaller APK size

## Building a Release APK

### Step 1: Generate a Release Keystore

If you don't have a release keystore, generate one:

```bash
cd packages/mobile/android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted to enter:
- Keystore password (remember this!)
- Key password (remember this!)
- Your name and organization details

**Important:** Keep your keystore file and passwords secure! You'll need them for all future app updates.

### Step 2: Configure Gradle Properties

Create or edit `packages/mobile/android/gradle.properties` and add:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

**Security Note:** Never commit `gradle.properties` with real passwords to version control!

### Step 3: Build the Release APK

#### Option A: Using Gradle (Command Line)

```bash
cd packages/mobile/android
./gradlew assembleRelease
```

On Windows:
```cmd
cd packages\mobile\android
gradlew.bat assembleRelease
```

The APK will be generated at:
```
packages/mobile/android/app/build/outputs/apk/release/app-release.apk
```

#### Option B: Using Android Studio

1. Open `packages/mobile/android` in Android Studio
2. Select **Build > Generate Signed Bundle / APK**
3. Choose **APK**
4. Select your keystore file and enter passwords
5. Choose **release** build variant
6. Click **Finish**

### Step 4: Test the Release APK

Before distribution, test the APK on a physical device:

```bash
adb install packages/mobile/android/app/build/outputs/apk/release/app-release.apk
```

Or drag and drop the APK file onto an Android device.

## Building an Android App Bundle (AAB)

For Google Play Store distribution, use AAB format:

```bash
cd packages/mobile/android
./gradlew bundleRelease
```

The AAB will be generated at:
```
packages/mobile/android/app/build/outputs/bundle/release/app-release.aab
```

## Distribution Methods

### Method 1: Direct APK Distribution

**Pros:**
- No app store required
- Immediate distribution
- Full control

**Cons:**
- Users must enable "Install from Unknown Sources"
- No automatic updates
- Manual distribution

**Steps:**
1. Build release APK (see above)
2. Upload APK to your website or file hosting service
3. Share download link with users
4. Provide installation instructions

### Method 2: GitHub Releases

**Pros:**
- Version control integration
- Easy to track releases
- Free hosting

**Steps:**
1. Build release APK
2. Go to your GitHub repository
3. Click **Releases > Create a new release**
4. Tag version (e.g., `v1.0.0`)
5. Upload APK file
6. Write release notes
7. Publish release

Users can download from: `https://github.com/your-username/your-repo/releases`

### Method 3: Google Play Store

**Pros:**
- Official distribution channel
- Automatic updates
- Better discoverability
- User reviews and ratings

**Cons:**
- $25 one-time registration fee
- App review process (1-3 days)
- Must comply with Play Store policies

**Steps:**
1. Create Google Play Developer account
2. Build release AAB (not APK)
3. Create app listing with screenshots and description
4. Upload AAB
5. Complete store listing
6. Submit for review

## Version Management

Update version in `packages/mobile/android/app/build.gradle`:

```gradle
defaultConfig {
    applicationId "com.productfeedback"
    versionCode 2          // Increment for each release
    versionName "1.0.1"    // User-visible version
}
```

**Version Code:** Integer that must increase with each release
**Version Name:** User-friendly version string (e.g., "1.0.1")

## APK Size Optimization

### Enable ProGuard

In `packages/mobile/android/app/build.gradle`:

```gradle
def enableProguardInReleaseBuilds = true
```

This will:
- Remove unused code
- Obfuscate code
- Reduce APK size by 30-50%

### Enable App Bundle

Use AAB instead of APK for smaller downloads:
- Google Play automatically generates optimized APKs
- Users download only what they need
- Can reduce size by 15-20%

### Remove Unused Resources

Add to `android` block in `build.gradle`:

```gradle
buildTypes {
    release {
        shrinkResources true
        minifyEnabled true
    }
}
```

## Testing Checklist

Before distributing, test:

- [ ] App installs successfully
- [ ] Login/signup works
- [ ] Product list loads
- [ ] Product details display correctly
- [ ] Review submission works
- [ ] Moderation features work (for moderators)
- [ ] Offline mode works
- [ ] App doesn't crash on back button
- [ ] Network errors handled gracefully
- [ ] App works on different screen sizes
- [ ] App works on Android 8.0+ devices

## Installation Instructions for Users

### For APK Distribution

1. **Enable Unknown Sources:**
   - Go to Settings > Security
   - Enable "Install from Unknown Sources" or "Install Unknown Apps"
   - Select your browser/file manager

2. **Download APK:**
   - Download the APK file from the provided link
   - File will be in Downloads folder

3. **Install:**
   - Tap the downloaded APK file
   - Tap "Install"
   - Wait for installation to complete
   - Tap "Open" to launch the app

4. **First Launch:**
   - Grant any requested permissions
   - Sign up or log in
   - Start using the app!

### Troubleshooting

**"App not installed" error:**
- Uninstall any previous version
- Clear download cache
- Restart device and try again

**"Parse error" message:**
- Re-download the APK (file may be corrupted)
- Ensure device meets minimum requirements (Android 8.0+)

**App crashes on launch:**
- Clear app data: Settings > Apps > Product Feedback > Clear Data
- Reinstall the app
- Check internet connection

## Security Best Practices

1. **Keystore Security:**
   - Store keystore in a secure location
   - Use strong passwords
   - Never commit keystore to version control
   - Keep backup of keystore (you can't recover it!)

2. **Code Signing:**
   - Always sign release builds
   - Use same keystore for all updates
   - Losing keystore means you can't update the app

3. **API Security:**
   - Use HTTPS for all API calls
   - Don't hardcode API keys in the app
   - Use environment variables for sensitive data

## Continuous Integration

### GitHub Actions Workflow

Create `.github/workflows/android-build.yml`:

```yaml
name: Android Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd packages/mobile
          npm install
      
      - name: Build APK
        run: |
          cd packages/mobile/android
          ./gradlew assembleRelease
      
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-release
          path: packages/mobile/android/app/build/outputs/apk/release/app-release.apk
```

## Support and Updates

### Releasing Updates

1. Update version code and version name
2. Build new release APK/AAB
3. Test thoroughly
4. Distribute through same channel
5. Notify users of update

### Monitoring

- Monitor crash reports
- Collect user feedback
- Track app performance
- Plan regular updates

## Additional Resources

- [Android Developer Guide](https://developer.android.com/studio/publish)
- [React Native Documentation](https://reactnative.dev/docs/signed-apk-android)
- [Google Play Console](https://play.google.com/console)

## Quick Reference

### Build Commands

```bash
# Debug APK
cd packages/mobile/android && ./gradlew assembleDebug

# Release APK
cd packages/mobile/android && ./gradlew assembleRelease

# Release AAB
cd packages/mobile/android && ./gradlew bundleRelease

# Install on device
adb install path/to/app-release.apk

# Check APK size
ls -lh packages/mobile/android/app/build/outputs/apk/release/app-release.apk
```

### File Locations

- **Release APK:** `packages/mobile/android/app/build/outputs/apk/release/app-release.apk`
- **Release AAB:** `packages/mobile/android/app/build/outputs/bundle/release/app-release.aab`
- **Keystore:** `packages/mobile/android/app/my-release-key.keystore`
- **Gradle Properties:** `packages/mobile/android/gradle.properties`

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub.
