// Count the number of vertical overflowed children. collapsedHeight is the height of the container that applied
// overflow-hidden.
export const countVerticalOverflowedChildren = (parent, collapsedHeight = parent.clientHeight) => {
  if (!parent) {
    return;
  }

  const children = [...parent.children];
  let hiddenChildren = 0;

  children.forEach((child) => {
    // If the child is vertically overflowed, then the top position of it will be lower than the container's bottom
    // position, which signifies by the collapsedHeight attribute.
    child.offsetTop >= collapsedHeight ? hiddenChildren++ : null;
  });

  return hiddenChildren;
};
