/* ============================================
   ShopGuard — App Data & State
   File: js/data.js
   ============================================ */

// ── Role Definitions ──
const ROLES = {
    admin: {
      name: 'Admin Officer',
      type: 'Government Authority',
      avatar: '👮',
      defaultPage: 'dashboard'
    },
    citizen: {
      name: 'Ranveer Singh',
      type: 'Citizen / Public',
      avatar: '👤',
      defaultPage: 'citizen-home'
    },
    owner: {
      name: 'Ramesh Kumar',
      type: 'Shop Owner',
      avatar: '🏪',
      defaultPage: 'owner-dashboard'
    }
  };
  
  // ── Page Titles ──
  const PAGE_TITLES = {
    'dashboard':        'Admin Dashboard',
    'shops':            'Shop Management',
    'complaints-admin': 'Complaint Management',
    'analytics':        'Data Analytics',
    'map':              'Map View',
    'officers':         'Field Officers',
    'citizen-home':     'Citizen Home',
    'file-complaint':   'File a Complaint',
    'my-complaints':    'My Complaints',
    'find-shops':       'Find Shops',
    'owner-dashboard':  'Owner Dashboard',
    'my-shop':          'My Shop',
    'license':          'License Management',
    'shop-complaints':  'Shop Complaints',
    'notifications':    'Notifications',
    'profile':          'My Profile'
  };
  
  // ── Sample Shops Data ──
  const SHOPS_DATA = [
    {
      id: 'SH-001',
      name: 'Lucky Beer Store',
      owner: 'Ramesh Kumar',
      license: 'LQ-2024-1042',
      expiry: 'Dec 2025',
      area: 'Sector 14',
      status: 'active',
      icon: '🍺',
      violations: 3
    },
    {
      id: 'SH-002',
      name: 'Star Wines',
      owner: 'Priya Sharma',
      license: 'LQ-2024-0876',
      expiry: 'Mar 2025',
      area: 'Sector 7',
      status: 'review',
      icon: '🍷',
      violations: 8
    },
    {
      id: 'SH-003',
      name: 'City Bar & Drinks',
      owner: 'Suresh Patel',
      license: 'LQ-2023-0541',
      expiry: 'Jan 2025 (expired)',
      area: 'Market St',
      status: 'suspended',
      icon: '🥃',
      violations: 14
    },
    {
      id: 'SH-004',
      name: 'Royal Beverages',
      owner: 'Anita Verma',
      license: 'LQ-2024-1199',
      expiry: 'Nov 2025',
      area: 'North Ave',
      status: 'active',
      icon: '🍻',
      violations: 1
    },
    {
      id: 'SH-005',
      name: 'Golden Drinks',
      owner: 'Mohan Das',
      license: 'LQ-2024-0321',
      expiry: 'Feb 2025',
      area: 'East Block',
      status: 'pending',
      icon: '🥂',
      violations: 0
    }
  ];
  
  // ── Sample Complaints Data ──
  const COMPLAINTS_DATA = [
    {
      id: 'CMP-0891',
      type: 'After-hours selling',
      shop: 'Lucky Beer Store',
      filedBy: 'Citizen #4421',
      priority: 'high',
      status: 'open',
      date: 'Feb 17',
      description: 'Shop was observed selling alcohol past 10:30 PM.'
    },
    {
      id: 'CMP-0890',
      type: 'Selling to minors',
      shop: 'Star Wines',
      filedBy: 'Citizen #3812',
      priority: 'high',
      status: 'in-progress',
      date: 'Feb 17',
      description: 'Underage customer observed purchasing alcohol.'
    },
    {
      id: 'CMP-0889',
      type: 'No price display',
      shop: 'City Bar & Drinks',
      filedBy: 'Citizen #2201',
      priority: 'medium',
      status: 'open',
      date: 'Feb 16',
      description: 'No price display board visible at shop entrance.'
    },
    {
      id: 'CMP-0888',
      type: 'Unlicensed sale',
      shop: 'Unknown Stall',
      filedBy: 'Citizen #1984',
      priority: 'high',
      status: 'open',
      date: 'Feb 16',
      description: 'Alcohol being sold without visible license.'
    },
    {
      id: 'CMP-0887',
      type: 'Noise / Nuisance',
      shop: 'Royal Beverages',
      filedBy: 'Citizen #5102',
      priority: 'low',
      status: 'resolved',
      date: 'Feb 15',
      description: 'Loud music from premises disturbing neighbors.'
    }
  ];
  
  // ── Sample Officers ──
  const OFFICERS_DATA = [
    { id: 'FO-001', name: 'Officer Rajesh Kumar', area: 'Sector 14', active: 4, resolved: 28, status: 'on-duty' },
    { id: 'FO-002', name: 'Officer Priya Nair',   area: 'Market St', active: 2, resolved: 41, status: 'on-duty' },
    { id: 'FO-003', name: 'Officer Sunil Verma',  area: 'Sector 7',  active: 7, resolved: 19, status: 'overloaded' }
  ];
  
  // ── AI Priority Keywords ──
  const AI_KEYWORDS = {
    high: ['minor', 'child', 'children', 'illegal', 'unlicensed', 'assault',
           'midnight', 'threat', 'violence', 'underage', 'weapon'],
    medium: ['after hours', 'late night', 'noise', 'nuisance', 'closing time',
             'no display', 'overpriced', 'harassment'],
    low: ['parking', 'cleanliness', 'dirty', 'signage', 'queue', 'rude staff']
  };
  
  // ── App State ──
  const AppState = {
    currentRole: 'admin',
    currentPage: 'dashboard',
    isLoggedIn: false,
    selectedLoginRole: 'admin',
    notificationCount: 5,
    complaints: [...COMPLAINTS_DATA],
    shops: [...SHOPS_DATA]
  };
  