CREATEDB marios_pizza;

CREATE TABLE employee (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(20),
	last_name VARCHAR(20)
);

CREATE TABLE floor (
	id SERIAL PRIMARY KEY,
	table_name VARCHAR(10),
	capacity INT,
	server_id INT REFERENCES employee(id) ON DELETE SET NULL,
	status VARCHAR(10)
);
