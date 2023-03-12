INSERT INTO department (dep_name)
VALUES  ("Sales"),
        ("Accounting"),
        ("Marketing"),
        ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Manager", 170000, 1),
        ("Sales Executive", 130000, 1),
        ("Accountant", 110000, 2),
        ("Marketing Executive", 90000, 3),
        ("Software Engineer", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, 1),
        ("Nora", "Enpure", 3, 3),
        ("Willie", "Maze", 1, 1),
        ("Bill", "Gates", 4, 4),
        ("Johnny", "Depp", 2, 2);
