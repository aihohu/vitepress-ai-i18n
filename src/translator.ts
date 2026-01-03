import OpenAI from 'openai';

export class Translator {
  private client: OpenAI;
  constructor(apiKey: string, baseURL: string) {
    this.client = new OpenAI({ apiKey, baseURL });
  }

  async translate(content: string, lang: string, model: string, glossary: any, customSystemPrompt?: string) {
    // If customSystemPrompt is not provided, the default Markdown translation directives will be used.
    const defaultPrompt = `You are a technical translator. Translate to ${lang}.
     Keep Markdown structures, code blocks, and Frontmatter keys intact. 
     Glossary: ${JSON.stringify(glossary)}`;

    const res = await this.client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: customSystemPrompt || defaultPrompt },
        { role: 'user', content }
      ],
      temperature: 0
    });
    return res.choices[0].message.content;
  }
}