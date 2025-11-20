# Product Feedback Mobile App

React Native Android application for the Product Feedback System.

## ✨ Features

- 📱 Native Android application
- 🔐 User authentication (Login/Signup)
- 📦 Browse products with search
- ⭐ View product details and reviews
- ✍️ Submit reviews with ratings
- 👮 Moderation dashboard (for moderators)
- 💾 AsyncStorage for offline data
- 🔄 Pull-to-refresh functionality
- 🎨 Clean, modern UI

## 📋 Prerequisites

- Node.js 18.x or higher
- Android Studio
- Android SDK (API 28 or higher)
- Java Development Kit (JDK) 11 or higher
- Windows 10 Pro (or other OS with Android development tools)

## 🚀 Setup

### 1. Install Dependencies

```bash
cd packages/mobile
npm install
```

### 2. Configure API URL

Create a `.env` file (or copy from `.env.example`):

```env
# For Android Emulator
API_URL=http://10.0.2.2:3000/api

# For Physical Device (use your computer's IP)
# API_URL=http://192.168.1.100:3000/api
```

**Note**: `10.0.2.2` is the special IP that Android emulator uses to access `localhost` on the host machine.

### 3. Start Backend Server

Make sure your backend is running:

```bash
# From project root
cd packages/backend
npm run dev:server
```

Backend should be running on `http://localhost:3000`

### 4. Start Metro Bundler

```bash
npm start
```

### 5. Run on Android

**Option A: Android Emulator**
1. Open Android Studio
2. Start an Android Virtual Device (AVD)
3. Run:
```bash
npm run android
```

**Option B: Physical Device**
1. Enable USB debugging on your Android device
2. Connect device via USB
3. Run:
```bash
npm run android
```

## 📱 Screens

### Authentication
- **LoginScreen**: Email/password login
- **SignupScreen**: Create new account

### Main App
- **HomeScreen**: Product list with search
- **ProductDetailScreen**: Product details, reviews, and review submission
- **ModerationScreen**: Pending reviews management (moderators only)

## 🏗️ Project Structure

```
packages/mobile/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx       # Authentication state management
│   ├── navigation/
│   │   └── AppNavigator.tsx      # React Navigation setup
│   ├── screens/
│   │   ├── LoginScreen.tsx       # Login screen
│   │   ├── SignupScreen.tsx      # Signup screen
│   │   ├── HomeScreen.tsx        # Product list
│   │   ├── ProductDetailScreen.tsx  # Product details
│   │   └── ModerationScreen.tsx  # Moderation dashboard
│   ├── services/
│   │   └── api.ts                # Axios API client
│   └── App.tsx                   # Root component
├── android/                      # Android native code
├── package.json
└── README.md
```

## 🔧 Building APK

### Debug APK

```bash
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK

1. Generate a signing key (first time only):
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Configure signing in `android/app/build.gradle`

3. Build release APK:
```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

## 🔐 Default Credentials

**Moderator Account:**
- Email: `moderator@example.com`
- Password: `admin123`

**Test User Account:**
- Email: `user@example.com`
- Password: `user123`

## 🐛 Troubleshooting

### Metro Bundler Issues

```bash
# Clear cache
npm start -- --reset-cache
```

### Android Build Issues

```bash
# Clean build
cd android
./gradlew clean
cd ..
npm run android
```

### Cannot Connect to API

1. **Emulator**: Use `10.0.2.2` instead of `localhost`
2. **Physical Device**: 
   - Use your computer's IP address
   - Ensure device and computer are on same network
   - Check firewall settings

### Port Already in Use

```bash
# Kill process on port 8081
npx react-native start --port 8082
```

## 📦 Dependencies

- `@react-navigation/native` - Navigation
- `@react-navigation/native-stack` - Stack navigator
- `@react-native-async-storage/async-storage` - Local storage
- `axios` - HTTP client
- `@feedback-system/shared` - Shared types

## 🎯 Features Implemented

- ✅ User authentication with JWT
- ✅ Product browsing and search
- ✅ Product details with reviews
- ✅ Review submission with star ratings
- ✅ Moderation dashboard
- ✅ Offline data persistence
- ✅ Pull-to-refresh
- ✅ Loading states and error handling

## 🚧 Future Enhancements

- [ ] Google OAuth integration
- [ ] Image caching
- [ ] Offline review submission queue
- [ ] Push notifications
- [ ] Dark mode
- [ ] iOS support

## 📝 Notes

- The app uses AsyncStorage for token persistence
- API calls automatically include JWT tokens
- Token refresh is handled automatically
- Moderator features are only visible to moderators

## 🤝 Contributing

See the main project [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT - See [LICENSE](../../LICENSE) for details.
