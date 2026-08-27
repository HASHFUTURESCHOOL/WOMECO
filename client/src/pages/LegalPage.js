import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Chip,
  Divider,
  Grid
} from '@mui/material';
import { ShieldCheckIcon, GlobeIcon, BookOpenIcon, AwardIcon } from '../components/icons/OrgIcons';

const tabsData = [
  {
    id: 'privacy',
    label: 'Privacy Policy',
    title: 'Global Data Privacy & Student Protection Policy',
    subtitle: 'Committed to safeguarding learner data, educational research telemetry, and educator sovereignty.',
    sections: [
      {
        heading: '1. International Scope & Principles',
        body: 'WOMECO adheres to strict multilateral data governance standards, incorporating European GDPR benchmarks, Asia-Pacific Privacy Frameworks, and UN Educational Data Guidelines. We enforce complete data minimization across all member research projects.',
      },
      {
        heading: '2. Student & Minor Data Safeguards',
        body: 'Under no circumstances is student identification, facial biometric data, or sensitive behavioral learning telemetry stored on public cloud instances. All pilot data collected for AI benchmarking is strictly anonymized at the district level.',
      },
      {
        heading: '3. Data Subject Rights',
        body: 'Member institutions, researchers, and individual delegates maintain the right to inspect, export, or request the irrevocable erasure of their contact and research submission records at any time by contacting privacy@womeco.org.',
      },
    ],
  },
  {
    id: 'terms',
    label: 'Terms of Governance',
    title: 'Charter of Principles & Governance Regulations',
    subtitle: 'Official framework governing member states, accredited universities, and council fellows.',
    sections: [
      {
        heading: '1. Council Authority & Jurisdiction',
        body: 'WOMECO operates as an international non-governmental education authority. Resolutions, benchmarks, and competency frameworks issued by the General Secretariat represent voluntary multilateral standards ratified by signatory ministries.',
      },
      {
        heading: '2. Fellowship & Institutional Membership',
        body: 'Accredited institutions and selected fellows must uphold the Council Integrity Charter, avoid commercial conflicts of interest in policy drafting, and actively contribute empirical research to open repositories.',
      },
      {
        heading: '3. Intellectual Property & Open Licensing',
        body: 'All policy briefs, educational benchmarks, and curriculum models published by WOMECO are distributed under Creative Commons Attribution-NonCommercial (CC BY-NC 4.0) to maximize global equitable access.',
      },
    ],
  },
  {
    id: 'ethics',
    label: 'Ethics & Compliance',
    title: 'Code of Academic Integrity & AI Ethics Guardrails',
    subtitle: 'Mandatory ethical guardrails for educational technology implementation and research standards.',
    sections: [
      {
        heading: '1. AI Ethics in Classroom Settings',
        body: 'All AI-driven educational software endorsed or evaluated by WOMECO must operate with human-in-the-loop oversight. AI must never replace direct teacher-student mentorship or make high-stakes grading determinations without human audit.',
      },
      {
        heading: '2. Anti-Corruption & Impartiality Code',
        body: 'Secretariat members, grant evaluation panels, and regional council officers are barred from receiving honorariums or commercial incentives from educational technology vendors or private test providers.',
      },
      {
        heading: '3. Whistleblower & Grievance Reporting',
        body: 'A secure, confidential grievance mechanism is maintained by the Independent Ethics Ombudsman. Reports can be submitted anonymously to ethics@womeco.org.',
      },
    ],
  },
  {
    id: 'transparency',
    label: 'Transparency Portal',
    title: 'Financial & Grant Allocation Transparency Disclosures',
    subtitle: 'Open audit records, endowment distribution, and multilateral research grant accounting.',
    sections: [
      {
        heading: '1. Grant Allocation Audits',
        body: '100% of international grant distributions ($15.0M allocated in 2026) undergo biannual independent auditing by certified international accounting standards. Detailed breakdown reports are publicly downloadable.',
      },
      {
        heading: '2. Funding Sources',
        body: 'WOMECO is funded through non-conditional contributions from member state ministries, philanthropic foundations committed to UN SDG 4, and university consortium dues. We accept zero funding tied to commercial curriculum mandates.',
      },
      {
        heading: '3. Annual Impact Reporting',
        body: 'Each December, the General Secretariat publishes the comprehensive Annual Financial & Policy Impact Ledger accessible to the public, press, and academic researchers.',
      },
    ],
  },
];

const LegalPage = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '') || 'privacy';
  
  const initialIndex = tabsData.findIndex(t => t.id === path);
  const [activeTab, setActiveTab] = useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(() => {
    const idx = tabsData.findIndex(t => t.id === location.pathname.replace('/', ''));
    if (idx >= 0) {
      setActiveTab(idx);
    }
  }, [location.pathname]);

  const current = tabsData[activeTab] || tabsData[0];

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '80vh', py: 8 }}>
      
      {/* Header Banner */}
      <Box sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: 8, mb: 6, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Chip
            icon={<ShieldCheckIcon size={14} color="#60A5FA" />}
            label="GOVERNANCE & LEGAL PORTAL"
            sx={{ bgcolor: 'rgba(37,99,235,0.2)', color: '#60A5FA', fontWeight: 800, mb: 2 }}
          />
          <Typography variant="h1" fontWeight={800} letterSpacing="-0.025em" mb={2}>
            Institutional Standards & Transparency
          </Typography>
          <Typography variant="subtitle1" color="#94A3B8" fontSize="1.15rem">
            Explore WOMECO official governance policies, global data privacy charters, ethics guardrails, and transparency disclosures.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Grid container spacing={4}>
          
          {/* Navigation Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper elevation={1} sx={{ borderRadius: '16px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={(e, val) => setActiveTab(val)}
                textColor="secondary"
                indicatorColor="secondary"
                sx={{
                  '& .MuiTab-root': {
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    py: 2.5,
                    px: 3,
                    borderBottom: '1px solid #F1F5F9',
                  }
                }}
              >
                {tabsData.map((tab) => (
                  <Tab key={tab.id} label={tab.label} />
                ))}
              </Tabs>
            </Paper>
          </Grid>

          {/* Policy Content Area */}
          <Grid item xs={12} md={9}>
            <Paper elevation={1} sx={{ p: { xs: 3, md: 5 }, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <Chip
                label={`OFFICIAL CHARTER: ${current.label.toUpperCase()}`}
                size="small"
                sx={{ bgcolor: 'rgba(37,99,235,0.1)', color: '#2563EB', fontWeight: 800, mb: 2 }}
              />
              <Typography variant="h3" fontWeight={800} color="#0F172A" mb={1}>
                {current.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={4}>
                {current.subtitle}
              </Typography>

              <Divider sx={{ mb: 4 }} />

              {current.sections.map((sec, idx) => (
                <Box key={idx} sx={{ mb: 4 }}>
                  <Typography variant="h5" fontWeight={700} color="#0F172A" mb={1.5}>
                    {sec.heading}
                  </Typography>
                  <Typography variant="body1" color="#475569" leading={1.75}>
                    {sec.body}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ p: 3, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', mt: 4 }}>
                <Typography variant="caption" color="text.secondary" display="block" fontWeight={700} mb={0.5}>
                  OFFICIAL INQUIRIES & COMPLIANCE SECRETARIAT:
                </Typography>
                <Typography variant="body2" color="#334155">
                  For formal legal notices, data protection requests, or audit records, contact <strong>governance@womeco.org</strong> or the Geneva Headquarters (Rue du Rhône 42, 1204 Genève, Switzerland).
                </Typography>
              </Box>

            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default LegalPage;
