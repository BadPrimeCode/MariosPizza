console.log('restaurant.js sourced');
$(document).ready(function() {
    console.log('jq document ready');

    // arrays
    var tables = [];
    var employees = [];


    $('#createEmployee').on('click',function() {
        console.log('in createEmployee');
        // get user input
        var employeeFirstName = document.getElementById('employeeFirstNameIn').value;
        var employeeLastName = document.getElementById('employeeLastNameIn').value;
        // create object for employee
        var newEmployee = {
            request: 'from client',
            firstName: employeeFirstName,
            lastName: employeeLastName
        }; // end object
        // ajax call to post route
        $.ajax({
            type: 'POST',
            url: '/addEmployee',
            data: newEmployee,
            success: function(data) {
                    console.log('get this back from server:', data);
                } // end success
        }); // end ajax
        // push into employees array
        employees.push(newEmployee);
        // update display
        listEmployees();
    }); // end createEmployee

    $('#createTable').on('click',function() {
        console.log('in createTable');
        // get user input
        var tableName = document.getElementById('nameIn').value;
        var tableCapacity = document.getElementById('capacityIn').value;
        // table object for new table
        var newTable = {
            request: 'from client',
            'name': tableName,
            'capacity': tableCapacity,
            'server': -1,
            'status': 'empty'
        };
        // ajax call to post route
        $.ajax({
            type: 'POST',
            url: '/addTable',
            data: newTable,
            success: function(data) {
                    console.log('get this back from server:', data);
                } // end success
        }); // end ajax
        // push new object into tables array
        tables.push(newTable);
        console.log('added table: ' + newTable.name);
        // update output
        listTables();
    }); // end createTable

    var cycleStatus = function(index) {
        console.log('in cycleStatus: ' + index);
        // move table status to next status
        switch (tables[index].status) {
            case 'empty':
                tables[index].status = 'seated';
                break;
            case 'seated':
                tables[index].status = 'served';
                break;
            case 'served':
                tables[index].status = 'dirty';
                break;
            case 'dirty':
                break;
            default:
                tables[index].status = 'empty';
        }
        // show tables on DOM
        listTables();
    }; // end cycleStatus

    var listEmployees = function() {
        console.log('in listEmployees', employees);
        document.getElementById('employeesOutput').innerHTML = '<ul>';
        // make ajax call to listEmployees route and show results
        // no body needed for get call
        $.ajax({
          url: '/listEmployees',
          type: 'GET',
          success: function( data ){
            // data is returned json array from server
            console.log( 'success in ajax:', data );
          }
        }); //end ajax
        // loop through the employees array and display each employee
        for (i = 0; i < employees.length; i++) {
            var line = employees[i].firstName + " " + employees[i].lastName + ', id: ' + i;
            // add line to output div
            document.getElementById('employeesOutput').innerHTML += '<li>' + line + '</li>';
        }
        document.getElementById('employeesOutput').innerHTML += '</ul>';
        // update employees display
    }; // end listEmployees

    var listTables = function() {
        console.log("in listTables");
        // target our output div
        document.getElementById('tablesOutput').innerHTML = '';
        // make ajax call to listTables route and show results
        // no body needed for get call
        $.ajax({
          url: '/listTables',
          type: 'GET',
          success: function( data ){
            // data is returned json array from server
            console.log( 'success in ajax:', data );
          }
        }); //end ajax
        // loop through the tables array and display each table
        // select to assign a server to this table
        var selectText = '<select>';
        for (var i = 0; i < employees.length; i++) {
            selectText += '<option value=' + i + '>' + employees[i].firstName + ' ' + employees[i].lastName + '</option>';
        }
        selectText += '</select>';
        // display employees
        for (i = 0; i < tables.length; i++) {
            // status is a button that, when clicked runs cycleStatus for this table
            var line = tables[i].name + " - capacity: " + tables[i].capacity + ', server: ' + selectText + ', status: <button onClick="cycleStatus(' + i + ')">' + tables[i].status + "</button>";
            // add line to output div
            document.getElementById('tablesOutput').innerHTML += '<p>' + line + '</p>';
        }
    }; // end listTables
}); //end document ready
