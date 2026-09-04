import assert from 'assert';

async function runEndToEndVerification() {
  console.log('========================================================');
  console.log('DealPilot AI — Marketplace Discovery & Single-Merchant Verification');
  console.log('========================================================\n');

  // STEP 1: Search entire marketplace for "I have ₹5,000 for a keyboard"
  console.log('--- Step 1: Marketplace-Wide Discovery ---');
  const planRes = await fetch('http://localhost:5000/api/planner/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'I have ₹5,000 for a keyboard' })
  }).then(r => r.json());

  assert.strictEqual(planRes.success, true, 'Planner API should return success');
  assert.strictEqual(planRes.data.customerBudget, 5000, 'Budget should be extracted as 5000');
  assert.deepStrictEqual(planRes.data.requestedCategories, ['keyboard'], 'Category should be keyboard');
  assert.strictEqual(planRes.data.plans.length, 3, 'Exactly 3 recommendation tiers must be returned');

  console.log('✅ Client query parsed: Budget = ₹5,000, Category = Keyboard');
  console.log('✅ 3 Tiers Generated from Marketplace Pool:');
  planRes.data.plans.forEach(p => {
    console.log(`   • [${p.title}] ${p.resolvedProduct.name} (₹${p.totalPrice}) — Sold by: ${p.soldBy}`);
  });

  // STEP 2: Tier Selection Resolves to ONE Product + ONE Merchant
  console.log('\n--- Step 2: Tier Selection Resolution ---');
  const selectedTier = planRes.data.plans[0]; // Tier 1: Best Quality
  assert.ok(selectedTier.resolvedProduct, 'Must resolve to a single product');
  assert.ok(selectedTier.resolvedMerchant, 'Must resolve to a single merchant');
  assert.ok(selectedTier.merchantId, 'Must have a single merchantId');
  assert.ok(selectedTier.soldBy, 'Must have a single seller name');

  console.log(`✅ Selected: [${selectedTier.title}]`);
  console.log(`   Resolved Product: ${selectedTier.resolvedProduct.name} (ID: ${selectedTier.resolvedProduct.id})`);
  console.log(`   Resolved Merchant: ${selectedTier.soldBy} (ID: ${selectedTier.merchantId})`);
  console.log(`   Listed Price: ₹${selectedTier.totalPrice}`);

  // STEP 3: Merchant-Specific Negotiation
  console.log('\n--- Step 3: Merchant-Specific Authoritative Negotiation ---');
  const negStartRes = await fetch('http://localhost:5000/api/negotiate/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plan: selectedTier,
      customerBudget: 5000,
      merchantId: selectedTier.merchantId,
      productId: selectedTier.resolvedProduct.id
    })
  }).then(r => r.json());

  assert.strictEqual(negStartRes.success, true, 'Negotiation start should succeed');
  assert.strictEqual(negStartRes.merchantId, selectedTier.merchantId, 'Should use resolved merchant ID');
  console.log(`✅ Started negotiation with ${negStartRes.merchantName} (Max Rounds: ${negStartRes.maxRounds})`);

  // Run Round 1
  const turn1Res = await fetch('http://localhost:5000/api/negotiate/turn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: negStartRes.sessionId,
      customerOffer: 5000,
      customerMessage: 'I have ₹5,000. Can you give me a better price?',
      selectedPlan: selectedTier,
      merchantId: selectedTier.merchantId,
      productId: selectedTier.resolvedProduct.id
    })
  }).then(r => r.json());

  assert.strictEqual(turn1Res.success, true, 'Negotiation turn should succeed');
  const turnData = turn1Res.data;
  console.log(`✅ Round ${turnData.round} of ${turnData.maxRounds}:`);
  console.log(`   Listed: ₹${turnData.originalTotal} → Counter Offer: ₹${turnData.offeredPrice} (Saved ₹${turnData.discountAmount})`);
  console.log(`   AI Message: "${turnData.aiMessage.slice(0, 100)}..."`);

  // Verify Data Privacy: ZERO internal merchant costs or margins leaked to client
  assert.strictEqual(turnData.wholesaleCost, undefined, 'Wholesale cost must NOT be exposed to client');
  assert.strictEqual(turnData.profitMarginPercent, undefined, 'Profit margin % must NOT be exposed to client');
  assert.strictEqual(turnData.costPrice, undefined, 'Cost price must NOT be exposed to client');
  console.log('✅ Security Check Passed: Cost price, wholesale cost, and margin floors are 100% shielded from client.');

  // STEP 4: Single-Merchant Checkout & Order Creation
  console.log('\n--- Step 4: Single-Merchant Checkout ---');
  const orderDetails = {
    clientId: 'client_buyer_99',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    merchantId: selectedTier.merchantId,
    merchantName: selectedTier.soldBy,
    items: [
      {
        productId: selectedTier.resolvedProduct.id,
        productName: selectedTier.resolvedProduct.name,
        quantity: 1,
        originalPrice: selectedTier.totalPrice,
        negotiatedPrice: turnData.offeredPrice
      }
    ],
    originalTotal: selectedTier.totalPrice,
    subtotal: selectedTier.totalPrice,
    discountAmount: turnData.discountAmount,
    discount: turnData.discountAmount,
    finalAmount: turnData.offeredPrice,
    finalPrice: turnData.offeredPrice,
    paymentMethod: 'UPI / Razorpay',
    negotiation: {
      enabled: true,
      rounds: turnData.round,
      finalDiscount: turnData.discountAmount,
      finalPrice: turnData.offeredPrice
    }
  };

  const checkoutRes = await fetch('http://localhost:5000/api/checkout/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpayOrderId: 'order_rzp_live_' + Date.now(),
      razorpayPaymentId: 'pay_rzp_live_' + Date.now(),
      razorpaySignature: 'mock_sig_pass',
      orderDetails
    })
  }).then(r => r.json());

  assert.strictEqual(checkoutRes.success, true, 'Checkout payment verification should succeed');
  const order = checkoutRes.order;
  assert.ok(order.orderId.startsWith('DP-ORD-'), 'Order ID must follow DP-ORD- format');
  assert.strictEqual(order.merchantId, selectedTier.merchantId, 'Order must record single resolved merchant ID');
  assert.strictEqual(order.merchantName, selectedTier.soldBy, 'Order must record single resolved merchant name');
  assert.strictEqual(order.finalAmount, turnData.offeredPrice, 'Order final amount must match negotiated price');
  assert.strictEqual(order.items.length, 1, 'Exactly ONE product ordered for single tier selection');
  assert.strictEqual(order.paymentStatus, 'PAID', 'Order paymentStatus should be PAID');

  console.log(`✅ Single Order Created: ${order.orderId}`);
  console.log(`   Merchant: ${order.merchantName} (${order.merchantId})`);
  console.log(`   Item: ${order.items[0].productName} (Qty: 1)`);
  console.log(`   Final Paid: ₹${order.finalAmount} via Razorpay`);
  console.log(`   Negotiation Logged: Final Discount = ₹${order.negotiation.finalDiscount} in Round ${order.negotiation.rounds}`);

  // STEP 5: Verify Order in Merchant Completed Orders Ledger
  console.log('\n--- Step 5: Merchant Ledger Verification ---');
  const ledgerRes = await fetch('http://localhost:5000/api/checkout/orders').then(r => r.json());
  assert.strictEqual(ledgerRes.success, true, 'Orders ledger API should succeed');
  const foundOrder = ledgerRes.orders.find(o => o.orderId === order.orderId);
  assert.ok(foundOrder, 'Newly created order must appear in merchant ledger');
  console.log(`✅ Order ${order.orderId} verified in live merchant settlements ledger.`);

  console.log('\n========================================================');
  console.log('🎉 ALL 5 E2E INTEGRATION CHECKS PASSED WITH ZERO ERRORS!');
  console.log('========================================================');
}

runEndToEndVerification().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
