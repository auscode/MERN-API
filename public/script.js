const QueryString = require("qs");

// Function to generate HTML table dynamically
function generateTable(data) {
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

async function applyFilters() {
  const launchYear = document.getElementById("launchYear").value;
  const launchSuccess = document.getElementById("launchSuccess").value;
  const searchCategory = document.getElementById("searchCategory").value;
  const searchInput = document.getElementById("searchInput").value;
  console.log("SEARCH INPUT DATA");
  console.log(searchInput);

  const filters = {
    launch_year: launchYear,
    launch_success: launchSuccess,
    [searchCategory]: searchInput,
  };
  console.log("data::FILTER DATA");
  console.log(filters);

  const queryString = Object.entries(filters)
    .filter(([key, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  console.log("QUERY::QUERY DATA");

  try {
    const response = await fetch(
      `http://127.0.0.1:3000/api/launches?${queryString}`
    );
    const data = await response.json();
    console.log("response_data::FETCHED_DATA");
    console.log(data);

    const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    localStorage.setItem("myData", JSON.stringify({ data, expirationTime }));

    // Check and remove expired items
    const storedData = JSON.parse(localStorage.getItem("myData"));
    if (storedData && storedData.expirationTime < Date.now()) {
      // Remove the item from local storage
      localStorage.removeItem("myData");
    }

    // Render the results in a table
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML =
      data.length === 0 ? "No matching launches found." : generateTable(data);
  } catch (error) {
    console.error(error);
  }
}
