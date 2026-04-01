interface Entity {
  x: number;
  y: number;
  radius: number;
}

interface CleanUpEntitiesProps<T> {
  entities: React.RefObject<T[]>;
  width: number;
  height: number;
  margin: number;
}

export const cleanUpEntities = <T extends Entity>({
  entities,
  width,
  height,
  margin,
}: CleanUpEntitiesProps<T>): void => {
  entities.current = entities.current.filter(
    (entity) =>
      entity.x > -margin &&
      entity.x < width + margin &&
      entity.y > -margin &&
      entity.y < height + margin,
  );
};

export const separateEntities = <T extends Entity>(entities: T[]) => {
  entities.forEach((entityA, index) => {
    const otherEntities = entities.slice(index + 1);

    otherEntities.forEach((entityB) => {
      const deltaX = entityB.x - entityA.x;
      const deltaY = entityB.y - entityB.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const minDistance = (entityA.radius + entityB.radius) * 4;

      if (distance < minDistance) {
        const overlap = (minDistance - distance) / 2;
        const repelX = (deltaX / distance) * overlap;
        const repelY = (deltaY / distance) * overlap;

        entityA.x -= repelX;
        entityA.y -= repelY;
        entityB.x += repelX;
        entityB.y += repelY;
      }
    });
  });
};
