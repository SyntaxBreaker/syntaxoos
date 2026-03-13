interface GetWeaponLevelProps {
  score: number;
}

export const getWeaponLevel = ({ score }: GetWeaponLevelProps) => {
  if (score >= 1000) {
    return 3;
  } else if (score >= 500) {
    return 2;
  } else {
    return 1;
  }
};
