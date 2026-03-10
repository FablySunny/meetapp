import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```
- Press **Ctrl+S**

---

## STEP 5 — Push to GitHub

In the terminal type these one at a time:
```
git add .
```
```
git commit -m "fix supabase package"
```
```
git push