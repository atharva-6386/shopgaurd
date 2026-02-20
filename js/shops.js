/* ============================================
   ShopGuard — Shop Management Module
   File: js/shops.js
   ============================================ */

/**
 * Approve a shop registration
 */
function approveShop(shopId) {
    const shop = AppState.shops.find(s => s.id === shopId);
    if (shop) {
      shop.status = 'active';
      showToast(`✅ Shop ${shop.name} approved successfully!`, 'success');
      renderShopsTable();
    }
  }
  
  /**
   * Reject a shop application
   */
  function rejectShop(shopId) {
    const shop = AppState.shops.find(s => s.id === shopId);
    if (shop) {
      shop.status = 'rejected';
      showToast(`❌ Shop ${shop.name} application rejected.`, 'error');
      renderShopsTable();
    }
  }
  
  /**
   * Suspend a shop
   */
  function suspendShop(shopId) {
    const shop = AppState.shops.find(s => s.id === shopId);
    if (shop) {
      shop.status = 'suspended';
      showToast(`⚠️ Shop ${shop.name} has been suspended.`, 'warning');
      renderShopsTable();
    }
  }
  
  /**
   * Reinstate a suspended shop
   */
  function reinstateShop(shopId) {
    const shop = AppState.shops.find(s => s.id === shopId);
    if (shop) {
      shop.status = 'active';
      showToast(`✅ Shop ${shop.name} reinstated.`, 'success');
      renderShopsTable();
    }
  }
  
  /**
   * Get badge HTML for shop status
   */
  function getShopStatusBadge(status) {
    const map = {
      active:    '<span class="badge badge-success">● Active</span>',
      review:    '<span class="badge badge-warning">⚠ Review</span>',
      suspended: '<span class="badge badge-danger">✕ Suspended</span>',
      pending:   '<span class="badge badge-neutral">● Pending</span>',
      rejected:  '<span class="badge badge-danger">✕ Rejected</span>'
    };
    return map[status] || map['pending'];
  }
  
  /**
   * Get action buttons for a shop based on its status
   */
  function getShopActions(shop) {
    const id = shop.id;
    switch (shop.status) {
      case 'active':
        return `<button class="btn btn-outline btn-sm">View</button>
                <button class="btn btn-danger btn-sm" onclick="suspendShop('${id}')">Suspend</button>`;
      case 'pending':
        return `<button class="btn btn-success btn-sm" onclick="approveShop('${id}')">Approve</button>
                <button class="btn btn-danger btn-sm" onclick="rejectShop('${id}')">Reject</button>`;
      case 'review':
        return `<button class="btn btn-outline btn-sm">View</button>
                <button class="btn btn-success btn-sm" onclick="approveShop('${id}')">Approve</button>`;
      case 'suspended':
        return `<button class="btn btn-outline btn-sm">View</button>
                <button class="btn btn-success btn-sm" onclick="reinstateShop('${id}')">Reinstate</button>`;
      default:
        return `<button class="btn btn-outline btn-sm">View</button>`;
    }
  }
  
  /**
   * Get license expiry color
   */
  function getLicenseColor(expiry) {
    if (expiry.includes('expired')) return 'var(--danger)';
    if (expiry.includes('2025-01') || expiry.includes('Feb 2025') || expiry.includes('Mar 2025')) return 'var(--warning)';
    return 'var(--success)';
  }
  
  /**
   * Render shops table dynamically
   */
  function renderShopsTable() {
    const tbody = document.getElementById('shopsTableBody');
    if (!tbody) return;
  
    tbody.innerHTML = AppState.shops.map(shop => `
      <tr>
        <td>
          <strong>${shop.icon} ${shop.name}</strong>
          <br><span class="mono" style="color:var(--text3)">${shop.id}</span>
        </td>
        <td>${shop.owner}</td>
        <td><span class="mono">${shop.license}</span></td>
        <td><span style="color:${getLicenseColor(shop.expiry)}">${shop.expiry}</span></td>
        <td>${shop.area}</td>
        <td>${getShopStatusBadge(shop.status)}</td>
        <td><div style="display:flex;gap:6px">${getShopActions(shop)}</div></td>
      </tr>
    `).join('');
  }
  
  /**
   * Download shop license (simulated)
   */
  function downloadLicense() {
    showToast('📄 License PDF downloading...', 'success');
  }
  
  /**
   * Verify QR code (simulated)
   */
  function verifyQR() {
    showToast('📱 QR Scanner opened — point at shop QR code', 'info');
  }
  