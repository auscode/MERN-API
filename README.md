# SpaceX Launches Filter

This project allows users to filter SpaceX launches based on various criteria and displays the results in a dynamic table. Users can filter launches by launch year, launch success, and search for launches based on mission name or rocket name.

## Project Structure

The project is organized into the following directories and files:

- `public`: Contains static files (HTML, CSS, and JS) served by the server.
  - `index.html`: HTML file for the main user interface.
  - `style.css`: CSS file for styling the user interface.
  - `script.js`: JavaScript file for client-side logic.
- `src`: Contains the server-side JavaScript code.
  - `server.js`: Express server file that handles API requests and serves static files.

## Usage

- Launch the application by following the steps in the "How to Run the Project" section.
- Use the provided filters to narrow down SpaceX launches based on launch year, launch success, and search criteria.
- Click the "Apply Filters" button to fetch and display the filtered results.

## Dependencies

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [Axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for the browser and Node.js.
- [Cors](https://www.npmjs.com/package/cors): Express middleware to enable CORS (Cross-Origin Resource Sharing).

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).