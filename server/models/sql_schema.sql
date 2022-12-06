CREATE TABLE users (
    _id SERIAL PRIMARY KEY,
    name varchar(250) NOT NULL,
    password varchar(250),
    email varchar(250) NOT NULL,
    daily_job_count int NOT NULL
);

CREATE TABLE jobs (
    _id SERIAL PRIMARY KEY,
    owner_id int NOT NULL,
    job_title varchar(250) NOT NULL,
    status varchar(250),
    company varchar(250) NOT NULL,
    location varchar(250) NOT NULL, 
    hyperlink varchar(250) NOT NULL,
    position_type varchar(250) NOT NULL,
    application_data varchar(250) NOT NULL,

    CONSTRAINT FK_users_jobs FOREIGN KEY(owner_id)
        REFERENCES users(_id)
    
);

INSERT INTO users (name, password, email, daily_job_count)
VALUES('BOB', '123', 'bob123@gmail.com', 1) RETURNING *

SELECT * FROM users

INSERT INTO jobs (owner_id, job_title, status, company, location, hyperlink, position_type, application_data)
VALUES(1, 'SWE', 'applied', 'google', '123 street', 'google.com', 'backend', '01012022') RETURNING *

SELECT * FROM jobs