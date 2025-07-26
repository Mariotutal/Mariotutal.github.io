# Fonts Directory

Place your custom font files here for optimal loading with Next.js.

## Recommended Structure:
```
fonts/
├── YourFont-Light.woff2
├── YourFont-Regular.woff2
├── YourFont-Medium.woff2
├── YourFont-Bold.woff2
├── YourFont-Italic.woff2
└── YourDisplayFont-Bold.woff2
```

## Best Practices:
- Use `.woff2` format for best compression
- Include multiple weights if needed
- Use descriptive, consistent naming
- Consider variable fonts for smaller bundle size

## Loading:
After adding files here, update:
1. `src/lib/fonts.ts` - Define font loading
2. `src/app/layout.tsx` - Add to body className
3. `src/styles/common.css` - Update CSS variables

See `FONT_LOADING_GUIDE.md` for detailed instructions.
