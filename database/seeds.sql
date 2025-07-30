-- Order Management System - Sample Data

USE order_management_system;

-- Insert sample products
INSERT INTO Products (name, description, price, stock_quantity) VALUES
('Laptop Dell XPS 13', '13-inch premium laptop with Intel i7 processor', 1299.99, 15),
('iPhone 15 Pro', 'Latest iPhone with A17 Pro chip and titanium design', 999.99, 25),
('Samsung Galaxy S24', 'Android flagship with AI features', 899.99, 20),
('MacBook Air M2', '13-inch MacBook with Apple M2 chip', 1099.99, 12),
('iPad Air', '10.9-inch iPad with M1 chip', 599.99, 18),
('AirPods Pro', 'Wireless earbuds with active noise cancellation', 249.99, 30),
('Sony WH-1000XM5', 'Premium wireless headphones', 399.99, 8),
('Nintendo Switch OLED', 'Gaming console with OLED display', 349.99, 22),
('Samsung 4K TV', '55-inch 4K Smart TV', 799.99, 10),
('Logitech MX Master 3', 'Premium wireless mouse', 99.99, 35);

-- Insert sample orders (optional - for testing)
INSERT INTO Orders (order_number, status, total_amount) VALUES
('ORD-2024-001', 'confirmed', 1299.99),
('ORD-2024-002', 'pending', 1899.98),
('ORD-2024-003', 'cancelled', 599.99);

-- Insert sample order items
INSERT INTO Order_Items (order_id, product_id, quantity, unit_price, subtotal) VALUES
(1, 1, 1, 1299.99, 1299.99),  -- Laptop Dell XPS 13
(2, 2, 1, 999.99, 999.99),     -- iPhone 15 Pro
(2, 6, 1, 249.99, 249.99),     -- AirPods Pro
(3, 5, 1, 599.99, 599.99);     -- iPad Air

-- Insert sample inventory logs
INSERT INTO Inventory_Logs (product_id, change_type, quantity_change, reason, order_id) VALUES
(1, 'order_created', -1, 'Order ORD-2024-001 confirmed', 1),
(2, 'order_created', -1, 'Order ORD-2024-002 confirmed', 2),
(6, 'order_created', -1, 'Order ORD-2024-002 confirmed', 2),
(5, 'order_cancelled', 1, 'Order ORD-2024-003 cancelled', 3);

-- Update order totals
UPDATE Orders SET total_amount = (
    SELECT SUM(subtotal) FROM Order_Items WHERE order_id = Orders.id
) WHERE id IN (1, 2, 3); 