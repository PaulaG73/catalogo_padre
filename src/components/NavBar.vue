<template>
    <div class="navBar">
      <nav id="navbar-principal" class="navbar navbar-expand-lg navbar-dark bg-vin-negro border-bottom py-2 py-md-4 nav-vino">
        <div class="container-fluid nav-vino-bar">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#">
            <span class="navbar-brand-text">ESPECIAL DÍA DEL PADRE</span>
          </a>
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
    align-items: center;
  }

  .nav-vino .navbar-brand {
    font-size: 1.3rem;
    font-weight: 800;
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
  