# Collaboration Document Assessment

## Dependencies
- docker-compose
[Docker compose install guide](https://docs.docker.com/compose/install/)

## Run the project
After installing the repository execute the next command to build the environment locally
```
% docker-compose up --build
```
Then run the next commands to configure the database
```
% docker exec -it collaborativedoc-backend-1 sh -c "python3 manage.py makemigrations"
% docker exec -it collaborativedoc-backend-1 sh -c "python3 manage.py migrate"
```
### First user steps:
* open a browser tab to [http://localhost:3000/](http://localhost:3000/)
* Create the first user by clicking on "Sign up" button
* Fill out the requested information. Keep in mind that the username and password would be
requested to log in.
* After logging in, the session will redirect to Home.
* Create a new document by filling out the title and then clicking on "Create doc" button

### Second user steps:
* open guest profile browser to  [http://localhost:3000/](http://localhost:3000/)
* Create the second user by clicking on "Sign up" button
* Fill out the requested information and log in
* Open the file created by user 1

Now, it is time to type into any document for any session. You will see that changes are reflected in both places.

## Tech debt
* Fix DocumentScreen to accept spaces and break lines.
* Create an AuthProvider
* Add RBAC in backend documents view
* Add functionallity on document content

## Tests execution
Due to the Documents view calling' view sets.ModelViewSet` and the serializer not overriding any method, it wasn't necessary to add a test.


