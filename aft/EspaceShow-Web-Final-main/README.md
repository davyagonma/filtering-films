This is a Next JS - Prisma -PostgreSQL projet for Espace Show +

##The development server (only in local):

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

## Getting Started

Dependancies installations
```bash
npm install 
#or 
yarn install
#or
pnpm install
#or
bun dev
```

###After installation, we create a database and update the .env file (DATABASE_URL) with the right information


ex: dbprovider://username:password@hostname:port/dbname?schema=public

```
NB: the dbprovider must be mysql or postgresql. 
Make sure you have provided the correct information (username,password, hostname,port,dbname)
```
After creating the database, you run the following command:
```bash
npm run primsa
#or
npx prisma migrate deploy
```
This command will migrate the tables (schemas) from our prisma relations schemas to the created database

Now, you will run the following command to build and start the project in production mode:
```bash
npm run build #to build the project
```
After building, 
```bash
npm start #to start the project in production mode
```




Dev -- @MCDev30