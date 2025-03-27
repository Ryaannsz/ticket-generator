(function() {
    const form = document.getElementById('ticketForm');
    const ticketDiv = document.getElementById('ticket');
    const maxFileSize = 2 * 1024 * 1024; // 2MB

    
    function showError(control, message) {
      const errorDiv = control.querySelector('.error');
      errorDiv.textContent = message;
      control.querySelector('input').style.borderColor = '#e74c3c';
    }

    
    function clearError(control) {
      const errorDiv = control.querySelector('.error');
      errorDiv.textContent = '';
      control.querySelector('input').style.borderColor = '#e2e8f0';
    }

    
    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

  
    function isValidGitHub(url) {
      if (!url) return true; 
      const re = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/;
      return re.test(String(url).toLowerCase());
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

     
      const fullNameControl = document.getElementById('fullName').parentElement;
      const emailControl = document.getElementById('email').parentElement;
      const githubControl = document.getElementById('github').parentElement;
      const avatarControl = document.getElementById('avatar').parentElement;
      
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const github = document.getElementById('github').value.trim();
      const avatarInput = document.getElementById('avatar');
      const avatarFile = avatarInput.files[0];

      clearError(fullNameControl);
      clearError(emailControl);
      clearError(githubControl);
      clearError(avatarControl);

     
      if (!fullName) {
        showError(fullNameControl, 'Por favor, insira seu nome completo.');
        isValid = false;
      }

      if (!email) {
        showError(emailControl, 'Por favor, insira seu e-mail.');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError(emailControl, 'Formato de e-mail inválido.');
        isValid = false;
      }
      

      if (github && !isValidGitHub(github)) {
        showError(githubControl, 'URL do GitHub inválida. Formato: https://github.com/seu-usuario');
        isValid = false;
      }
      

      if (!avatarFile) {
        showError(avatarControl, 'Envie sua imagem de avatar.');
        isValid = false;
      } else {
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(avatarFile.type)) {
          showError(avatarControl, 'Tipo de arquivo inválido. Use .jpg, .jpeg ou .png.');
          isValid = false;
        } else if (avatarFile.size > maxFileSize) {
          showError(avatarControl, 'A imagem é muito grande. Limite de 2MB.');
          isValid = false;
        }
      }

    
      if (isValid) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const ticketCode = Math.random().toString(36).substr(2, 6).toUpperCase();
          const githubUsername = github ? github.split('/').pop() : null;
          
          ticketDiv.innerHTML = `
            <div class="ticket-content">
              <div class="ticket-header">
                <h2>Conferência Tech 2024</h2>
                <p>21-23 Nov | São Paulo - SP</p>
              </div>
              <img src="${event.target.result}" alt="Avatar">
              <div class="ticket-details">
                <p><strong>Nome:</strong> ${fullName}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                ${github ? `
                <div class="github-profile">
                  <a href="${github}" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                    </svg>
                    ${githubUsername}
                  </a>
                </div>
                ` : ''}
                <div class="ticket-barcode"></div>
              </div>
              <small>Código do ingresso: #TC2024-${ticketCode}</small>
            </div>
          `;
          
          ticketDiv.hidden = false;
         
          ticketDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
         
          
        };
        reader.readAsDataURL(avatarFile);
      }
    });

  
    document.querySelectorAll('input, button').forEach(el => {
      el.addEventListener('keyup', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
          form.dispatchEvent(new Event('submit'));
        }
      });
    });
  })();
