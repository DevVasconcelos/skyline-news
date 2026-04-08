(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();console.log("🚀 Skyline News Loading...");console.log("Current URL:",window.location.href);console.log("User Agent:",navigator.userAgent);console.log("DOM State:",document.readyState);const m="eQXmmahM2v1pEMNk25PtkDDniEGgy41q";console.log("Testing NY Times API connection...");console.log("API Key present:","Yes");const P={mostViewed:`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${m}`,mostShared:`https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${m}`,search:`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${m}`};let T="mostViewed";const b="https://goweather.xyz/weather/NY",d=document.getElementById("newsGrid"),p=document.getElementById("loading"),y=document.querySelectorAll(".nav-link"),E=document.getElementById("searchBtn"),l=document.getElementById("searchModal"),L=document.getElementById("closeSearchBtn"),u=document.getElementById("searchInput"),N=document.getElementById("performSearch"),w=document.getElementById("weatherContent");function k(){p&&(p.style.display="flex",p.innerHTML=`
            <div class="spinner"></div>
            <p>Loading the latest news...</p>
        `),d&&(d.innerHTML="")}function A(){p&&(p.style.display="none")}function v(e){A(),d&&(d.innerHTML=`
            <div class="error-message">
                <h2>📰 Unable to load news</h2>
                <p>${e}</p>
                <button onclick="loadNews('${T}')" class="retry-btn">🔄 Try Again</button>
            </div>
        `)}function D(e,s){const n=document.createElement("div");n.className="news-card";let o,t,r,c,h,a;if(s==="mostViewed"||s==="mostShared"){o=e.title||"No Title",t=e.abstract||"No description available",r=e.published_date||"";let i=e.byline||"Unknown Author";if(c=typeof i=="string"?i.replace("By ",""):"Unknown Author",a=e.url||e.short_url||"https://www.nytimes.com",h="https://via.placeholder.com/400x250/667eea/ffffff?text=NY+Times+News",e.media&&e.media.length>0){const f=e.media[0]["media-metadata"];f&&f.length>0&&(h=f[f.length-1].url)}}else{console.log("=== TOP STORIES/SEARCH ARTICLE DEBUG ==="),console.log("Full article object:",e),console.log("headline:",e.headline),console.log("byline:",e.byline),console.log("web_url:",e.web_url),console.log("======================================="),o=e.headline?.main||e.title||"No Title",t=e.abstract||e.snippet||e.lead_paragraph||"No description available",r=e.pub_date||e.published_date||"";let i="Unknown Author";e.byline&&(typeof e.byline=="string"?i=e.byline:e.byline.original?i=e.byline.original:e.byline.person&&e.byline.person.length>0&&(i=e.byline.person[0].firstname+" "+e.byline.person[0].lastname)),c=typeof i=="string"?i.replace(/^By\s+/i,""):"Unknown Author",a=e.web_url||e.url||e.short_url||"https://www.nytimes.com",h=null}(!a||a==="#"||a==="")&&(a="https://www.nytimes.com"),a&&!a.startsWith("http")&&(a="https://www.nytimes.com"+(a.startsWith("/")?a:"/"+a));const B=r?new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"";t.length>140&&(t=t.substring(0,137)+"..."),o.length>80&&(o=o.substring(0,77)+"...");const M=h?`
        <div class="news-image">
            <img src="${h}" alt="${o}" onerror="this.src='https://via.placeholder.com/400x250/667eea/ffffff?text=NY+Times+News'">
        </div>
    `:"";return n.innerHTML=`
        ${M}
        <div class="news-content">
            <h3 class="news-title">${o}</h3>
            <p class="news-description">${t}</p>
            <div class="news-meta">
                <span class="news-author">✍️ ${c}</span>
                <span class="news-date">📅 ${B}</span>
            </div>
            <a href="${a}" target="_blank" rel="noopener noreferrer" class="news-link">
                Read Full Article →
            </a>
        </div>
    `,n}async function _(e="mostViewed"){const s=P[e];if(!s)throw new Error("Invalid category");console.log(`Fetching ${e} from:`,s);const n=await fetch(s);if(console.log("Response status:",n.status),!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`);const o=await n.json();console.log("Data received:",o);let t=[];return o.results?t=o.results:o.response&&o.response.docs&&(t=o.response.docs),t}function I(e,s){if(A(),!e||e.length===0){v("No articles found");return}d.innerHTML="",e.slice(0,12).forEach(n=>{const o=D(n,s);d.appendChild(o)}),console.log(`Displayed ${e.length} articles`)}async function g(e="mostViewed"){k(),T=e;try{const s=await _(e);I(s,e)}catch(s){console.error("Load news error:",s),v(`Failed to load news: ${s.message}`)}}async function $(){const e=u.value.trim();if(!e){alert("Please enter a search term");return}const s=`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(e)}&api-key=${m}`;l.style.display="none",y.forEach(n=>n.classList.remove("active")),k();try{const n=await fetch(s);if(!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`);const t=(await n.json()).response?.docs||[];I(t,"search"),u.value=""}catch(n){console.error("Search error:",n),v(`Search failed: ${n.message}`)}}async function H(){try{console.log("Fetching weather data from:",b);const e=await fetch(b);if(!e.ok)throw new Error(`Weather API error: ${e.status}`);const s=await e.json();return console.log("Weather data received:",s),s}catch(e){throw console.error("Error fetching weather:",e),e}}function U(e){if(!w)return;const{temperature:s,wind:n,description:o,forecast:t}=e,r=t&&t.length>0&&t[0]?`<div class="forecast-day">
            <span class="forecast-day-name">Tomorrow</span>
            <div>
                <div class="forecast-temp">${t[0].temperature||"N/A"}</div>
                <div class="forecast-wind">🌬️ ${t[0].wind||"N/A"}</div>
            </div>
        </div>`:"<p>Forecast not available</p>";w.innerHTML=`
        <div class="weather-current">
            <div class="weather-temp">${s||"N/A"}</div>
            <div class="weather-desc">${o||"No description"}</div>
            <div class="weather-wind">
                <span>🌬️</span>
                <span>${n||"N/A"}</span>
            </div>
        </div>
        <div class="weather-forecast">
            <h4>Tomorrow's Forecast</h4>
            ${r}
        </div>
    `}async function S(){if(w)try{const e=await H();U(e)}catch(e){console.error("Failed to load weather:",e),w.innerHTML=`
            <div class="weather-error">
                <p>⚠️ Unable to load weather</p>
                <button onclick="loadWeather()" class="retry-btn" style="padding: 0.5rem 1rem; margin-top: 0.5rem; background: var(--accent-color); color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Retry
                </button>
            </div>
        `}}document.addEventListener("DOMContentLoaded",()=>{console.log("Skyline News initialized successfully!"),setTimeout(()=>{document.body.style.opacity="1"},100),y.forEach(e=>{e.addEventListener("click",s=>{s.preventDefault();const n=e.dataset.category;y.forEach(o=>o.classList.remove("active")),e.classList.add("active"),g(n)})}),E&&l&&L&&(E.addEventListener("click",()=>{l.style.display="flex",u.focus()}),L.addEventListener("click",()=>{l.style.display="none"}),l.addEventListener("click",e=>{e.target===l&&(l.style.display="none")})),N&&N.addEventListener("click",$),u&&u.addEventListener("keypress",e=>{e.key==="Enter"&&$()}),g("mostViewed"),S()});window.loadNews=g;window.loadWeather=S;
