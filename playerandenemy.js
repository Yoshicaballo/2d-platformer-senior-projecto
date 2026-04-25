
  // Gravity and jumping
  enemy.vy += (enemy.gravity * stepTime) / 10;
  if ((keysDown.w || keysDown.ArrowUp) && enemy.onGround) {
    enemy.vy = enemy.jumpStrength;
    enemy.onGround = false;