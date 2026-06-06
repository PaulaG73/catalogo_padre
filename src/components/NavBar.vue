<template>
    <div class="navBar">
      <nav id="navbar-principal" class="navbar navbar-expand-lg navbar-dark bg-vin-negro border-bottom py-2 py-md-4 nav-vino">
        <div class="container-fluid nav-vino-bar">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#">
            <span class="navbar-brand-text">ESPECIAL DÍA DEL PADRE</span>
          </a>
          <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse nav-vino-menu" id="navbarSupportedContent">
            <a href="#packs" class="nav-vinos-packs-link mb-2 mb-lg-0">Ir a vinos y packs</a>
            <a href="#sobre-mi" class="navbar-logo-link ms-lg-auto mb-2 mb-lg-0" aria-label="Vinóloga">
              <img
                class="navbar-logo"
                src="/img/logo-vinologa.png"
                alt="Logo Vinóloga"
                width="120"
                height="120"
              >
            </a>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  
  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .nav-vino {
    border-color: var(--vin-borde-sutil) !important;
    box-shadow: 0 1px 0 0 rgba(109, 44, 53, 0.35);
  }
  
  .nav-vino .navbar-brand {
    font-family: 'Nunito', system-ui, sans-serif;
    color: rgba(255, 255, 255, 0.92);
  }

  .nav-vino .navbar-brand:hover,
  .nav-vino .navbar-brand:focus {
    color: #fff;
  }

  .nav-vino-bar {
    position: relative;
    align-items: center;
  }

  @media (min-width: 992px) {
    .nav-vino-menu {
      align-items: center;
    }
  }

  .nav-vinos-packs-link {
    display: inline-block;
    font-family: 'Nunito', system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: rgba(255, 255, 255, 0.92);
    text-decoration: none;
    padding: 0.4rem 0.85rem;
    border-radius: 0.4rem;
    position: relative;
    transition:
      color 0.2s ease,
      background-color 0.2s ease,
      transform 0.2s ease;
  }

  .nav-vinos-packs-link::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0.15rem;
    width: 0;
    height: 2px;
    border-radius: 2px;
    background-color: var(--vin-acento, #6d2c35);
    transform: translateX(-50%);
    transition: width 0.28s ease;
  }

  .nav-vinos-packs-link:hover,
  .nav-vinos-packs-link:focus-visible {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  .nav-vinos-packs-link:hover::after,
  .nav-vinos-packs-link:focus-visible::after {
    width: calc(100% - 1.1rem);
  }

  @media (min-width: 992px) {
    .nav-vinos-packs-link {
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-vinos-packs-link {
      transition: color 0.15s ease, background-color 0.15s ease;
    }

    .nav-vinos-packs-link:hover,
    .nav-vinos-packs-link:focus-visible {
      transform: none;
    }

    .nav-vinos-packs-link::after {
      transition: width 0.15s ease;
    }
  }

  .navbar-logo-link {
    display: inline-flex;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    line-height: 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
  }
  
  .navbar-logo-link:hover,
  .navbar-logo-link:focus-visible {
    transform: scale(1.05);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.28);
  }
  
  .navbar-logo {
    display: block;
    width: 72px;
    height: 72px;
    object-fit: cover;
    object-position: center;
  }
  
  @media (min-width: 768px) {
    .navbar-logo {
      width: 96px;
      height: 96px;
    }
  }
  
  @media (min-width: 992px) {
    .navbar-logo {
      width: 120px;
      height: 120px;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .navbar-logo-link {
      transition: box-shadow 0.15s ease;
    }
  
    .navbar-logo-link:hover,
    .navbar-logo-link:focus-visible {
      transform: none;
    }
  }
  
  .navbar-toggler {
    border-color: rgba(255, 255, 255, 0.35);
  }

  .nav-vino .navbar-brand {
    font-size: 1.3rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  @media (min-width: 992px) {
    .nav-vino .navbar-brand {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 1200px) {
    .nav-vino .navbar-brand {
      font-size: 1.68rem;
    }
  }
  
  </style>
  