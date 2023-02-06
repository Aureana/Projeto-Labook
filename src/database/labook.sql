-- Active: 1675374379841@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role ENUM NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );
  -- DROP TABLE users;


CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        dislikes INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );
    -- DROP TABLE posts;

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (post_id) REFERENCES posts (id)
    );

--     DROP TABLE likes_dislikes ;

     INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Marta", "marta@gmail.com", "98123", "ADMIN"),
    ("u002", "karol", "karol@gmail.com", "7893", "NORMAL"),
    ("u003", "Roberta", "roberta@gmail.com", "koi985", "NORMAL");

INSERT INTO posts (id, creator_id, content) 
VALUES
    ("p001", "u001", "Você está maravilhosa"),
    ("p002", "u002", "Esta pago!"),
    ("p003", "u003", "#Jantinha");

INSERT INTO
likes_dislikes (user_id, post_id, like)
VALUES ("u001", "p001", 1), ("u002", "p002", 1), ("u002", "p003", 0);


SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;
