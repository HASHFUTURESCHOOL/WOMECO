import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Paper, Chip } from '@mui/material';
import { GlobeIcon, LocationIcon, BuildingIcon } from './icons/OrgIcons';

const regions = [
  {
    id: 'na',
    name: 'North America',
    headquarters: 'Washington D.C. & Boston',
    hubs: ['United States', 'Canada'],
    members: '32 Alliance Universities',
    grants: '$4.2M Allocated',
    accent: '#2563EB',
  },
  {
    id: 'eu',
    name: 'Europe & Central Asia',
    headquarters: 'Geneva & Paris',
    hubs: ['France', 'Switzerland', 'Germany', 'United Kingdom'],
    members: '48 Policy Secretariats',
    grants: '$5.1M Allocated',
    accent: '#10B981',
  },
  {
    id: 'ap',
    name: 'Asia-Pacific',
    headquarters: 'Tokyo & Singapore',
    hubs: ['Japan', 'Singapore', 'Australia', 'India', 'South Korea'],
    members: '64 Regional Councils',
    grants: '$3.8M Allocated',
    accent: '#F59E0B',
  },
  {
    id: 'la',
    name: 'Latin America & Caribbean',
    headquarters: 'Mexico City & Brasilia',
    hubs: ['Mexico', 'Brazil', 'Chile', 'Colombia'],
    members: '28 Regional Hubs',
    grants: '$2.4M Allocated',
    accent: '#8B5CF6',
  },
  {
    id: 'af',
    name: 'Sub-Saharan Africa',
    headquarters: 'Dakar & Nairobi',
    hubs: ['Senegal', 'Kenya', 'South Africa', 'Ghana', 'Rwanda'],
    members: '36 Digital School Hubs',
    grants: '$3.1M Allocated',
    accent: '#EC4899',
  },
  {
    id: 'me',
    name: 'Middle East & North Africa',
    headquarters: 'Riyadh & Abu Dhabi',
    hubs: ['Saudi Arabia', 'UAE', 'Egypt', 'Jordan'],
    members: '22 Innovation Labs',
    grants: '$2.7M Allocated',
    accent: '#06B6D4',
  },
];

const RegionalMap = () => {
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  return (
    <Box id="regional-hubs" sx={{ py: 10, bgcolor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 7 }}>
          <Chip
            icon={<GlobeIcon size={14} color="#2563EB" />}
            label="WOMECO GLOBAL NETWORK FOOTPRINT"
            size="small"
            sx={{ bgcolor: 'rgba(37, 99, 235, 0.08)', color: '#2563EB', fontWeight: 800, fontSize: '0.72rem', mb: 2 }}
          />
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, letterSpacing: '-0.025em' }}>
            Six Regional Hubs Driving Global Impact
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#475569', fontSize: '1.1rem' }}>
            WOMECO operates decentralized regional secretariats to tailor educational policies and grants to specific cultural and economic environments.
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          {/* Region Tabs List */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {regions.map((r) => {
                const isSelected = activeRegion.id === r.id;
                return (
                  <Paper
                    key={r.id}
                    onClick={() => setActiveRegion(r)}
                    elevation={isSelected ? 2 : 0}
                    sx={{
                      p: 2.5,
                      borderRadius: '14px',
                      cursor: 'pointer',
                      bgcolor: isSelected ? '#FFFFFF' : 'transparent',
                      border: isSelected ? `2px solid ${r.accent}` : '1px solid #E2E8F0',
                      transition: 'all 0.2s ease',
                      '&:hover': { bgcolor: '#FFFFFF', borderColor: r.accent },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: r.accent }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '1.05rem' }}>
                          {r.name}
                        </Typography>
                      </Box>
                      <Chip label={r.members} size="small" sx={{ bgcolor: '#F1F5F9', color: '#475569', fontWeight: 600, fontSize: '0.72rem' }} />
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Grid>

          {/* Active Region Feature Card */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={2}
              sx={{
                p: 5,
                borderRadius: '24px',
                bgcolor: '#0F172A',
                color: '#FFFFFF',
                position: 'relative',
                overflow: 'hidden',
                border: `2px solid ${activeRegion.accent}`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: activeRegion.accent, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                    REGIONAL SECRETARIAT DETAILED BREAKDOWN
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                    {activeRegion.name}
                  </Typography>
                </Box>
                <Chip label="ACTIVE HUB" sx={{ bgcolor: activeRegion.accent, color: '#FFFFFF', fontWeight: 800 }} />
              </Box>

              <Grid container spacing={3} sx={{ my: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: 2.5, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: activeRegion.accent, mb: 1 }}>
                      <BuildingIcon size={20} />
                      <Typography variant="subtitle2" fontWeight={700}>Regional Offices</Typography>
                    </Box>
                    <Typography variant="body2" color="#CBD5E1" fontWeight={600}>{activeRegion.headquarters}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: 2.5, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#10B981', mb: 1 }}>
                      <GlobeIcon size={20} />
                      <Typography variant="subtitle2" fontWeight={700}>Annual Innovation Funding</Typography>
                    </Box>
                    <Typography variant="body2" color="#CBD5E1" fontWeight={600}>{activeRegion.grants}</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" sx={{ color: '#94A3B8', fontWeight: 700, mb: 1, mt: 3 }}>
                MEMBER NATIONS & PILOT HUBS:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {activeRegion.hubs.map((hub) => (
                  <Chip
                    key={hub}
                    icon={<LocationIcon size={14} color="#94A3B8" />}
                    label={hub}
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontWeight: 600 }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegionalMap;
