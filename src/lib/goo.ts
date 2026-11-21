// The goo (as on bleibtgleich.dev): blur the type, then push its alpha through a curve steep
// enough to harden the haze back into edges, so letters run together like liquid. AMP and OFFSET
// set that curve; a lower OFFSET keeps more of each stroke, so the type stays blacker.
export const GOO_AMP = 20
export const GOO_OFFSET = -5

export const gooMatrix = (amp: number, offset: number) => `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${amp} ${offset}`

export const easeOut = (p: number) => 1 - (1 - p) ** 4
export const easeInOut = (p: number) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2)
