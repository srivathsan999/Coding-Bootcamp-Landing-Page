# GitHub Pages Setup Guide

## Quick Fix for 404 Errors

I've created the necessary files to fix GitHub Pages 404 errors:

1. **`.nojekyll`** - Disables Jekyll processing (required for GitHub Pages)
2. **`404.html`** - Custom 404 error page that redirects to the main site

## Configuration Steps

### Option 1: Serve from Root (Recommended)

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
4. Click **Save**

The root `index.html` will automatically redirect to `bootcamp-site/index.html`.

### Option 2: Serve from bootcamp-site folder

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/bootcamp-site`
4. Click **Save**

**Note**: If using this option, you may need to update the component loader paths in `assets/js/main.js` to use absolute paths instead of relative paths.

## Verify Setup

After configuration:
1. Wait 1-2 minutes for GitHub Pages to build
2. Visit: `https://[your-username].github.io/[repository-name]/`
3. You should be redirected to the main site

## Troubleshooting

- **Still seeing 404?** Clear your browser cache and try again
- **Components not loading?** Check browser console for CORS errors
- **Images not showing?** Verify all image paths are relative to the HTML files

