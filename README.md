![screen of your app](https://via.placeholder.com/1000x300)

# EXCURSIONS FORM (API and FETCH)

&nbsp;

## Table of contents

[⭐ Overview](#⭐-overview)
  - [The challenge](#the-challenge)
  - [Instalation](#Installation-💿)
  - [Links](#links)
  - [Screenshot](#screenshot)

[💡 My process](#💡-my-process)
  - [Technologies](#Technologies)
  - [Solutions provided in the project](#Solutions-provided-in-the-project)
  - [Useful resources](#useful-resources)
  - [Copyrights](#copyrights)

[🙋‍♂️ Author](#🙋‍♂️-author)

[👏 Special Thanks](#👏-special-thanks)

&nbsp;

## ⭐ Overview

&nbsp;

### **The challenge:**

The challenge was to prepare application to manage the excursions. 
The application consists of two parts with separate panels dedicated to:

**`Client`**

Excursions booking panel enabling:
- ordering the excursions (by entering the number of tickets in the appropriate field of the form) including
    - data validation
    - adding excursions to the basket
    - updating the total price for the order
- order confirmation (by entering the name, surname and email address into the order field) including
    - data validation
    - sending the order to the database (API that is run thanks to JSON Server)
    - clear basket

Related files:
* `./src/index.html`
* `./src/js/client.js`
* `./src/css/client.css`

**`Admin`**

Excursions management panel enabling:
- adding excursions
- deleting excursions
- updating excursions

Related files:
- `./src/admin.html`
- `./src/js/admin.js`
- `./src/css/admin.css`

&nbsp;

### **Installation 💿**

The project uses [node](https://nodejs.org/en/), [npm](https://www.npmjs.com/), [webpack](https://webpack.js.org/) and compiler [babel](https://babeljs.io/setup#installation) as well as package [JSON-server](https://www.npmjs.com/package/json-server) and [whatwg-fetch](https://github.com/github/fetch).

Having them installed, type into the terminal: 
```
npm i
```
Then, you may run webpack typing in the terminal:

```
npm start
```
To run JSON-Server, type in the second terminal:
``` 
json-server --watch ./data/excursions.json
```
The client and admin versions are available using the following addresses:
- http://localhost:8080/admin.html - admin
- http://localhost:8080/index.html - client



### **Links:**
- [GitHub](https://github.com/kowackag/Excursion-Form.git)

### **Screenshot:**

&nbsp;
 
## 💡 My process

&nbsp;

### **Technologies:**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

&nbsp;
  
### **Solutions provided in the project:**
- HTML:
    - The project was built using semantic HTML5 markup.
- CSS:
    - The css styles (`client.css` and` admin.css`) are loaded into `<head>` section  thanks to `webpack`, using the appropriate loader in `webpack.config.js` for files with the extension` .css`.
    - The form was made using CSS Grid layout.
    - It was prepared with Mobile-first approach.
- JS:
    - To store all communication with the API in one place, the class ExcursionsAPI was created (in the separated file `ExcursionsAPI.js`).
    - This class is used on both the `client` and` admin` sides and it was imported into both JS files responsible for each part.
    - Communication with API is based on `fetch()` method.
    - To run the project using browsers that do not support `fetch()` method, package `whatwg-fetch` was used.

&nbsp;
 
### **Conclusions for future projects:** 

I would like to improve the design skills to will be able to prepare  more eye-friendly and intuitive user interface during projecting future websites and apps. 

&nbsp;

### **Useful resources:**

- [Google Font](https://fonts.google.com/specimen/Poppins) - Font (`Poppins`)
- [Font Awesome](https://fontawesome.com/) - Icons. 

&nbsp;

## 🙋‍♂️ Author

The project was made by Małgorzata Kowacka.
- kowackag@gmail.com
- GitHub - [kowackag](https://github.com/kowackag)
- Linked - [Małgorzata Kowacka](https://www.linkedin.com/in/ma%C5%82gorzata-kowacka-0258a812a/)

 **If you have any questions do not hesitate to contact me.**

&nbsp;

## 👏 Special thanks  
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) - for providing me with this task and for code review.

