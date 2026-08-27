// WOMECO Search Functionality

// Sample search data - in a real application, this would come from a backend API
const searchData = [
    {
        type: 'pages',
        title: 'About WOMECO',
        url: 'about.html',
        description: 'Learn about our mission, vision, and global leadership team dedicated to transforming education worldwide.',
        keywords: ['about', 'mission', 'vision', 'leadership', 'team', 'organization']
    },
    {
        type: 'pages',
        title: 'Global Learning Initiatives',
        url: 'programs.html#global-learning',
        description: 'Connecting learners worldwide through collaborative education programs and international exchanges.',
        keywords: ['global', 'learning', 'programs', 'international', 'collaboration', 'classroom network']
    },
    {
        type: 'pages',
        title: 'Teacher Development Programs',
        url: 'programs.html#teacher-development',
        description: 'Empowering educators with skills, knowledge, and resources for 21st-century teaching.',
        keywords: ['teacher', 'training', 'professional development', 'educators', 'teaching', 'fellowship']
    },
    {
        type: 'pages',
        title: 'Digital Education Transformation',
        url: 'programs.html#digital-education',
        description: 'Leveraging technology to expand access and improve learning outcomes globally.',
        keywords: ['digital', 'technology', 'edtech', 'connectivity', 'AI', 'online learning', 'mobile']
    },
    {
        type: 'pages',
        title: 'Education for Sustainability',
        url: 'programs.html#sustainability',
        description: 'Preparing learners to address climate change and build a sustainable future.',
        keywords: ['sustainability', 'climate', 'environment', 'green schools', 'climate action']
    },
    {
        type: 'publications',
        title: 'Global Education Monitoring Report 2025',
        url: 'research.html',
        description: 'Comprehensive analysis of education progress across 195 countries examining access, quality, equity, and learning outcomes.',
        keywords: ['report', 'research', 'monitoring', 'data', 'analysis', 'global', 'education', 'statistics']
    },
    {
        type: 'publications',
        title: 'AI in Education: Opportunities and Ethical Considerations',
        url: 'research.html',
        description: 'Analysis of artificial intelligence applications in education systems and policy recommendations.',
        keywords: ['AI', 'artificial intelligence', 'technology', 'ethics', 'policy', 'innovation']
    },
    {
        type: 'publications',
        title: 'Teacher Well-being and Student Outcomes',
        url: 'research.html',
        description: 'Evidence from 80 countries examining the relationship between educator well-being and learning outcomes.',
        keywords: ['teacher', 'well-being', 'mental health', 'student outcomes', 'research']
    },
    {
        type: 'news',
        title: 'World Leaders Commit $15 Billion to Global Education',
        url: 'news.html',
        description: 'Historic summit results in unprecedented funding and policy reforms for education by 2030.',
        keywords: ['summit', 'funding', 'investment', 'policy', 'leaders', 'announcement']
    },
    {
        type: 'news',
        title: 'New AI-Powered Learning Platform Launches',
        url: 'news.html',
        description: 'Innovative platform designed to personalize learning for 10 million students across diverse systems.',
        keywords: ['AI', 'platform', 'technology', 'personalized learning', 'innovation', 'launch']
    },
    {
        type: 'programs',
        title: 'Connect to Learn - Digital Infrastructure',
        url: 'programs.html#digital-education',
        description: 'Infrastructure initiative providing internet connectivity and devices to underserved schools.',
        keywords: ['connectivity', 'infrastructure', 'internet', 'devices', 'digital divide']
    },
    {
        type: 'programs',
        title: 'Global Teacher Fellowship',
        url: 'programs.html#teacher-development',
        description: 'Intensive professional development program for master educators to become change agents.',
        keywords: ['fellowship', 'teacher', 'training', 'professional development', 'leadership']
    },
    {
        type: 'data',
        title: 'Global Education Database',
        url: 'research.html#data',
        description: 'Comprehensive education indicators from 195 countries spanning 20+ years of data collection.',
        keywords: ['database', 'data', 'statistics', 'indicators', 'enrollment', 'outcomes']
    },
    {
        type: 'pages',
        title: 'Our Global Impact',
        url: 'impact.html',
        description: 'Real stories and measurable results from our programs transforming lives through education.',
        keywords: ['impact', 'success stories', 'results', 'outcomes', 'case studies', 'achievements']
    },
    {
        type: 'pages',
        title: 'Contact WOMECO',
        url: 'contact.html',
        description: 'Get in touch with our team, visit our regional offices, or join our community.',
        keywords: ['contact', 'offices', 'regional', 'email', 'phone', 'address']
    },
    {
        type: 'news',
        title: 'Digital Libraries Transform Reading Culture in Ethiopia',
        url: 'news.html',
        description: 'Mobile digital libraries brought books to 500,000 children in remote Ethiopian villages.',
        keywords: ['digital libraries', 'Ethiopia', 'reading', 'mobile', 'rural', 'success story']
    },
    {
        type: 'programs',
        title: 'Green Schools Initiative',
        url: 'programs.html#sustainability',
        description: 'Transforming schools into models of environmental sustainability and community action.',
        keywords: ['green schools', 'environment', 'sustainability', 'renewable energy', 'eco-friendly']
    },
    {
        type: 'data',
        title: 'Education Data Visualization Tool',
        url: 'research.html#data',
        description: 'Create custom charts, maps, and infographics using our interactive visualization platform.',
        keywords: ['visualization', 'charts', 'maps', 'data tool', 'interactive', 'analytics']
    }
];

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Perform search
function performSearch(query, type = 'all') {
    const searchQuery = query.toLowerCase().trim();

    if (!searchQuery) {
        return [];
    }

    let results = searchData.filter(item => {
        // Check type filter
        if (type !== 'all' && item.type !== type) {
            return false;
        }

        // Check if query matches title, description, or keywords
        const titleMatch = item.title.toLowerCase().includes(searchQuery);
        const descMatch = item.description.toLowerCase().includes(searchQuery);
        const keywordMatch = item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery));

        return titleMatch || descMatch || keywordMatch;
    });

    // Calculate relevance score
    results = results.map(item => {
        let score = 0;
        const lowerTitle = item.title.toLowerCase();
        const lowerDesc = item.description.toLowerCase();

        // Exact title match gets highest score
        if (lowerTitle === searchQuery) score += 100;
        // Title starts with query
        else if (lowerTitle.startsWith(searchQuery)) score += 50;
        // Title contains query
        else if (lowerTitle.includes(searchQuery)) score += 25;

        // Description contains query
        if (lowerDesc.includes(searchQuery)) score += 10;

        // Keyword exact match
        if (item.keywords.some(k => k.toLowerCase() === searchQuery)) score += 30;
        // Keyword contains query
        else if (item.keywords.some(k => k.toLowerCase().includes(searchQuery))) score += 15;

        return { ...item, relevanceScore: score };
    });

    return results;
}

