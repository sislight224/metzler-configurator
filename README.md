This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
1. Create `.env.local` based on `.env.example`.
2. env variables are located https://confluence.web3dev.group/display/METZLER/Frontend
3. For installation node_modules

```bash
yarn install
```

4. Run the development server:
[.env.example](.env.example)
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Lint without fixing errors. By default, cache strategy is used.
```bash
yarn lint
```

Lint and fix errors.
```bash
yarn lint:fix
```
Lint and show only errors, without warnings.
```bash
yarn lint:quiet
```

Lint without using cache strategy.
```bash
yarn lint:no-cache
```

Typescript lint for CI
```bash
yarn ts-lint:ci
```


Start typescript check. Script will watch your changes as you develop
```bash
yarn ts-lint
```



