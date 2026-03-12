interface CheckCircleCollisionProps {
  circleA: { x: number; y: number; radius: number };
  circleB: { x: number; y: number; radius: number };
}

export const checkCircleCollision = ({
  circleA,
  circleB,
}: CheckCircleCollisionProps) => {
  const deltaX = circleA.x - circleB.x;
  const deltaY = circleA.y - circleB.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  return distance < circleA.radius + circleB.radius;
};
