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


/* radio button */
input[type=radio] {
  /* carré radio */
  appearance: none;
  width: 22px;
  height: 22px;
  border: 1px solid hsl(0, 0%, 93%);
  outline: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin: 0.25rem;
}

input[type=radio]::before {
  content: '';
  background-color: var(--main-color);
  display: block;
  width: 14px;
  height: 14px;
  margin: 3px;
  opacity: 0;
  user-select: none;

  transition: all 0.2s cubic-bezier(0.77, 0.2, 0.05, 1);
}

input[type=radio]:checked::before {
  content: '';
  background-color: var(--main-color);
  display: block;
  width: 14px;
  height: 14px;
  margin: 3px;

  opacity: 1;
}

input[type=radio]:hover {
  border: 1px solid var(--main-color);
}

/* input text */
input[type=text] {
  appearance: none;
  height: 2rem;
  /* only border bottom */
  border: none;
  border-bottom: 2px solid hsl(0, 0%, 90%);
  outline: 0;
  padding: 0 0.5rem;

  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin: 0.25rem;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
}

input[type=text]::placeholder {
  color: hsl(0, 0%, 60%);
}

input[type=text]:focus {
  border-bottom: 2px solid var(--main-color);
}

input[type=text]:hover {
  border-bottom: 2px solid var(--main-color);
}

/* remouve default select on input text */
</style>