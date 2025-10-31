-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region VARCHAR(100) NOT NULL,
    product VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    source VARCHAR(100) NOT NULL,
    user_id VARCHAR(255),
    timestamp TIMESTAMP DEFAULT NOW()
);

-- User events table
CREATE TABLE IF NOT EXISTS user_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    metadata JSONB,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sales_timestamp ON sales(timestamp);
CREATE INDEX IF NOT EXISTS idx_sales_region ON sales(region);
CREATE INDEX IF NOT EXISTS idx_sales_product ON sales(product);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON user_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_events_type ON user_events(event_type);

-- Insert demo user (password: password)
INSERT INTO users (email, password, role) 
VALUES ('admin@demo.com', '$2b$10$rKJ5Z6pFqKqKqKqKqKqKqOZ6pFqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample data
INSERT INTO sales (region, product, amount, quantity, source, user_id) VALUES
    ('North America', 'Product A', 150.00, 1, 'organic', 'user_1'),
    ('Europe', 'Product B', 200.00, 2, 'paid', 'user_2'),
    ('Asia', 'Product C', 300.00, 3, 'referral', 'user_3'),
    ('South America', 'Product A', 100.00, 1, 'direct', 'user_4'),
    ('North America', 'Product D', 250.00, 2, 'organic', 'user_5'),
    ('Europe', 'Product A', 180.00, 1, 'paid', 'user_6'),
    ('Asia', 'Product B', 220.00, 2, 'organic', 'user_7'),
    ('North America', 'Product C', 350.00, 3, 'referral', 'user_8')
ON CONFLICT DO NOTHING;

-- Insert sample user events
INSERT INTO user_events (user_id, event_type) VALUES
    ('user_1', 'visited'),
    ('user_1', 'viewed_product'),
    ('user_1', 'added_to_cart'),
    ('user_1', 'checkout'),
    ('user_1', 'purchased'),
    ('user_2', 'visited'),
    ('user_2', 'viewed_product'),
    ('user_3', 'visited'),
    ('user_4', 'visited'),
    ('user_4', 'viewed_product'),
    ('user_4', 'added_to_cart')
ON CONFLICT DO NOTHING;