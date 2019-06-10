# cli
A command line tool for a coding challenge.

## Requirements
This is a node application and is build on v12. Should be compatible with v10 LTS (TESTED).

1. [node.js](https://nodejs.org/)


## Using the tool
1. This command line tool is an interactive session based tool. You will be asked few questions to generate a search query. Once the tool has all the parameters, it will show you the result. Once the result is shown, you can either continue to use the tool with new parameters or quit.

## Setting up
1. Make sure you have installed node.
2. Install dependencies - `npm install`

### Running test
1. Run all tests - `npm test`
2. Run tests with coverage - `npm run coverage

Info: Root folder of 'cla' is the folder where package.json file resides

### Option 1
1. Run the command `npm link` from the root folder of 'cla' to install the command line tool.
2. Run `zendesk-cla` in the same command line interface or a new cli to start the application.

### Option 2
1. From the root folder of 'cla', run `chmod +x ./src/index.js`.
2. Run the command line tool - `./src/index.js`.

### Option 3
If you have issues, you can run the tool using node - `node ./src/index.js` or `npm start`.

## Assumptions
1. Operator understands how to use command line. He/She also knows about what are all the various options represent.
2. The first object in every json file has all the keys as no official API documentation was provided.
3. Not using any database and using in memory objects to store data. My assumption is that using database would make this application hard to setup even if I use docker which is not the aim of a command line application. Installing node is easy.

## Conventions
1. Class names in UpperCamelCase
2. Variable names in camelCase
3. Constants are CAPITALISED
4. Add trailing comma on objects spanning multiple lines
5. Use single try..catch around a group of async/await calls unless it is necessary not to.
6. Objects should have singular names and Arrays should have plural names
7. JSHint installed globally and use default settings.
8. Try to manage type instead of using ===. But, use of === is also fine if need be. == helps bad API look good.

### Tradeoff
1. Performance is a tradoff as we are not managing data using a database. Database can make search easier, indexing and managing relationships easier.
