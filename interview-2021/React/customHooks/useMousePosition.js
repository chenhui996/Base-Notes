import { useState, useEffect } from "react";

function useMousePosition() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    function mouseMoveHandler(event) {
      setX(event.clientX);
      setY(event.clientY);
    }
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return [x, y];
}

export default useMousePosition;
