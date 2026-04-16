# Email Notification System - Setup & Configuration

## 🎯 Overview
The FoodHub application now has a complete email notification system that sends professional HTML-formatted emails for:
1. **Registration Success** - Welcome email when user creates account
2. **Order Confirmation** - Detailed confirmation with order items and total
3. **Order Cancellation** - Cancellation confirmation with refund information

---

## 📧 Email Configuration

### Environment Variables Required
```bash
MAIL_USERNAME=kamaliga2109@gmail.com
MAIL_PASSWORD=k@m@/!9@
```

### Gmail SMTP Settings (Pre-configured)
- **Host**: smtp.gmail.com
- **Port**: 587
- **Authentication**: Enabled
- **TLS**: Enabled

### Setup Instructions for Gmail

#### Step 1: Enable "Less secure app access" OR Use App Password
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Navigate to Security
3. Enable "2-Step Verification" (if not already enabled)
4. Go back to Security and find "App passwords"
5. Select "Mail" and "Windows Computer"
6. Copy the 16-character password

#### Step 2: Set Environment Variables
```bash
# Linux/Mac (add to ~/.bash_profile or ~/.bashrc)
export MAIL_USERNAME="your-gmail@gmail.com"
export MAIL_PASSWORD="xxxx xxxx xxxx xxxx"

# Windows (PowerShell)
$env:MAIL_USERNAME="kamaliga2109@gmail.com"
$env:MAIL_PASSWORD="k@m@/!9@"
```

#### Step 3: Or Update application.properties
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

---

## 📬 Email Templates

### 1. Registration Success Email
**When**: User successfully registers
**Contents**:
- Welcome message with user's name
- Account confirmation
- Features overview (browse restaurants, place orders, track orders, manage settings)
- CTA button to start ordering

**Example Recipients**: Any new registered user

### 2. Order Confirmation Email
**When**: Order is successfully placed
**Contents**:
- Order number and status
- Itemized order details (item name, quantity, price)
- Subtotal and total amount
- Estimated delivery time (30-45 minutes)
- Order tracking information

**Example Recipients**: User who placed the order

### 3. Order Cancellation Email
**When**: Order is cancelled
**Contents**:
- Cancellation confirmation
- Original order details (order number, date, total)
- Refund information (3-5 business days)
- Support contact information

**Example Recipients**: User who cancelled the order

---

## 🔌 Backend Integration

### Service: EmailService
**Location**: `src/main/java/com/foodapp/service/EmailService.java`

**Methods**:
```java
// Send registration success email
public void sendRegistrationSuccessEmail(User user)

// Send order confirmation email
public void sendOrderConfirmationEmail(User user, Long orderId)

// Send order cancellation email
public void sendOrderCancellationEmail(User user, Long orderId)
```

### Where Emails Are Triggered

#### 1. AuthService - Registration
```java
// src/main/java/com/foodapp/service/AuthService.java
public ApiResponse register(RegisterRequest request) {
    // ... registration logic ...
    emailService.sendRegistrationSuccessEmail(user);
    return new ApiResponse("Registration successful");
}
```

#### 2. OrderService - Order Placement
```java
// src/main/java/com/foodapp/service/OrderService.java
public OrderResponse placeOrder(CreateOrderRequest request, User user) {
    // ... order creation logic ...
    emailService.sendOrderConfirmationEmail(user, savedOrder.getId());
    return mapToResponse(savedOrder, orderItems);
}
```

#### 3. OrderService - Order Cancellation
```java
public OrderResponse cancelOrder(Long orderId, User user) {
    // ... cancellation logic ...
    emailService.sendOrderCancellationEmail(user, saved.getId());
    return mapToResponse(saved, items);
}
```

---

## 🛠️ Technical Details

### Email Format
- **Type**: HTML (Rich formatting with CSS)
- **Fallback**: Plain text available for clients that don't support HTML
- **Encoding**: UTF-8

### Features
- ✅ Professional HTML templates with gradients and styling
- ✅ Color-coded emails (Green for success, Blue for orders, Red for cancellation)
- ✅ Responsive design (works on desktop, tablet, mobile)
- ✅ Error handling with graceful fallback
- ✅ Logging of all email operations
- ✅ Detailed order information in confirmation email
- ✅ Refund timeline in cancellation email

### Dependencies
- **Spring Boot Mail Starter**: `spring-boot-starter-mail`
- **Jakarta Mail**: `jakarta.mail`
- **Spring Data JPA**: For fetching order details

---

## ✅ Testing Email Notifications

### Test During Registration
1. Register a new account with a valid email
2. Check the inbox for registration success email
3. Verify all information is correct

### Test During Order Placement
1. Place an order
2. Check inbox for order confirmation email
3. Verify:
   - Order number
   - Item details (name, quantity, price)
   - Total amount
   - Status

### Test During Order Cancellation
1. Place and then cancel an order
2. Check inbox for cancellation email
3. Verify:
   - Cancellation confirmation
   - Refund timeline
   - Original order details

---

## 🔄 Failure Handling

If email sending fails:
- Application continues without blocking the request
- Error is logged with details
- User can retry through the web interface
- Plain text fallback email is attempted

**Log Example**:
```
[WARN] Email sending failed for user@example.com (subject: 'Order Confirmed'): Connection refused
```

---

## 📞 Support

For issues:
1. Check that MAIL_USERNAME and MAIL_PASSWORD environment variables are set
2. Verify Gmail account allows "Less secure apps" or App Password is set correctly
3. Check application logs for detailed error messages
4. Ensure internet connection is available

---

## 🚀 Future Enhancements

Potential improvements:
- [ ] Email templates stored in database for easy customization
- [ ] Attachment support (invoices, receipts)
- [ ] Email scheduling (send at specific time)
- [ ] Unsubscribe functionality
- [ ] Multi-language email support
- [ ] Email read tracking
- [ ] Use of SendGrid/Mailgun for better deliverability
