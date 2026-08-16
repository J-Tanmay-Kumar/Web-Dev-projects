const URL = "https://api.github.com/users/octocat";

let dataHTML = '';
async function display() {
  let response = await fetch(URL)
  let data = await response.json();
  const UserDetails = data;

  // REPO_DATA
  const Repo_URL = data.repos_url;
  let repo_response = await fetch(Repo_URL);
  let repo_data = await repo_response.json();
  const User_repo = repo_data;

  // Total Stars 
  const totalStars = User_repo.reduce((total, repo) => {
    return total + repo.stargazers_count;
  }, 0);
  // Total forks 
  const totalforks = User_repo.reduce((total, repo) => {
    return total + repo.forks_count;
  }, 0)
  // Langugages
  const languageCounts = {};
  let totalValidLanguages = 0; // 1. Keep track of the total valid entries

  User_repo.forEach((repo) => {
    const language = repo.language;

    if (language === null) {
      return;
    }

    // Dynamic count update
    languageCounts[language] = (languageCounts[language] ?? 0) + 1;
    totalValidLanguages += 1; // 2. Increment total count
  });
  //  percentages for each language
  const languagePercentages = {};
  Object.keys(languageCounts).forEach((language) => {
    const count = languageCounts[language];

    // Calculates percentage and rounds to 1 decimal place (e.g., 42.5)
    const percentage = ((count / totalValidLanguages) * 100).toFixed(1);

    languagePercentages[language] = {
      count: count,
      percentage: `${percentage}%`
    };
  });
  console.log(languagePercentages);

  // Repo Html 
  const repoHTML = User_repo.map((repo) => {

    return `
    <div class="repo-card">

      <div class="repo-card-top">

        <div class="repo-title-wrapper">

          <svg
            class="repo-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
            <path d="M6 6h12M6 10h12"/>
          </svg>

          <a
            href="${repo.html_url}"
            class="repo-name"
            target="_blank"
            rel="noopener">
            ${repo.full_name}
          </a>

        </div>

        <span class="repo-badge">
          ${repo.visibility}
        </span>

      </div>


      <p class="repo-description">
        ${repo.description ?? "No description available."}
      </p>


      <div class="repo-meta-footer">

        <span class="repo-lang">
          <span
            class="dot"
            style="background-color: #e34c26;">
          </span>
          ${repo.language ?? "Unknown"}
        </span>


        <div class="repo-stats-pills">

          <span class="repo-stat">

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>

            ${repo.stargazers_count}

          </span>


          <span class="repo-stat">

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <circle cx="12" cy="18" r="3"/>
              <circle cx="6" cy="6" r="3"/>
              <circle cx="18" cy="6" r="3"/>
              <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/>
              <path d="M12 12v3"/>
            </svg>

            ${repo.forks_count}

          </span>

        </div>


        <span class="repo-updated mono">
          Updated ${new Date(repo.updated_at).toLocaleDateString()}
        </span>


        <a
          href="${repo.html_url}"
          target="_blank"
          rel="noopener"
          class="repo-external-link"
          aria-label="Open ${repo.full_name} on GitHub">

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>

        </a>

      </div>

    </div>
  `;
  }).join("");

// language html 
// 1. Dictionary of GitHub's official colors for popular languages
const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Ruby: "#701516",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Java: "#b07219",
    Go: "#00ADD8",
    Shell: "#89e051"
};
const defaultColor = "#858585"; // Fallback color if language isn't listed

// 3. Initialize strings to collect our loop templates
let barSegmentsHtml = "";
let legendItemsHtml = "";

// 4. Loop through the entries to dynamically build the DOM pieces
Object.entries(languagePercentages).forEach(([language, data]) => {
    // Pick the matching color or use the fallback default
    const color = languageColors[language] || defaultColor;
    const percentStr = data.percentage; // e.g., "45.2%"

    // Build the visual bar segments
    barSegmentsHtml += `
        <div class="lang-segment" 
             style="width: ${percentStr}; background-color: ${color};" 
             title="${language}: ${percentStr}">
        </div>`;

    // Build the text legend items below the bar
    legendItemsHtml += `
        <div class="legend-item">
            <span class="dot" style="background-color: ${color};"></span>
            ${language} <span class="mono">${percentStr}</span>
        </div>`;
});

// 5. Wrap everything inside your target section markup
const finalSectionHtml = `
    <div class="section-header-box">
        <h3 class="section-title">Language Distribution</h3>
        <span class="section-subtitle">Top programming languages used across public repositories</span>
    </div>
    <div class="language-card">
        <div class="lang-bar-container">
            ${barSegmentsHtml}
        </div>
        <div class="lang-legend">
            ${legendItemsHtml}
        </div>
    </div>
`;

