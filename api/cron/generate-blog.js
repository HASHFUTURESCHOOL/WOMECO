const { generateMeaningfulEducationBlog } = require('../../server/services/deepseekService');
const Article = require('../../server/models/article');
const connectDB = require('../../server/db/conn');

module.exports = async (req, res) => {
    try {
        await connectDB();
        const newBlogDraft = await generateMeaningfulEducationBlog();
        
        let saved = null;
        try {
            const article = new Article(newBlogDraft);
            saved = await article.save();
        } catch (dbErr) {
            console.warn('Cron DB save error, generated draft:', newBlogDraft.title);
        }

        return res.status(200).json({
            success: true,
            message: 'Weekly AI Meaningful Education blog generated and queued for admin review.',
            article: saved || newBlogDraft
        });
    } catch (err) {
        console.error('Cron generation error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
};
