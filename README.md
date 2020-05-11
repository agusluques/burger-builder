
# React
## Prerequisites

 - **Docker**
	 - Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
	 - [Dockerfile](./Dockerfile) creates an image based on NodeJS
 
 - **NodeJS** 
	 - Install [Node.js]([https://nodejs.org/en/](https://nodejs.org/en/))

*Note:* you can install **only one** of these tools and it will work

## Run Project

### 1. With Docker:

In the project directory, you can run:

- ### `docker build -t <image_name>:<image_tag> .`

This will build an image named `<image_name>` with `<image_tag>` tag with the Dockerfile located in `.`(*actual directory*).

*Note: if you also have installed Node, you can run `npm run d_build`*

Once the image is built, you can run:

- ### `docker run -it --rm -p 8080:3000 <image_name>:<image_tag>`

This will run your created image `<image_name>:<image_tag>` inside a container. 

`-it`: runs container in **interactive mode**

`--rm`: removes container after it stops

`-p 8080:3000`: links your project port *3000* to *8080*

*Note: if you also have installed Node, you can run `npm run d_run`*

- ### Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
 
 ### 2. With Node:
In the project directory, you can run:

- ### `npm start`

This will run the project in the development mode by executing the command `node scripts/start.js` which will run all command in [start.js](./scripts/start.js).

*Note*: The page will reload if you make edits and you will also see any lint errors in the console.

- ### Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Apps

 - [Burger Builder](./src/Apps/BurgerBuilderApp/README.md)
 - [TicTacToe](./src/Apps/TicTacToeApp/README.md)
