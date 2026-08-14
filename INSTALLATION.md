# TokiPlayer - مکمل سیٹ اپ گائیڈ 🎵

## تمام Features شامل ہیں

✅ **Local Storage (AsyncStorage)** - تمام ڈیٹا device میں محفوظ رہتا ہے
✅ **File Picker** - Document Picker سے فائلیں منتخب کریں
✅ **Search Functionality** - عنوان سے میڈیا تلاش کریں
✅ **Favorites System** - پسندیدہ میڈیا save کریں
✅ **Share Feature** - میڈیا کو دوسروں کے ساتھ شیئر کریں
✅ **Categories** - مختلف categories میں organize کریں
✅ **Auto-Load** - App start کرتے وقت سب ڈیٹا load ہو جاتا ہے
✅ **GitHub Actions** - Automatic APK building

---

## Installation & Setup

### 1️⃣ Prerequisites
```bash
- Node.js 16+ (https://nodejs.org)
- Android Studio (https://developer.android.com/studio)
- Android SDK API 31+
- Java JDK 11+
- Git
```

### 2️⃣ Clone Repository
```bash
git clone https://github.com/wazykhan/TokiPlayer.git
cd TokiPlayer
git checkout dev
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Setup Android Environment
```bash
# Android SDK Path
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Or add to ~/.bashrc or ~/.zshrc for permanent setup
```

---

## Running the App

### On Android Emulator
```bash
npm start
# In another terminal:
npm run android
```

### On Physical Device
```bash
# Connect device via USB with USB Debugging enabled
adb devices  # Verify connection
npm run android
```

### Metro Bundler Troubleshooting
```bash
npm start -- --reset-cache
```

---

## Building APK

### Debug APK (Testing)
```bash
npm run build-apk-debug
```

**Output:** `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (Production)
```bash
npm run build-apk
```

**Output:** `android/app/build/outputs/apk/release/app-release.apk`

---

## Project Structure

```
TokiPlayer/
├── src/
│   ├── screens/
│   │   ├── PlayerScreen.tsx      ⭐ Main player
│   │   ├── CategoriesScreen.tsx  📁 Categories
│   │   └── SettingsScreen.tsx    ���️ Settings
│   ├── components/
│   │   ├── MediaSwipeView.tsx    📺 Media display
│   │   ├── PlayerControls.tsx    ⏯️ Controls
│   │   ├── CategoryBottomSheet.tsx 📂 Category picker
│   │   ├── FavoriteButton.tsx    ❤️ Favorites
│   │   ├── SearchBar.tsx         🔍 Search
│   │   └── FilePickerComponent.tsx 📁 File picker
│   ├── store/
│   │   ├── mediaStore.ts         🧠 Zustand state
│   │   └── storageService.ts     💾 AsyncStorage
│   ├── utils/
│   │   ├── fileScanner.ts        🔎 File scanning
│   │   └── shareUtil.ts          📤 Share function
│   ├── types/
│   │   └── index.ts              📋 TypeScript types
│   └── App.tsx                   🚀 Root component
├── android/                      📱 Native code
├── package.json
├── app.json
├── tsconfig.json
└── README.md
```

---

## Features Explanation

### 🎵 Local Storage
- تمام media items AsyncStorage میں save ہوتے ہیں
- Categories اور favorites محفوظ رہتے ہیں
- App بند کرنے کے بعد بھی data باقی رہتا ہے

```typescript
// Storage Service استعمال
import {storageService} from '../store/storageService';

// Save کریں
await storageService.saveMediaItems(items);

// Load کریں
const items = await storageService.getMediaItems();
```

### 📁 File Picker
```typescript
// FilePickerComponent استعمال کریں
import FilePickerComponent from '../components/FilePickerComponent';

<FilePickerComponent onFilesSelected={() => {}} />
```

### 🔍 Search
```typescript
const {searchMedia, filteredItems} = useMediaStore();

searchMedia('query');  // فائلیں تلاش کریں
// filteredItems میں نتائج ملیں گے
```

### ❤️ Favorites
```typescript
const {addFavorite, removeFavorite, isFavorite} = useMediaStore();

addFavorite(mediaId);
if (isFavorite(mediaId)) {
  // Favorite ہے
}
```

### 📤 Share
```typescript
import {shareUtil} from '../utils/shareUtil';

await shareUtil.shareLink(mediaItem);
```

---

## Permissions Required

Android میں یہ permissions شامل ہیں (`app.json`):

```json
"permissions": [
  "READ_EXTERNAL_STORAGE",
  "WRITE_EXTERNAL_STORAGE",
  "ACCESS_MEDIA_LOCATION"
]
```

---

## Common Issues & Solutions

### ❌ Metro Bundler Not Starting
```bash
npm start -- --reset-cache
```

### ❌ Gradle Build Fails
```bash
cd android
./gradlew clean
./gradlew build
cd ..
npm run android
```

### ❌ Device Not Detected
```bash
adb devices
adb reverse tcp:8081 tcp:8081
```

### ❌ Permission Denied (Android 6+)
- Runtime permissions automatically requested
- Check device Settings > Apps > TokiPlayer > Permissions

### ❌ "Cannot find module" Error
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## State Management (Zustand)

```typescript
import {useMediaStore} from '../store/mediaStore';

const MyComponent = () => {
  const {
    mediaItems,
    filteredItems,
    favorites,
    addMediaItem,
    searchMedia,
    addFavorite,
    loadData,
  } = useMediaStore();

  // اپنے operations یہاں کریں
};
```

---

## Environment Setup for CI/CD

GitHub Actions میں automatic APK building:

1. Repository میں push کریں
2. Actions workflow چلے گا
3. APK build ہوگی اور artifact میں save ہوگی

---

## Useful Commands

```bash
# Start development
npm start

# Run on Android
npm run android

# Build debug APK
npm run build-apk-debug

# Build release APK
npm run build-apk

# Run tests
npm test

# Lint code
npm run lint

# Clean build
cd android && ./gradlew clean && cd ..
```

---

## Development Tips

1. **Hot Reload:** Cmd/Ctrl + M, پھر 'Enable Hot Reload'
2. **Debugging:** Cmd/Ctrl + M, پھر 'Debug'
3. **Logs:** `adb logcat | grep ReactNative`
4. **File Locations:** 
   - Music: `/sdcard/Music/`
   - Videos: `/sdcard/Movies/`
   - Documents: `/sdcard/Documents/`

---

## Next Steps

- [ ] Add more categories
- [ ] Implement queue/playlist system
- [ ] Add equalizer controls
- [ ] Dark/Light theme toggle
- [ ] Export/Import functionality
- [ ] Cloud sync (Firebase)

---

## Support

کسی مسئلے کے لیے issues بنائیں یا discussions میں سوال کریں۔

**GitHub:** https://github.com/wazykhan/TokiPlayer
**Email:** wasim.mbit@gmail.com

---

## License

MIT