INSERT INTO department (name)
VALUES ('Sales'),
('Legal'),
('Finance'),
('Engineering');

INSERT INTO role (title, salary, department_name)
VALUES ('Salesperson', '2100', 'Sales'),
('Sales Lead', '2200', 'Sales'),
('Accountant', '9999', 'Finance'),
('Account Manager', '42069', 'Finance'),
('Cease And Desist Deliveryman', '99999999', 'Legal'),
('CEO of Legality (Manager)', '53295732', 'Legal'),
('Software Engineer', '1', 'Engineering'),
('Software Manager', '2', 'Engineering');

UPDATE role r /*https://stackoverflow.com/questions/11168402/mysql-copy-selected-fields-from-one-table-to-another*/ 
JOIN department d ON r.department_name = d.name
SET r.department_id = d.id
WHERE r.department_name = d.name;

INSERT INTO employee (first_name, last_name, role_name, is_manager, manager)
VALUES ('Sally', 'Saleswoman', 'Salesperson', false, 'Mark Mastermind'),
('Mark', 'Mastermind', 'Sales Lead', true, NULL),
('Mary', 'Mathematician', 'Accountant', false, 'Alex Accuracy'),
('Alex', 'Accuracy', 'Account Manager', true, NULL),
('Shigeru', 'Miyamoto', 'Cease And Desist Deliveryman', false, 'Lisa Legality'),
('Lisa', 'Legality', 'CEO of Legality (Manager)', true, NULL),
('Dave', 'The Basement Dweller', 'Software Engineer', false, 'Cody Coder'),
('Cody', 'Coder', 'Software Manager', true, NULL);

UPDATE employee e /*https://stackoverflow.com/questions/11168402/mysql-copy-selected-fields-from-one-table-to-another*/
JOIN role r ON e.role_name = r.title
SET e.role_id = r.id 
WHERE e.role_name = r.title;

UPDATE employee e 
SET e.manager_id = (
    SELECT id FROM (
        SELECT id, CONCAT(first_name, ' ', last_name) AS full_name
        FROM employee /* Thanks ChatGPT */
    ) AS e2
    WHERE e2.full_name = e.manager
)
WHERE e.manager IS NOT NULL;


