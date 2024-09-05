const userName = 'MASOUMA2023';
fetch (`https://api.github.com/users/${userName}/repos`)
.then(response => {
    if(response.ok){
        return response.json();
    } else {
        throw new Error("failed to fetch data!");
    }
    })
    .then(data => {
        console.log(data); // Log the response data to the console
        document.getElementById('api-data').textContent = 'Data fetched successfully! Check the console.';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('api-data').textContent = 'Error fetching data.';
    });
