function setPosition(
  el: Element,
  direction: "left" | "top" | "right" | "bottom"
) {
  return direction;
}

let boxW = document.querySelector("div");

// ok
boxW && setPosition(boxW, "bottom");

// err
// box&&setPosition(box, 'haha');
