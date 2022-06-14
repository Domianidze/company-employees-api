## Admin Panel Api
 
Admin Panel Api - is an Api where you can add / modify / read / delete companies and their employees.

### Table of Contents

* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Resources](#resources)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)

### Prerequisites

* <img src="./readme/assets/img/nodejs.png" height="15" style='padding-right: 10px'> *Node JS @16.14.2*
* <img src="./readme/assets/img/npm.png" height="15" style='padding-right: 10px'/> *npm 8.5.0*

### Tech Stack

* <img src="./readme/assets/img/express.png" height="15"  style='padding-right: 10px'> [Express @4.18.1](https://expressjs.com/) - nodejs framework
* <img src="./readme/assets/img/mongoose.png" height="15"  style='padding-right: 10px'> [Mongoose @6.3.6](https://mongoosejs.com/) - mongodb library
* <img src="./readme/assets/img/swagger.png" height="15"  style='padding-right: 10px'> [Swagger @4.4.0](https://swagger.io/) - rest api ui

### Resources

*  [Project Details](https://redberry.gitbook.io/assignment-iii-admin-panel-api/)
*  [Git Commit Rules](https://redberry.gitbook.io/resources/git-is-semantikuri-komitebi)

### Getting Started

1\. First of all clone the repository from github:
```sh
git clone https://github.com/RedberryInternship/company-employees-api-Domianidze.git
```

2\. Secondly install all the dependencies:
```sh
npm install
```

3\. Then create the config file and insert the data:
```sh
cp .env.example .env
```

### Project Structure

```bash
├─── readme # readme assets
├─── src # source codes
│   ├─── bin # script files
│   ├───├─── script.js # script file
│   ├─── config # config files
│   ├───├─── config.js # config file
│   ├─── controllers # controller files
│   ├───├─── controller.js # controller file
│   ├─── middleware # middleware files
│   ├───├─── middleware.js # middleware file
│   ├───├─── index.ts # export all middlewares 
│   ├─── models # mongoose model files
│   ├───├─── model.js # model file
│   ├───├─── index.ts # export all models 
│   ├─── routes # route files
│   ├───├─── route.js # route file
│   ├───├─── index.ts # export all routes 
│   ├─── schemas # joi schema files 
│   ├───├─── schema.js # schema file
│   ├───├─── index.ts # export all schemas 
│   ├─── server.js # nodejs server
- .env-example # config file example
- .gitignore # git ignore file
- .eslintrc.json # eslint config file
- .prettierrc.json # prettier config file
- package.json # dependency manager configurations
- package-lock.json # dependency manager configurations
- README.md # readme file
```

