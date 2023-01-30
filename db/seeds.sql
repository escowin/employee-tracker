-- populates department table
INSERT INTO department
    (name)
VALUES
    ("Mergers and Aquisitions");

-- populates role table
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Vice President', 250000, 1),
    ('Secretary', 60000, 1);

-- populates employee table
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Patrick', 'Bateman', 1, null),
    ('Jean', 'Doe', 2, 1);