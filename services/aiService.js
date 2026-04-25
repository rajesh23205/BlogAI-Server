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
      const url = `https://gen.pollinations.ai/text/${encodeURIComponent(topic)}?key=${process.env.POLL_API_KEY}`;
  
      const response = await fetch(url);
      const data = await response.text();
  
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };