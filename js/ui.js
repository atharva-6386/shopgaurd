/* ============================================
   ShopGuard — Navigation & UI Module
   File: js/ui.js
   ============================================ */

/**
 * Navigate to a page
 */
function goTo(pageId) {
    AppState.currentPage = pageId;
  
    // Hide all pages, show target
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');
  
    // Update topbar title
    document.getElementById('pageTitle').textContent = PAGE_TITLES[pageId] || 'Page';
  
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      const onclick = item.getAttribute('onclick') || '';
      if (onclick.includes(`'${pageId}'`)) item.classList.add('active');
    });
  
    window.scrollTo(0, 0);
  }
  
  /**
   * Show toast notification
   */
  function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
  
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    toast.innerHTML = `<span>${icons[type] || '📢'}</span><span>${msg}</span>`;
    container.appendChild(toast);
  
    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  /**
   * Open modal by ID
   */
  function openModal(id) {
    document.getElementById(id).classList.add('open');
  }
  
  /**
   * Close modal by ID
   */
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
  }
  
  /**
   * Open complaint review modal
   */
  function openComplaintModal(complaintId) {
    openModal('complaintModal');
  }
  
  /**
   * Open shop registration modal
   */
  function openShopModal() {
    openModal('shopModal');
  }
  
  /**
   * Save complaint changes from modal
   */
  function saveComplaint() {
    closeModal('complaintModal');
    showToast('Complaint updated successfully!', 'success');
  }
  
  /**
   * Register new shop from modal
   */
  function registerShop() {
    closeModal('shopModal');
    showToast('Shop registration submitted for review!', 'success');
  }
  
  /**
   * Filter chip toggle (single-select within group)
   */
  function initFilterChips() {
    document.querySelectorAll('.filter-bar').forEach(bar => {
      bar.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', function () {
          bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          this.classList.add('active');
        });
      });
    });
  }
  
  // Close modals when clicking overlay background
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    });
  
    initFilterChips();
  });
  