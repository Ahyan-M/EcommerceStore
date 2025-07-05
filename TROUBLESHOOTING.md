# Troubleshooting Checkout Issues

## Common Checkout Errors

### "There was an error processing your checkout. Please try again."

This error typically occurs due to one of the following issues:

## 1. Stripe Configuration Issues

### Problem: Missing or Invalid Stripe Keys
**Symptoms:**
- Checkout fails immediately
- Error messages about payment service not configured

**Solution:**
1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to the "Environment Variables" section
4. Add the following variables:
   ```
   STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```
5. Redeploy your application

### Problem: Wrong Stripe Keys
**Symptoms:**
- Checkout fails with authentication errors
- Stripe dashboard shows failed requests

**Solution:**
1. Verify you're using the correct keys from your Stripe dashboard
2. Ensure you're using test keys for development and live keys for production
3. Check that the keys match your Stripe account

## 2. Environment Variable Issues

### Problem: Environment Variables Not Loaded
**Symptoms:**
- Configuration errors in production
- Different behavior between local and production

**Solution:**
1. Check Vercel environment variables are set correctly
2. Ensure variables are set for the correct environment (Production/Preview)
3. Redeploy after adding new environment variables

## 3. Serverless Function Issues

### Problem: Function Timeout or Memory Limits
**Symptoms:**
- Checkout process hangs
- Timeout errors

**Solution:**
1. The app now uses in-memory storage instead of file system
2. Check Vercel function logs for timeout issues
3. Consider upgrading Vercel plan if hitting limits

## 4. Network and CORS Issues

### Problem: CORS or Network Errors
**Symptoms:**
- Network errors in browser console
- CORS policy violations

**Solution:**
1. Ensure your domain is properly configured in Stripe
2. Check that your Vercel deployment URL is correct
3. Verify webhook endpoints are accessible

## Debugging Steps

### 1. Use the Debug Page
Visit `/debug` on your deployed site to check configuration status.

### 2. Check Browser Console
Open browser developer tools and look for:
- Network errors
- JavaScript errors
- Failed API requests

### 3. Check Vercel Logs
1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to "Functions" tab
4. Check logs for `/api/checkout_sessions` function

### 4. Test Stripe Configuration
```bash
# Test your Stripe keys locally
curl -X POST https://api.stripe.com/v1/checkout/sessions \
  -H "Authorization: Bearer YOUR_STRIPE_SECRET_KEY" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "payment_method_types[]=card&line_items[0][price_data][currency]=usd&line_items[0][price_data][product_data][name]=Test&line_items[0][price_data][unit_amount]=1000&line_items[0][quantity]=1&mode=payment&success_url=https://example.com/success&cancel_url=https://example.com/cancel"
```

## Prevention

### 1. Use Environment-Specific Keys
- Use test keys for development/staging
- Use live keys only for production
- Never commit keys to version control

### 2. Implement Proper Error Handling
The app now includes comprehensive error handling for:
- Invalid requests
- Stripe API errors
- Configuration issues
- Network problems

### 3. Monitor and Log
- Check Vercel function logs regularly
- Monitor Stripe dashboard for failed payments
- Set up alerts for critical errors

## Getting Help

If you're still experiencing issues:

1. Check the debug page at `/debug`
2. Review Vercel function logs
3. Check Stripe dashboard for failed requests
4. Verify all environment variables are set correctly
5. Test with a simple checkout flow

## Recent Fixes Applied

- ✅ Replaced file system operations with in-memory storage
- ✅ Added comprehensive error handling
- ✅ Improved validation for checkout requests
- ✅ Added debug endpoint for configuration issues
- ✅ Enhanced user feedback for different error types 