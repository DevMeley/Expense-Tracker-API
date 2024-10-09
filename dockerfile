# 1. Use the Node.js v20 image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the package.json and package-lock.json files to the container
COPY package.json ./

# 4. Install any necessary dependencies
RUN npm install 

# 5. Copy the rest of your application code to the container
COPY . .

# 6. Expose the port your app will run on (if your app listens on this port).
EXPOSE 2000

# 7. Command to run your application
CMD ["node", "npm","app.js"] 