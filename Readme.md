# AWS AppSync Example
This repo sets out to demonstrate how to create an app sync backend and react frontend with cloudformation

## Setup

### Requirements
1. AWS account
2. AWS Cli installed
3. AWS Cli set up with a default user

### Deployment

First make a copy of the config file in the frontend
```
cd frontend && cp config.example.json && cd ..
```

Then install dependencies and deploy the backend
``` 
cd backend && npm install && cd src/posts/lambdaResolvers && npm install && ../../.. && sls deploy -v && cd ..
```

Copy the outputs of the stack deploy into frontend/config.json.
Now you can run the frontend

```
cd frontend && npm install && npm start
```