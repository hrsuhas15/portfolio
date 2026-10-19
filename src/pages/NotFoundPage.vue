<template>
  <div class="section container not-found">
    <p class="mono code">404</p>
    <h1>Page not found</h1>
    <p>The page you're looking for doesn't exist or has moved.</p>
    <div class="actions">
      <RouterLink to="/" class="btn">Go home</RouterLink>
      <RouterLink to="/projects" class="btn">Browse projects</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.code {
  color: var(--accent);
  font-size: clamp(4rem, 15vw, 8rem);
  line-height: 1;
  margin-bottom: var(--space-4);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-4);
}
</style>
