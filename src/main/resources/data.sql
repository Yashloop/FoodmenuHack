-- ==================== Restaurants (Indian Style) ====================
INSERT INTO restaurants (name, description)
SELECT 'Biryani Ghar', 'Authentic Hyderabadi and Lucknowi biryanis.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Biryani Ghar');

INSERT INTO restaurants (name, description)
SELECT 'Dosa Plaza', 'South Indian breakfast and tiffin specials.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Dosa Plaza');

INSERT INTO restaurants (name, description)
SELECT 'Punjabi Tadka', 'North Indian comfort food with rich gravies.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Punjabi Tadka');

INSERT INTO restaurants (name, description)
SELECT 'Mumbai Street Bites', 'Popular Mumbai chaat and street food.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Mumbai Street Bites');

INSERT INTO restaurants (name, description)
SELECT 'Kolkata Roll House', 'Classic Kolkata kathi rolls and snacks.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Kolkata Roll House');

INSERT INTO restaurants (name, description)
SELECT 'Kerala Spice Kitchen', 'Kerala style curries, appam and seafood.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Kerala Spice Kitchen');

INSERT INTO restaurants (name, description)
SELECT 'Chettinad Kitchen', 'Spicy Chettinad dishes from Tamil Nadu.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Chettinad Kitchen');

INSERT INTO restaurants (name, description)
SELECT 'Rajasthan Thali Bhavan', 'Traditional Rajasthani thali and snacks.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Rajasthan Thali Bhavan');

INSERT INTO restaurants (name, description)
SELECT 'Awadhi Dum House', 'Lucknowi kebabs, korma and dum biryani.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Awadhi Dum House');

INSERT INTO restaurants (name, description)
SELECT 'Bengal Sweets & Meals', 'Bengali fish curries, luchi and sweets.'
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Bengal Sweets & Meals');

-- ==================== Menu Items ====================
-- Biryani Ghar
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Hyderabadi Chicken Biryani', 299.00, TRUE FROM restaurants r
WHERE r.name = 'Biryani Ghar'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Hyderabadi Chicken Biryani');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Mutton Dum Biryani', 369.00, TRUE FROM restaurants r
WHERE r.name = 'Biryani Ghar'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Mutton Dum Biryani');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Veg Biryani', 219.00, TRUE FROM restaurants r
WHERE r.name = 'Biryani Ghar'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Veg Biryani');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Chicken 65', 229.00, TRUE FROM restaurants r
WHERE r.name = 'Biryani Ghar'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Chicken 65');

-- Dosa Plaza
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Masala Dosa', 129.00, TRUE FROM restaurants r
WHERE r.name = 'Dosa Plaza'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Masala Dosa');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Mysore Masala Dosa', 149.00, TRUE FROM restaurants r
WHERE r.name = 'Dosa Plaza'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Mysore Masala Dosa');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Idli Vada Combo', 119.00, TRUE FROM restaurants r
WHERE r.name = 'Dosa Plaza'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Idli Vada Combo');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Filter Coffee', 59.00, TRUE FROM restaurants r
WHERE r.name = 'Dosa Plaza'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Filter Coffee');

-- Punjabi Tadka
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Butter Chicken', 329.00, TRUE FROM restaurants r
WHERE r.name = 'Punjabi Tadka'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Butter Chicken');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Paneer Tikka Masala', 269.00, TRUE FROM restaurants r
WHERE r.name = 'Punjabi Tadka'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Paneer Tikka Masala');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Dal Makhani', 219.00, TRUE FROM restaurants r
WHERE r.name = 'Punjabi Tadka'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Dal Makhani');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Butter Naan', 45.00, TRUE FROM restaurants r
WHERE r.name = 'Punjabi Tadka'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Butter Naan');

-- Mumbai Street Bites
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Vada Pav', 49.00, TRUE FROM restaurants r
WHERE r.name = 'Mumbai Street Bites'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Vada Pav');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Pav Bhaji', 139.00, TRUE FROM restaurants r
WHERE r.name = 'Mumbai Street Bites'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Pav Bhaji');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Sev Puri', 99.00, TRUE FROM restaurants r
WHERE r.name = 'Mumbai Street Bites'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Sev Puri');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Bhel Puri', 89.00, TRUE FROM restaurants r
WHERE r.name = 'Mumbai Street Bites'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Bhel Puri');

