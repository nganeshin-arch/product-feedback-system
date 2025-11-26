# Build Order Fix - Render Deployment

## Problem
The backend deployment on Render was failing because it tried to build the backend before the shared package was compiled. This caused TypeScript import errors since the backend depends on types from `@feedback-system/shared`.

## Solution
Updated `render.yaml` to build packages in the correct order using workspace commands:

1. Install all workspace dependencies from root (sets up proper workspace linking)
2. Build shared package using workspace command
3. Initialize database
4. Build backend

## Changes Made

### render.yaml
Changed the build command from:
```bash
npm install && node scripts/init-db.js && npm run build
```

To:
```bash
cd ../.. && npm install && npm run build --workspace=@feedback-system/shared && cd packages/backend && node scripts/init-db.js && npm run build
```

This ensures:
- All workspace dependencies are installed from root (critical for monorepo linking)
- Shared package TypeScript types are compiled first
- Backend can import from `@feedback-system/shared` during its build
- No duplicate `npm install` that breaks workspace links

### RENDER_DEPLOYMENT_GUIDE.md
Updated the deployment guide to reflect the new build command and added a note explaining why the shared package must be built first.

## Next Steps

If you're deploying to Render:
1. The changes are already pushed to GitHub
2. Render will automatically detect the updated `render.yaml`
3. Next deployment will use the correct build order
4. If you have an existing service, trigger a new deploy to apply the fix

## Testing
The build should now complete successfully without TypeScript import errors.
