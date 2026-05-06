export const suggestPostIdeas = async (topic) => {
    // call AI API here
    return [
      `Top 10 tips about ${topic}`,
      `Beginner guide to ${topic}`,
      `Advanced strategies in ${topic}`
    ];
  };

  export const suggestPostContent = async (topic) => {
    try {
      const prompt = `
        You are a professional blog writer.

        Generate a blog post in STRICT JSON format.

        Structure:
        {
          "title": "",
          "introduction": "",
          "sections": [
            {
              "heading": "",
              "content": "",
              "points": [],
              "subsections": [
                {
                  "title": "",
                  "content": "",
                  "points": []
                }
              ]
            }
          ],
          "conclusion": ""
        }

        Rules:
        - Return ONLY valid JSON
        - No markdown, no explanation
        - No extra text
        - Do NOT ask questions
        - Minimum 4 sections
        - Keep content detailed and structured

        Topic: "${topic}"
        `;
  
      const url = `https://gen.pollinations.ai/text/${encodeURIComponent(prompt)}?key=${process.env.POLL_API_KEY}`;
  
      const response = await fetch(url);
      const data = await response.text();
      return JSON.parse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };