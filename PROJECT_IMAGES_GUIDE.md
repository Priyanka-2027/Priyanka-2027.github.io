# IMPORTANT: Replace Placeholder Files with Real Screenshots

## Current Issue
The files in `/projects/` folder are placeholder text files, not actual images. That's why you don't see any background images in your portfolio.

## Quick Fix Steps

### 1. Delete Current Placeholder Files
Delete these placeholder files from `/projects/` folder:
- insightx.png (currently just contains "placeholder" text)
- eamcet.png (currently just contains "placeholder" text)
- pawmatch.png (currently just contains "placeholder" text)
- travellora.png (currently just contains "placeholder" text)
- fraud-detection.png (currently just contains "placeholder" text)
- career-reboot.png (currently just contains "placeholder" text)

### 2. Add Your Real Project Screenshots
Replace them with your actual project screenshots using the EXACT same filenames:

```
portfolio/
├── index.html
├── styles.css
├── script.js
├── projects/          ← Replace files in this folder
│   ├── insightx.png          ← Real InsightX screenshot
│   ├── eamcet.png            ← Real EAMCET screenshot
│   ├── pawmatch.png          ← Real PawMatch screenshot
│   ├── travellora.png        ← Real Travellora screenshot
│   ├── fraud-detection.png   ← Real Fraud Detection screenshot
│   └── career-reboot.png     ← Real Career Reboot screenshot
└── resume_1_5.pdf
```

**Recommended Image Specs:**
- **Size**: 1200px × 675px (16:9 aspect ratio)
- **Format**: PNG or JPG
- **File Size**: Keep under 500KB for fast loading
- **Content**: Main UI/dashboard of your project

**What to Screenshot:**
- InsightX AI: Prediction interface or results page
- EAMCET Predictor: Rank input form or college results
- PawMatch: Pet listing page or adoption interface
- Travellora: Trip planning interface or destination view
- Fraud Detection: Dashboard or analysis results
- Career Reboot AI: Main dashboard or career analysis page

### 3. Add Images to HTML

Find each project card in `index.html` and add `background-image` to the style attribute:

**Before:**
```html
<div class="project-image" style="--img-color:#a855f7">
```

**After:**
```html
<div class="project-image" style="--img-color:#a855f7; background-image: url('/projects/insightx.png')">
```

### 4. Complete Example

```html
<!-- Card 1 - InsightX AI -->
<div class="project-card">
    <div class="project-image" style="--img-color:#a855f7; background-image: url('/projects/insightx.png')">
        <div class="project-img-inner">
            <span class="project-img-icon">🧠</span>
            <span class="project-img-label">InsightX AI</span>
        </div>
        <div class="project-number">#01</div>
    </div>
    <!-- rest of card -->
</div>
```

## Image URLs for Each Project

Copy these and add to each project card:

1. **InsightX AI**: `background-image: url('/projects/insightx.png')`
2. **EAMCET Predictor**: `background-image: url('/projects/eamcet.png')`
3. **PawMatch**: `background-image: url('/projects/pawmatch.png')`
4. **Travellora**: `background-image: url('/projects/travellora.png')`
5. **Fraud Detection**: `background-image: url('/projects/fraud-detection.png')`
6. **Career Reboot AI**: `background-image: url('/projects/career-reboot.png')`

## Tips for Best Results

### Taking Screenshots
1. Open your project in browser
2. Set browser width to 1200px (use DevTools)
3. Capture the main interface
4. Crop to 1200×675px

### Optimizing Images
- Use tools like TinyPNG or Squoosh to compress
- Keep file size under 500KB
- Use PNG for UI with text, JPG for photos

### Design Tips
- Show the most impressive part of your project
- Include some data/content (not empty states)
- Make sure text is readable in the screenshot
- Use consistent styling across all screenshots

## Current Setup

Your portfolio is already configured to support images:
- ✅ CSS updated with background-image support
- ✅ Dark overlay for text readability
- ✅ Gradient glow effect maintained
- ✅ Increased height to 180px for better visibility
- ✅ Fallback gradient if no image provided

## Testing

After adding images:
1. Open index.html in browser
2. Check that images load correctly
3. Verify text (icon, label, number) is still readable
4. Test hover effects still work
5. Check responsive design on mobile

## Fallback

If you don't have screenshots yet, the cards will still look great with:
- Colored gradient backgrounds
- Icons and labels
- Project numbers
- All existing styling intact

No images? No problem! The portfolio looks professional either way.
