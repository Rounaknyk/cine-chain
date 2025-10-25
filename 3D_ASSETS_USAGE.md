# 🎨 3D Assets Usage Guide

## 📁 **Centralized 3D Assets Configuration**

All 3D objects and scenes are now managed through the centralized configuration file: `src/data/3DAssets.ts`

## 🚀 **Quick Start**

### **1. Adding Real Spline Scenes**
To replace CSS fallbacks with real 3D scenes, simply update the `sceneUrl` in `src/data/3DAssets.ts`:

```typescript
// Example: Update heroLogistics asset
heroLogistics: {
  id: 'hero-logistics',
  name: 'Hero Logistics Scene',
  description: 'Main hero section 3D scene...',
  category: 'hero',
  sceneUrl: 'https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode', // ← Add your Spline URL here
  // ... rest of configuration
}
```

### **2. Using Assets in Components**

#### **3D Hero Component**
```typescript
// Automatically uses heroLogistics, heroWarehouse, heroDelivery
<ThreeDHero />
```

#### **3D Logistics Component**
```typescript
// Option 1: Using asset ID (recommended)
<ThreeDLogistics
  assetId="networkGlobal"
  title="3D Supply Network"
  description="Interactive network visualization"
/>

// Option 2: Using direct scene URL
<ThreeDLogistics
  sceneUrl="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode"
  title="Custom 3D Scene"
  description="Your custom description"
/>
```

## 🎯 **Available Assets**

### **Hero Section Assets**
- `heroLogistics` - Main logistics hero scene
- `heroWarehouse` - Warehouse operations hero
- `heroDelivery` - Delivery-focused hero

### **Network Visualization**
- `networkGlobal` - Global supply network
- `networkRegional` - Regional network view

### **Warehouse Operations**
- `warehouseOperations` - Warehouse interior
- `warehouseEfficiency` - Efficiency metrics

### **Delivery & Tracking**
- `deliveryTracking` - Real-time tracking
- `deliverySuccess` - Success animations

### **Logistics Operations**
- `logisticsFlow` - End-to-end flow
- `logisticsAnalytics` - Analytics dashboard

## 🛠️ **Configuration Options**

### **Asset Properties**
```typescript
interface ThreeDAsset {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  description: string;           // Detailed description
  category: 'hero' | 'logistics' | 'network' | 'warehouse' | 'delivery';
  sceneUrl: string | null;      // Spline scene URL (null for CSS fallback)
  fallbackElements: string[];   // CSS fallback emojis
  animations: string[];          // Available animations
  interactions: string[];       // Interactive features
  performance: 'low' | 'medium' | 'high';
  mobileOptimized: boolean;      // Mobile compatibility
  usage: string[];            // Where this asset is used
}
```

### **Performance Levels**
- **Low**: Simple animations, mobile-friendly
- **Medium**: Moderate complexity, good performance
- **High**: Complex scenes, desktop recommended

### **Mobile Optimization**
- `mobileOptimized: true` - Safe for mobile devices
- `mobileOptimized: false` - Desktop recommended

## 🎨 **Customization**

### **Adding New Assets**
```typescript
// Add to threeDAssets object in 3DAssets.ts
newAsset: {
  id: 'new-asset',
  name: 'New 3D Asset',
  description: 'Description of your new asset',
  category: 'logistics',
  sceneUrl: null, // Add Spline URL when ready
  fallbackElements: ['🚀', '⭐', '💫'],
  animations: ['float', 'pulse'],
  interactions: ['click', 'hover'],
  performance: 'medium',
  mobileOptimized: true,
  usage: ['custom-page']
}
```

### **Modifying Fallback Elements**
```typescript
// Update fallbackElements array
fallbackElements: ['🚚', '📦', '🏭', '🚛', '🌍', '✨'], // Add more elements
```

### **Adding New Categories**
```typescript
// Add new category to the union type
category: 'hero' | 'logistics' | 'network' | 'warehouse' | 'delivery' | 'custom';
```

## 🔧 **Helper Functions**

### **Get Asset by ID**
```typescript
import { getAssetById } from '@/data/3DAssets';

const asset = getAssetById('heroLogistics');
console.log(asset?.name); // "Hero Logistics Scene"
```

### **Check if Asset has Spline Scene**
```typescript
import { hasSplineScene } from '@/data/3DAssets';

const hasSpline = hasSplineScene('heroLogistics');
console.log(hasSpline); // true/false
```

### **Filter Assets by Category**
```typescript
import { assetCategories } from '@/data/3DAssets';

const heroAssets = assetCategories.hero;
const networkAssets = assetCategories.network;
```

### **Get Mobile-Optimized Assets**
```typescript
import { getMobileOptimizedAssets } from '@/data/3DAssets';

const mobileAssets = getMobileOptimizedAssets();
```

## 📱 **Performance Recommendations**

### **Mobile Devices**
- Use `performance: 'low'` assets
- Enable `mobileOptimized: true`
- Limit to 3 assets maximum
- Avoid complex animations

### **Desktop**
- Use `performance: 'medium'` or `'high'`
- Can handle more complex scenes
- Better interaction support

### **High-End Devices**
- Use `performance: 'high'` assets
- Full feature support
- Complex animations and interactions

## 🎯 **Usage Examples**

### **Role-Specific Dashboards**
```typescript
// Shipper Dashboard
<ThreeDLogistics assetId="warehouseOperations" />

// Recipient Dashboard  
<ThreeDLogistics assetId="deliveryTracking" />

// Operations Dashboard
<ThreeDLogistics assetId="networkGlobal" />
```

### **Performance-Based Selection**
```typescript
// For mobile users
const mobileAssets = getMobileOptimizedAssets();

// For high-performance needs
const highPerfAssets = getAssetsByPerformance('high');
```

## 🚀 **Migration Guide**

### **From Direct URLs to Asset IDs**
```typescript
// Old way
<ThreeDLogistics sceneUrl="https://prod.spline.design/..." />

// New way (recommended)
<ThreeDLogistics assetId="networkGlobal" />
```

### **Benefits of Centralized Configuration**
- ✅ **Easy Management**: All 3D assets in one place
- ✅ **Consistent Fallbacks**: Unified CSS fallback system
- ✅ **Performance Control**: Built-in performance management
- ✅ **Mobile Optimization**: Automatic mobile compatibility
- ✅ **Documentation**: Built-in descriptions and metadata
- ✅ **Type Safety**: Full TypeScript support

## 🎨 **Next Steps**

1. **Create Spline Account**: Sign up at [spline.design](https://spline.design)
2. **Design 3D Scenes**: Create scenes following the asset descriptions
3. **Update Scene URLs**: Replace `null` values with actual Spline URLs
4. **Test Performance**: Ensure smooth operation on target devices
5. **Customize Fallbacks**: Modify CSS animations as needed

---

**Your 3D assets are now centrally managed and ready for easy customization!** 🎬✨