// 6. Inject the generated HTML into your webpage container
// Example: document.getElementById('profile-container').innerHTML = finalSectionHtml;
console.log(finalSectionHtml);

  // Generating HTMl 
  dataHTML +=
    `<section class="profile-overview">
        <div class="profile-card">
        <div class="profile-left">
        <img src="${UserDetails.avatar_url}" alt="User Avatar" class="profile-avatar" id="profile-avatar">
        <div class="profile-identity">
        <h2 class="profile-name" id="profile-name">${UserDetails.name}</h2>
        <span class="profile-username mono" id="profile-username">${UserDetails.login}</span>
        <p class="profile-bio" id="profile-bio">${UserDetails.bio}</p>
        </div>
        </div>
        <div class="profile-right">
        <div class="profile-meta-grid">
                                    <div class="meta-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    <span id="profile-location">${UserDetails.location}</span>
                                    </div>
                                    <div class="meta-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                    <span id="profile-company">${UserDetails.company}</span>
                                    </div>
                                    <div class="meta-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                                    <a href="#" id="profile-blog" target="_blank" rel="noopener">github.blog</a>
                                    </div>
                                    <div class="meta-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                    <span id="profile-joined">${UserDetails.created_at}</span>
                                    </div>
                                    </div>
                                    <a href=${UserDetails.html_url} id="profile-github-link" target="_blank" rel="noopener" class="btn btn-accent-outline">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                    View on GitHub
                                    </a>
                                    </div>
                                    </div>
                    </section>
        
                    <!-- 5. STATISTICS CARDS -->
                    <section class="stats-section">
                    <div class="stats-grid">
                    <div class="stat-card">
                    <div class="stat-header">
                    <span class="stat-label">Repositories</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h12M6 10h12"/></svg>
                    </div>
                    <div class="stat-value mono" id="stat-repos">${UserDetails.public_repos}</div>
                    <span class="stat-context">Public repositories</span>
                    </div>
                    <div class="stat-card">
                    <div class="stat-header">
                    <span class="stat-label">Followers</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div class="stat-value mono" id="stat-followers">${UserDetails.followers}</div>
                    <span class="stat-context">Active developer community</span>
                    </div>
                    <div class="stat-card">
                    <div class="stat-header">
                                    <span class="stat-label">Following</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                                </div>
                                <div class="stat-value mono" id="stat-following">${UserDetails.following}</div>
                                <span class="stat-context">Connected accounts</span>
                                </div>
                                <div class="stat-card">
                                <div class="stat-header">
                                <span class="stat-label">Total Stars</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                </div>
                                <div class="stat-value mono" id="stat-stars">${totalStars}</div>
                                <span class="stat-context">Across all repositories</span>
                                </div>
                                <div class="stat-card">
                                <div class="stat-header">
                                <span class="stat-label">Total Forks</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
                                </div>
                                <div class="stat-value mono" id="stat-forks">${totalforks}</div>
                                <span class="stat-context">Community forks</span>
                                </div>
                                <div class="stat-card">
                                <div class="stat-header">
                                    <span class="stat-label">Contributions</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                                    </div>
                                    <div class="stat-value mono" id="stat-contributions">1,082</div>
                                    <span class="stat-context">Contributions this year</span>
                                    </div>
                                    </div>
                                    </section>
                                    
                                    <!-- 6. LANGUAGE / TECHNOLOGY SECTION -->
                                    <section class="languages-section">
                                      ${finalSectionHtml}
                                    </section>
                                    
                                    <!-- 8. REPOSITORY SEARCH / FILTER BAR -->
                                    <div id="repositories" class="repo-filter-section">
                                    <div class="section-header-box">
                                    <h3 class="section-title">Top Repositories</h3>
                                    <span class="section-subtitle">Featured projects and public codebases</span>
                                    </div>
                                    <div class="filter-toolbar">
                                    <div class="repo-search-box">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                                    <input type="text" id="repo-search-input" placeholder="Search repositories..." aria-label="Search repositories">
                                    </div>
                                    <div class="filter-controls">
                                    <select id="sort-select" class="custom-select" aria-label="Sort repositories">
                                    <option value="stars">Sort: Stars</option>
                                    <option value="forks">Sort: Forks</option>
                                    <option value="updated">Sort: Updated</option>
                                    <option value="name">Sort: Name</option>
                                    </select>
                                    <button id="clear-filter-btn" class="btn btn-text">Clear filters</button>
                                    </div>
                                    </div>
                                    </div>
                                    
                                    <!-- 7. TOP REPOSITORIES SECTION -->
                                    <section class="repositories-section">
                                        <div class="repo-grid">
                                            ${repoHTML}
                                        </div>
                                    </section>
                    </section>
                    
                    <!-- 9. CONTRIBUTION / ACTIVITY SECTION -->
                    <section class="activity-section">
                    <div class="section-header-box">
                    <h3 class="section-title">Contribution Activity</h3>
                    <span class="section-subtitle">Annual commit heat map and recent developer activity summary</span>
                        </div>
                        <div class="activity-card">
                            <div class="activity-header-meta">
                                <span class="mono">1,082 contributions in the last year</span>
                                <div class="heatmap-legend">
                                <span>Less</span>
                                <div class="heatmap-boxes">
                                <span class="h-box level-0"></span>
                                <span class="h-box level-1"></span>
                                <span class="h-box level-2"></span>
                                <span class="h-box level-3"></span>
                                <span class="h-box level-4"></span>
                                </div>
                                <span>More</span>
                                </div>
                            </div>
                            <!-- Contribution Heatmap Mock Grid -->
                            <div class="heatmap-grid-container">
                            <div class="heatmap-grid" id="heatmap-grid">
                            <!-- Populated dynamically or styled via css blocks -->
                            </div>
                            </div>
                            <div class="recent-activity-feed">
                            <h4 class="feed-title">Recent Activity</h4>
                            <div class="feed-item">
                            <span class="feed-dot"></span>
                            <p>Created repository <strong>octocat/gitscope-core</strong></p>
                            <span class="feed-time mono">2 hours ago</span>
                            </div>
                            <div class="feed-item">
                            <span class="feed-dot"></span>
                            <p>Opened pull request #42 in <strong>github/accessibility</strong></p>
                            <span class="feed-time mono">Yesterday</span>
                            </div>
                            </div>
                            </div>
                            </section>
        
        `

  // INTEGRATING GENERATED HTML INTO BODY 
  document.body.querySelector(".dashboard-wrapper").innerHTML = dataHTML;
}
const Search = document.body.querySelector(".search-submit-btn")

Search.addEventListener("click", () => {
  document.querySelector(".main-content .state-container")?.remove();
  document.body.querySelector(".dashboard-wrapper").classList.remove("hidden")
  display();
})