-- Kolkata Roll House
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Chicken Kathi Roll', 159.00, TRUE FROM restaurants r
WHERE r.name = 'Kolkata Roll House'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Chicken Kathi Roll');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Egg Chicken Roll', 169.00, TRUE FROM restaurants r
WHERE r.name = 'Kolkata Roll House'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Egg Chicken Roll');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Paneer Kathi Roll', 139.00, TRUE FROM restaurants r
WHERE r.name = 'Kolkata Roll House'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Paneer Kathi Roll');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Mughlai Paratha', 149.00, TRUE FROM restaurants r
WHERE r.name = 'Kolkata Roll House'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Mughlai Paratha');

-- Kerala Spice Kitchen
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Kerala Parotta with Chicken Curry', 229.00, TRUE FROM restaurants r
WHERE r.name = 'Kerala Spice Kitchen'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Kerala Parotta with Chicken Curry');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Appam with Veg Stew', 179.00, TRUE FROM restaurants r
WHERE r.name = 'Kerala Spice Kitchen'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Appam with Veg Stew');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Malabar Fish Curry', 289.00, TRUE FROM restaurants r
WHERE r.name = 'Kerala Spice Kitchen'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Malabar Fish Curry');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Puttu Kadala', 149.00, TRUE FROM restaurants r
WHERE r.name = 'Kerala Spice Kitchen'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Puttu Kadala');

-- Chettinad Kitchen
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Chettinad Chicken', 319.00, TRUE FROM restaurants r
WHERE r.name = 'Chettinad Kitchen'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Chettinad Chicken');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Pepper Mutton Fry', 359.00, TRUE FROM restaurants r
WHERE r.name = 'Chettinad Kitchen'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Pepper Mutton Fry');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Kuzhi Paniyaram', 129.00, TRUE FROM restaurants r
WHERE r.name = 'Chettinad Kitchen'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Kuzhi Paniyaram');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Tomato Rasam', 99.00, TRUE FROM restaurants r
WHERE r.name = 'Chettinad Kitchen'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Tomato Rasam');

-- Rajasthan Thali Bhavan
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Dal Baati Churma', 249.00, TRUE FROM restaurants r
WHERE r.name = 'Rajasthan Thali Bhavan'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Dal Baati Churma');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Gatte Ki Sabzi', 199.00, TRUE FROM restaurants r
WHERE r.name = 'Rajasthan Thali Bhavan'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Gatte Ki Sabzi');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Ker Sangri', 219.00, TRUE FROM restaurants r
WHERE r.name = 'Rajasthan Thali Bhavan'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Ker Sangri');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Rajasthani Thali', 329.00, TRUE FROM restaurants r
WHERE r.name = 'Rajasthan Thali Bhavan'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Rajasthani Thali');

-- Awadhi Dum House
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Galouti Kebab', 279.00, TRUE FROM restaurants r
WHERE r.name = 'Awadhi Dum House'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Galouti Kebab');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Awadhi Chicken Korma', 309.00, TRUE FROM restaurants r
WHERE r.name = 'Awadhi Dum House'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Awadhi Chicken Korma');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Lucknowi Veg Biryani', 239.00, TRUE FROM restaurants r
WHERE r.name = 'Awadhi Dum House'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Lucknowi Veg Biryani');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Sheermal', 69.00, TRUE FROM restaurants r
WHERE r.name = 'Awadhi Dum House'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Sheermal');

-- Bengal Sweets & Meals
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Shorshe Ilish', 389.00, TRUE FROM restaurants r
WHERE r.name = 'Bengal Sweets & Meals'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Shorshe Ilish');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Chingri Malai Curry', 349.00, TRUE FROM restaurants r
WHERE r.name = 'Bengal Sweets & Meals'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Chingri Malai Curry');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Luchi Aloor Dum', 159.00, TRUE FROM restaurants r
WHERE r.name = 'Bengal Sweets & Meals'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Luchi Aloor Dum');
INSERT INTO menu_items (restaurant_id, name, price, is_available)
SELECT r.id, 'Mishti Doi', 89.00, TRUE FROM restaurants r
WHERE r.name = 'Bengal Sweets & Meals'
  AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.restaurant_id = r.id AND m.name = 'Mishti Doi');
