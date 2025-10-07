// Main JavaScript for Dr. Immanuel Manohar's Website

// Neural Network Background Animation
class NeuralNetwork {
    constructor() {
        this.container = document.getElementById('neural-background');
        this.neurons = [];
        this.connections = [];
        this.init();
    }

    init() {
        this.createNeuralNetwork();
        this.animate();
        this.handleResize();
    }

    createNeuralNetwork() {
        if (!this.container) {
            console.log('Neural background container not found');
            return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;
        const neuronCount = Math.max(20, Math.floor((width * height) / 50000));

        // Clear existing elements
        this.container.innerHTML = '';
        this.neurons = [];
        this.connections = [];

        // Create neurons
        for (let i = 0; i < neuronCount; i++) {
            this.createNeuron();
        }

        // Create connections
        this.createConnections();

        console.log(`Created ${neuronCount} neurons for neural network background`);
    }

    createNeuron() {
        const neuron = document.createElement('div');
        neuron.className = 'neuron';

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        neuron.style.left = x + 'px';
        neuron.style.top = y + 'px';
        neuron.style.animationDelay = Math.random() * 3 + 's';

        this.container.appendChild(neuron);
        this.neurons.push({ element: neuron, x, y });
    }

    createConnections() {
        this.neurons.forEach((neuron, index) => {
            // Connect to 2-3 nearby neurons
            const nearbyNeurons = this.findNearbyNeurons(neuron, index);
            nearbyNeurons.slice(0, 3).forEach(nearby => {
                this.createConnection(neuron, nearby);
            });
        });
    }

    findNearbyNeurons(targetNeuron, targetIndex) {
        return this.neurons
            .map((neuron, index) => ({
                ...neuron,
                index,
                distance: Math.sqrt(
                    Math.pow(neuron.x - targetNeuron.x, 2) +
                    Math.pow(neuron.y - targetNeuron.y, 2)
                )
            }))
            .filter(neuron => neuron.index !== targetIndex && neuron.distance < 200)
            .sort((a, b) => a.distance - b.distance);
    }

    createConnection(neuron1, neuron2) {
        const connection = document.createElement('div');
        connection.className = 'connection';

        const distance = Math.sqrt(
            Math.pow(neuron2.x - neuron1.x, 2) +
            Math.pow(neuron2.y - neuron1.y, 2)
        );

        const angle = Math.atan2(neuron2.y - neuron1.y, neuron2.x - neuron1.x);

        connection.style.left = neuron1.x + 'px';
        connection.style.top = neuron1.y + 'px';
        connection.style.width = distance + 'px';
        connection.style.transform = `rotate(${angle}rad)`;
        connection.style.animationDelay = Math.random() * 2 + 's';

        this.container.appendChild(connection);
        this.connections.push(connection);
    }

    animate() {
        // The CSS animations handle the visual effects
        // This method can be extended for more complex animations
    }

    handleResize() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.createNeuralNetwork();
            }, 250);
        });
    }
}

// Navigation
class Navigation {
    constructor() {
        this.navButtons = document.querySelectorAll('.nav-button');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.navList = document.querySelector('.nav-list');
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setActiveNavBasedOnCurrentPage();
        this.setupMobileMenu();
    }

    setupNavigation() {
        // Navigation buttons will work as normal links
        // Just ensure the active state is properly set
        this.setActiveNavBasedOnCurrentPage();
    }

    setupMobileMenu() {
        if (!this.mobileToggle || !this.navList) return;

        // Toggle mobile menu
        this.mobileToggle.addEventListener('click', () => {
            this.mobileToggle.classList.toggle('active');
            this.navList.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.mobileToggle.classList.remove('active');
                this.navList.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#navbar')) {
                this.mobileToggle.classList.remove('active');
                this.navList.classList.remove('active');
            }
        });
    }

    setActiveNavBasedOnCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop();
        this.navButtons.forEach(btn => {
            btn.classList.remove('active');
            const btnHref = btn.getAttribute('href');

            // Check if current page matches the button href
            if (btnHref === currentPage ||
                (currentPage === '' && btnHref === 'index.html') ||
                (currentPage === 'index.html' && btnHref === 'index.html')) {
                btn.classList.add('active');
            }
        });
    }

    setActiveNav(activeButton) {
        this.navButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }
}

// Animation Controller
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupPageLoadAnimations();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements that should animate in
        const animateElements = document.querySelectorAll(
            '.research-card, .hero-content, .profile-image, .highlights-title'
        );

        animateElements.forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });
    }

    setupPageLoadAnimations() {
        // Add entrance animations for key elements
        setTimeout(() => {
            document.querySelector('.title')?.classList.add('fade-in');
        }, 100);

        setTimeout(() => {
            document.querySelector('.subtitle')?.classList.add('fade-in');
        }, 300);

        setTimeout(() => {
            document.querySelector('#navbar')?.classList.add('slide-up');
        }, 500);
    }
}

