 -- run this in your PostgreSQL (psql / admin tool)
CREATE TABLE IF NOT EXISTS admins (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- or uuid_generate_v4() depending on your PG setup
name VARCHAR(150) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role VARCHAR(50) DEFAULT 'admin',
is_active BOOLEAN DEFAULT true,
created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- index on email
CREATE UNIQUE INDEX IF NOT EXISTS idx_admins_email ON admins(email);