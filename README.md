# Required Node Version
Node Version: v16.14.0

# How to clone this on local machine (my machine is windows)
git clone https://github.com/RiyasaatAhmed/ecom.git

# How to setup and start the project
## Step 1: Having the correct Node Version
Make sure you have Node Version: v16.14.0 on your machine,
If you don't the node version then you can change you node version by using NVM(Node Version Manager)
Command to change the node version
nvm use 16.14.0

## Step 2: Cloning the project
Open your cmd and type git clone https://github.com/RiyasaatAhmed/ecom.git and hit enter

## Step 3: Install the project
Navigate to the project folder, open cmd, type npm i and hit enter, this would install the project on you local machine

## Step 4: Running the fake json-server (Backend)
json-server is used as the backend for this project.
In order to run it, type "npx json-server -p 3500 -w data/db.json" on cmd and hit enter.
This will run the server on port 3500 of your machine

## Step 5: Running the Frontend

## Available Scripts

In the project directory, you can run:

## Start the Project
Type: npm run start
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Test the project
# Test all the files
npm run test

# Test a specific file
npm run test fileName.tsx
the command of running the tests of homepage is
npm run test Home.test.tsx

# Test the coverage
npm run test:coverage


