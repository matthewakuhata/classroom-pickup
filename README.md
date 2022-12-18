<div id="top"></div>

<br />
<div align="center">
    <h3 align="center">Student Pickup</h3>
</div>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a mongo atlas database at [https://www.mongodb.com/home](https://www.mongodb.com/home)
2. Clone the repo
   ```sh
   git clone git@github.com:matthewakuhata/classroom-pickup.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `server/.env`
   ```
   MONGO_API_CONNECT='ENTER YOUR API';
   ```
5. Start server and client
   ```
   cd /server npm run start
   cd /client npm run start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ABOUT THE PROJECT -->

## About The Project

React SPA using Browser Router to navigate between registration and home pages.
Can search for a registration plate and student related to that plate will be highlighted
and checkable.

You Can register a new Licence plate /register using a licence plate and selecting some students.

Also there is the option to change the associated licence plates for each student.

### Licence Plates Registered:

```
[
"G4DUQQB",
"8OZLE87",
"T3QU501",
"07F1CSV",
"J0UJ2D7",
"2KUCYEP",
"1L7GZK5",
"K2U5NKF",
"AJL91VY",
"JIVMY9C",
"2KUEDFP"
]
```

#### Example Plates

- Multiple students same class - G4DUQQB
- Multiple students different classes - 8OZLE87
- Many Licence Plates related to one student - [AJL91VY, JIVMY9C]
- Single student A - 07F1CSV
- Single student B - J0UJ2D7

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

- ReactJS
- NodeJs
- Express
- MongoDB

<p align="right">(<a href="#top">back to top</a>)</p>

## TODOs

- [] Add tooltip on student row.
- [] Extract formState and Validation.
- [] Create Reusable form components.
- [x] Unit test Backend code

<p align="right">(<a href="#top">back to top</a>)</p>
