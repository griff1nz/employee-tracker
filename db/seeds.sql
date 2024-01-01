INSERT INTO department (name)
VALUES ('Sales'),
('Legal'),
('Finance'),
('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', '2100', '1'),
('Sales Lead', '2200', '1'),
('Accountant', '9999', '3'),
('Account Manager', '42069', '3'),
('Cease And Desist Deliveryman', '99999999', '2'),
('CEO of Legality (Manager)', '53295732', '2'),
('Software Engineer', '1', '4'),
('Software Manager', '2', '4');

UPDATE role r /*https://stackoverflow.com/questions/11168402/mysql-copy-selected-fields-from-one-table-to-another*/
JOIN department d ON r.department_id = d.id
SET r.department_name = d.name 
WHERE r.department_id = d.id;

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Sally', 'Saleswoman', '1', '2'),
('Mark', 'Mastermind', '2'),
('Mary', 'Mathematician', '3'),
('Alex', 'Accuracy', '4'),
('Shigeru', 'Miyamoto', '5'),
('Lisa', 'Legality', '6'),
('Dave', 'The Basement Dweller', '7'),
('Cody', 'Coder', '8');
