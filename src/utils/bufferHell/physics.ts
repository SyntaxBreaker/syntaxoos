interface Entity {
  x: number;
  y: number;
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
}: CleanUpEntitiesProps<T>): T[] => {
  return entities.current.filter(
    (entity) =>
      entity.x > -margin &&
      entity.x < width &&
      entity.y > -margin &&
      entity.y < height + margin,
  );
};
