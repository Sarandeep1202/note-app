# Step 1: Use an official Node.js image from Docker Hub
FROM node:16

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (for faster builds)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all other files into container
COPY . .

# Step 6: Tell Docker the port your app will run on
EXPOSE 3000

# Step 7: Command to start the app
CMD ["npm", "start"]


