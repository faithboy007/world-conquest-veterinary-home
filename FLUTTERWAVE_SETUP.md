# 🚀 Flutterwave Payment Integration Guide

## Overview
This guide will help you integrate Flutterwave payment gateway into your World Conquest Veterinary Home website. Flutterwave allows you to accept payments via cards, bank transfers, USSD, and more.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Getting Your API Keys](#getting-your-api-keys)
3. [Configuration](#configuration)
4. [Testing the Integration](#testing-the-integration)
5. [Going Live](#going-live)
6. [Backend Verification (Recommended)](#backend-verification-recommended)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:
- ✅ A Flutterwave account ([Sign up here](https://dashboard.flutterwave.com/signup))
- ✅ Completed business verification on Flutterwave
- ✅ Access to your website files

---

## 🔑 Getting Your API Keys

### Step 1: Create a Flutterwave Account
1. Go to [https://dashboard.flutterwave.com/signup](https://dashboard.flutterwave.com/signup)
2. Sign up with your business email
3. Verify your email address
4. Complete your business profile

### Step 2: Get Your API Keys
1. Log in to your [Flutterwave Dashboard](https://dashboard.flutterwave.com/)
2. Navigate to **Settings** → **API Keys**
3. You'll see two types of keys:
   - **Test Keys** (for development/testing)
   - **Live Keys** (for production)

### Step 3: Copy Your Public Key
- For testing: Copy your **Test Public Key** (starts with `FLWPUBK_TEST-`)
- For production: Copy your **Live Public Key** (starts with `FLWPUBK-`)

---

## ⚙️ Configuration

### Update Your Public Key

1. Open `js/script.js` in your project
2. Find this line (around line 559):
   ```javascript
   const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK_TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X';
   ```
3. Replace `'FLWPUBK_TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X'` with your actual public key:
   ```javascript
   const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK_TEST-your_actual_key_here-X';
   ```

### Update Business Name (Optional)

You can customize the business name that appears in the payment modal:

```javascript
const BUSINESS_NAME = 'World Conquest Veterinary Home';
```

### Update Logo (Optional)

To display your logo in the payment modal, update this line (around line 739):

```javascript
logo: 'https://ik.imagekit.io/esz8imvuw/logo.png', // Replace with your actual logo URL
```

---

## 🧪 Testing the Integration

### Test Mode
Flutterwave provides test cards for testing your integration without real money.

#### Test Cards:

| Card Number         | CVV | Expiry | PIN  | OTP    |
|---------------------|-----|--------|------|--------|
| 5531886652142950   | 564 | 09/32  | 3310 | 12345  |
| 4187427415564246   | 828 | 09/32  | -    | 12345  |
| 5399670170804691   | 470 | 10/32  | 3310 | 12345  |

### Testing Steps:

1. **Open your website** in a browser
2. **Navigate to the Products section**
3. **Click "Add to Cart"** on any product
4. **Fill in the checkout form** with test data:
   - Email: test@example.com
   - Name: Test User
   - Phone: 08012345678
5. **Click "Proceed to Payment"**
6. **Use a test card** from the table above
7. **Complete the payment flow**

### Expected Result:
- ✅ Payment modal opens
- ✅ You can enter payment details
- ✅ Payment is processed successfully
- ✅ Success notification appears

---

## 🌐 Going Live

### When You're Ready for Production:

1. **Complete Business Verification**
   - Submit business documents on Flutterwave dashboard
   - Wait for approval (usually 24-48 hours)

2. **Switch to Live Keys**
   - In `js/script.js`, replace test key with live key:
   ```javascript
   const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK-your_live_key_here-X';
   ```

3. **Test with Real Cards**
   - Do a small test transaction with your own card
   - Verify that you receive the payment in your dashboard

4. **Monitor Transactions**
   - Check your [Flutterwave Dashboard](https://dashboard.flutterwave.com/) regularly
   - Monitor successful/failed transactions

---

## 🔒 Backend Verification (Recommended)

**⚠️ IMPORTANT:** For security, you should always verify payments on your backend.

### Why Backend Verification?
- Prevents payment manipulation
- Ensures payment actually succeeded
- Protects against fraudulent transactions

### Implementation:

#### 1. Create a Backend Endpoint

**Node.js Example:**
```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.post('/api/verify-payment', async (req, res) => {
    const { transaction_id } = req.body;
    const SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

    try {
        const response = await axios.get(
            `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
            {
                headers: {
                    'Authorization': `Bearer ${SECRET_KEY}`
                }
            }
        );

        if (response.data.status === 'success' && 
            response.data.data.status === 'successful' &&
            response.data.data.amount >= expectedAmount) {
            
            // Payment is valid
            // Process order, send confirmation email, etc.
            
            res.json({ status: 'success', data: response.data.data });
        } else {
            res.json({ status: 'failed' });
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Verification failed' });
    }
});

app.listen(3000);
```

**PHP Example:**
```php
<?php
header('Content-Type: application/json');

$transaction_id = $_POST['transaction_id'];
$secret_key = getenv('FLUTTERWAVE_SECRET_KEY');

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.flutterwave.com/v3/transactions/{$transaction_id}/verify",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer {$secret_key}",
        "Content-Type: application/json"
    ),
));

$response = curl_exec($curl);
$data = json_decode($response);

if ($data->status === 'success' && $data->data->status === 'successful') {
    // Payment is valid
    // Process order
    echo json_encode(['status' => 'success', 'data' => $data->data]);
} else {
    echo json_encode(['status' => 'failed']);
}

curl_close($curl);
?>
```

#### 2. Enable Verification in Frontend

In `js/script.js`, uncomment the verification function call:

```javascript
// Inside the callback function (around line 752)
if (response.status === 'successful') {
    // Optional: Verify payment on your backend
    verifyPayment(response.transaction_id); // Uncomment this line
}
```

Then uncomment and configure the `verifyPayment` function (around line 806):

```javascript
function verifyPayment(transactionId) {
    fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transaction_id: transactionId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Payment verified:', data);
            // Process order, send confirmation email, update inventory, etc.
        } else {
            console.error('Payment verification failed');
        }
    })
    .catch(error => {
        console.error('Verification error:', error);
    });
}
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions:

#### 1. "Payment system is loading" Error
**Problem:** Flutterwave script hasn't loaded yet.

**Solutions:**
- Check your internet connection
- Ensure the Flutterwave script tag is in `index.html`:
  ```html
  <script src="https://checkout.flutterwave.com/v3.js"></script>
  ```
- Wait a few seconds and try again

#### 2. Payment Modal Not Opening
**Problem:** Public key not configured or incorrect.

**Solutions:**
- Verify your public key in `js/script.js`
- Ensure the key starts with `FLWPUBK_TEST-` (test) or `FLWPUBK-` (live)
- Check browser console for errors (F12)

#### 3. Payment Successful But No Notification
**Problem:** Callback function not working properly.

**Solutions:**
- Check browser console for JavaScript errors
- Verify the `showNotification` function exists in `js/script.js`
- Test with different browsers

#### 4. "Transaction ID already exists"
**Problem:** Duplicate transaction reference.

**Solutions:**
- The transaction reference is auto-generated using timestamp
- If testing rapidly, wait a few seconds between tests
- Clear browser cache and try again

#### 5. Payment Fails with Test Cards
**Problem:** Incorrect test card details or expired test period.

**Solutions:**
- Verify you're using the correct test cards from the table above
- Ensure you're using test mode (test public key)
- Check [Flutterwave docs](https://developer.flutterwave.com/docs/test-cards) for updated test cards

---

## 📚 Additional Resources

### Official Documentation
- [Flutterwave Documentation](https://developer.flutterwave.com/docs)
- [Flutterwave Inline v3 Guide](https://developer.flutterwave.com/docs/flutterwave-inline)
- [Test Cards](https://developer.flutterwave.com/docs/test-cards)
- [Payment Verification](https://developer.flutterwave.com/docs/verifying-transactions)

### Dashboard Links
- [Flutterwave Dashboard](https://dashboard.flutterwave.com/)
- [Transaction History](https://dashboard.flutterwave.com/transactions)
- [API Keys](https://dashboard.flutterwave.com/settings/apis)
- [Webhook Settings](https://dashboard.flutterwave.com/settings/webhooks)

### Support
- Email: support@flutterwavego.com
- Twitter: [@FlutterwaveEng](https://twitter.com/FlutterwaveEng)
- Slack Community: [Join here](https://flutterwave-community.slack.com/)

---

## 🎯 Next Steps

After successful integration:

1. ✅ **Set up webhooks** to receive real-time payment notifications
2. ✅ **Implement backend verification** for security
3. ✅ **Create order management system** to track purchases
4. ✅ **Send email confirmations** to customers
5. ✅ **Set up inventory management** to track stock
6. ✅ **Enable refunds** through your dashboard

---

## 💡 Tips for Success

1. **Always test thoroughly** before going live
2. **Keep your secret key secure** - never expose it in frontend code
3. **Verify all payments** on your backend
4. **Monitor your dashboard** regularly
5. **Respond quickly** to customer payment issues
6. **Keep test mode** enabled until fully ready
7. **Document your payment flow** for your team

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the [troubleshooting section](#troubleshooting) above
2. Review the [official documentation](https://developer.flutterwave.com/docs)
3. Contact Flutterwave support
4. Check your browser console for errors (F12)

---

## ✨ Features Implemented

Your integration includes:

- ✅ Multiple payment methods (Card, Bank Transfer, USSD, Account)
- ✅ Custom checkout modal with customer information collection
- ✅ Product name and price display
- ✅ Email validation
- ✅ Phone number validation
- ✅ Delivery address capture
- ✅ Transaction metadata tracking
- ✅ Success/failure notifications
- ✅ Responsive design
- ✅ Professional UI/UX

---

**Happy Selling! 🐾**

*World Conquest Veterinary Home - Providing exceptional pet care with secure payments.*
