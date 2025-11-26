class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        :host(.scrolled) {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
.navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #6366f1, #10b981);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-decoration: none;
          transition: all 0.5s ease;
          position: relative;
        }
        
        .logo:hover {
          text-shadow: 0 0 8px rgba(99, 102, 241, 0.3);
        }
        
        .logo::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #10b981);
          transition: width 0.3s ease;
        }
        
        .logo:hover::after {
          width: 100%;
        }
.nav-links {
          display: flex;
          gap: 2rem;
        }
        
        .nav-link {
          color: #4b5563;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link:hover {
          color: #6366f1;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #6366f1;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #4b5563;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
        }
      </style>
      <nav class="navbar-container">
        <a href="#" class="logo">HD</a>
        
        <div class="nav-links">
          <a href="#about" class="nav-link hover:animate-pulse">About</a>
          <a href="#skills" class="nav-link hover:animate-pulse">Skills</a>
          <a href="#projects" class="nav-link hover:animate-pulse">Projects</a>
          <a href="#timeline" class="nav-link hover:animate-pulse">Journey</a>
          <a href="#contact" class="nav-link bg-gradient-to-r from-indigo-500 to-emerald-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all">Contact</a>
        </div>
        
        <button class="mobile-menu-btn hover:animate-spin">
          <i data-feather="menu"></i>
        </button>
      </nav>
      
      <script>
        // Add scroll effect to navbar
        window.addEventListener('scroll', () => {
          const navbar = document.querySelector('custom-navbar');
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        });
      </script>
`;
    }
}

customElements.define('custom-navbar', CustomNavbar);