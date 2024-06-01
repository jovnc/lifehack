This project is a submission to LifeHack 2024 under the theme: Food Security.

For more information about the project. please refer to the ["https://devpost.com/software/supplysmart-by-75-nus"](Devpost).

## Getting Started

This project uses Python Flask (>3.7 and < 3.11) and Next.JS (14.2.1).

### Setting up the project

git clone the project into your personal workspace

```
git clone https://github.com/jovnc/lifehack.git
```

#### Flask Application

Make sure that you change to the Flask directory (`cd flask`) and you are always working on the Flask directory in the terminal.

1. Create python virtual environment (make sure Python version >3.7 and < 3.11)

2. Activate the python virtual environment

3. Install the pip dependencies

```
pip install -r requirements.txt
```

4. Run the Flask application on port 5000

```
flask run
```

#### Next.JS application

Make sure that you change to the NextJS directory (`cd nextjs`) and you are always working on the NextJS directory in the terminal.

1. Inside the .env file, setup the environment variables, you will need your own API keys for this. The database needs to be a postgres database (can either be hosted or locally)

```
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
AUTH_SECRET="I1QoPkdPjSeRIy4F//U63BErsQ8WlAKQZC8twCOOCZo="

GITHUB_ID=""
GITHUB_SECRET=""

GOOGLE_ID=""
GOOGLE_SECRET=""

RESEND_API_KEY=""


DATABASE_URL=""
```

2. Install node dependencies

```
npm install
```

3. Setup prisma client and database (for first time connection)

```
npx prisma db push
npx prisma generate
```

4. Run the development server on port 3000

```
npm run dev
```
