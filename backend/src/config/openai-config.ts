const { OpenAIApi } = require('openai');

export const configureOpenAI = () => {
    const openai = new OpenAIApi({
        apiKey: process.env.OPEN_AI_SECRET,
        organization : process.env.OPENAI_ORGANIZATION_ID
    });
    return openai;
}