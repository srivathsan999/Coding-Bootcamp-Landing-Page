document.addEventListener('alpine:init', () => {
    // Theme Store
    Alpine.store('theme', {
        mode: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
        
        init() {
            this.applyTheme();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                    this.mode = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
        },
        
        toggle() {
            this.mode = this.mode === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', this.mode);
            this.applyTheme();
        },
        
        applyTheme() {
            if (this.mode === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });

    // Auth Store
    Alpine.store('auth', {
        isLoggedIn: false,
        userRole: null,
        userName: null,
        
        init() {
            // Load auth state from localStorage
            const savedAuth = localStorage.getItem('auth');
            if (savedAuth) {
                const auth = JSON.parse(savedAuth);
                this.isLoggedIn = auth.isLoggedIn || false;
                this.userRole = auth.userRole || null;
                this.userName = auth.userName || null;
            }
        },
        
        login(role, username) {
            this.isLoggedIn = true;
            this.userRole = role;
            this.userName = username;
            localStorage.setItem('auth', JSON.stringify({
                isLoggedIn: true,
                userRole: role,
                userName: username
            }));
        },
        
        logout() {
            this.isLoggedIn = false;
            this.userRole = null;
            this.userName = null;
            localStorage.removeItem('auth');
        }
    });

    // Component Loader (navbar loading removed - navbar is now inlined)
    Alpine.data('loader', (componentName) => {
        // Disable navbar loading - navbar is now inlined in all pages
        if (componentName === 'navbar') {
            return {
                html: '',
                init() {
                    console.warn('Navbar loader is disabled. Navbar should be inlined directly in pages.');
                }
            };
        }
        
        return {
            html: '',
            init() {
                // Add timestamp to prevent caching issues during development
                fetch(`./components/${componentName}.html?v=${new Date().getTime()}`)
                    .then(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        return response.text();
                    })
                    .then(html => {
                        this.html = html;
                        
                        // After loading the component, we need to highlight the active link
                        // Use setTimeout to ensure DOM is updated
                        setTimeout(() => {
                            this.highlightActiveLink();
                        }, 50);
                    })
                    .catch(err => {
                        console.warn(`Failed to load component: ${componentName}. Ensure you are running on a local server (e.g., Live Server) to avoid CORS issues.`);
                        this.html = `<div class="p-4 border border-red-500 text-red-500">Error loading ${componentName}</div>`;
                    });
            },
            
            highlightActiveLink() {
                // Get current page filename
                const path = window.location.pathname;
                const page = path.split("/").pop() || 'index.html';
                
                // Find all links in the loaded HTML that match the current page
                // We search within the parent element where x-html is rendered (which is this.$el)
                const links = this.$el.querySelectorAll('a');
                
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === page || (page === '' && href === 'index.html')) {
                        // Add active class (text-light-accent dark:text-dark-accent)
                        link.classList.add('text-light-accent', 'dark:text-dark-accent', 'font-semibold');
                        link.classList.remove('text-gray-600', 'dark:text-gray-300');
                    }
                    });
            }
        };
    });

    // Intersection Observer for Animations
    Alpine.directive('reveal', (el, { value, modifiers }) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.classList.add('opacity-100', 'translate-y-0');
                    el.classList.remove('opacity-0', 'translate-y-8');
                    if (modifiers.includes('once')) observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });

        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
    });

    // Stats Counter
    Alpine.data('counter', (target, duration = 2000) => ({
        current: 0,
        target: target,
        init() {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this.animate();
                    observer.disconnect();
                }
            });
            observer.observe(this.$el);
        },
        animate() {
            const start = 0;
            const end = parseInt(this.target);
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quart
                const ease = 1 - Math.pow(1 - progress, 4);
                
                this.current = Math.floor(start + (end - start) * ease);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    this.current = end;
                }
            };
            requestAnimationFrame(update);
        }
    }));
});

// Handle Apply Now button functionality
function handleApplyNow(event) {
    // Check if we're on the index page
    const currentPage = window.location.pathname.split('/').pop() || '';
    const isIndexPage = currentPage === 'index.html' || currentPage === '' || currentPage.endsWith('/') || window.location.pathname.endsWith('index.html');
    
    if (isIndexPage) {
        // Check if there's an apply section on the current page
        const applySection = document.getElementById('apply');
        
        if (applySection) {
            // Prevent default link behavior
            event.preventDefault();
            
            // Smooth scroll to the apply section
            applySection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without reloading
            const currentUrl = window.location.href.split('#')[0];
            window.history.pushState(null, '', currentUrl + '#apply');
            
            return false;
        }
    }
    // If not on index page or no apply section found, let the default link behavior work (goes to register.html)
    return true;
}

// Handle Start Application button functionality
function handleStartApplication(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Navigate to register page to start the application process
    window.location.href = 'register.html';
}

// Handle Download Syllabus button functionality
function handleDownloadSyllabus(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Check if there's a curriculum section on the current page
    const curriculumSection = document.getElementById('curriculum');
    
    if (curriculumSection) {
        // Smooth scroll to the curriculum section
        curriculumSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update URL without reloading
        const currentUrl = window.location.href.split('#')[0];
        window.history.pushState(null, '', currentUrl + '#curriculum');
    } else {
        // If no curriculum section, navigate to curriculum page
        window.location.href = 'curriculum.html';
    }
    
    // If you have an actual syllabus PDF file, you can replace the above with:
    // window.open('assets/documents/syllabus.pdf', '_blank');
}

// Logout function
function handleLogout() {
    // Clear auth state
    if (window.Alpine && window.Alpine.store && window.Alpine.store('auth')) {
        window.Alpine.store('auth').logout();
    } else {
        // Fallback if Alpine isn't ready yet
        localStorage.removeItem('auth');
    }
    
    // Redirect to home page
    window.location.href = 'index.html';
}
