<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <!-- to show welcome tuto page -->
    <NuxtPage />
    <!-- to show pages folder -->
  </div>
</template>


<style>
:root {
  --main-color: hsl(22, 100%, 60%);
}

* {
  font-family: 'Inter', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden auto;
}

a {
  text-decoration: none;
  font-size: 1.3rem;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}

.material-symbols-outlined.fill {
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}
</style>