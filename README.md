# Menu Allergen App

This app aims to allow a restaurant owner/chef to upload a menu which includes a comprehensive ingredient list, identifying all allergens. It will tag the ingredients as necessary or optional and allow a user to filter a full menu based on their individual needs.

## Fire up the server

This project uses Express and Mongoose, connecting to a database on mLab. To enable use with your own database, you will need to add a custom config file to the project which can be imported, containing your sign in credentials

cd into api-server and run `npm install` for dependencies, followed by `npm start` to launch the server.
Calls made to the server are on default PORT 8000, for use with PostMan or other API calling methods

## Run the React dev environment

cd into menu-fend and run `npm install` for dependencies, followed by `npm start`. Your default browser should open to view the page, or you can navigate to http://localhost:3000 (default).

## Task List

- Add a user read-only account for the open source test version so that users can view my implementation without being able to edit it
- Implement API calling to download the data for a particular restaurant (required for later)
- Implement a form for adding Allergens (universal)
- Implement a form for adding ingredients and attaching allergens to them (maybe universal. Perhaps associate a brand name with them for a reference?)
- Implement a form for adding Menu Items, linking ingredients and an "optional" attribute for those that can be omitted (based on the recipe)
- Create some test versions of the above on the remote server, implementing the API for realistic input
