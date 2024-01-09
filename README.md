# Employee Tracker

## Description
This is a program built with Node.js and MySQL which allows the user to track and manage employees.

## Installation
Before running the program, the user must install Inquirer 8.2.4, MySQL2, and Dotenv (optional) from package.json by entering ```npm i``` into the terminal. Next, the user must enter their MySQL password either in the password section of index.js, or in the DB_PASSWORD section of the .env file. Finally, the database needs to be created and seeded by typing ```mysql -u root -p``` into the terminal followed by the user's MySQL password to open MySQL. Once there, the user can run schema.sql and seeds.sql by entering ```source db/schema.sql``` followed by ```source db/seeds.sql``` in the terminal. After all of that, the program can be started by entering ```node server``` in the terminal.

## Usage
Upon opening the program, the user can select a task from a list of options, such as viewing all employees, departments, or roles, creating or updating an employee, or creating a new department or role. To exit the program, scroll down and select 'Quit'.  
![Screenshot of webpage](<./employee.png>)

## Credits
How to copy one data from one table to another: https://stackoverflow.com/questions/11168402/mysql-copy-selected-fields-from-one-table-to-another
ChatGPT helped construct code to get around the "can't specify target table for update in from clause" error

## License
Please refer to the LICENSE in the repo.

## Source Code Locations
index.js: ./index.js   
schema.sql & seeds.sql: ./db/schema.sql ./db/seeds.sql   

## Walkthrough Video
https://drive.google.com/file/d/1TjG6dRq4q2AlsC5r6ISaN6Yk4Rwj2eVQ/view?usp=sharing