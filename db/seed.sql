-- company departments
INSERT INTO department (deptartment_name)
value
('Finance'),
('Engineering'),
('Stenography'),
('Quantum Entanglement');

-- department roles
INSERT INTO employee_role (job_title, salary, department_id)
VALUE 
('Mergers & Acquisitions', 100000, 1),
('Deritivates', 90000, 1),
('Investment Banker', 105000, 1),
('Computer Scientist', 112000, 2),
('Robotics Engineer', 130000, 2),
('Bio-Engineer', 50000, 2),
('Secretary', 300000, 3),
('Subatomic Specialist', 9999999, 4);

-- Current Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE
  ('Patrick', 'Bateman', 1, NULL),
  ('Paul', 'Allen', 2, 1),
  ('Evelyn', 'Williams', 3, 1),
  ('Craig', 'McDermott', 4, NUll),
  ('David', 'Van Patten', 5, 4),
  ('Timothy', 'Bryce', 6, NULL),
  ('Courtney', 'Rawlinson', 7, 6),
  ('Jean', 'Doe', 8, NULL),
  ('Marcus', 'Halberstram', 9, 8),