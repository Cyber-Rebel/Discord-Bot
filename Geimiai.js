const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function aireponces(prompts) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompts,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
        
      },
      systemInstruction:"The responce should me max 40 line " 

    }
  }); 
  // console.log(response.text);
  return response.text
}

// await main();
module.exports= aireponces