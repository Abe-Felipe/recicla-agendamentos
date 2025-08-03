const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    loginMessage.textContent = 'E-mail e senha são obrigatórios.';
    loginMessage.style.display = 'block';
    return;
  }
  
  loginButton.disabled = true;
  loginButton.textContent = 'Entrando...';
  loginMessage.style.display = 'none';

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Falha no login.');
    }

    localStorage.setItem('authToken', result.token);

    window.location.href = 'painel.html';

  } catch (error) {
    loginMessage.textContent = error.message;
    loginMessage.style.display = 'block';
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = 'Entrar';
  }
});