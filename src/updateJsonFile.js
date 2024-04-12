const fs = require('fs');

// Read current data from JSON file
fs.readFile('userData.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        const userData = JSON.parse(data);

        // Extract username from URL parameters
        const queryString = process.argv[2]; // Assuming URL parameters are passed as command-line arguments
        const urlParams = new URLSearchParams(queryString);
        const username = urlParams.get('username');

        // Check if the username matches the room creator
        if (userData.data.userCreatorName === username) {
            userData.data.userCreatorName = username;
        } else {
            // Check if the username is in the list of joined users
            if (!userData.data.userJoinedName.includes(username)) {
                userData.data.userJoinedName.push(username);
            }
        }

        // Write updated data back to JSON file
        fs.writeFile('userData.json', JSON.stringify(userData, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }
            console.log('JSON file has been updated.');
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