// Display search results
function displayResults(results, query, sortBy = 'relevance') {
    const resultsContainer = document.getElementById('searchResults');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    if (results.length === 0) {
        resultsContainer.innerHTML = '';
        resultsCount.textContent = `No results found for "${query}"`;
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    // Sort results
    if (sortBy === 'relevance') {
        results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    } else if (sortBy === 'title') {
        results.sort((a, b) => a.title.localeCompare(b.title));
    }

    resultsCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found for "${query}"`;

    resultsContainer.innerHTML = results.map(result => `
        <div class="search-result-item" data-type="${result.type}">
            <div class="result-type">${result.type}</div>
            <h3><a href="${result.url}">${highlightQuery(result.title, query)}</a></h3>
            <p>${highlightQuery(result.description, query)}</p>
            <a href="${result.url}" class="result-url">${window.location.origin}/${result.url}</a>
        </div>
    `).join('');
}

// Highlight search query in text
function highlightQuery(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', () => {
    const mainSearchInput = document.getElementById('mainSearchInput');
    const mainSearchBtn = document.getElementById('mainSearchBtn');
    const filterBtns = document.querySelectorAll('.search-filter-btn');
    const sortSelect = document.getElementById('searchSort');
    const popularSearchTags = document.querySelectorAll('.popular-search-tag');

    let currentQuery = getUrlParameter('q') || '';
    let currentType = 'all';
    let currentSort = 'relevance';

    // Set initial query if coming from URL
    if (currentQuery) {
        mainSearchInput.value = currentQuery;
        const results = performSearch(currentQuery, currentType);
        displayResults(results, currentQuery, currentSort);
    }

    // Main search button click
    mainSearchBtn.addEventListener('click', () => {
        currentQuery = mainSearchInput.value;
        if (currentQuery) {
            const results = performSearch(currentQuery, currentType);
            displayResults(results, currentQuery, currentSort);

            // Update URL
            const newUrl = `${window.location.pathname}?q=${encodeURIComponent(currentQuery)}`;
            window.history.pushState({}, '', newUrl);
        }
    });

    // Search on Enter key
    mainSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            mainSearchBtn.click();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentType = btn.getAttribute('data-type');

            if (currentQuery) {
                const results = performSearch(currentQuery, currentType);
                displayResults(results, currentQuery, currentSort);
            }
        });
    });

    // Sort dropdown
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        if (currentQuery) {
            const results = performSearch(currentQuery, currentType);
            displayResults(results, currentQuery, currentSort);
        }
    });

    // Popular search tags
    popularSearchTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const searchTerm = tag.getAttribute('data-search');
            mainSearchInput.value = searchTerm;
            currentQuery = searchTerm;
            const results = performSearch(currentQuery, currentType);
            displayResults(results, currentQuery, currentSort);

            // Scroll to results
            document.querySelector('.search-results-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Also update the header search to redirect to search page
document.addEventListener('DOMContentLoaded', () => {
    const headerSearchInput = document.getElementById('searchInput');
    const headerSearchBtn = headerSearchInput ? headerSearchInput.nextElementSibling : null;

    if (headerSearchBtn && !window.location.pathname.includes('search.html')) {
        headerSearchBtn.addEventListener('click', () => {
            const query = headerSearchInput.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });

        headerSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = headerSearchInput.value.trim();
                if (query) {
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    }
});
