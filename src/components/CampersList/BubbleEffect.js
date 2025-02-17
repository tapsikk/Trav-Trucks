import bubbleStyles from "./BubbleAnimation.module.css";


const createBubbleEffect = (e) => {
  const button = e;
  const bubblesCount = 5;
  for (let i = 0; i < bubblesCount; i++) {
    const bubble = document.createElement("div");
    bubble.className = bubbleStyles.bubble;
    const angle = Math.random() * 2 * Math.PI;
    const distance = 10 + Math.random() * 20;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    bubble.style.setProperty("--x", `${x}px`);
    bubble.style.setProperty("--y", `${y}px`);
    bubble.style.left = "50%";
    bubble.style.top = "50%";
    bubble.style.transform = "translate(-50%, -50%)";
    button.appendChild(bubble);
    setTimeout(() => bubble.remove(), 800);
  }
};

export default createBubbleEffect;