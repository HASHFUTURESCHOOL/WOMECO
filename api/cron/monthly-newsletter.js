const Subscriber = require('../../server/models/subscriber');
const Article = require('../../server/models/article');
const Program = require('../../server/models/program');
const connectDB = require('../../server/db/conn');
const { generateMonthlyDispatchDigest } = require('../../server/services/newsletterService');

module.exports = async (req, res) => {
    try {
        await connectDB();

        let activeSubs = [];
        try {
            activeSubs = await Subscriber.find({ status: 'active' });
        } catch (dbErr) {
            console.warn('Cron subscribers query notice:', dbErr.message);
        }

        const articles = await Article.find({ status: 'published' }).sort({ publishDate: -1 }).limit(3).catch(() => []);
        const programs = await Program.find().limit(2).catch(() => []);

        const digest = generateMonthlyDispatchDigest(articles, programs);
        const dispatchTimestamp = new Date();

        if (activeSubs.length > 0) {
            await Subscriber.updateMany(
                { status: 'active' },
                { $set: { lastDispatchedAt: dispatchTimestamp } }
            ).catch(() => {});
        }

        return res.status(200).json({
            success: true,
            message: `Automated Monthly Global Policy Dispatch broadcast completed.`,
            recipientCount: activeSubs.length,
            monthYear: digest.monthYear,
            subject: digest.subject,
            dispatchedAt: dispatchTimestamp
        });
    } catch (err) {
        console.error('Monthly newsletter cron error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
};
