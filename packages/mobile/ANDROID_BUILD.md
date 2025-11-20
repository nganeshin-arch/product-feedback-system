# Android App Build and Distribution Guide

## Building APK for Distribution

### Prerequisites

1. **Android Studio** installed
2. **JDK 11** or higher
3. **Android SDK** (API 26+)
4. **Gradle** (comes with Android Studio)

### Step 1: Generate Signing Key (First Time Only)

Open terminal in `packages/mobile/android/app`:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted for:
- Keystore password (remember this!)
- Key password (remember this!)
- Your name, organization, etc.

This creates `my-release-key.keystore` file.

### Step 2: Configure Signing

Create `~/.gradle/gradle.properties` (in your home directory):

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your-keystore-password
MYAPP_RELEASE_KEY_PASSWORD=your-key-password
```

**Important**: Keep this file secure and never commit it to git!

### Step 3: Build Release APK

#### Option A: Using Gradle (Command Line)

```bash
cd packages/mobile/android
./gradlew assembleRelease
```

On Windows:
```bash
cd packages\mobile\android
gradlew.bat assembleRelease
```

#### Option B: Using Android Studio

1. Open `packages/mobile/android` in Android Studio
2. Select **Build** → **Generate Signed Bundle / APK**
3. Choose **APK**
4. Select your keystore file
5. Enter passwords
6. Choose **release** build variant
7. Click **Finish**

### Step 4: Locate the APK

The APK will be at:
```
packages/mobile/android/app/build/outputs/apk/release/app-release.apk
```

### Step 5: Test the APK

#### On Emulator:
```bash
adb install packages/mobile/android/app/build/outputs/apk/release/app-release.apk
```

#### On Physical Device:
1. Enable "Install from Unknown Sources" on your device
2. Transfer APK to device
3. Open and install

### Step 6: Create GitHub Release

1. Go to your GitHub repository
2. Click **Releases** → **Create a new release**
3. Tag version: `v1.0.0`
4. Release title: `Product Feedback v1.0.0 - Android`
5. Upload the APK file
6. Add release notes
7. Publish release

## Build Variants

### Debug Build
```bash
cd android
./gradlew assembleDebug
```
- Faster build
- Includes debugging tools
- Larger file size
- Not optimized

### Release Build
```bash
cd android
./gradlew assembleRelease
```
- Optimized and minified
- Smaller file size
- Requires signing key
- Production-ready

## Troubleshooting

### Build Failed: "SDK location not found"

Create `android/local.properties`:
```properties
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### Build Failed: "Execution failed for task ':app:validateSigningRelease'"

Check that:
- Keystore file exists
- Passwords are correct in `gradle.properties`
- Key alias matches

### APK Won't Install

- Uninstall any previous versions
- Check Android version (requires Android 8.0+)
- Enable "Install from Unknown Sources"

### App Crashes on Launch

- Check API_URL in `.env`
- Ensure backend is accessible
- Check logs: `adb logcat`

## Distribution Options

### Option 1: GitHub Releases (Recommended for MVP)
- Upload APK to GitHub Releases
- Users download and install manually
- Free and simple
- Good for testing and small user base

### Option 2: Google Play Store
- Requires Google Play Developer account ($25 one-time fee)
- More professional
- Automatic updates
- Wider reach
- Requires app review process

### Option 3: Direct Distribution
- Host APK on your website
- Share download link
- Users install manually
- No fees or review process

## APK Optimization

### Reduce APK Size

1. **Enable Proguard** (already configured):
```gradle
minifyEnabled true
```

2. **Enable App Bundle** (for Play Store):
```bash
./gradlew bundleRelease
```

3. **Remove unused resources**:
```gradle
shrinkResources true
```

### Performance Tips

- Use Hermes engine (already enabled)
- Optimize images
- Remove unused dependencies
- Enable code splitting

## Version Management

Update version in `android/app/build.gradle`:

```gradle
defaultConfig {
    versionCode 2        // Increment for each release
    versionName "1.0.1"  // Semantic versioning
}
```

## Security Checklist

- [ ] Keystore file is secure and backed up
- [ ] Passwords not committed to git
- [ ] API URL points to production backend
- [ ] Debug logging disabled in release
- [ ] Sensitive data not hardcoded
- [ ] HTTPS used for API calls

## Installation Instructions for Users

Include these in your GitHub Release:

```markdown
## Installation Instructions

1. Download `app-release.apk` from this release
2. On your Android device, go to Settings → Security
3. Enable "Install from Unknown Sources" or "Install Unknown Apps"
4. Open the downloaded APK file
5. Tap "Install"
6. Open the app and enjoy!

**Requirements**: Android 8.0 (API 26) or higher

**Default Credentials**:
- User: user@example.com / user123
- Moderator: moderator@example.com / admin123
```

## Next Steps

After building the APK:

1. **Test thoroughly** on multiple devices
2. **Create GitHub Release** with APK
3. **Write release notes**
4. **Share download link**
5. **Gather user feedback**
6. **Iterate and improve**

## Support

For build issues:
- Check Android Studio logs
- Run `./gradlew --stacktrace assembleRelease` for detailed errors
- Verify all prerequisites are installed
- Check the main project documentation

---

**Status**: Ready to build and distribute! 🚀
