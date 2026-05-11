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

Generate a detailed blog post in STRICT JSON format.

Structure:
{
  "title": "string",
  "introduction": "string",
  "sections": [
    {
      "heading": "string",
      "paragraph": "string",
      "subsections": [
        {
          "subheading": "string",
          "paragraph": "string"
        }
      ],
      "points": ["string"]
    }
  ],
  "conclusion": "string"
}

Rules:
- Return ONLY valid JSON
- No markdown
- No explanation
- No extra text
- Minimum 4 sections
- Each section must contain:
  - heading
  - paragraph
  - at least 1 subsection
  - bullet points
- Keep content detailed and SEO friendly
- Use simple readable language

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