# Screenshot Notes

## Splash Screen (current)
- Background: deep purple (#1A0B2E) ✅
- Duck mascot emoji centered ✅
- TRAVI logo text below ✅
- 3 loading dots (purple gradient) ✅
- Looks good! But stuck on splash — need auto-navigate to Welcome after 2.5s

The splash has useEffect with setTimeout to navigate to welcome after 2500ms.
Need to verify the navigation is working — might be blocked by the Redirect in index.tsx.
