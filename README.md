# Talker Manager 🎤

## Description

Talker Manager is a backend application designed to manage "talker" individuals. It provides routes to retrieve talker information and includes user authentication via a login route. 🚀

## Features

- **Get all talkers**: Retrieve a list of all talkers. 📜
- **Get talker by ID**: Fetch details of a specific talker using their ID. 🔍
- **User authentication**: Log in with email and password to receive a token. 🔑

## Routes

### `POST /login`

- **Request Body**:
  - `email` (string): The user's email address. ✉️
  - `password` (string): The user's password. 🔒

- **Responses**:
  - `200 OK`: Returns a token if the credentials are valid. ✅
  - `400 Bad Request`: Returns an error message if validation fails (e.g., missing fields or invalid email format). ❌

### `GET /talkers`

- **Responses**:
  - `200 OK`: Returns an array of all talkers. 📊
  - `204 No Content`: If there are no talkers available. 🚫

### `GET /talkers/:id`

- **Parameters**:
  - `id` (number): The ID of the talker. 🆔

- **Responses**:
  - `200 OK`: Returns the talker object if found. 🎉
  - `404 Not Found`: Returns an error message if the talker does not exist. ⚠️

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Dependencies

This project requires the following npm packages:

- `chai@4.3.4` 🧪
- `eslint-config-trybe-backend@1.0.1` 📏
- `eslint@6.8.0` 📝
- `express-rescue@1.1.30` 🛡️
- `express@4.17.1` 🚀
- `frisby@2.1.3` 🥇
- `jest@26.6.1` ✅
- `mocha@8.4.0` ☕
- `mysql2@2.3.3` 🐬
- `nodemon@2.0.15` 🔄
- `nyc@15.1.0` 🌍
- `sinon@11.1.1` 🕵️

## Usage

To start the server, use:

```bash
npm run start
```

For development, you can use:

```bash
npm run dev
```

## Testing

This project uses Mocha and Chai for testing. You can run the tests with:

```bash
npm test
```

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request. 🙌

## License

This project is licensed under the MIT License. 📄
