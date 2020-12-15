<template>
  <!-- Navbar -->
  <div class="navbar">
      <div class="container flex">
          <h1 class="logo">Ecommerce</h1>
          <nav>
              <ul>
                  <li><router-link to="/">Home</router-link> </li>
                  <li><router-link to="/cart">Cart</router-link> </li>
                  <li><router-link to="/profile">Profile</router-link> </li>
              </ul>
          </nav>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>

</style>
