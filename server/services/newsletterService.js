/**
 * WOMECO Monthly Global Policy Dispatch & Newsletter Service
 */

function generateMonthlyDispatchDigest(articles = [], programs = []) {
    const monthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    const topArticles = articles.slice(0, 3);
    const topPrograms = programs.slice(0, 2);

    const subject = `WOMECO Monthly Global Policy Dispatch – ${monthYear}`;

    const textContent = `
======================================================
WOMECO | WORLD MEANINGFUL EDUCATION COUNCIL
MONTHLY GLOBAL POLICY DISPATCH – ${monthYear.toUpperCase()}
======================================================

Dear Delegate / Education Leader,

Welcome to the ${monthYear} edition of the WOMECO Global Policy Dispatch. Below are the latest intergovernmental directives, empirical findings, and funding grants ratified by the Council.

------------------------------------------------------
1. TOP POLICY BRIEFS & RELEASES:
------------------------------------------------------
${topArticles.map((a, i) => `${i + 1}. ${a.title}\n   Category: ${a.category || 'Policy Paper'} | By: ${a.author || 'Secretariat'}\n   Summary: ${a.summary || a.content.substring(0, 160)}...\n`).join('\n')}

------------------------------------------------------
2. ACTIVE FELLOWSHIPS & MULTILATERAL PROGRAMS:
------------------------------------------------------
${topPrograms.map((p, i) => `${i + 1}. ${p.title}\n   Pillar: ${p.category} | Grant Budget: ${p.budget || '$5M'}\n   Impact: ${p.impact || 'Global'}\n   Scope: ${p.description.substring(0, 140)}...\n`).join('\n')}

------------------------------------------------------
GLOBAL GOVERNANCE NOTICE:
WOMECO operates across 120 member states in partnership with UN SDG Goal 4 to champion equitable, meaningful learning.

Read full papers online: https://www.womeco.org/news
Secretariat Inquiries: secretariat@womeco.org
======================================================
To manage your monthly subscription, visit https://www.womeco.org
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8FAFC; color: #0F172A; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; }
    .header { background: #0F172A; padding: 32px; text-align: center; color: #FFFFFF; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; letter-spacing: 0.05em; font-weight: 800; color: #FFFFFF; }
    .header p { margin: 0; color: #94A3B8; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; }
    .content { padding: 32px; }
    .badge { display: inline-block; background: #EFF6FF; color: #2563EB; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; margin-bottom: 12px; }
    .section-title { font-size: 16px; font-weight: 800; color: #0F172A; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px; margin: 24px 0 16px 0; text-transform: uppercase; }
    .card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 18px; margin-bottom: 14px; }
    .card h3 { margin: 0 0 8px 0; font-size: 15px; color: #0F172A; font-weight: 700; }
    .card p { margin: 0; font-size: 13px; color: #475569; line-height: 1.6; }
    .footer { background: #0F172A; color: #64748B; padding: 24px; text-align: center; font-size: 12px; }
    .footer a { color: #60A5FA; text-decoration: none; }
    .btn { display: inline-block; background: #2563EB; color: #FFFFFF !important; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>WOMECO</h1>
      <p>World Meaningful Education Council</p>
      <div style="margin-top: 14px; font-size: 12px; color: #60A5FA; font-weight: 700;">
        MONTHLY POLICY DISPATCH – ${monthYear.toUpperCase()}
      </div>
    </div>

    <div class="content">
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        Welcome to your monthly briefing from the World Meaningful Education Council secretariat. Below are the key policy landmark directives, empirical findings, and funding initiatives formulated for global education leaders.
      </p>

      <div class="section-title">Key Policy Landmark Directives</div>
      ${topArticles.map(a => `
        <div class="card">
          <span class="badge">${a.category || 'Policy Paper'}</span>
          <h3>${a.title}</h3>
          <p>${a.summary || a.content.substring(0, 160)}...</p>
        </div>
      `).join('')}

      <div class="section-title">Active Fellowships & Grants</div>
      ${topPrograms.map(p => `
        <div class="card" style="border-left: 4px solid #10B981;">
          <span class="badge" style="background: #ECFDF5; color: #059669;">${p.category}</span>
          <h3>${p.title}</h3>
          <p><strong>Impact:</strong> ${p.impact || 'Global'} | <strong>Funding:</strong> ${p.budget || '$5.0M'}</p>
          <p style="margin-top: 6px;">${p.description.substring(0, 140)}...</p>
        </div>
      `).join('')}

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://www.womeco.org/news" class="btn">Explore All Published Reports →</a>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px 0; color: #94A3B8;">WOMECO | UN SDG Goal 4 Partner Organization</p>
      <p style="margin: 0;">You are receiving this monthly dispatch because you subscribed at <a href="https://www.womeco.org">womeco.org</a>.</p>
    </div>
  </div>
</body>
</html>
`;

    return {
        subject,
        textContent,
        htmlContent,
        monthYear,
        articleCount: topArticles.length,
        programCount: topPrograms.length
    };
}

module.exports = {
    generateMonthlyDispatchDigest
};
