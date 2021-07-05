INSERT INTO department (name)
VALUES
 ("upper"),
 ("middle"),
 ("lower"),
 ("management");

INSERT INTO role (title, salary, department_id)
VALUES
 ("kangaroo", 60000, 3),
 ("giraffe", 80000, 3),
 ("shark", 140000, 1),
 ("turtle", 70000, 2),
 ("orca", 777777, 4),
 ("monke", 999999, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ("James", "Fraiser", 5, NULL),
 ("Jack", "London", 5, NULL),
 ("Robert", "Bruce", 6, NULL),
 ("Peter", "Greenway", 6, NULL),
 ('Emil', 'Zola', 3, 5),
 ('Sissy', 'Coalpits', 2, 6),
 ('Antoinette', 'Capet', 4, 6),
 ('Samuel', 'Delany', 4, 5),
 ('Tony', 'Duvert', 1, 5),
 ('Dennis', 'Cooper', 1, 6),
 ('Monica', 'Bellucci', 2, 5),
 ('Samuel', 'Johnson', 1, 5),
 ('John', 'Dryden', 4, 6),
 ('Alexander', 'Pope', 3, 5),
 ('Lionel', 'Johnson', 3, 6),
 ('Aubrey', 'Beardsley', 2, 5);
