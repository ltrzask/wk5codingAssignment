// Menu app for a manager to assign employees to shifts for a department store
 
class Employee {
    constructor(name, department) { //Employee's name and what department they will be working in (men's department ect.)
            this.name = name;
            this.department = department;
    }
    //use a describe method to describe the employee.
    describe() {
        return `${this.name} will work in ${this.department} department.`;
        }
    }
     
    //Make a class for the shift the employees will work: Opening, Mid or Closing shifts or whatever the manager needs
    class Schedule {
        constructor(shift) {
            this.shift = shift;
            this.employees = []; //Make an array to hold all the employees on that shift 
        }
     
        //making a method of add employee.
        addEmployee(employee){
            if(employee instanceof Employee) {  //need to check if an employee is an instance of the employee class.
                this.employees.push(employee);
            } else { //Add an Error so they can try and enter it correctly.
                throw new Error(` You can only add an instance of an employee. This is not an employee: ${employee}`);
            }
        }
        //Using method to describe what shift and how many employees are on that shift.
        describe() {
            return `${this.shift} has a ${this.employees.length} of employees.`;
        }
    }
     
    //Created a class for out menu.
    class Menu {
        constructor() {
            this.shifts = []; //Need to initialize our shifts, need an array of shifts because we will need multiple
            this.selectedShift = null; //Need to have a variable for the shift we have selected, We want to deal with one
                                        // shift at a time so we need to know which one we have selected.
        }
     
        //Method to start up the menu application,
        start(){
            let selection = this.showMainMenuOptions(); //show menu options
           
            while (selection != 0) { //Using 0 for exiting the application
              switch(selection){ //need to determine what the user us selected and do something for that selection
                case '1':
                    this.displayShifts(); //Option 1 will be display all shifts
                    break;
                case '2':
                    this.createShift(); //Option 2 will create a shift
                    break;
                case '3':
                    this.viewShift(); //Options 3 will be view a shift
                    break;
                case '4':
                    this.deleteShift(); //Option 4 will be to delete a shift
                    break;
                default:                //anything else will exit
                    selection = 0
              }          
              selection = this.showMainMenuOptions();
            }
     
            alert('Bye Bye!'); //if user selects 0 then this will show and it will stop the loop
        }
        //Method to prompt user for input and return that input
        //Also shows the user what options they have to choose from
        showMainMenuOptions() {
            return prompt(`
            0) Exit
            1) Display Shifts
            2) Create a Shift
            3) View a Shift
            4) Delete a shift
            `);
        }
     
        //This will prompt the use for input for adding or deleting an employee to/from a shift
        showShiftMenuOptions(shiftInfo) {
            return prompt(`
            0) Back
            1) Add an employee
            2) Delete an employee
            ---------------------------
            ${shiftInfo}
            `);
        }
     
        //Build a string that has the information for that shift
        displayShifts() {
            let shiftString = '';
     
            for (let i = 0; i < this.shifts.length; i++) { //This go through all the shifts
               shiftString += i + ') ' + this.shifts[i].shift + '\n';  
            }//This will grab each shift then have am index numbering the names of the shifts
            alert(shiftString); //this will display the names
        }
     
        //Method for creating a shift
        createShift() {
            let shift = prompt('Make a new shift for today'); //Will be prompted to create a shift
            this.shifts.push(new Schedule(shift)); //Will push that new shift into the Schedule
        }
     
        //Method to view a shift
        viewShift() {
            let index = prompt('Enter the index of the shift you want to view:')  //want to see the details of that shift
            if (index > -1 && index < this.shifts.length) { //Need to validate user input. Can't have them pick anything else but 0-4
                this.selectedShift = this.shifts[index]; //This will show the shifts that have been input
                let description = 'Shift assignment: ' + this.selectedShift.shift + '\n';
                
                //Using a for loop to got a description of the employees on the shift
                for (let i = 0; i < this.selectedShift.employees.length; i++) { //Each shift should iterate through the employees array
                  description += i + ') ' + this.selectedShift.employees[i].name //referencing the shift with one employee [i]
                   + ' - ' + this.selectedShift.employees[i].department + '\n';           
                   
                }
     
                //Show all the options for the shifts (subMenu)
                let selection = this.showShiftMenuOptions(description);
                switch (selection) {
                    case '1':
                        this.createEmployee();
                        break;
                    case '2':
                        this.deleteEmployee();
                        //Don't need a break because there is nothing that comes after these 2 options.
                }
            }
        }
        
        //Method to delete a shift
        deleteShift() {
            let index = prompt('Enter the index of the shift you wish to delete: ');
            if (index > -1 && index < this.shifts.length) {
                this.shifts.splice(index, 1); //using splice to remove an element from the shifts array
            }
        }

        //method to add an employee to a shift and what department they will be in for that shift
        createEmployee() {
            let name = prompt('Enter name of Employee: ');
            let department = prompt('Enter the department that employee will be in for this shift: ')
            this.selectedShift.employees.push(new Employee(name, department));
        }

        //method to delete an employee from a shift
        deleteEmployee() {
            let index = prompt('Enter the index of the employee you wish to delete form this shift: ');
            if (index > -1 && index < this.selectedShift.employees.length) { //once again need to validate user input
                this.selectedShift.employees.splice(index, 1); //using splice to remove one element from the employees array
            }
        }
    }
     
     
    //Need to create an instance of the Menu to be able to use it
    let menu = new Menu();
    menu.start();
    
    