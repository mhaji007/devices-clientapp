# Simple RMM Client

A system that partially mimics a simple RMM client. Users can manage devices by performing simple CRUD operations (create, read, update and delete). Each device has 4 fields (id, system name, type & HDD capacity). Users can filter devices by type and can sort devices by system name or HDD capacity (GB).

## Application Architecture
This application is built using ReactJS. Each screen is divided into separate components. Each component has a JS file and (optionally) a CSS file. 

### Styling
CSS modules are used for styling to reduce side effects and conflicts. All styles are custom written.

### React Router
React router v6 is used to create the following routes:

* /  ==> (Home, displays list of all devices)

* /add ==> (Add Device, form to add a new device)

*  /edit/:id ==> (Edit Device, form to edit an existing device)

* /delete/:id ==> (Delete Device, delete an existing device)

Routes are used instead of modals for adding, editing and deleting confirmation. This is to take advantage of browser's built-in back/forward functionality to change views. I think this design makes for a better approach when scalability and maintainability is the top concern as each component houses its own logic and api calls. Using modals might lead to complexities in file management and restrict code reuse.

### Other npm modules
*	axios
*	react-multi-select-component
*	react-icons

## Installation
⚠️ 
Please download or clone the following repository in order to use the server for this client app before you proceed. <https://github.com/NinjaMSP/devicesTask_serverApp>
⚠️

1.	Extract the devices-clientapp-main.zip file.  
2.	Open the terminal and navigate to devices-clientapp project directory by entering the following command


```bash
cd devices-clientapp-main
```
3.	Run the following command to install dependencies 

```bash
npm install 
```

To run the application: 

1.	Open the terminal and navigate to devices-clientapp project directory 
```bash
cd devices-clientapp-main
```
2.	Run the following command to spin up the server
```bash
npm start 
```

## To Do
* Add unit/integration tests
* Add loading indicators
* Responsive design

## Contributing
Pull requests are welcome.

## License
[MIT](https://choosealicense.com/licenses/mit/)
