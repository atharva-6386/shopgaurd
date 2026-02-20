/* ============================================
   ShopGuard — Complaint Management Module
   File: js/complaints.js
   ============================================ */

/**
 * Auto-detect complaint priority using AI keyword matching
 * Called on every keypress / dropdown change in file-complaint page
 */
function detectPriority() {
    const type = document.getElementById('complaintType')?.value || '';
    const desc = (document.getElementById('complaintDesc')?.value || '').toLowerCase();
    const el   = document.getElementById('priorityResult');
    if (!el) return;
  
    let priority = null;
  
    // Check type overrides
    if (['minor', 'unlicensed'].includes(type)) {
      priority = 'high';
    } else if (['after-hours', 'nuisance'].includes(type)) {
      priority = 'medium';
    } else if (['price', 'other'].includes(type)) {
      priority = 'low';
    }
  
    // Override with keyword detection from description
    if (AI_KEYWORDS.high.some(w => desc.includes(w)))   priority = 'high';
    else if (!priority && AI_KEYWORDS.medium.some(w => desc.includes(w))) priority = 'medium';
    else if (!priority && AI_KEYWORDS.low.some(w => desc.includes(w)))    priority = 'low';
    else if (!priority && (type || desc.length > 10))    priority = 'low';
  
    // Render result
    const configs = {
      high:   { color: 'var(--danger)',  label: '🔴 HIGH PRIORITY',   bg: 'rgba(232,64,64,.08)' },
      medium: { color: 'var(--warning)', label: '🟡 MEDIUM PRIORITY', bg: 'rgba(245,158,11,.08)' },
      low:    { color: 'var(--success)', label: '🟢 LOW PRIORITY',    bg: 'rgba(48,201,126,.08)' }
    };
  
    if (priority) {
      const c = configs[priority];
      el.style.background = c.bg;
      el.style.borderColor = c.color;
      el.innerHTML = `
        <div style="font-weight:700;color:${c.color};margin-bottom:4px">${c.label}</div>
        <div style="font-size:12px;color:var(--text3)">
          🤖 Auto-classified by AI keyword detection
        </div>`;
    } else {
      el.style.background = '';
      el.style.borderColor = '';
      el.innerHTML = 'Fill in the complaint type and description to auto-detect priority...';
    }
  }
  
  /**
   * Check if complaint looks fake / spammy
   */
  function checkFakeComplaint(desc) {
    const spamPhrases = ['test', 'lorem', 'asdf', 'hello world', 'abc'];
    const isTooShort  = desc.trim().length < 20;
    const isSpam      = spamPhrases.some(p => desc.toLowerCase().includes(p));
    return isTooShort || isSpam;
  }
  
  /**
   * Generate unique complaint ID
   */
  function generateComplaintId() {
    const now = new Date();
    const year = now.getFullYear();
    const seq  = Math.floor(Math.random() * 9000) + 1000;
    return `CMP-${year}-${seq}`;
  }
  
  /**
   * Submit complaint form
   */
  function submitComplaint() {
    const type  = document.getElementById('complaintType')?.value;
    const desc  = document.getElementById('complaintDesc')?.value || '';
    const shop  = document.getElementById('complaintShop')?.value || '';
  
    if (!type) {
      showToast('Please select a complaint type', 'error');
      return;
    }
    if (desc.trim().length < 10) {
      showToast('Please provide a description (at least 10 characters)', 'error');
      return;
    }
  
    // Fake complaint check
    if (checkFakeComplaint(desc)) {
      showToast('⚠️ Your complaint looks incomplete. Please provide more details.', 'warning');
      return;
    }
  
    const id = generateComplaintId();
    showToast(`✅ Complaint #${id} submitted! You'll be notified of updates.`, 'success');
  
    // Reset form
    setTimeout(() => {
      document.getElementById('complaintType').value = '';
      document.getElementById('complaintDesc').value = '';
      detectPriority();
      goTo('my-complaints');
    }, 1200);
  }
  
  /**
   * Update complaint status from admin panel
   */
  function updateComplaintStatus(complaintId, newStatus) {
    const complaint = AppState.complaints.find(c => c.id === complaintId);
    if (complaint) {
      complaint.status = newStatus;
      showToast(`Complaint ${complaintId} status updated to: ${newStatus}`, 'success');
    }
  }
  
  /**
   * Flag complaint as fake
   */
  function flagAsFake(complaintId) {
    showToast(`Complaint ${complaintId} flagged as fake/spam`, 'warning');
  }
  
  /**
   * Capture location (simulated)
   */
  function captureLocation() {
    showToast('📍 Location captured: Sector 14, Block B', 'success');
  }
  
  /**
   * Open file upload dialog (simulated)
   */
  function openFileUpload() {
    showToast('📎 File picker opened (connect to backend for actual upload)', 'info');
  }
  