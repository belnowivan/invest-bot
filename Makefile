install:
	npm install

start:
	npx nodemon --exec npx babel-node src/bin/index.js

lint:
	npm run eslint .