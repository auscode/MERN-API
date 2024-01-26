// Importing the QueryString library
const QueryString = require("qs");

// Function to generate HTML table dynamically
function generateTable(data) {
  // Creating a table element with header row
  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Flight Number</th>
      <th>Mission Name</th>
      <th>Launch Year</th>
      <th>Launch Date</th>
      <th>Rocket Name</th>
      <th>Launch Success</th>
      <th>Mission Patch</th>
    </tr>
  `;

  // Populating the table with launch data
  data.forEach((launch) => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${launch.flight_number}</td>
      <td>${launch.mission_name}</td>
      <td>${launch.launch_year}</td>
      <td>${new Date(launch.launch_date_utc).toLocaleDateString()}</td>
      <td>${launch.rocket.rocket_name}</td>
      <td>${launch.launch_success ? "Yes" : "No"}</td>
      <td><a href="${
        launch.links.mission_patch
      }" target="_blank">Mission Patch</a></td>
    `;
  });

  return table.outerHTML;
}

// Function to apply filters and fetch data from the server
async function applyFilters() {
  // Retrieving filter values from the DOM
  const launchYear = document.getElementById("launchYear").value;
  const launchSuccess = document.getElementById("launchSuccess").value;
  const searchCategory = document.getElementById("searchCategory").value;
  const searchInput = document.getElementById("searchInput").value;

  // Creating an object with filter values
  const filters = {
    launch_year: launchYear,
    launch_success: launchSuccess,
    [searchCategory]: searchInput,
  };

  // Generating a query string from the filter object
  const queryString = Object.entries(filters)
    .filter(([key, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  try {
    // Fetching data from the server based on filters
    const response = await fetch(
      `http://127.0.0.1:3000/api/launches?${queryString}`
    );
    const data = await response.json();

    // Rendering the results in the result container
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML =
      data.length === 0 ? "No matching launches found." : generateTable(data);
  } catch (error) {
    console.error(error);
  }
}
