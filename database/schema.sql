CREATE DATABASE IF NOT EXISTS parcel_db;
USE parcel_db;
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);
CREATE TABLE parcels (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    cost DOUBLE NOT NULL,
    created_at DATETIME NOT NULL,
    CONSTRAINT fk_parcel_sender FOREIGN KEY (sender_id) REFERENCES users(id)
);
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parcel_id BIGINT NOT NULL,
    amount DOUBLE NOT NULL,
    status VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255),
    created_at DATETIME NOT NULL,
    CONSTRAINT fk_payment_parcel FOREIGN KEY (parcel_id) REFERENCES parcels(id)
);
CREATE TABLE parcel_status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parcel_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    CONSTRAINT fk_history_parcel FOREIGN KEY (parcel_id) REFERENCES parcels(id)
);
