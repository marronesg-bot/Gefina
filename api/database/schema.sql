CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL.
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT "user",
    created_at TIMESTAMP NOT NULL NOW()
);

CREATE TABLE session(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
