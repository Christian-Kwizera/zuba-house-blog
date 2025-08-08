// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
let articleCards = document.querySelectorAll('.article-card');
const loadMoreBtn = document.getElementById('load-more-btn');
const newsletterForm = document.querySelector('.newsletter-form');

// Filter functionality
function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            filterArticles(category);
        });
    });
}

function filterArticles(category) {
    articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const matches = category === 'all' || cardCategory === category;

        if (matches) {
            card.classList.remove('fade-out');
            card.style.display = 'block';
            setTimeout(() => card.classList.add('fade-in'), 10);
        } else {
            card.classList.remove('fade-in');
            card.classList.add('fade-out');
            setTimeout(() => {
                if (card.classList.contains('fade-out')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
    updateLoadMoreButton();
}

// Load more functionality
function initializeLoadMore() {
    let articlesLoaded = 6;
    const totalArticles = articleCards.length;

    articleCards.forEach((card, index) => {
        if (index >= articlesLoaded) {
            card.style.display = 'none';
        }
    });

    loadMoreBtn.addEventListener('click', () => {
        const articlesToShow = 3;
        let shown = 0;
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-category');

        articleCards.forEach((card, index) => {
            if (index >= articlesLoaded && shown < articlesToShow) {
                const cardCategory = card.getAttribute('data-category');
                if (activeFilter === 'all' || cardCategory === activeFilter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                    shown++;
                }
            }
        });

        articlesLoaded += articlesToShow;

        if (articlesLoaded >= totalArticles) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

function updateLoadMoreButton() {
    articleCards = document.querySelectorAll('.article-card');
    const visibleArticles = Array.from(articleCards).filter(card => card.style.display !== 'none');
    if (visibleArticles.length < articleCards.length) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Newsletter form functionality
function initializeNewsletter() {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            alert("Thank you for subscribing! You'll receive our latest stories and style inspiration.");
            newsletterForm.querySelector('input[type="email"]').value = '';
        }
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            articleCards = document.querySelectorAll('.article-card');
            articleCards.forEach(card => {
                const title = card.querySelector('.article-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
                card.style.display = title.includes(searchTerm) || excerpt.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #D2691E;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(scrollToTopBtn);
    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initializeHoverEffects() {
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeLoadMore();
    initializeNewsletter();
    initializeSmoothScrolling();
    initializeLazyLoading();
    initializeSearch();
    initializeMobileMenu();
    initializeScrollToTop();
    initializeHoverEffects();
    addMoreArticles();
});

function addMoreArticles() {
    const articlesContainer = document.getElementById('articles-container');
    const additionalArticles = [
        {
            category: 'fashion',
            categoryDisplay: 'Fashion Tips',
            image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=250&fit=crop',
            title: 'Accessorizing Your African Outfits: A Complete Guide',
            excerpt: 'Learn how to choose the perfect accessories to complement your African-inspired wardrobe and make every outfit shine.',
            date: 'July 10, 2025'
        },
        {
            category: 'handmade',
            categoryDisplay: 'Handmade Stories',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop',
            title: 'The Art of Beadwork: Traditional Techniques in Modern Times',
            excerpt: 'Discover how ancient beadwork traditions continue to influence contemporary African jewelry and fashion design.',
            date: 'July 8, 2025'
        },
        {
            category: 'culture',
            categoryDisplay: 'Culture & Heritage',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
            title: 'Music and Fashion: How African Rhythms Inspire Style',
            excerpt: 'Explore the deep connection between African music and fashion, and how cultural rhythms translate into visual expression.',
            date: 'July 5, 2025'
        }
    ];

    additionalArticles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.className = 'article-card';
        articleElement.setAttribute('data-category', article.category);
        articleElement.style.display = 'none';

        articleElement.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="article-category">${article.categoryDisplay}</span>
            </div>
            <div class="article-content">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span class="article-date">${article.date}</span>
                    <a href="#" class="article-link">Read More</a>
                </div>
            </div>
        `;

        articlesContainer.appendChild(articleElement);
    });

    articleCards = document.querySelectorAll('.article-card');
    initializeHoverEffects();
    updateLoadMoreButton();
}
