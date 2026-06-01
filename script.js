// ==========================================
// MAYF GROUP - INTERACTIVE SCRIPTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Custom Mouse Cursor and Spotlight Effect
  const cursor = document.getElementById('custom-cursor');
  const cursorRing = document.getElementById('custom-cursor-ring');
  const spotlight = document.getElementById('bg-spotlight');
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let ringX = mouseX;
  let ringY = mouseY;
  
  // Track Mouse Movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Set spotlight background coordinates
    if (spotlight) {
      spotlight.style.setProperty('--x', `${e.clientX}px`);
      spotlight.style.setProperty('--y', `${e.clientY}px`);
    }
  });

  // Smooth Interpolation for Cursor Nodes (Lerp)
  function animateCursor() {
    // Lerp cursor
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    
    // Lerp cursor ring (slower for elastic lag effect)
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    
    if (cursor) {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    }
    
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states for Cursor
  const interactives = document.querySelectorAll('a, button, .org-node, .portfolio-card, .how-card, .vision-card');
  
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering-link');
      
      // Subsidiary specific cursors
      if (el.closest('.card-home') || el.classList.contains('home-link') || el.classList.contains('home')) {
        document.body.classList.add('hovering-home');
      } else if (el.closest('.card-dig') || el.classList.contains('dig-link') || el.classList.contains('dig')) {
        document.body.classList.add('hovering-dig');
      } else if (el.closest('.card-tech') || el.classList.contains('tech-link') || el.classList.contains('tech')) {
        document.body.classList.add('hovering-tech');
      }
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering-link');
      document.body.classList.remove('hovering-home');
      document.body.classList.remove('hovering-dig');
      document.body.classList.remove('hovering-tech');
    });
  });

  // Hide cursor when out of window bounds
  document.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.opacity = '0';
    if (cursorRing) cursorRing.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.opacity = '1';
    if (cursorRing) cursorRing.style.opacity = '1';
  });


  // 2. Header Scroll Effect
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // 3. Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after showing
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));


  // 4. Interactive Organogram Setup
  const orgNodes = document.querySelectorAll('.org-node');
  const detailsPanel = document.getElementById('org-details');
  const panelTitle = document.getElementById('panel-title');
  const panelSubtitle = document.getElementById('panel-subtitle');
  const panelDesc = document.getElementById('panel-desc');
  const panelManager = document.getElementById('panel-manager');

  const nodeData = {
    'board': {
      title: "Board of Directors",
      subtitle: "Group Governance",
      desc: "Governing body steering the overall corporate direction, regulatory compliance, risk management, and long-term legacy strategy of MAYF Group.",
      manager: "Founding Family & Advisors"
    },
    'ceo': {
      title: "Group CEO",
      subtitle: "Executive Leadership",
      desc: "Responsible for executing the group's strategic vision, aligning subsidiary performance, driving expansion in the UAE, and heading shared functions.",
      manager: "Chairman & Founder"
    },
    'home-parent': {
      title: "MAYF Home",
      subtitle: "Home Living Subsidiary",
      desc: "Managing Director oversees the full e-commerce mattress model, product manufacturing quality, warehousing in Dubai, and white-glove logistics.",
      manager: "Managing Director"
    },
    'home-sub1': {
      title: "E-Commerce Logistics",
      subtitle: "MAYF Home Operations",
      desc: "Directs fulfillment center operations, next-day UAE shipping logistics, delivery fleets, and inventory levels.",
      manager: "Operations Manager"
    },
    'home-sub2': {
      title: "Retail Showrooms",
      subtitle: "MAYF Home Retail",
      desc: "Directs the physical catalog experience, customer trial consultancies, and physical showroom styling in Dubai.",
      manager: "Showroom Manager"
    },
    'dig-parent': {
      title: "MAYF Digital",
      subtitle: "Marketing Consultancy",
      desc: "Managing Director oversees client partnerships, agency-wide growth operations, ROI-focused strategy, and marketing technology integrations.",
      manager: "Managing Director"
    },
    'dig-sub1': {
      title: "Ads & SEO Performance",
      subtitle: "MAYF Digital Marketing",
      desc: "Manages programmatic ad budgets across Google & Meta, search optimization pipelines, and performance data reports for clients.",
      manager: "Ads Lead"
    },
    'dig-sub2': {
      title: "Content & Brand Studio",
      subtitle: "MAYF Digital Creative",
      desc: "Directs creative studio operations, social video content, copywriting style guides, and influencer collaboration campaigns.",
      manager: "Creative Lead"
    },
    'tech-parent': {
      title: "MAYF Tech",
      subtitle: "Technology Subsidiary",
      desc: "Managing Director directs software development laboratories, product-market alignments, cloud infrastructures, and AI solutions.",
      manager: "Managing Director"
    },
    'tech-sub1': {
      title: "Software & Mobile Dev",
      subtitle: "MAYF Tech Engineering",
      desc: "Codes native mobile applications, high-performance web systems, database integrations, and custom API connections.",
      manager: "Development Manager"
    },
    'tech-sub2': {
      title: "AI & Automation Lab",
      subtitle: "MAYF Tech Research",
      desc: "Engineers custom conversational bots, natural language processing models, workflow automation, and client support AI integrations.",
      manager: "AI Research Lead"
    }
  };

  // Node Interaction Listeners
  orgNodes.forEach(node => {
    const nodeId = node.getAttribute('data-node');
    
    // Mouse hover reveals panel info
    node.addEventListener('mouseenter', () => {
      updatePanel(nodeId);
      detailsPanel.classList.add('active');
    });
    
    // Maintain active info panel on click (mobile support)
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      updatePanel(nodeId);
      detailsPanel.classList.add('active');
    });
  });

  // Hide details when clicking outside nodes
  document.addEventListener('click', () => {
    if (detailsPanel) {
      detailsPanel.classList.remove('active');
    }
  });

  // Prevent closing when clicking panel itself
  if (detailsPanel) {
    detailsPanel.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  function updatePanel(id) {
    const data = nodeData[id];
    if (data && panelTitle && panelSubtitle && panelDesc && panelManager) {
      panelTitle.textContent = data.title;
      panelSubtitle.textContent = data.subtitle;
      panelDesc.textContent = data.desc;
      panelManager.innerHTML = `<span>Leadership</span>${data.manager}`;
      
      // Update details border color based on company node type
      detailsPanel.className = 'org-detail-panel active'; // reset
      if (id.includes('home')) {
        detailsPanel.style.borderColor = 'var(--home-color)';
      } else if (id.includes('dig')) {
        detailsPanel.style.borderColor = 'var(--dig-color)';
      } else if (id.includes('tech')) {
        detailsPanel.style.borderColor = 'var(--tech-color)';
      } else {
        detailsPanel.style.borderColor = 'var(--gold-primary)';
      }
    }
  }


  // 5. Mobile Hamburger Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Toggle button visual state
      if (navMenu.classList.contains('active')) {
        mobileToggle.innerHTML = '<span>✕</span>';
        navMenu.style.display = 'block';
        
        // Inline styles for mobile overlay layout
        navMenu.style.position = 'fixed';
        navMenu.style.top = '72px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(3, 7, 18, 0.96)';
        navMenu.style.backdropFilter = 'blur(20px)';
        navMenu.style.padding = '40px';
        navMenu.style.borderBottom = '1px solid var(--glass-border)';
        
        const list = navMenu.querySelector('ul');
        list.style.flexDirection = 'column';
        list.style.alignItems = 'center';
        list.style.gap = '28px';
      } else {
        mobileToggle.innerHTML = '<span>☰</span>';
        navMenu.style.display = '';
      }
    });

    // Close menu when clicking nav links on mobile
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileToggle.innerHTML = '<span>☰</span>';
          navMenu.style.display = '';
        }
      });
    });
  }

});
