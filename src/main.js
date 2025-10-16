// CSS is now inline in HTML - no import needed

// CSS is now inline - no fallback needed

// Debug info
console.log('🚀 Skyline News Loading...');
console.log('Current URL:', window.location.href);
console.log('User Agent:', navigator.userAgent);

// Verify DOM is ready
console.log('DOM State:', document.readyState);

// Test API availability
console.log('Testing NY Times API connection...');
console.log('API Key present:', API_KEY ? 'Yes' : 'No');

// NY Times API Integration
const API_KEY = 'eQXmmahM2v1pEMNk25PtkDDniEGgy41q';

const API_ENDPOINTS = {
    mostViewed: `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`,
    mostShared: `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${API_KEY}`,
    search: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${API_KEY}`
};

let currentCategory = 'mostViewed';

// Weather API
const WEATHER_API = 'https://goweather.xyz/weather/NY';

// DOM Elements
const newsGrid = document.getElementById('newsGrid');
const loading = document.getElementById('loading');
const navLinks = document.querySelectorAll('.nav-link');
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');
const performSearchBtn = document.getElementById('performSearch');
const weatherContent = document.getElementById('weatherContent');

// Show/Hide loading
function showLoading() {
    if (loading) {
        loading.style.display = 'flex';
        loading.innerHTML = `
            <div class="spinner"></div>
            <p>Loading the latest news...</p>
        `;
    }
    if (newsGrid) newsGrid.innerHTML = '';
}

function hideLoading() {
    if (loading) loading.style.display = 'none';
}

// Show error
function showError(message) {
    hideLoading();
    if (newsGrid) {
        newsGrid.innerHTML = `
            <div class="error-message">
                <h2>📰 Unable to load news</h2>
                <p>${message}</p>
                <button onclick="loadNews('${currentCategory}')" class="retry-btn">🔄 Try Again</button>
            </div>
        `;
    }
}

// Create news card
function createNewsCard(article, apiType) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    let title, abstract, publishedDate, author, imageUrl, link;
    
    if (apiType === 'mostViewed' || apiType === 'mostShared') {
        title = article.title || 'No Title';
        abstract = article.abstract || 'No description available';
        publishedDate = article.published_date || '';
        
        // Safe author extraction for most viewed/shared
        let authorRaw = article.byline || 'Unknown Author';
        author = typeof authorRaw === 'string' ? authorRaw.replace('By ', '') : 'Unknown Author';
        
        link = article.url || article.short_url || 'https://www.nytimes.com';
        
        // Add image for Most Viewed/Shared
        imageUrl = 'https://via.placeholder.com/400x250/667eea/ffffff?text=NY+Times+News';
        if (article.media && article.media.length > 0) {
            const mediaMetadata = article.media[0]['media-metadata'];
            if (mediaMetadata && mediaMetadata.length > 0) {
                imageUrl = mediaMetadata[mediaMetadata.length - 1].url;
            }
        }
    } else {
        // Debug log for Top Stories/Search API
        console.log('=== TOP STORIES/SEARCH ARTICLE DEBUG ===');
        console.log('Full article object:', article);
        console.log('headline:', article.headline);
        console.log('byline:', article.byline);
        console.log('web_url:', article.web_url);
        console.log('=======================================');
        
        title = article.headline?.main || article.title || 'No Title';
        abstract = article.abstract || article.snippet || article.lead_paragraph || 'No description available';
        publishedDate = article.pub_date || article.published_date || '';
        
        // Safe author extraction for search - handle different byline formats
        let authorRaw = 'Unknown Author';
        if (article.byline) {
            if (typeof article.byline === 'string') {
                authorRaw = article.byline;
            } else if (article.byline.original) {
                authorRaw = article.byline.original;
            } else if (article.byline.person && article.byline.person.length > 0) {
                authorRaw = article.byline.person[0].firstname + ' ' + article.byline.person[0].lastname;
            }
        }
        author = typeof authorRaw === 'string' ? authorRaw.replace(/^By\s+/i, '') : 'Unknown Author';
        
        link = article.web_url || article.url || article.short_url || 'https://www.nytimes.com';
        
        // NO IMAGE for Top Stories/Search - set to null
        imageUrl = null;
    }
    
    // Ensure we have a valid link
    if (!link || link === '#' || link === '') {
        link = 'https://www.nytimes.com';
    }
    
    // Validate link format
    if (link && !link.startsWith('http')) {
        link = 'https://www.nytimes.com' + (link.startsWith('/') ? link : '/' + link);
    }
    
    const formattedDate = publishedDate ? 
        new Date(publishedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }) : '';
    
    // Truncate abstract to ensure consistent card heights
    if (abstract.length > 140) {
        abstract = abstract.substring(0, 137) + '...';
    }
    
    // Truncate title if too long
    if (title.length > 80) {
        title = title.substring(0, 77) + '...';
    }
    
    // Create image section only if imageUrl exists
    const imageSection = imageUrl ? `
        <div class="news-image">
            <img src="${imageUrl}" alt="${title}" onerror="this.src='https://via.placeholder.com/400x250/667eea/ffffff?text=NY+Times+News'">
        </div>
    ` : '';

    card.innerHTML = `
        ${imageSection}
        <div class="news-content">
            <h3 class="news-title">${title}</h3>
            <p class="news-description">${abstract}</p>
            <div class="news-meta">
                <span class="news-author">✍️ ${author}</span>
                <span class="news-date">📅 ${formattedDate}</span>
            </div>
            <a href="${link}" target="_blank" rel="noopener noreferrer" class="news-link">
                Read Full Article →
            </a>
        </div>
    `;
    
    return card;
}

// Fetch news
async function fetchNews(category = 'mostViewed') {
    const endpoint = API_ENDPOINTS[category];
    if (!endpoint) {
        throw new Error('Invalid category');
    }
    
    console.log(`Fetching ${category} from:`, endpoint);
    
    const response = await fetch(endpoint);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Data received:', data);
    
    let articles = [];
    if (data.results) {
        articles = data.results;
    } else if (data.response && data.response.docs) {
        articles = data.response.docs;
    }
    
    return articles;
}

// Display news
function displayNews(articles, apiType) {
    hideLoading();
    
    if (!articles || articles.length === 0) {
        showError('No articles found');
        return;
    }
    
    newsGrid.innerHTML = '';
    
    articles.slice(0, 12).forEach(article => {
        const card = createNewsCard(article, apiType);
        newsGrid.appendChild(card);
    });
    
    console.log(`Displayed ${articles.length} articles`);
}

// Load news function
async function loadNews(category = 'mostViewed') {
    showLoading();
    currentCategory = category;
    
    try {
        const articles = await fetchNews(category);
        displayNews(articles, category);
    } catch (error) {
        console.error('Load news error:', error);
        showError(`Failed to load news: ${error.message}`);
    }
}

// Search functionality
async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    const searchEndpoint = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${API_KEY}`;
    
    // Close modal
    searchModal.style.display = 'none';
    
    // Update active nav
    navLinks.forEach(l => l.classList.remove('active'));
    
    showLoading();
    
    try {
        const response = await fetch(searchEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        const articles = data.response?.docs || [];
        displayNews(articles, 'search');
        
        // Clear search input
        searchInput.value = '';
    } catch (error) {
        console.error('Search error:', error);
        showError(`Search failed: ${error.message}`);
    }
}

// Weather Functions
async function fetchWeather() {
    try {
        console.log('Fetching weather data from:', WEATHER_API);
        const response = await fetch(WEATHER_API);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Weather data received:', data);
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
}

function displayWeather(weatherData) {
    if (!weatherContent) return;
    
    const { temperature, wind, description, forecast } = weatherData;
    
    // Format forecast days - only show Tomorrow
    const forecastHTML = forecast && forecast.length > 0 && forecast[0] ? 
        `<div class="forecast-day">
            <span class="forecast-day-name">Tomorrow</span>
            <div>
                <div class="forecast-temp">${forecast[0].temperature || 'N/A'}</div>
                <div class="forecast-wind">🌬️ ${forecast[0].wind || 'N/A'}</div>
            </div>
        </div>` : '<p>Forecast not available</p>';
    
    weatherContent.innerHTML = `
        <div class="weather-current">
            <div class="weather-temp">${temperature || 'N/A'}</div>
            <div class="weather-desc">${description || 'No description'}</div>
            <div class="weather-wind">
                <span>🌬️</span>
                <span>${wind || 'N/A'}</span>
            </div>
        </div>
        <div class="weather-forecast">
            <h4>Tomorrow's Forecast</h4>
            ${forecastHTML}
        </div>
    `;
}

async function loadWeather() {
    if (!weatherContent) return;
    
    try {
        const weatherData = await fetchWeather();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Failed to load weather:', error);
        weatherContent.innerHTML = `
            <div class="weather-error">
                <p>⚠️ Unable to load weather</p>
                <button onclick="loadWeather()" class="retry-btn" style="padding: 0.5rem 1rem; margin-top: 0.5rem; background: var(--accent-color); color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Retry
                </button>
            </div>
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Skyline News initialized successfully!');
    
    // Add a subtle entrance animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Navigation event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            
            // Update active state with smooth transition
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            loadNews(category);
        });
    });
    
    // Search modal events
    if (searchBtn && searchModal && closeSearchBtn) {
        searchBtn.addEventListener('click', () => {
            searchModal.style.display = 'flex';
            searchInput.focus();
        });
        
        closeSearchBtn.addEventListener('click', () => {
            searchModal.style.display = 'none';
        });
        
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.style.display = 'none';
            }
        });
    }
    
    // Search functionality
    if (performSearchBtn) {
        performSearchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Load initial news and weather
    loadNews('mostViewed');
    loadWeather();
});

// Make functions globally available for retry buttons
window.loadNews = loadNews;
window.loadWeather = loadWeather;
