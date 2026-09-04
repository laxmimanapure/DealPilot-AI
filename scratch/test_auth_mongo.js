/**
 * DealPilot AI — MongoDB & Full-Stack Authentication Test Suite
 * Tests registration, login, role isolation, JWT verification, and demo accounts.
 */

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🚀 Starting DealPilot AI Authentication Test Suite...\n');
  let passedCount = 0;
  let totalCount = 0;

  function assert(condition, message) {
    totalCount++;
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passedCount++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      process.exitCode = 1;
    }
  }

  // 1. Health Check
  console.log('--- Test 1: Health & DB Status ---');
  try {
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.ok && healthData.status === 'online', 'Health endpoint is online');

    const dbRes = await fetch(`${BASE_URL}/auth/db-status`);
    const dbData = await dbRes.json();
    assert(dbRes.ok && dbData.database, `DB status endpoint responsive (Status: ${dbData.database?.status})`);
  } catch (err) {
    console.error('Server connection error:', err.message);
    process.exit(1);
  }

  // 2. Client Registration
  console.log('\n--- Test 2: Client Registration ---');
  const clientEmail = `client_${Date.now()}@example.com`;
  let clientToken = '';
  try {
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Client',
        email: clientEmail,
        password: 'securePassword123',
        role: 'client',
      }),
    });
    const regData = await regRes.json();
    assert(regRes.status === 201, `Registration returned 201 Created (got ${regRes.status})`);
    assert(regData.success === true, 'Response marked success: true');
    assert(typeof regData.token === 'string' && regData.token.length > 20, 'Returned valid JWT token string');
    assert(regData.user?.role === 'client', 'User role assigned as "client"');
    assert(!regData.user?.password, 'Password hash is strictly excluded from response');
    clientToken = regData.token;
  } catch (err) {
    assert(false, `Client registration error: ${err.message}`);
  }

  // 3. Duplicate Email Rejection
  console.log('\n--- Test 3: Duplicate Email Prevention ---');
  try {
    const dupRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate John',
        email: clientEmail,
        password: 'anotherPassword123',
        role: 'client',
      }),
    });
    assert(dupRes.status === 409, `Duplicate registration returned 409 Conflict (got ${dupRes.status})`);
  } catch (err) {
    assert(false, `Duplicate email test error: ${err.message}`);
  }

  // 4. Merchant Registration
  console.log('\n--- Test 4: Merchant Registration ---');
  const merchantEmail = `merchant_${Date.now()}@example.com`;
  let merchantToken = '';
  try {
    const mRegRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Apex Merchant Admin',
        email: merchantEmail,
        password: 'merchantSecret123',
        role: 'merchant',
        storeName: 'Apex Electronics Hub',
      }),
    });
    const mRegData = await mRegRes.json();
    assert(mRegRes.status === 201, `Merchant registration returned 201 Created (got ${mRegRes.status})`);
    assert(mRegData.user?.role === 'merchant', 'User role assigned as "merchant"');
    assert(mRegData.user?.storeName === 'Apex Electronics Hub', 'Merchant storeName stored correctly');
    merchantToken = mRegData.token;
  } catch (err) {
    assert(false, `Merchant registration error: ${err.message}`);
  }

  // 5. Correct Login
  console.log('\n--- Test 5: Correct Login ---');
  try {
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: clientEmail,
        password: 'securePassword123',
        role: 'client',
      }),
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200, `Login returned 200 OK (got ${loginRes.status})`);
    assert(Boolean(loginData.token), 'JWT token returned on login');
    assert(loginData.user?.email === clientEmail, 'Returned correct authenticated user profile');
  } catch (err) {
    assert(false, `Correct login error: ${err.message}`);
  }

  // 6. Incorrect Password
  console.log('\n--- Test 6: Incorrect Password ---');
  try {
    const wrongRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: clientEmail,
        password: 'wrongPassword999',
        role: 'client',
      }),
    });
    assert(wrongRes.status === 401, `Wrong password returned 401 Unauthorized (got ${wrongRes.status})`);
  } catch (err) {
    assert(false, `Wrong password test error: ${err.message}`);
  }

  // 7. Cross-Role Login Prevention (RBAC)
  console.log('\n--- Test 7: Cross-Role Login Prevention (RBAC) ---');
  try {
    // Client attempting to log in through Merchant Portal
    const crossRes1 = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: clientEmail,
        password: 'securePassword123',
        role: 'merchant', // Trying to access merchant portal
      }),
    });
    assert(crossRes1.status === 403, `Client account accessing Merchant portal returned 403 Forbidden (got ${crossRes1.status})`);

    // Merchant attempting to log in through Client Portal
    const crossRes2 = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: merchantEmail,
        password: 'merchantSecret123',
        role: 'client', // Trying to access client portal
      }),
    });
    assert(crossRes2.status === 403, `Merchant account accessing Client portal returned 403 Forbidden (got ${crossRes2.status})`);
  } catch (err) {
    assert(false, `Cross-role test error: ${err.message}`);
  }

  // 8. JWT Session Verification (/api/auth/me)
  console.log('\n--- Test 8: JWT Session Verification (GET /api/auth/me) ---');
  try {
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${clientToken}`,
      },
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, `GET /api/auth/me returned 200 OK (got ${meRes.status})`);
    assert(meData.user?.email === clientEmail, 'Returned matching user profile for token');
    assert(meData.user?.role === 'client', 'Correct role retained in user session');

    // Invalid Token
    const invalidRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': 'Bearer invalid_token_12345',
      },
    });
    assert(invalidRes.status === 401, `Invalid token returned 401 Unauthorized (got ${invalidRes.status})`);
  } catch (err) {
    assert(false, `JWT verification error: ${err.message}`);
  }

  // 9. Pre-seeded Demo Accounts
  console.log('\n--- Test 9: 1-Click Pre-seeded Demo Accounts ---');
  try {
    // Client Demo Account
    const demoClientRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'alex.client@dealpilot.ai',
        password: 'demo1234',
        role: 'client',
      }),
    });
    const demoClientData = await demoClientRes.json();
    assert(demoClientRes.status === 200, `Client demo account (alex.client@dealpilot.ai) logged in successfully`);
    assert(demoClientData.user?.role === 'client', 'Client demo account has role "client"');

    // Merchant Demo Account
    const demoMerchantRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'sarah.merchant@dealpilot.ai',
        password: 'merchant1234',
        role: 'merchant',
      }),
    });
    const demoMerchantData = await demoMerchantRes.json();
    assert(demoMerchantRes.status === 200, `Merchant demo account (sarah.merchant@dealpilot.ai) logged in successfully`);
    assert(demoMerchantData.user?.role === 'merchant', 'Merchant demo account has role "merchant"');
    assert(demoMerchantData.user?.storeName === 'OmniTech Enterprise Solutions', 'Merchant demo account has correct storeName');
  } catch (err) {
    assert(false, `Demo accounts error: ${err.message}`);
  }

  console.log(`\n========================================`);
  console.log(`Test Results: ${passedCount} / ${totalCount} passed`);
  console.log(`========================================\n`);

  if (passedCount === totalCount) {
    console.log('🎉 ALL AUTHENTICATION & MONGODB INTEGRATION TESTS PASSED!');
    process.exit(0);
  } else {
    console.error('❌ Some tests failed.');
    process.exit(1);
  }
}

runTests();
