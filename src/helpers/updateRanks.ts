const updateRanks = (mailCount: number, isHasAddonModule: boolean, setRanks: (count: number) => void) => {
  if (mailCount === 1) {
    setRanks(isHasAddonModule ? 2 : 1);
  }
  if (mailCount > 1 && mailCount < 11) {
    setRanks(2);
  }
  if (mailCount > 10) {
    setRanks(3);
  }
};

export default updateRanks;
