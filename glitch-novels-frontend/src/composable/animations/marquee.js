const marqueeStyle = document.createElement("style");
marqueeStyle.innerHTML = `
  .marquee {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation: marquee var(--duration) linear infinite;
  }

  @keyframes marquee {
    0% {
      margin-left: 0;
      margin-right: var(--width-offset);
    }
    
    100% {
      margin-left: var(--width-offset);
      margin-right: 0;
    }
  }`;

export const useStartMarquee = (container, paddingRem) => {
  const content = container.firstChild;

  // Only execute marquee effect when content overflow
  if (content.offsetWidth <= container.offsetWidth) {
    return;
  }

  // Clone content. Add padding to separate it from the original and class attribute to remove it later.
  const clonedContent = content.cloneNode(true);
  clonedContent.style.paddingLeft = `${paddingRem}rem`;
  clonedContent.setAttribute("class", "clone");
  container.appendChild(clonedContent);

  // Set container width, container width longer than its parent combine with text overflow hidden and no wrap
  // whitespace (set in marquee style) will enable it to move when its margin is changed.
  const contentWidth = content.offsetWidth;
  const containerWidth = contentWidth * 2 + paddingRem * 16;
  container.style.width = `${containerWidth + 1}px`;

  // Add style and appropriate class to the container.
  container.appendChild(marqueeStyle);
  container.classList.add("marquee");

  // Set marquee style variables. These variables will be used in the marquee's style.

  // --width-offset determine the length the container will move to the left. Its value equals the length of the
  // content plus the margin between the original and the clone, which means that after each animate iteration, the
  // clone's position will match the original's position, creating an illusion of an infinity marquee.
  container.style.setProperty("--width-offset", `-${contentWidth + paddingRem * 16}px`);

  // --duration determine the marquee's speed. It makes sure that the marquee's speed remains constant regardless of
  // the content's length.
  const duration = containerWidth / 50;
  container.style.setProperty("--duration", `${duration}s`);
};

export const useStopMarquee = (container) => {
  // If there is no clone, which means that the container doesn't have marquee effect. Do nothing.
  if (!container.querySelector(".clone")) {
    return;
  }

  // Restore the container's state to before adding marquee animation.
  container.classList.remove("marquee");
  container.style.width = null;
  container.style.removeProperty("--width-offset");
  container.style.removeProperty("--duration");

  // Remove cloned content and marquee style.
  container.removeChild(container.querySelector("span.clone"));
  container.removeChild(container.querySelector("style"));
};
