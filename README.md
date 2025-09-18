This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Troubleshooting Slow Git Commits

When `git commit` takes unexpectedly long, it’s usually due to one (or more) of:

1. **Pre-commit hooks** (linting, formatting, tests) running over all files
2. **Repository size & history** (large blobs, node_modules, build directories)
3. **Editor fs-watchers** (VS Code rescanning large folders)

### Quick diagnosis

```bash
# Inside your repo
cd $(git rev-parse --show-toplevel)

# 1) Skip hooks to see if they’re the culprit
TIMEFORMAT='commit-without-hooks took %R seconds'
time git commit --allow-empty -m "bench" --no-verify

# 2) Check repo size
git count-objects -vH

# 3) Find biggest blobs
git rev-list --objects --all \
  | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize:padded) %(rest)' \
  | grep '^blob' \
  | sort -k3nr \
  | head -20
```

### Step-by-step fixes

1. **Optimize hooks**
   - If `--no-verify` is instant, speed up your pre-commit chain:
     - Use `eslint --cache` or lint-staged to only check changed files
     - Limit `next lint` to source directories (`next lint --dir src`)
     - Move heavy checks (type-check, full test suite) to CI

2. **Prune and compact**
   ```bash
git gc --prune=now --aggressive
```
   Remove or migrate large binaries to Git LFS and purge with `git filter-repo`.

3. **Exclude large folders from VS Code watchers**
   Create or update `.vscode/settings.json`:
   ```jsonc
   {
     "files.watcherExclude": {
       "**/node_modules/**": true,
       "**/.next/**": true,
       "**/dist/**": true
     },
     "git.autoRepositoryDetection": false
   }
   ```

4. **Tweak global Git config**
   ```bash
git config --global core.preloadIndex true
/git config --global core.fscache true
git config --global gc.auto 256  # auto-gc after 256 loose objects
```

5. **Optional: Bypass for WIP**
   - Use `git commit --no-verify` to skip hooks during rapid prototyping

Once optimized, commits should drop from minutes to seconds. If issues persist, share any stack traces or timings and we'll dig deeper.
