# Mario's Pizza
full stack group project for Prime Digital Academy

Stand-Up topics:

app.js:
*/changeEmployee* - create route and functionality
*/changeStatus* - create route and functionality

restaurant.js:
*listEmployees()* - in ajax success: store array of employee objects in the employees array to make sure it has the most up to date list from database
*listTables()* - in ajax success: store array of table objects in the tables array to make sure it has the most up to date list from database
*cycleStatus()* - add ajax post to send new table status to database
*listTables()* - in selectText, add an onclick to call another function [maybe changeEmployee()?] with an ajax post which will send the new server chosen to the database.

--------------------------------------------------------------------------------
* Since we're storing the employee information in a client side array, we need to get the server_id from the database and store it in that table.

app.js:
*/addEmployee* - need to add "RETURNING id" to the query

restaruant.js:
*createEmployee() ajax* - need to store the id in the newEmployee object before it is pushed to employees array.
--------------------------------------------------------------------------------
DISCUSSION:
*restaurant.js*: Luis is unsure what the "request: 'from client'" (in the newTable and newEmployee objects) is doing.  (I can totally accept that I've missed something important and that they are necessary/helpful!)
--------------------------------------------------------------------------------
DISCUSSION:
*restaurant.js*: In the POC had "server: -1" defaulted for new Table entries. We don't need to send that to the database... so do we just get rid of it?  (Maybe we add a server selector to the New Table inputs - as a stretch goal?)




Stretch goals:
* an "on duty" field for servers. Only servers that are on duty can be assigned to tables
* data integrity - disallow bad data from user( empty fields, duplicate inputs, etc)
* reports per employee - click on an employee and display only his/her assigned tables
* filter tables by status
* add a "take out"
* logic to choose employee by table capacity
