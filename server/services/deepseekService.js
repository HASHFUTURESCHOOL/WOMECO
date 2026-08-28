const axios = require('axios');

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-e4c97759992d4c7f9e9ed7949d65b3e8';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

const meaningfulEducationTopics = [
    {
        topic: 'Human-Centric AI in Classrooms',
        category: 'Technology & Policy',
        promptAngle: 'Ethical guidelines, human teacher agency, and safeguarding student critical thinking with generative AI.'
    },
    {
        topic: 'Pedagogy of Purpose & Meaning',
        category: 'Curriculum Reform',
        promptAngle: 'Moving beyond standardized rote memorization towards purpose-driven, project-based education.'
    },
    {
        topic: 'Global Teacher Empowerment & Fellowship',
        category: 'Teacher Empowerment',
        promptAngle: 'Providing cross-border mentorship, competitive educator stipends, and institutional respect for teachers worldwide.'
    },
    {
        topic: 'Emotional Intelligence & Student Mental Health',
        category: 'Well-being & Pedagogy',
        promptAngle: 'Integrating socio-emotional learning, mindfulness, and resilience into primary and secondary curricula.'
    },
    {
        topic: 'Bridging the Rural Digital Divide',
        category: 'Global Access',
        promptAngle: 'Multilateral initiatives deploying satellite connectivity, solar STEM labs, and open educational resources in underserved regions.'
    },
    {
        topic: 'Youth Climate Stewardship & Applied Ecology',
        category: 'Curriculum Reform',
        promptAngle: 'Hands-on environmental problem-solving embedded into national science and civics curricula.'
    },
    {
        topic: 'Future Skills & Competency-Based Assessment',
        category: 'Policy Landmark',
        promptAngle: 'Replacing high-stakes standardized exams with dynamic portfolio and competency mastery evaluations.'
    }
];

/**
 * Generate a new blog/policy article using DeepSeek API
 * @param {string} customTopic Optional topic specified by admin
 */
async function generateMeaningfulEducationBlog(customTopic = null) {
    const selectedTopic = customTopic 
        ? { topic: customTopic, category: 'Curriculum Reform', promptAngle: `Comprehensive analysis and progressive policy insights regarding ${customTopic}.` }
        : meaningfulEducationTopics[Math.floor(Math.random() * meaningfulEducationTopics.length)];

    const systemPrompt = `You are the Chief Research Officer and Policy Fellow at WOMECO (World Meaningful Education Council), an authoritative international body akin to UNESCO and OECD.
Write an inspiring, articulate, policy-grade blog article on the topic of Meaningful Education.
The article must be practical, visionary, and directly relevant to educators, school leaders, and education ministries.

Respond ONLY with valid JSON matching this exact structure:
{
  "title": "Engaging, authoritative title (under 90 chars)",
  "category": "${selectedTopic.category}",
  "author": "WOMECO Research Fellow / AI Policy Division",
  "summary": "2-3 concise sentences summarizing the core thesis and practical recommendation.",
  "content": "A detailed 400-600 word policy article structured with introduction, 2-3 core thematic subsections, and a forward-looking conclusion for educational leaders.",
  "readTime": "5 min read",
  "topic": "${selectedTopic.topic}"
}`;

    try {
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Please generate a comprehensive, high-quality blog article on: ${selectedTopic.topic}. Focus on: ${selectedTopic.promptAngle}` }
                ],
                temperature: 0.7,
                max_tokens: 1200,
                response_format: { type: 'json_object' }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
                },
                timeout: 25000
            }
        );

        const contentRaw = response.data.choices[0].message.content;
        const parsed = JSON.parse(contentRaw);

        return {
            title: parsed.title,
            category: parsed.category || selectedTopic.category,
            author: parsed.author || 'WOMECO Research Fellow',
            summary: parsed.summary,
            content: parsed.content,
            readTime: parsed.readTime || '5 min read',
            topic: selectedTopic.topic,
            status: 'pending_review', // Automatically queued for admin review
            generatedBy: 'DeepSeek-AI',
            publishDate: new Date(),
            createdAt: new Date()
        };
    } catch (err) {
        console.warn('DeepSeek API query notice (falling back to curated draft):', err.message);
        
        // Curated fallback draft if API unreachable or rate-limited
        return {
            title: `Advancing ${selectedTopic.topic}: A 2026 WOMECO Policy Blueprint`,
            category: selectedTopic.category,
            author: 'WOMECO Global Research Secretariat',
            summary: `A forward-looking analysis on ${selectedTopic.topic.toLowerCase()}, detailing structural reforms to create human-centric learning paradigms across international classrooms.`,
            content: `The modern landscape of global education demands a fundamental pivot from standardized industrial compliance toward authentic, meaningful learning.\n\nFirst, educational ecosystems must champion agency. When students engage with curricula rooted in real-world significance—from ecological problem-solving to ethical computational fluency—engagement and retention surge dramatically.\n\nSecond, educator empowerment remains the indispensable foundation. Technology, including generative AI assistants, must serve as force multipliers for empathetic human teachers rather than algorithmic substitutes.\n\nAs WOMECO continues to expand multilateral frameworks across 120 member states, integrating purpose-driven assessments and emotional resilience will define the benchmark of truly equitable education for generations to come.`,
            readTime: '4 min read',
            topic: selectedTopic.topic,
            status: 'pending_review',
            generatedBy: 'DeepSeek-AI (Curated Draft)',
            publishDate: new Date(),
            createdAt: new Date()
        };
    }
}

module.exports = {
    generateMeaningfulEducationBlog,
    meaningfulEducationTopics
};
