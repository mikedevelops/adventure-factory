/**
 * @typedef {Object} Passage
 * @property {string} id
 * @property {number} order
 * @property {boolean} isComplete
 * @property {boolean} isActive
 * @property {PassageText} text
 */

/**
 * @param {string} id
 * @param {number} order
 * @param {PassageText} text
 * @param {boolean} isComplete
 * @param {boolean} isActive
 * @return {Passage}
 */
export const createPassage = (
  id,
  order,
  text,
  isComplete = false,
  isActive = false
) => ({
  id,
  order,
  text,
  isComplete,
  isActive
});

/**
 * @param {List<Passage>} passages
 * @return {Passage|null}
 */
export const getNextPassage = passages => {
  const sortedPassages = sortByPassageOrder(passages);
  const next = sortedPassages.find(p => p.isComplete === false);

  if (next === undefined) {
    return null;
  }

  return next;
};

/**
 * @param {List<Scene>} scenes
 * @return {Passage|null}
 */
export const getActivePassage = scenes => {
  const scene = scenes.find(s => s.isActive);

  if (scene === undefined) {
    return null;
  }

  const passage = scene.passages.find(p => p.isActive);
  return passage !== undefined ? passage : null;
};

/**
 * @param {List<Passage>} passages
 * @return {List<Passage>}
 */
export const sortByPassageOrder = passages => {
  return passages.sortBy(p => p.order);
};

/**
 * @param {List<Passage>} passages
 * @param {Passage} passage
 * @return {List<Passage>}
 */
export const activatePassage = (passages, passage) => {
  return passages.map(p => {
    if (p.id === passage.id) {
      return Object.assign({}, passage, { isActive: true });
    }

    return Object.assign({}, p, {
      isActive: false
    });
  });
};

/**
 * @param {List<Passage>} passages
 * @return {List<Passage>}
 */
export const deactivatePassages = passages => {
  return passages.map(p => Object.assign({}, p, { isActive: false }));
};

/**
 * @param {List<Passage>} passages
 * @param {Passage} passage
 * @return {List<Passage>}
 */
export const setPassageComplete = (passages, passage) => {
  return passages.map(p => {
    if (p.id === passage.id) {
      return Object.assign({}, passage, { isComplete: true, isActive: false });
    }

    return p;
  });
};
