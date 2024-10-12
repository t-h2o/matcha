-- Create the test table
CREATE TABLE IF NOT EXISTS test (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);

-- Insert initial data
INSERT INTO test (content) VALUES ('this is some test string');