// Research Detail Modal (for future expansion)
class ResearchModal {
    constructor() {
        this.modal = null;
        this.init();
    }

    init() {
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        // Modal structure for research details
        this.modal = document.createElement('div');
        this.modal.className = 'research-modal';
        this.modal.innerHTML = `
            <div class="modal-backdrop">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-body">
                        <h3 class="modal-title"></h3>
                        <div class="modal-text"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
    }

    setupEventListeners() {
        const closeBtn = this.modal.querySelector('.modal-close');
        const backdrop = this.modal.querySelector('.modal-backdrop');

        closeBtn.addEventListener('click', () => this.close());
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    show(title, content) {
        this.modal.querySelector('.modal-title').textContent = title;
        this.modal.querySelector('.modal-text').innerHTML = content;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Global Functions - removed scroll functions as we now use page navigation

window.showResearchDetail = function(researchType) {
    const researchDetails = {
        factor: {
            title: 'Factor Analysis & Statistical Methods',
            content: `
                <p>My research in factor analysis focuses on the perturbation properties and algorithmic improvements of classical statistical methods.</p>
                <h4>Key Areas:</h4>
                <ul>
                    <li>Principal Component Analysis (PCA) optimization</li>
                    <li>Independent Component Analysis (ICA) applications</li>
                    <li>Matrix factorization techniques</li>
                    <li>Financial modeling and S&P analysis</li>
                </ul>
                <p>This research has practical applications in data dimensionality reduction, signal processing, and financial prediction models.</p>
            `
        },
        qr: {
            title: 'Matrix QR Decomposition Research',
            content: `
                <p>Exploring the computational advantages of QR decomposition over traditional SVD methods.</p>
                <h4>Research Focus:</h4>
                <ul>
                    <li>Computational complexity comparison with SVD</li>
                    <li>Algorithm optimization for large-scale data</li>
                    <li>Real-time processing applications</li>
                    <li>Numerical stability analysis</li>
                </ul>
                <p>QR decomposition offers significant speed improvements while maintaining comparable accuracy for many applications.</p>
            `
        },
        image: {
            title: 'Image Retrieval & Machine Learning',
            content: `
                <p>Advanced feature extraction and analysis for improved image recognition systems.</p>
                <h4>Technical Approach:</h4>
                <ul>
                    <li>Scale Invariant Feature Transform (SIFT) optimization</li>
                    <li>Non-negative Matrix Factorization (NMF) applications</li>
                    <li>Feature redundancy analysis</li>
                    <li>Machine learning pipeline optimization</li>
                </ul>
                <p>This work contributes to more efficient and accurate computer vision systems.</p>
            `
        },
        bigdata: {
            title: 'Big Data Transmission & Wireless Networks',
            content: `
                <p>Developing optimal queuing models for high-throughput wireless data transmission.</p>
                <h4>Research Components:</h4>
                <ul>
                    <li>Multi-hop network optimization</li>
                    <li>Queue management algorithms</li>
                    <li>Wireless network capacity planning</li>
                    <li>Real-time data processing pipelines</li>
                </ul>
                <p>This research addresses the growing need for efficient big data handling in modern wireless networks.</p>
            `
        }
    };

    const detail = researchDetails[researchType];
    if (detail && window.researchModal) {
        window.researchModal.show(detail.title, detail.content);
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    window.neuralNetwork = new NeuralNetwork();
    window.navigation = new Navigation();
    window.animationController = new AnimationController();
    window.researchModal = new ResearchModal();

    // Add CSS for modal and animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .research-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease-in-out;
        }

        .research-modal.active {
            opacity: 1;
            visibility: visible;
        }

        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        .modal-content {
            background: var(--background-primary);
            border-radius: var(--border-radius-xl);
            box-shadow: var(--shadow-xl);
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease-in-out;
        }

        .research-modal.active .modal-content {
            transform: scale(1);
        }

        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            color: var(--text-muted);
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }

        .modal-close:hover {
            background: var(--background-secondary);
            color: var(--text-primary);
        }

        .modal-body {
            padding: 2rem;
        }

        .modal-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
        }

        .modal-text h4 {
            color: var(--text-primary);
            font-weight: 600;
            margin: 1.5rem 0 0.75rem;
        }

        .modal-text ul {
            margin: 1rem 0;
            padding-left: 1.5rem;
        }

        .modal-text li {
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
        }

        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }

        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        @media (max-width: 768px) {
            .modal-backdrop {
                padding: 1rem;
            }

            .modal-body {
                padding: 1.5rem;
            }
        }
    `;
    document.head.appendChild(additionalStyles);

    console.log('Dr. Immanuelle Manohar\'s website initialized successfully!');
});

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading states, optimize images, etc.
    document.body.classList.add('loaded');
});