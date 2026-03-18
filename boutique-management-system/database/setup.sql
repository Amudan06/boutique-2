-- Create Database
CREATE DATABASE IF NOT EXISTS boutique_management;
USE boutique_management;

-- Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Measurements Table
CREATE TABLE IF NOT EXISTS measurements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    chest DECIMAL(5,2),
    waist DECIMAL(5,2),
    hip DECIMAL(5,2),
    sleeve DECIMAL(5,2),
    shoulder DECIMAL(5,2),
    notes TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    dress_type VARCHAR(100) NOT NULL,
    material VARCHAR(100),
    trial_date DATE,
    delivery_date DATE,
    price_estimate DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'in_progress', 'ready_for_trial', 'completed', 'delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    advance_paid DECIMAL(10,2) DEFAULT 0.00,
    remaining_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('unpaid', 'partial', 'paid') DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ==========================================
-- V2 Enhancements (BMS Upgrade)
-- ==========================================

-- Enhanced Measurements Table
CREATE TABLE IF NOT EXISTS measurement_templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    template_name VARCHAR(100),
    gender ENUM('male', 'female', 'unisex'),
    size_category ENUM('xs', 's', 'm', 'l', 'xl', 'xxl', 'custom'),
    chest DECIMAL(5,2),
    waist DECIMAL(5,2),
    hip DECIMAL(5,2),
    shoulder DECIMAL(5,2),
    sleeve_length DECIMAL(5,2),
    armhole DECIMAL(5,2),
    bicep DECIMAL(5,2),
    wrist DECIMAL(5,2),
    neck DECIMAL(5,2),
    back_width DECIMAL(5,2),
    front_length DECIMAL(5,2),
    back_length DECIMAL(5,2),
    inseam DECIMAL(5,2),
    outseam DECIMAL(5,2),
    thigh DECIMAL(5,2),
    knee DECIMAL(5,2),
    calf DECIMAL(5,2),
    ankle DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customer_measurements_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    measurement_date DATE NOT NULL,
    chest DECIMAL(5,2),
    waist DECIMAL(5,2),
    hip DECIMAL(5,2),
    shoulder DECIMAL(5,2),
    sleeve_length DECIMAL(5,2),
    armhole DECIMAL(5,2),
    bicep DECIMAL(5,2),
    wrist DECIMAL(5,2),
    neck DECIMAL(5,2),
    back_width DECIMAL(5,2),
    front_length DECIMAL(5,2),
    back_length DECIMAL(5,2),
    inseam DECIMAL(5,2),
    outseam DECIMAL(5,2),
    thigh DECIMAL(5,2),
    knee DECIMAL(5,2),
    calf DECIMAL(5,2),
    ankle DECIMAL(5,2),
    body_type ENUM('slim', 'athletic', 'average', 'plus'),
    notes TEXT,
    reference_images JSON,
    created_by INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS designs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    design_code VARCHAR(50) UNIQUE,
    design_name VARCHAR(200),
    category ENUM('traditional', 'western', 'fusion', 'indo-western'),
    sub_category VARCHAR(100),
    style_tags JSON,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced'),
    estimated_hours DECIMAL(5,2),
    base_price DECIMAL(10,2),
    fabric_requirement JSON,
    accessories_required JSON,
    thumbnail_url VARCHAR(500),
    gallery_images JSON,
    popularity_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fabric_inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fabric_code VARCHAR(50) UNIQUE,
    fabric_name VARCHAR(200),
    fabric_type ENUM('cotton', 'silk', 'wool', 'linen', 'polyester', 'blend'),
    color VARCHAR(100),
    pattern VARCHAR(100),
    supplier_id INT,
    quantity_available DECIMAL(10,2),
    unit ENUM('meter', 'yard', 'roll'),
    price_per_unit DECIMAL(10,2),
    minimum_stock_level DECIMAL(10,2),
    reorder_quantity DECIMAL(10,2),
    location_rack VARCHAR(50),
    last_restocked DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    appointment_type ENUM('measurement', 'trial', 'consultation', 'delivery'),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    staff_id INT,
    status ENUM('scheduled', 'completed', 'cancelled', 'rescheduled'),
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS loyalty_points (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    points_balance INT DEFAULT 0,
    lifetime_points INT DEFAULT 0,
    tier ENUM('bronze', 'silver', 'gold', 'platinum') DEFAULT 'bronze',
    points_expiry_date DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    points_earned INT,
    points_redeemed INT,
    transaction_type ENUM('earn', 'redeem', 'expire', 'bonus'),
    order_id INT,
    description VARCHAR(255),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    customer_id INT,
    type ENUM('order_update', 'payment_reminder', 'appointment_reminder', 'promotion', 'birthday'),
    title VARCHAR(200),
    message TEXT,
    channel ENUM('sms', 'email', 'whatsapp', 'in_app'),
    status ENUM('pending', 'sent', 'failed', 'read'),
    scheduled_for TIMESTAMP,
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
