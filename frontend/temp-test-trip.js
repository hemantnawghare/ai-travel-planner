const fetch = globalThis.fetch;
(async () => {
  try {
    const registerRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: 'testuser@example.com', password: 'Test1234', firstName: 'Test', lastName: 'User' }),
    });
    const registerJson = await registerRes.json();
    if (!registerRes.ok && registerJson.message !== 'User with this email already exists') {
      console.log('Register failed', registerRes.status, JSON.stringify(registerJson));
      return;
    }
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: 'testuser@example.com', password: 'Test1234' }),
    });
    const loginJson = await loginRes.json();
    if (!loginRes.ok) {
      console.log('Login failed', loginRes.status, JSON.stringify(loginJson));
      return;
    }
    const token = loginJson.token;
    console.log('Login token', token ? 'OK' : 'MISSING');
    const generateRes = await fetch('http://localhost:5000/api/trips/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ destination: 'Paris', durationDays: 3, budgetTier: 'Medium', interests: ['culture','food'] }),
    });
    const generateJson = await generateRes.json();
    console.log('Generate status', generateRes.status);
    console.log(JSON.stringify(generateJson, null, 2));
  } catch (err) {
    console.error('Test error', err);
  }
})();
