import { TypeAnimation } from "react-type-animation";

const TypingAnime = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Feel free to interact with me.",
        1000,
        "Built With OpenAI API 🤖",
        2000,
        "Your Own Customized MINI-GPT 💻",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "40px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnime;