var App = {

    restaurant: {
        name: '\u0623\u0628\u0648 \u0645\u0647\u064a\u0628',
        subtitle: '\u0628\u0631\u062c\u0631 \u0648\u0645\u0634\u0648\u064a\u0627\u062a',
        phone: '0531008683',
        address: '\u0627\u0644\u062f\u0645\u0627\u0645 - \u062d\u064a \u0627\u0644\u0631\u064a\u0627\u0646 - \u0634\u0627\u0631\u0639 \u0639\u062b\u0645\u0627\u0646 \u0628\u0646 \u0639\u0641\u0627\u0646'
    },
    items: [],
    orders: [],
    cart: [],
    scanCart: [],
    html5QrCode: null,
    scanning: false,
    paymentMethod: '\u0643\u0627\u0634',
    orderChannel: '\u0645\u062d\u0644',

    defaultItems: [
        { name: '\u0628\u0631\u062c\u0631 \u0644\u062d\u0645 \u0643\u0644\u0627\u0633\u064a\u0643', category: '\u0628\u0631\u062c\u0631', price: 17.25, cost: 7, description: '\u0628\u0631\u062c\u0631 \u0644\u062d\u0645 \u0637\u0627\u0632\u062c \u0645\u0639 \u062c\u0628\u0646\u0629 \u0648\u062e\u0636\u0627\u0631', sizes: '', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
        { name: '\u0628\u0631\u062c\u0631 \u062f\u062c\u0627\u062c \u0645\u0634\u0648\u064a', category: '\u0628\u0631\u062c\u0631', price: 16.10, cost: 6, description: '\u0628\u0631\u062c\u0631 \u062f\u062c\u0627\u062c \u0645\u0634\u0648\u064a \u0639\u0644\u0649 \u0627\u0644\u0641\u062d\u0645', sizes: '', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500' },
        { name: '\u0628\u0631\u062c\u0631 \u062f\u062c\u0627\u062c \u0645\u0642\u0631\u0645\u0634 (\u0643\u0631\u064a\u0633\u0628\u064a)', category: '\u0628\u0631\u062c\u0631', price: 16.10, cost: 6, description: '\u0628\u0631\u062c\u0631 \u062f\u062c\u0627\u062c \u0645\u0642\u0631\u0645\u0634 \u0628\u0627\u0644\u0628\u0642\u0633\u0645\u0627\u0637', sizes: '', image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500' },
        { name: '\u062f\u0628\u0644 \u0628\u0631\u062c\u0631 \u0644\u062d\u0645', category: '\u0628\u0631\u062c\u0631', price: 25.30, cost: 11, description: '\u0637\u0628\u0642\u062a\u064a\u0646 \u0644\u062d\u0645 \u0645\u0639 \u062c\u0628\u0646\u0629 \u0648\u0635\u0644\u0635\u0629 \u062e\u0627\u0635\u0629', sizes: '', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500' },
        { name: '\u0643\u0628\u0627\u0628 \u0644\u062d\u0645', category: '\u0645\u0634\u0648\u064a\u0627\u062a', price: 23.00, cost: 10, description: '\u0643\u0628\u0627\u0628 \u0644\u062d\u0645 \u0645\u0634\u0648\u064a \u0639\u0644\u0649 \u0627\u0644\u0641\u062d\u0645', sizes: '', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500' },
        { name: '\u0643\u0628\u0627\u0628 \u062f\u062c\u0627\u062c', category: '\u0645\u0634\u0648\u064a\u0627\u062a', price: 20.70, cost: 9, description: '\u0643\u0628\u0627\u0628 \u062f\u062c\u0627\u062c \u0645\u0634\u0648\u064a \u0645\u0639 \u0628\u0647\u0627\u0631\u0627\u062a', sizes: '', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
        { name: '\u0623\u0648\u0635\u0627\u0644 \u0644\u062d\u0645', category: '\u0645\u0634\u0648\u064a\u0627\u062a', price: 28.75, cost: 13, description: '\u0623\u0648\u0635\u0627\u0644 \u0644\u062d\u0645 \u0645\u0634\u0648\u064a\u0629 \u0645\u0639 \u0628\u0647\u0627\u0631\u0627\u062a \u062e\u0627\u0635\u0629', sizes: '', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500' },
        { name: '\u0634\u064a\u0634 \u0637\u0627\u0648\u0648\u0642', category: '\u0645\u0634\u0648\u064a\u0627\u062a', price: 25.30, cost: 11, description: '\u0635\u062f\u0648\u0631 \u062f\u062c\u0627\u062c \u0645\u062a\u0628\u0644\u0629 \u0645\u0634\u0648\u064a\u0629', sizes: '', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500' },
        { name: '\u0645\u0634\u0643\u0644 \u0645\u0634\u0648\u064a\u0627\u062a (\u0635\u062d\u0646)', category: '\u0645\u0634\u0648\u064a\u0627\u062a', price: 40.25, cost: 18, description: '\u062a\u0634\u0643\u064a\u0644\u0629 \u0645\u0646 \u0627\u0644\u0645\u0634\u0648\u064a\u0627\u062a \u0639\u0644\u0649 \u0627\u0644\u0641\u062d\u0645', sizes: '', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500' },
        { name: '\u062d\u0645\u0635', category: '\u0645\u0642\u0628\u0644\u0627\u062a', price: 9.20, cost: 3, description: '\u062d\u0645\u0635 \u0643\u0631\u064a\u0645\u064a \u0645\u0639 \u0632\u064a\u062a \u0627\u0644\u0632\u064a\u062a\u0648\u0646', sizes: '', image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=500' },
        { name: '\u0645\u062a\u0628\u0644', category: '\u0645\u0642\u0628\u0644\u0627\u062a', price: 9.20, cost: 3, description: '\u0628\u0627\u0630\u0646\u062c\u0627\u0646 \u0645\u0634\u0648\u064a \u0645\u0639 \u0637\u062d\u064a\u0646\u0629', sizes: '', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
        { name: '\u0633\u0644\u0637\u0629 \u062e\u0636\u0631\u0627\u0621', category: '\u0645\u0642\u0628\u0644\u0627\u062a', price: 8.05, cost: 2, description: '\u0633\u0644\u0637\u0629 \u0637\u0627\u0632\u062c\u0629 \u0628\u0627\u0644\u062e\u0636\u0627\u0631', sizes: '', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500' },
        { name: '\u062a\u0628\u0648\u0644\u0629', category: '\u0645\u0642\u0628\u0644\u0627\u062a', price: 9.20, cost: 3, description: '\u062a\u0628\u0648\u0644\u0629 \u0644\u0628\u0646\u0627\u0646\u064a\u0629 \u0628\u0627\u0644\u0628\u0642\u062f\u0648\u0646\u0633', sizes: '', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=500' },
        { name: '\u0648\u0631\u0642 \u0639\u0646\u0628', category: '\u0645\u0642\u0628\u0644\u0627\u062a', price: 11.50, cost: 4, description: '\u0648\u0631\u0642 \u0639\u0646\u0628 \u0645\u062d\u0634\u064a \u0628\u0627\u0644\u0623\u0631\u0632 \u0648\u0627\u0644\u0644\u062d\u0645', sizes: '', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500' },
        { name: '\u0628\u0628\u0633\u064a', category: '\u0645\u0634\u0631\u0648\u0628\u0627\u062a', price: 3.45, cost: 1, description: '\u0628\u064a\u0628\u0633\u064a 330 \u0645\u0644', sizes: '', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' },
        { name: '\u0633\u0641\u0646 \u0623\u0628', category: '\u0645\u0634\u0631\u0648\u0628\u0627\u062a', price: 3.45, cost: 1, description: '\u0633\u0641\u0646 \u0623\u0628 330 \u0645\u0644', sizes: '', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500' },
        { name: '\u0645\u0627\u0621', category: '\u0645\u0634\u0631\u0648\u0628\u0627\u062a', price: 2.30, cost: 0.5, description: '\u0645\u064a\u0627\u0647\u0627\u062a \u0645\u0639\u062f\u0646\u064a\u0629 500 \u0645\u0644', sizes: '', image: 'https://images.unsplash.com/photo-1561041695-d2fadf9f318c?w=500' },
        { name: '\u0639\u0635\u064a\u0631 \u0628\u0631\u062a\u0642\u0627\u0644 \u0637\u0627\u0632\u062c', category: '\u0645\u0634\u0631\u0648\u0628\u0627\u062a', price: 9.20, cost: 3, description: '\u0639\u0635\u064a\u0631 \u0628\u0631\u062a\u0642\u0627\u0644 \u0637\u0628\u064a\u0639\u064a \u0637\u0627\u0632\u062c', sizes: '', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500' },
        { name: '\u0628\u0637\u0627\u0637\u0633 \u0645\u0642\u0644\u064a\u0629', category: '\u0623\u0637\u0628\u0627\u0642 \u062c\u0627\u0646\u0628\u064a\u0629', price: 8.05, cost: 2, description: '\u0628\u0637\u0627\u0637\u0633 \u0645\u0642\u0644\u064a\u0629 \u0645\u0642\u0631\u0645\u0634\u0629', sizes: '', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500' },
        { name: '\u0628\u0637\u0627\u0637\u0633 \u0628\u0627\u0644\u062c\u0628\u0646', category: '\u0623\u0637\u0628\u0627\u0642 \u062c\u0627\u0646\u0628\u064a\u0629', price: 11.50, cost: 4, description: '\u0628\u0637\u0627\u0637\u0633 \u0645\u0642\u0644\u064a\u0629 \u0645\u0639 \u062c\u0628\u0646\u0629 \u0634\u064a\u062f\u0631', sizes: '', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=500' },
        { name: '\u0623\u0635\u0627\u0628\u0639 \u0645\u0648\u0632\u0627\u0631\u064a\u0644\u0627', category: '\u0623\u0637\u0628\u0627\u0642 \u062c\u0627\u0646\u0628\u064a\u0629', price: 11.50, cost: 4, description: '\u0623\u0635\u0627\u0628\u0639 \u0645\u0648\u0632\u0627\u0631\u064a\u0644\u0627 \u0645\u0642\u0631\u0645\u0634\u0629', sizes: '', image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=500' },
        { name: '\u0623\u0645 \u0639\u0644\u064a', category: '\u062d\u0644\u0648\u064a\u0627\u062a', price: 13.80, cost: 5, description: '\u062d\u0644\u0648\u0649 \u0623\u0645 \u0639\u0644\u064a \u0628\u0627\u0644\u0642\u0634\u0637\u0629 \u0648\u0627\u0644\u0645\u0643\u0633\u0631\u0627\u062a', sizes: '', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=500' },
        { name: '\u0643\u0646\u0627\u0641\u0629 \u0628\u0627\u0644\u062c\u0628\u0646', category: '\u062d\u0644\u0648\u064a\u0627\u062a', price: 17.25, cost: 6, description: '\u0643\u0646\u0627\u0641\u0629 \u0628\u0627\u0644\u062c\u0628\u0646\u0629 \u0645\u0639 \u0642\u0637\u0631 \u0627\u0644\u0632\u0647\u0631', sizes: '', image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500' },
        { name: '\u0643\u064a\u0643\u0629 \u0627\u0644\u0634\u0648\u0643\u0648\u0644\u0627\u062a\u0629', category: '\u062d\u0644\u0648\u064a\u0627\u062a', price: 11.50, cost: 4, description: '\u0643\u064a\u0643\u0629 \u0634\u0648\u0643\u0648\u0644\u0627\u062a\u0629 \u0637\u0631\u064a\u0629', sizes: '', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500' }
    ],

    init: function() {
        var self = this;
        var logged = sessionStorage.getItem('abou_maheeb_logged');
        if (logged === '1') {
            self.showApp();
        } else {
            self.setupLogin();
        }
    },

    setupLogin: function() {
        var self = this;
        var form = document.getElementById('loginForm');
        var errorEl = document.getElementById('loginError');
        if (!form) return;
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var user = document.getElementById('loginUser').value.trim();
            var pass = document.getElementById('loginPass').value;
            if (user === 'mm77' && pass === '1234') {
                sessionStorage.setItem('abou_maheeb_logged', '1');
                self.showApp();
            } else {
                if (errorEl) {
                    errorEl.classList.add('show');
                    document.getElementById('loginPass').value = '';
                    setTimeout(function() { errorEl.classList.remove('show'); }, 3000);
                }
            }
        });
    },

    showApp: function() {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('appContainer').style.display = 'flex';
        this.loadData();
        this.setupNavigation();
        this.setupModal();
        this.setupItems();
        this.setupBarcodeGenerator();
        this.setupBarcodeScanner();
        this.setupPOS();
        this.setupOrders();
        this.setupSearch();
        this.setupLogout();
        this.setDate();
        this.renderSidebarQR();
        this.renderDashboard();
        this.listenForFirebaseOrders();
    },

    setupLogout: function() {
        var btn = document.getElementById('logoutBtn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                sessionStorage.removeItem('abou_maheeb_logged');
                location.reload();
            });
        }
    },

    loadData: function() {
        var savedItems = localStorage.getItem('abou_maheeb_items');
        var savedOrders = localStorage.getItem('abou_maheeb_orders');
        try { this.items = savedItems ? JSON.parse(savedItems) : []; } catch (e) { this.items = []; }
        try { this.orders = savedOrders ? JSON.parse(savedOrders) : []; } catch (e) { this.orders = []; }
        if (!this.items || this.items.length === 0) {
            this.items = this.createDefaultItems();
            this.saveItems();
        }
        if (!this.orders) { this.orders = []; }
    },

    createDefaultItems: function() {
        var self = this;
        var result = [];
        for (var i = 0; i < this.defaultItems.length; i++) {
            var src = this.defaultItems[i];
            var item = {};
            for (var key in src) { item[key] = src[key]; }
            item.id = 'item_' + Date.now() + '_' + i + '_' + Math.floor(Math.random() * 10000);
            item.barcode = self.generateBarcodeNumber(result);
            item.createdAt = new Date().toISOString();
            result.push(item);
        }
        return result;
    },

    generateBarcodeNumber: function(arr) {
        var list = arr || this.items;
        var code;
        var found;
        do {
            code = '';
            for (var i = 0; i < 8; i++) { code += Math.floor(Math.random() * 10); }
            found = false;
            for (var j = 0; j < list.length; j++) {
                if (list[j].barcode === code) { found = true; break; }
            }
        } while (found);
        return code;
    },

    saveItems: function() {
        try { localStorage.setItem('abou_maheeb_items', JSON.stringify(this.items)); } catch (e) { }
    },

    saveOrders: function() {
        try { localStorage.setItem('abou_maheeb_orders', JSON.stringify(this.orders)); } catch (e) { }
    },

    setupNavigation: function() {
        var self = this;
        var navLinks = document.querySelectorAll('.nav-item[data-page]');
        for (var i = 0; i < navLinks.length; i++) {
            (function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    var page = link.getAttribute('data-page');
                    if (!page) return;
                    var allNav = document.querySelectorAll('.nav-item');
                    for (var n = 0; n < allNav.length; n++) { allNav[n].classList.remove('active'); }
                    link.classList.add('active');
                    var allPages = document.querySelectorAll('.page');
                    for (var p = 0; p < allPages.length; p++) { allPages[p].classList.remove('active'); }
                    var target = document.getElementById('page-' + page);
                    if (target) { target.classList.add('active'); }
                    document.querySelector('.sidebar').classList.remove('open');
                    if (page === 'items') self.renderItemsGrid();
                    if (page === 'barcode-gen') self.renderBarcodeSelect();
                    if (page === 'pos') self.renderPOSItems();
                    if (page === 'dashboard') self.renderDashboard();
                    if (page === 'orders') self.renderOrdersTable();
                });
            })(navLinks[i]);
        }
        var toggle = document.getElementById('menuToggle');
        if (toggle) {
            toggle.addEventListener('click', function() {
                document.querySelector('.sidebar').classList.toggle('open');
            });
        }
    },

    setDate: function() {
        var now = new Date();
        var el = document.getElementById('currentDate');
        if (el) {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            el.textContent = now.toLocaleDateString('ar-SA', options);
        }
    },

    setupModal: function() {
        var self = this;
        var modal = document.getElementById('itemModal');
        var form = document.getElementById('itemForm');
        if (!modal || !form) return;

        var addItemBtn = document.getElementById('addItemBtn');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', function() {
                var title = document.getElementById('modalTitle');
                if (title) title.textContent = '\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u062c\u062f\u064a\u062f';
                form.reset();
                document.getElementById('itemId').value = '';
                document.getElementById('imagePreview').style.display = 'none';
                document.getElementById('imagePlaceholder').style.display = 'flex';
                document.getElementById('removeImage').style.display = 'none';
                document.getElementById('itemImage').value = '';
                modal.classList.add('active');
            });
        }

        var closeBtn = document.getElementById('closeModal');
        if (closeBtn) closeBtn.addEventListener('click', function() { modal.classList.remove('active'); });

        var cancelBtn = document.getElementById('cancelModal');
        if (cancelBtn) cancelBtn.addEventListener('click', function() { modal.classList.remove('active'); });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.classList.remove('active');
        });

        var genBtn = document.getElementById('generateBarcodeNum');
        if (genBtn) {
            genBtn.addEventListener('click', function() {
                document.getElementById('itemBarcode').value = self.generateBarcodeNumber();
            });
        }

        var uploadArea = document.getElementById('imageUploadArea');
        var fileInput = document.getElementById('itemImage');
        var preview = document.getElementById('imagePreview');
        var placeholder = document.getElementById('imagePlaceholder');
        var removeBtn = document.getElementById('removeImage');

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', function() { fileInput.click(); });
            fileInput.addEventListener('change', function(e) {
                var file = e.target.files[0];
                if (!file) return;
                var reader = new FileReader();
                reader.onload = function(ev) {
                    preview.src = ev.target.result;
                    preview.style.display = 'block';
                    placeholder.style.display = 'none';
                    removeBtn.style.display = 'inline-flex';
                };
                reader.readAsDataURL(file);
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                preview.src = '';
                preview.style.display = 'none';
                placeholder.style.display = 'flex';
                removeBtn.style.display = 'none';
                fileInput.value = '';
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            self.saveItem();
        });
    },

    saveItem: function() {
        var id = document.getElementById('itemId').value;
        var imgPreview = document.getElementById('imagePreview');
        var imageData = '';
        if (imgPreview && imgPreview.style.display !== 'none' && imgPreview.src) {
            imageData = imgPreview.src;
        }

        var item = {
            id: id || ('item_' + Date.now() + '_' + Math.floor(Math.random() * 10000)),
            name: document.getElementById('itemName').value.trim(),
            category: document.getElementById('itemCategory').value,
            barcode: document.getElementById('itemBarcode').value.trim() || this.generateBarcodeNumber(),
            price: parseFloat(document.getElementById('itemPrice').value) || 0,
            cost: parseFloat(document.getElementById('itemCost').value) || 0,
            description: document.getElementById('itemDescription').value.trim(),
            sizes: document.getElementById('itemSizes').value,
            image: imageData,
            createdAt: new Date().toISOString()
        };

        if (id) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    item.createdAt = this.items[i].createdAt;
                    this.items[i] = item;
                    break;
                }
            }
        } else {
            this.items.unshift(item);
        }

        this.saveItems();
        document.getElementById('itemModal').classList.remove('active');
        this.renderItemsGrid();
        this.showToast(id ? '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0635\u0646\u0641' : '\u062a\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0635\u0646\u0641 \u0628\u0646\u062c\u0627\u062d');
    },

    setupItems: function() {
        var self = this;
        var filterEl = document.getElementById('categoryFilter');
        if (filterEl) {
            filterEl.addEventListener('change', function() { self.renderItemsGrid(); });
        }
        var resetBtn = document.getElementById('resetItemsBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                if (confirm('\u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0643\u0644 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0648\u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629\u061f')) {
                    localStorage.removeItem('abou_maheeb_items');
                    self.items = self.createDefaultItems();
                    self.saveItems();
                    self.renderItemsGrid();
                    self.renderDashboard();
                    self.renderBarcodeSelect();
                    self.renderPOSItems();
                    self.showToast('\u062a\u0645 \u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0628\u0646\u062c\u0627\u062d', 'success');
                }
            });
        }
    },

    renderItemsGrid: function() {
        var grid = document.getElementById('itemsGrid');
        if (!grid) return;
        var filterEl = document.getElementById('categoryFilter');
        var filter = filterEl ? filterEl.value : 'all';
        var filtered = this.items;
        if (filter !== 'all') {
            filtered = [];
            for (var f = 0; f < this.items.length; f++) {
                if (this.items[f].category === filter) { filtered.push(this.items[f]); }
            }
        }
        if (filtered.length === 0) {
            grid.innerHTML = '<p class="empty-msg">\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0635\u0646\u0627\u0641 \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u062a\u0635\u0646\u064a\u0641</p>';
            return;
        }
        var html = '';
        for (var i = 0; i < filtered.length; i++) {
            var item = filtered[i];
            var imgStyle = '';
            if (item.image) {
                imgStyle = ' style="background:url(\'' + item.image + '\') center/cover;min-height:140px;"';
            }
            html += '<div class="item-card">';
            html += '<div class="item-card-header"' + imgStyle + '>';
            if (!item.image) {
                html += '<span class="item-category-badge">' + item.category + '</span>';
            } else {
                html += '<span class="item-category-badge" style="background:rgba(0,0,0,0.6);">' + item.category + '</span>';
            }
            html += '<div class="item-btns">';
            html += '<button class="item-btn edit" onclick="App.editItem(\'' + item.id + '\')"><i class="fas fa-edit"></i></button>';
            html += '<button class="item-btn delete" onclick="App.deleteItem(\'' + item.id + '\')"><i class="fas fa-trash"></i></button>';
            html += '</div></div>';
            html += '<div class="item-card-body">';
            html += '<h4>' + item.name + '</h4>';
            html += '<p>' + (item.description || '\u0628\u062f\u0648\u0646 \u0648\u0635\u0641') + '</p>';
            html += '<div class="item-card-actions"><span class="item-price">' + item.price.toFixed(2) + ' \u0631.\u0633</span></div>';
            if (item.sizes) {
                html += '<p style="font-size:0.75rem;color:var(--text-light);margin-top:8px;"><i class="fas fa-layer-group"></i> ' + item.sizes + '</p>';
            }
            html += '<div class="item-barcode"><svg class="barcode-svg" data-barcode="' + item.barcode + '"></svg></div>';
            html += '</div></div>';
        }
        grid.innerHTML = html;

        if (typeof JsBarcode !== 'undefined') {
            var svgs = grid.querySelectorAll('.barcode-svg');
            for (var s = 0; s < svgs.length; s++) {
                try {
                    JsBarcode(svgs[s], svgs[s].getAttribute('data-barcode'), { format: 'CODE128', width: 1.5, height: 40, displayValue: true, fontSize: 12, margin: 5 });
                } catch (err) { }
            }
        }
    },

    editItem: function(id) {
        var item = null;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) { item = this.items[i]; break; }
        }
        if (!item) return;
        document.getElementById('modalTitle').textContent = '\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0635\u0646\u0641';
        document.getElementById('itemId').value = item.id;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemBarcode').value = item.barcode;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemCost').value = item.cost || '';
        document.getElementById('itemDescription').value = item.description || '';
        document.getElementById('itemSizes').value = item.sizes || '';
        var imgPreview = document.getElementById('imagePreview');
        var placeholder = document.getElementById('imagePlaceholder');
        var removeBtn = document.getElementById('removeImage');
        if (item.image) {
            imgPreview.src = item.image;
            imgPreview.style.display = 'block';
            placeholder.style.display = 'none';
            removeBtn.style.display = 'inline-flex';
        } else {
            imgPreview.style.display = 'none';
            placeholder.style.display = 'flex';
            removeBtn.style.display = 'none';
        }
        document.getElementById('itemImage').value = '';
        document.getElementById('itemModal').classList.add('active');
    },

    deleteItem: function(id) {
        if (!confirm('\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u0641\u061f')) return;
        var newItems = [];
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id !== id) { newItems.push(this.items[i]); }
        }
        this.items = newItems;
        this.saveItems();
        this.renderItemsGrid();
        this.showToast('\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0635\u0646\u0641');
    },

    setupBarcodeGenerator: function() {
        var self = this;
        var printBtn = document.getElementById('printBarcodeBtn');
        if (printBtn) printBtn.addEventListener('click', function() { self.printBarcodes(); });

        var selectAllBtn = document.getElementById('selectAllBarcode');
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', function() {
                var checks = document.querySelectorAll('.barcode-check');
                for (var i = 0; i < checks.length; i++) { checks[i].checked = true; }
            });
        }
    },

    renderBarcodeSelect: function() {
        var container = document.getElementById('barcodeItemSelect');
        var preview = document.getElementById('barcodePreview');
        if (!container) return;
        if (this.items.length === 0) {
            container.innerHTML = '<p class="empty-msg">\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0635\u0646\u0627\u0641 \u0645\u062a\u0627\u062d\u0629</p>';
            if (preview) preview.innerHTML = '';
            return;
        }
        var html = '';
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            html += '<div class="barcode-item-row">';
            html += '<input type="checkbox" class="barcode-check" value="' + item.id + '" id="bc-' + i + '">';
            html += '<label for="bc-' + i + '">' + item.name + ' (' + item.category + ') - ' + item.barcode + '</label>';
            html += '</div>';
        }
        container.innerHTML = html;
        if (preview) preview.innerHTML = '';
    },

    printBarcodes: function() {
        var checks = document.querySelectorAll('.barcode-check:checked');
        var selectedIds = [];
        for (var c = 0; c < checks.length; c++) { selectedIds.push(checks[c].value); }
        if (selectedIds.length === 0) { this.showToast('\u0627\u062e\u062a\u0631 \u0623\u0635\u0646\u0627\u0641\u0627\u064b \u0644\u0644\u0637\u0628\u0627\u0639\u0629', 'warning'); return; }

        var itemsToPrint = [];
        for (var i = 0; i < this.items.length; i++) {
            for (var j = 0; j < selectedIds.length; j++) {
                if (this.items[i].id === selectedIds[j]) { itemsToPrint.push(this.items[i]); break; }
            }
        }

        var preview = document.getElementById('barcodePreview');
        var html = '';
        for (var k = 0; k < itemsToPrint.length; k++) {
            var item = itemsToPrint[k];
            html += '<div class="barcode-card"><h4>' + item.name + '</h4>';
            html += '<p>' + item.price.toFixed(2) + ' \u0631.\u0633</p>';
            html += '<svg class="print-barcode" data-barcode="' + item.barcode + '"></svg></div>';
        }
        preview.innerHTML = html;

        if (typeof JsBarcode !== 'undefined') {
            var svgs = preview.querySelectorAll('.print-barcode');
            for (var s = 0; s < svgs.length; s++) {
                try { JsBarcode(svgs[s], svgs[s].getAttribute('data-barcode'), { format: 'CODE128', width: 2, height: 60, displayValue: true, fontSize: 14, margin: 10 }); } catch (err) { }
            }
        }

        var printHtml = preview.innerHTML;
        setTimeout(function() {
            var pw = window.open('', '_blank');
            var h = '<!DOCTYPE html><html><head><title>\u0628\u0627\u0631\u0643\u0648\u062f - \u0623\u0628\u0648 \u0645\u0647\u064a\u0628</title>';
            h += '<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"><\/script>';
            h += '<style>body{font-family:Arial,sans-serif;direction:rtl;padding:20px;text-align:center;}';
            h += '.barcode-card{text-align:center;padding:15px;border:1px dashed #ccc;margin:10px;display:inline-block;width:280px;}';
            h += '.barcode-card h4{margin:0 0 5px 0;} .barcode-card p{color:#e65100;font-weight:bold;font-size:1.1rem;margin:5px 0;}</style></head><body>';
            h += '<div id="content">' + printHtml + '</div>';
            h += '<script>setTimeout(function(){var svgs=document.querySelectorAll(".print-barcode");for(var i=0;i<svgs.length;i++){try{JsBarcode(svgs[i],svgs[i].getAttribute("data-barcode"),{format:"CODE128",width:2,height:60,displayValue:true,fontSize:14,margin:10});}catch(e){}}window.print();},800);<\/script>';
            h += '</body></html>';
            pw.document.write(h);
        }, 300);
    },

    setupBarcodeScanner: function() {
        var self = this;
        var startBtn = document.getElementById('startScanBtn');
        var stopBtn = document.getElementById('stopScanBtn');
        var searchBtn = document.getElementById('manualSearchBtn');
        var inputEl = document.getElementById('manualBarcode');

        if (startBtn) startBtn.addEventListener('click', function() { self.startScanner(); });
        if (stopBtn) stopBtn.addEventListener('click', function() { self.stopScanner(); });
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                var code = document.getElementById('manualBarcode').value.trim();
                if (code) self.lookupBarcode(code);
            });
        }
        if (inputEl) {
            inputEl.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var code = e.target.value.trim();
                    if (code) self.lookupBarcode(code);
                }
            });
        }
    },

    startScanner: function() {
        var self = this;
        if (typeof Html5Qrcode === 'undefined') {
            alert('\u0645\u0643\u062a\u0628\u0629 \u0642\u0627\u0631\u0626 \u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062f \u0644\u0645 \u062a\u062d\u0645\u0644. \u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u062a\u0635\u0627\u0644\u0643 \u0628\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a.');
            return;
        }
        document.getElementById('startScanBtn').style.display = 'none';
        document.getElementById('stopScanBtn').style.display = 'inline-flex';
        this.html5QrCode = new Html5Qrcode('qr-reader');
        this.scanning = true;
        this.html5QrCode.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 250, height: 150 } },
            function(decodedText) {
                if (self.scanning) {
                    self.lookupBarcode(decodedText);
                    self.stopScanner();
                }
            },
            function() {}
        ).catch(function() {
            document.getElementById('qr-reader').innerHTML = '<p style="color:white;padding:40px;">\u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0643\u0627\u0645\u064a\u0631\u0627. \u0627\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u0628\u062d\u062b \u0627\u0644\u064a\u062f\u0648\u064a</p>';
            document.getElementById('startScanBtn').style.display = 'inline-flex';
            document.getElementById('stopScanBtn').style.display = 'none';
        });
    },

    stopScanner: function() {
        this.scanning = false;
        if (this.html5QrCode) {
            var self = this;
            this.html5QrCode.stop().then(function() {
                self.html5QrCode.clear();
                document.getElementById('startScanBtn').style.display = 'inline-flex';
                document.getElementById('stopScanBtn').style.display = 'none';
            }).catch(function() {
                document.getElementById('startScanBtn').style.display = 'inline-flex';
                document.getElementById('stopScanBtn').style.display = 'none';
            });
        }
    },

    lookupBarcode: function(code) {
        var item = null;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].barcode === code) { item = this.items[i]; break; }
        }
        var info = document.getElementById('scannedItemInfo');
        if (!info) return;
        if (!item) {
            info.innerHTML = '<div style="text-align:center;padding:20px;color:#d63031;"><p>\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0635\u0646\u0641 \u0628\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062f: ' + code + '</p></div>';
            return;
        }
        var html = '<div class="scan-item-detail"><strong>\u0627\u0644\u0627\u0633\u0645:</strong> <span>' + item.name + '</span></div>';
        html += '<div class="scan-item-detail"><strong>\u0627\u0644\u062a\u0635\u0646\u064a\u0641:</strong> <span>' + item.category + '</span></div>';
        html += '<div class="scan-item-detail"><strong>\u0627\u0644\u0633\u0639\u0631:</strong> <span style="color:var(--primary);font-weight:800;">' + item.price.toFixed(2) + ' \u0631.\u0633</span></div>';
        html += '<div class="scan-item-detail"><strong>\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062f:</strong> <span>' + item.barcode + '</span></div>';
        if (item.description) html += '<div class="scan-item-detail"><strong>\u0627\u0644\u0648\u0635\u0641:</strong> <span>' + item.description + '</span></div>';
        if (item.sizes) html += '<div class="scan-item-detail"><strong>\u0627\u0644\u0623\u062d\u062c\u0627\u0645:</strong> <span>' + item.sizes + '</span></div>';
        html += '<button class="btn btn-success scan-add-btn" onclick="App.addToScanCart(\'' + item.id + '\')"><i class="fas fa-plus"></i> \u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0637\u0644\u0628</button>';
        info.innerHTML = html;
    },

    addToScanCart: function(itemId) {
        var item = null;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === itemId) { item = this.items[i]; break; }
        }
        if (!item) return;
        var existing = null;
        for (var j = 0; j < this.scanCart.length; j++) {
            if (this.scanCart[j].id === itemId) { existing = this.scanCart[j]; break; }
        }
        if (existing) {
            existing.qty++;
        } else {
            this.scanCart.push({ id: item.id, name: item.name, price: item.price, qty: 1, category: item.category, barcode: item.barcode, image: item.image, description: item.description, sizes: item.sizes });
        }
        this.renderScanCart();
        this.showToast('\u062a\u0645\u062a \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0635\u0646\u0641 \u0644\u0644\u0633\u0644\u0629', 'success');
    },

    renderScanCart: function() {
        var container = document.getElementById('scanCartItems');
        var countEl = document.getElementById('scanCartCount');
        var totalEl = document.getElementById('scanCartTotal');
        if (!container) return;

        if (this.scanCart.length === 0) {
            container.innerHTML = '<p class="empty-msg">\u0627\u0644\u0633\u0644\u0629 \u0641\u0627\u0631\u063a\u0629</p>';
        } else {
            var html = '';
            for (var i = 0; i < this.scanCart.length; i++) {
                var item = this.scanCart[i];
                html += '<div class="cart-item"><div class="cart-item-info"><h4>' + item.name + '</h4><p>' + item.price.toFixed(2) + ' \u0631.\u0633</p></div>';
                html += '<div class="cart-item-qty"><button class="qty-btn" onclick="App.updateScanQty(' + i + ', -1)">-</button><span>' + item.qty + '</span>';
                html += '<button class="qty-btn" onclick="App.updateScanQty(' + i + ', 1)">+</button></div>';
                html += '<span class="cart-item-price">' + (item.price * item.qty).toFixed(2) + ' \u0631.\u0633</span></div>';
            }
            container.innerHTML = html;
        }
        var total = 0, totalQty = 0;
        for (var k = 0; k < this.scanCart.length; k++) { total += this.scanCart[k].price * this.scanCart[k].qty; totalQty += this.scanCart[k].qty; }
        if (countEl) countEl.textContent = totalQty;
        if (totalEl) totalEl.textContent = total.toFixed(2) + ' \u0631.\u0633';
    },

    updateScanQty: function(idx, delta) {
        this.scanCart[idx].qty += delta;
        if (this.scanCart[idx].qty <= 0) { this.scanCart.splice(idx, 1); }
        this.renderScanCart();
    },

    clearScanCart: function() {
        this.scanCart = [];
        this.renderScanCart();
    },

    goToPOS: function() {
        if (this.scanCart.length === 0) { this.showToast('\u0627\u0644\u0633\u0644\u0629 \u0641\u0627\u0631\u063a\u0629!', 'warning'); return; }
        for (var i = 0; i < this.scanCart.length; i++) {
            var scanItem = this.scanCart[i];
            var existing = null;
            for (var j = 0; j < this.cart.length; j++) {
                if (this.cart[j].id === scanItem.id) { existing = this.cart[j]; break; }
            }
            if (existing) { existing.qty += scanItem.qty; }
            else { this.cart.push({ id: scanItem.id, name: scanItem.name, price: scanItem.price, qty: scanItem.qty, category: scanItem.category, barcode: scanItem.barcode, image: scanItem.image, description: scanItem.description, sizes: scanItem.sizes }); }
        }
        this.scanCart = [];
        this.renderScanCart();
        this.renderCart();
        var navItems = document.querySelectorAll('.nav-item');
        for (var n = 0; n < navItems.length; n++) { navItems[n].classList.remove('active'); }
        var posNav = document.querySelector('[data-page="pos"]');
        if (posNav) posNav.classList.add('active');
        var pages = document.querySelectorAll('.page');
        for (var p = 0; p < pages.length; p++) { pages[p].classList.remove('active'); }
        document.getElementById('page-pos').classList.add('active');
        this.renderPOSItems();
        this.showToast('\u062a\u0645 \u0646\u0642\u0644 \u0627\u0644\u0637\u0644\u0628 \u0644\u0646\u0642\u0637\u0629 \u0627\u0644\u0628\u064a\u0639');
    },

    completeScanOrder: function() {
        if (this.scanCart.length === 0) { this.showToast('\u0627\u0644\u0633\u0644\u0629 \u0641\u0627\u0631\u063a\u0629!', 'warning'); return; }
        var total = 0;
        for (var i = 0; i < this.scanCart.length; i++) { total += this.scanCart[i].price * this.scanCart[i].qty; }
        var order = { id: 'ORD-' + Date.now().toString(36).toUpperCase(), items: this.scanCart.slice(), subtotal: total / 1.15, tax: total - total / 1.15, total: total, paymentMethod: this.paymentMethod, channel: this.orderChannel, date: new Date().toISOString(), status: 'completed' };
        this.orders.unshift(order);
        this.saveOrders();
        this.showReceipt(order);
        this.scanCart = [];
        this.renderScanCart();
        this.showToast('\u062a\u0645 \u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062c\u0627\u062d!');
    },

    setupPOS: function() {
        var self = this;
        var searchEl = document.getElementById('posSearch');
        if (searchEl) {
            searchEl.addEventListener('input', function(e) { self.renderPOSItems(e.target.value); });
        }
        var catBtns = document.querySelectorAll('.pos-cat');
        for (var i = 0; i < catBtns.length; i++) {
            (function(btn) {
                btn.addEventListener('click', function() {
                    var allBtns = document.querySelectorAll('.pos-cat');
                    for (var b = 0; b < allBtns.length; b++) { allBtns[b].classList.remove('active'); }
                    btn.classList.add('active');
                    var s = document.getElementById('posSearch');
                    self.renderPOSItems(s ? s.value : '');
                });
            })(catBtns[i]);
        }
        var clearBtn = document.getElementById('clearCart');
        if (clearBtn) clearBtn.addEventListener('click', function() { self.clearCart(); });
        var completeBtn = document.getElementById('completeOrder');
        if (completeBtn) completeBtn.addEventListener('click', function() { self.completeOrder(); });
    },

    renderPOSItems: function(search) {
        search = search || '';
        var grid = document.getElementById('posItemsGrid');
        if (!grid) return;
        var activeCatBtn = document.querySelector('.pos-cat.active');
        var activeCat = activeCatBtn ? activeCatBtn.getAttribute('data-cat') : 'all';
        var filtered = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (activeCat !== 'all' && item.category !== activeCat) continue;
            if (search && item.name.indexOf(search) === -1 && item.barcode.indexOf(search) === -1) continue;
            filtered.push(item);
        }
        if (filtered.length === 0) { grid.innerHTML = '<p class="empty-msg">\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0635\u0646\u0627\u0641</p>'; return; }
        var icons = { '\u0628\u0631\u062c\u0631': 'fa-burger', '\u0645\u0634\u0648\u064a\u0627\u062a': 'fa-fire', '\u0645\u0642\u0628\u0644\u0627\u062a': 'fa-cookie-bite', '\u0645\u0634\u0631\u0648\u0628\u0627\u062a': 'fa-glass-water', '\u0623\u0637\u0628\u0627\u0642 \u062c\u0627\u0646\u0628\u064a\u0629': 'fa-bowl-food', '\u062d\u0644\u0648\u064a\u0627\u062a': 'fa-ice-cream' };
        var html = '';
        for (var j = 0; j < filtered.length; j++) {
            var it = filtered[j];
            html += '<div class="pos-item" onclick="App.addToCart(\'' + it.id + '\')">';
            if (it.image) {
                html += '<img src="' + it.image + '" class="pos-item-img" alt="' + it.name + '">';
            } else {
                html += '<div class="pos-item-icon"><i class="fas ' + (icons[it.category] || 'fa-utensils') + '"></i></div>';
            }
            html += '<h4>' + it.name + '</h4>';
            html += '<div class="pos-item-price">' + it.price.toFixed(2) + ' \u0631.\u0633</div></div>';
        }
        grid.innerHTML = html;
    },

    addToCart: function(itemId) {
        var item = null;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === itemId) { item = this.items[i]; break; }
        }
        if (!item) return;
        var existing = null;
        for (var j = 0; j < this.cart.length; j++) {
            if (this.cart[j].id === itemId) { existing = this.cart[j]; break; }
        }
        if (existing) {
            existing.qty++;
        } else {
            this.cart.push({ id: item.id, name: item.name, price: item.price, qty: 1, category: item.category, barcode: item.barcode, image: item.image, description: item.description, sizes: item.sizes });
        }
        this.renderCart();
        this.showToast('\u062a\u0645\u062a \u0625\u0636\u0627\u0641\u0629 ' + item.name);
    },

    renderCart: function() {
        var container = document.getElementById('cartItems');
        if (!container) return;
        if (this.cart.length === 0) {
            container.innerHTML = '<p class="empty-msg">\u0627\u0644\u0633\u0644\u0629 \u0641\u0627\u0631\u063a\u0629</p>';
        } else {
            var html = '';
            for (var i = 0; i < this.cart.length; i++) {
                var item = this.cart[i];
                html += '<div class="cart-item"><div class="cart-item-info"><h4>' + item.name + '</h4><p>' + item.price.toFixed(2) + ' \u0631.\u0633</p></div>';
                html += '<div class="cart-item-qty"><button class="qty-btn" onclick="App.updateQty(' + i + ', -1)">-</button><span>' + item.qty + '</span>';
                html += '<button class="qty-btn" onclick="App.updateQty(' + i + ', 1)">+</button></div>';
                html += '<span class="cart-item-price">' + (item.price * item.qty).toFixed(2) + ' \u0631.\u0633</span></div>';
            }
            container.innerHTML = html;
        }
        var total = 0;
        for (var k = 0; k < this.cart.length; k++) { total += this.cart[k].price * this.cart[k].qty; }
        var subtotal = total / 1.15;
        var tax = total - subtotal;
        var subEl = document.getElementById('cartSubtotal');
        var taxEl = document.getElementById('cartTax');
        var totEl = document.getElementById('cartTotal');
        if (subEl) subEl.textContent = subtotal.toFixed(2) + ' \u0631.\u0633';
        if (taxEl) taxEl.textContent = tax.toFixed(2) + ' \u0631.\u0633';
        if (totEl) totEl.textContent = total.toFixed(2) + ' \u0631.\u0633';
    },

    updateQty: function(idx, delta) {
        this.cart[idx].qty += delta;
        if (this.cart[idx].qty <= 0) { this.cart.splice(idx, 1); }
        this.renderCart();
    },

    clearCart: function() {
        this.cart = [];
        this.renderCart();
    },

    setPaymentMethod: function(method, btn) {
        this.paymentMethod = method;
        var btns = document.querySelectorAll('.payment-btn');
        for (var i = 0; i < btns.length; i++) { btns[i].classList.remove('active'); }
        if (btn) btn.classList.add('active');
    },

    setChannel: function(channel, btn) {
        this.orderChannel = channel;
        var btns = document.querySelectorAll('.channel-btn');
        for (var i = 0; i < btns.length; i++) { btns[i].classList.remove('active'); }
        if (btn) btn.classList.add('active');
    },

    completeOrder: function() {
        if (this.cart.length === 0) { this.showToast('\u0627\u0644\u0633\u0644\u0629 \u0641\u0627\u0631\u063a\u0629!', 'warning'); return; }
        var total = 0;
        for (var i = 0; i < this.cart.length; i++) { total += this.cart[i].price * this.cart[i].qty; }
        var order = { id: 'ORD-' + Date.now().toString(36).toUpperCase(), items: this.cart.slice(), subtotal: total / 1.15, tax: total - total / 1.15, total: total, paymentMethod: this.paymentMethod, channel: this.orderChannel, date: new Date().toISOString(), status: 'completed' };
        this.orders.unshift(order);
        this.saveOrders();
        this.showReceipt(order);
        this.cart = [];
        this.renderCart();
        this.showToast('\u062a\u0645 \u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062c\u0627\u062d!');
    },

    getMenuUrl: function() {
        return 'https://almalamh.github.io/abou-maheeb-menu/menu.html';
    },

    getQRImageUrl: function(text, size) {
        return 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&data=' + encodeURIComponent(text);
    },

    getLogoSvg: function() {
        return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style="width:100px;height:100px;">' +
            '<defs>' +
            '<linearGradient id="prf" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#bf360c"/><stop offset="50%" stop-color="#e65100"/><stop offset="100%" stop-color="#ff9e40"/></linearGradient>' +
            '<linearGradient id="prg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff9e40"/><stop offset="100%" stop-color="#ffd54f"/></linearGradient>' +
            '</defs>' +
            '<circle cx="120" cy="120" r="115" fill="none" stroke="url(#prg)" stroke-width="3"/>' +
            '<circle cx="120" cy="120" r="108" fill="#f5f5f5"/>' +
            '<path id="psta" d="M 35 120 A 85 85 0 0 1 205 120" fill="none"/>' +
            '<text fill="url(#prg)" font-family="Arial,sans-serif" font-size="22" font-weight="800" letter-spacing="4"><textPath href="#psta" startOffset="50%" text-anchor="middle">\u0623\u0628\u0648 \u0645\u0647\u064a\u0628</textPath></text>' +
            '<path id="psba" d="M 35 125 A 85 85 0 0 0 205 125" fill="none"/>' +
            '<text fill="url(#prg)" font-family="Arial,sans-serif" font-size="13" font-weight="600" letter-spacing="2" opacity="0.6"><textPath href="#psba" startOffset="50%" text-anchor="middle">\u0628\u0631\u062c\u0631 \u0648\u0645\u0634\u0648\u064a\u0627\u062a</textPath></text>' +
            '<g transform="translate(120,105)"><path d="M0,-35 C-5,-25 -28,0 -28,20 C-28,33 -16,42 0,45 C16,42 28,33 28,20 C28,0 5,-25 0,-35 Z" fill="url(#prf)"/><path d="M0,-15 C-3,-8 -16,5 -16,17 C-16,26 -9,31 0,33 C9,31 16,26 16,17 C16,5 3,-8 0,-15 Z" fill="#ffcc80" opacity="0.7"/></g>' +
            '</svg>';
    },

    showReceipt: function(order) {
        var modal = document.getElementById('receiptModal');
        var content = document.getElementById('receiptContent');
        if (!modal || !content) return;

        var now = new Date(order.date);
        var dateStr = now.toLocaleDateString('ar-SA');
        var timeStr = now.toLocaleTimeString('ar-SA');
        var qrImgUrl = this.getQRImageUrl(this.getMenuUrl(), 220);

        var itemsHtml = '';
        for (var i = 0; i < order.items.length; i++) {
            var item = order.items[i];
            itemsHtml += '<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px dotted #ccc;font-size:0.85rem;">';
            itemsHtml += '<span>' + item.name + ' x' + item.qty + '</span>';
            itemsHtml += '<span>' + (item.price * item.qty).toFixed(2) + '</span>';
            itemsHtml += '</div>';
        }

        var rName = this.restaurant.name;
        var rSub = this.restaurant.subtitle;
        var rAddr = this.restaurant.address;
        var rPhone = this.restaurant.phone;
        var oChannel = order.channel || '\u0645\u062d\u0644';
        var oPay = order.paymentMethod || '\u0643\u0627\u0634';
        var logoSvg = this.getLogoSvg();

        var html = '<div style="text-align:center;">';
        html += '<div style="display:flex;justify-content:center;margin-bottom:10px;">' + logoSvg + '</div>';
        html += '<h2 style="font-size:1.5rem;color:#e65100;margin:0 0 4px 0;">' + rName + '</h2>';
        html += '<p style="margin:0 0 6px 0;">' + rSub + '</p>';
        html += '<p style="font-size:0.9rem;color:#222;font-weight:600;margin:6px 0;">\u0627\u0644\u0645\u062f\u064a\u0646\u0629: ' + rAddr + '</p>';
        html += '<p style="font-size:0.9rem;color:#222;font-weight:700;margin:2px 0;"><i class="fas fa-phone-alt"></i> ' + rPhone + '</p>';
        html += '<div style="display:flex;justify-content:center;margin:12px auto 0;"><img src="' + qrImgUrl + '" alt="QR" style="width:220px;height:220px;border:3px solid #1a1a2e;border-radius:8px;"></div>';
        html += '<p style="font-size:0.65rem;color:#999;margin-top:4px;">\u0627\u0645\u0633\u062d \u0627\u0644\u0643\u0648\u062f \u0644\u0639\u0631\u0636 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</p>';
        html += '<p style="margin-top:10px;">' + dateStr + ' - ' + timeStr + '</p>';
        html += '<p style="margin-top:6px;font-weight:bold;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628: ' + order.id + '</p>';
        html += '<p>\u0627\u0644\u0642\u0646\u0627\u0629: ' + oChannel + ' | \u0627\u0644\u062f\u0641\u0639: ' + oPay + '</p>';
        html += '<hr style="border:1px dashed #ccc;margin:12px 0;">';
        html += itemsHtml;
        html += '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem;"><span>\u0627\u0644\u0645\u062c\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064a</span><span>' + order.subtotal.toFixed(2) + '</span></div>';
        html += '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem;"><span>\u0627\u0644\u0636\u0631\u064a\u0628\u0629 (15%)</span><span>' + order.tax.toFixed(2) + '</span></div>';
        html += '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:1.1rem;font-weight:800;border-top:2px solid #2d3436;margin-top:8px;"><span>\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a</span><span>' + order.total.toFixed(2) + '</span></div>';
        html += '<hr style="border:1px dashed #ccc;margin:12px 0;">';
        html += '<p>\u0634\u0643\u0631\u0627\u064b \u0644\u0632\u064a\u0627\u0631\u062a\u0643\u0645!</p>';
        html += '</div>';

        content.innerHTML = html;
        modal.classList.add('active');

        var closeBtn = document.getElementById('closeReceipt');
        if (closeBtn) closeBtn.onclick = function() { modal.classList.remove('active'); };

        var self = this;
        var capturedQR = qrImgUrl;
        var capturedDate = dateStr;
        var capturedTime = timeStr;
        var capturedOrder = { id: order.id, items: order.items, subtotal: order.subtotal, tax: order.tax, total: order.total, channel: oChannel, paymentMethod: oPay };
        var capturedLogo = logoSvg;
        var capturedAddr = '\u0627\u0644\u0645\u062f\u064a\u0646\u0629: ' + rAddr;
        var capturedPhone = rPhone;

        document.getElementById('printReceipt').onclick = function() {
            var pw = window.open('', '_blank');
            if (!pw) { alert('\u062c\u0631\u0628 \u062a\u0633\u062e\u064a\u0646 \u0627\u0644\u0646\u0637\u0641 \u0627\u0644\u0645\u0646\u0641\u0638 \u0627\u0644\u0645\u062d\u0638\u0631'); return; }
            var h = '';
            h += '<!DOCTYPE html><html><head>';
            h += '<meta charset="UTF-8">';
            h += '<title>\u0641\u0627\u062a\u0648\u0631\u0629 - \u0623\u0628\u0648 \u0645\u0647\u064a\u0628</title>';
            h += '<style>';
            h += 'body{font-family:Arial,Helvetica,sans-serif;direction:rtl;text-align:center;padding:20px 10px;margin:0;color:#222;}';
            h += 'img{max-width:100%;}';
            h += '</style></head><body>';
            h += '<div style="text-align:center;">';
            h += '<div style="display:flex;justify-content:center;margin-bottom:8px;">' + capturedLogo + '</div>';
            h += '<h2 style="color:#e65100;margin:0 0 4px 0;font-size:1.4rem;">' + self.restaurant.name + '</h2>';
            h += '<p style="margin:0 0 8px 0;font-size:0.95rem;">' + self.restaurant.subtitle + '</p>';
            h += '<p style="font-size:1rem;color:#222;font-weight:600;margin:6px 0;">' + capturedAddr + '</p>';
            h += '<p style="font-size:1rem;color:#222;font-weight:700;margin:6px 0;">\u062a\u0648\u0627\u0635\u0644: ' + capturedPhone + '</p>';
            h += '<div style="display:flex;justify-content:center;margin:12px auto 0;"><img src="' + capturedQR + '" alt="QR" style="width:200px;height:200px;border:2px solid #333;border-radius:8px;"></div>';
            h += '<p style="font-size:0.6rem;color:#999;margin-top:4px;">\u0627\u0645\u0633\u062d \u0627\u0644\u0643\u0648\u062f \u0644\u0639\u0631\u0636 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</p>';
            h += '<hr style="border:1px dashed #ccc;margin:12px 0;">';
            h += '<p style="margin-top:8px;font-size:0.9rem;">' + capturedDate + ' - ' + capturedTime + '</p>';
            h += '<p style="margin-top:4px;"><strong style="font-size:1rem;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628: ' + capturedOrder.id + '</strong></p>';
            h += '<p style="font-size:0.85rem;">\u0627\u0644\u0642\u0646\u0627\u0629: ' + capturedOrder.channel + ' | \u0627\u0644\u062f\u0641\u0639: ' + capturedOrder.paymentMethod + '</p>';
            h += '<hr style="border:1px dashed #ccc;margin:10px 0;">';
            for (var i = 0; i < capturedOrder.items.length; i++) {
                var it = capturedOrder.items[i];
                h += '<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px dotted #ddd;font-size:0.85rem;">';
                h += '<span>' + it.name + ' x' + it.qty + '</span>';
                h += '<span>' + (it.price * it.qty).toFixed(2) + ' \u0631.\u0633</span></div>';
            }
            h += '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem;margin-top:6px;"><span>\u0627\u0644\u0645\u062c\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064a</span><span>' + capturedOrder.subtotal.toFixed(2) + ' \u0631.\u0633</span></div>';
            h += '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem;"><span>\u0627\u0644\u0636\u0631\u064a\u0628\u0629 (15%)</span><span>' + capturedOrder.tax.toFixed(2) + ' \u0631.\u0633</span></div>';
            h += '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:1.15rem;font-weight:bold;border-top:2px solid #000;margin-top:8px;"><span>\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a</span><span>' + capturedOrder.total.toFixed(2) + ' \u0631.\u0633</span></div>';
            h += '<hr style="border:1px dashed #ccc;margin:12px 0;">';
            h += '<p style="font-size:0.9rem;">\u0634\u0643\u0631\u0627\u064b \u0644\u0632\u064a\u0627\u0631\u062a\u0643\u0645!</p>';
            h += '</div>';
            h += '<script>setTimeout(function(){window.print();window.close();},1000);<\/script>';
            h += '</body></html>';
            pw.document.write(h);
            pw.document.close();
        };
    },

    setupOrders: function() {
        var self = this;
        var clearBtn = document.getElementById('clearOrders');
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                if (confirm('\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u0645\u0633\u062d \u062c\u0645\u064a\u0639 \u0627\u0644\u0637\u0644\u0628\u0627\u062a\u061f')) {
                    self.orders = [];
                    self.saveOrders();
                    self.renderOrdersTable();
                    self.showToast('\u062a\u0645 \u0645\u0633\u062d \u0633\u062c\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062a');
                }
            });
        }
    },

    renderOrdersTable: function() {
        var tbody = document.getElementById('ordersBody');
        var noMsg = document.getElementById('noOrdersMsg');
        if (!tbody) return;
        if (this.orders.length === 0) {
            tbody.innerHTML = '';
            if (noMsg) noMsg.style.display = 'block';
            return;
        }
        if (noMsg) noMsg.style.display = 'none';
        var html = '';
        for (var i = 0; i < this.orders.length; i++) {
            var order = this.orders[i];
            var date = new Date(order.date);
            var dateStr = date.toLocaleDateString('ar-SA') + ' ' + date.toLocaleTimeString('ar-SA');
            var itemsArr = [];
            for (var j = 0; j < order.items.length; j++) { itemsArr.push(order.items[j].name + ' x' + order.items[j].qty); }
            var itemsStr = itemsArr.join(', ');
            var chClass = order.channel === '\u0647\u0646\u062c\u0631\u0633\u062a\u064a\u0634\u0646' ? 'hunger' : 'dine-in';
            var payClass = order.paymentMethod === '\u0634\u0628\u0643\u0629' ? 'network' : 'cash';
            html += '<tr>';
            html += '<td><strong>' + order.id + '</strong></td>';
            html += '<td>' + dateStr + '</td>';
            html += '<td>' + itemsStr + '</td>';
            html += '<td><span class="status-badge ' + chClass + '">' + (order.channel || '\u0645\u062d\u0644') + '</span></td>';
            html += '<td><span class="status-badge ' + payClass + '">' + (order.paymentMethod || '\u0643\u0627\u0634') + '</span></td>';
            html += '<td><strong style="color:var(--primary);">' + order.total.toFixed(2) + ' \u0631.\u0633</strong></td>';
            html += '<td><span class="status-badge completed">\u0645\u0643\u062a\u0645\u0644</span></td>';
            html += '<td class="order-btns"><button class="item-btn receipt" onclick="App.showReceipt(App.orders[' + i + '])" title="\u0639\u0631\u0636 \u0627\u0644\u0641\u0627\u062a\u0648\u0631\u0629"><i class="fas fa-file-invoice"></i></button> <button class="item-btn delete" onclick="App.deleteOrder(\'' + order.id + '\')"><i class="fas fa-trash"></i></button></td>';
            html += '</tr>';
        }
        tbody.innerHTML = html;
    },

    deleteOrder: function(id) {
        if (!confirm('\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061f')) return;
        var newOrders = [];
        for (var i = 0; i < this.orders.length; i++) {
            if (this.orders[i].id !== id) { newOrders.push(this.orders[i]); }
        }
        this.orders = newOrders;
        this.saveOrders();
        this.renderOrdersTable();
        this.showToast('\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0637\u0644\u0628');
    },

    renderSidebarQR: function() {
        var container = document.getElementById('sidebarQR');
        if (!container) return;
        var qrImgUrl = this.getQRImageUrl(this.getMenuUrl(), 140);
        container.innerHTML = '<img src="' + qrImgUrl + '" alt="QR Menu" title="امسح لعرض القائمة"><span>امسح لعرض القائمة</span>';
    },

    renderDashboard: function() {

        var totalItemsEl = document.getElementById('totalItems');
        var totalBurgersEl = document.getElementById('totalBurgers');
        var totalGrillEl = document.getElementById('totalGrill');
        var totalOrdersEl = document.getElementById('totalOrders');
        var totalRevenueEl = document.getElementById('totalRevenue');
        var avgOrderEl = document.getElementById('avgOrder');

        if (totalItemsEl) totalItemsEl.textContent = this.items.length;

        var dashQR = document.getElementById('dashQR');
        if (dashQR) {
            var qrImgUrl = this.getQRImageUrl(this.getMenuUrl(), 180);
            dashQR.innerHTML = '<img src="' + qrImgUrl + '" alt="QR" style="width:90px;height:90px;border-radius:6px;border:2px solid rgba(255,255,255,0.3);">';
        }

        var burgerCount = 0;
        var grillCount = 0;
        for (var b = 0; b < this.items.length; b++) {
            if (this.items[b].category === '\u0628\u0631\u062c\u0631') burgerCount++;
            if (this.items[b].category === '\u0645\u0634\u0648\u064a\u0627\u062a') grillCount++;
        }
        if (totalBurgersEl) totalBurgersEl.textContent = burgerCount;
        if (totalGrillEl) totalGrillEl.textContent = grillCount;
        if (totalOrdersEl) totalOrdersEl.textContent = this.orders.length;

        var totalRev = 0;
        for (var r = 0; r < this.orders.length; r++) { totalRev += this.orders[r].total; }
        var avgOrd = this.orders.length > 0 ? totalRev / this.orders.length : 0;
        if (totalRevenueEl) totalRevenueEl.textContent = totalRev.toFixed(2) + ' \u0631.\u0633';
        if (avgOrderEl) avgOrderEl.textContent = avgOrd.toFixed(2) + ' \u0631.\u0633';

        var recentOrders = document.getElementById('recentOrders');
        if (recentOrders) {
            if (this.orders.length === 0) {
                recentOrders.innerHTML = '<p class="empty-msg">\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0644\u0628\u0627\u062a \u0628\u0639\u062f</p>';
            } else {
                var rhtml = '';
                var count = Math.min(5, this.orders.length);
                for (var j = 0; j < count; j++) {
                    var order = this.orders[j];
                    var date = new Date(order.date);
                    rhtml += '<div class="order-item"><div><strong>' + order.id + '</strong>';
                    rhtml += '<p style="font-size:0.75rem;color:var(--text-light);">' + date.toLocaleTimeString('ar-SA') + '</p></div>';
                    rhtml += '<strong style="color:var(--primary);">' + order.total.toFixed(2) + ' \u0631.\u0633</strong></div>';
                }
                recentOrders.innerHTML = rhtml;
            }
        }

        var topItems = document.getElementById('topItems');
        if (topItems) {
            var itemCounts = {};
            for (var k = 0; k < this.orders.length; k++) {
                for (var l = 0; l < this.orders[k].items.length; l++) {
                    var iname = this.orders[k].items[l].name;
                    if (!itemCounts[iname]) itemCounts[iname] = 0;
                    itemCounts[iname] += this.orders[k].items[l].qty;
                }
            }
            var sorted = [];
            for (var name in itemCounts) { sorted.push([name, itemCounts[name]]); }
            sorted.sort(function(a, b) { return b[1] - a[1]; });
            sorted = sorted.slice(0, 5);

            if (sorted.length === 0) {
                topItems.innerHTML = '<p class="empty-msg">\u0644\u0627 \u062a\u0648\u062c\u062f \u0628\u064a\u0627\u0646\u0627\u062a \u0628\u0639\u062f</p>';
            } else {
                var maxCount = sorted[0][1];
                var thtml = '';
                for (var m = 0; m < sorted.length; m++) {
                    var pct = (sorted[m][1] / maxCount) * 100;
                    thtml += '<div class="order-item" style="flex-direction:column;align-items:stretch;gap:6px;">';
                    thtml += '<div style="display:flex;justify-content:space-between;">';
                    thtml += '<strong style="font-size:0.85rem;">' + (m + 1) + '. ' + sorted[m][0] + '</strong>';
                    thtml += '<span style="background:var(--primary);color:white;padding:2px 10px;border-radius:12px;font-size:0.75rem;font-weight:600;">' + sorted[m][1] + ' \u0645\u0631\u0629</span></div>';
                    thtml += '<div style="width:100%;height:5px;background:var(--border);border-radius:3px;overflow:hidden;">';
                    thtml += '<div style="width:' + pct + '%;height:100%;background:linear-gradient(90deg,var(--primary),var(--primary-light));border-radius:3px;"></div></div></div>';
                }
                topItems.innerHTML = thtml;
            }
        }

        var catStats = document.getElementById('categoryStats');
        if (catStats) {
            var catColors = { '\u0628\u0631\u062c\u0631': '#e65100', '\u0645\u0634\u0648\u064a\u0627\u062a': '#d63031', '\u0645\u0642\u0628\u0644\u0627\u062a': '#f39c12', '\u0645\u0634\u0631\u0648\u0628\u0627\u062a': '#0984e3', '\u0623\u0637\u0628\u0627\u0642 \u062c\u0627\u0646\u0628\u064a\u0629': '#00b894', '\u062d\u0644\u0648\u064a\u0627\u062a': '#e84393' };
            var catIcons = { '\u0628\u0631\u062c\u0631': 'fa-burger', '\u0645\u0634\u0648\u064a\u0627\u062a': 'fa-fire', '\u0645\u0642\u0628\u0644\u0627\u062a': 'fa-cookie-bite', '\u0645\u0634\u0631\u0648\u0628\u0627\u062a': 'fa-glass-water', '\u0623\u0637\u0628\u0627\u0642 \u062c\u0627\u0646\u0628\u064a\u0629': 'fa-bowl-food', '\u062d\u0644\u0648\u064a\u0627\u062a': 'fa-ice-cream' };
            var catCounts = {};
            for (var c = 0; c < this.items.length; c++) {
                var cat = this.items[c].category;
                if (!catCounts[cat]) catCounts[cat] = 0;
                catCounts[cat]++;
            }
            var totalItems = this.items.length || 1;
            var catEntries = [];
            for (var cn in catCounts) { catEntries.push([cn, catCounts[cn]]); }
            catEntries.sort(function(a, b) { return b[1] - a[1]; });

            if (catEntries.length === 0) {
                catStats.innerHTML = '<p class="empty-msg">\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0635\u0646\u0627\u0641</p>';
            } else {
                var chtml = '';
                for (var x = 0; x < catEntries.length; x++) {
                    var cpct = (catEntries[x][1] / totalItems) * 100;
                    var color = catColors[catEntries[x][0]] || '#636e72';
                    var icon = catIcons[catEntries[x][0]] || 'fa-utensils';
                    chtml += '<div class="cat-stat-row">';
                    chtml += '<div class="cat-stat-icon" style="background:' + color + ';"><i class="fas ' + icon + '"></i></div>';
                    chtml += '<div class="cat-stat-info"><div class="cat-stat-name">' + catEntries[x][0] + '</div>';
                    chtml += '<div class="cat-stat-bar"><div class="cat-stat-bar-fill" style="width:' + cpct + '%;background:' + color + ';"></div></div></div>';
                    chtml += '<span class="cat-stat-count">' + catEntries[x][1] + '</span></div>';
                }
                catStats.innerHTML = chtml;
            }
        }
    },

    listenForFirebaseOrders: function() {
        var self = this;
        if (typeof db === 'undefined') return;
        db.collection('orders').where('status', '==', 'new').onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === 'added') {
                    var data = change.doc.data();
                    var exists = false;
                    for (var i = 0; i < self.orders.length; i++) {
                        if (self.orders[i].id === data.id) { exists = true; break; }
                    }
                    if (!exists) {
                        self.orders.unshift({
                            id: data.id,
                            items: data.items,
                            subtotal: data.subtotal,
                            tax: data.tax,
                            total: data.total,
                            channel: data.channel || '\u0645\u062d\u0644',
                            paymentMethod: data.paymentMethod || '\u0643\u0627\u0634',
                            date: data.date,
                            source: data.source || 'menu'
                        });
                        self.saveOrders();
                        self.renderOrdersTable();
                        self.renderDashboard();
                        self.showToast('\u0637\u0644\u0628 \u062c\u062f\u064a\u062f \u0645\u0646 \u0627\u0644\u0645\u0646\u064a\u0648: ' + data.id, 'warning');
                        db.collection('orders').doc(data.id).update({ status: 'received' }).catch(function() {});
                    }
                }
            });
        }, function(err) {
            console.log('Firebase listener error:', err);
        });
    },

    setupSearch: function() {
        var self = this;
        var searchEl = document.getElementById('globalSearch');
        if (!searchEl) return;
        searchEl.addEventListener('input', function(e) {
            var query = e.target.value.trim();
            if (!query) return;
            var found = null;
            for (var i = 0; i < self.items.length; i++) {
                if (self.items[i].name.indexOf(query) !== -1 || self.items[i].barcode.indexOf(query) !== -1) { found = self.items[i]; break; }
            }
            if (found) {
                var navItems = document.querySelectorAll('.nav-item');
                for (var n = 0; n < navItems.length; n++) { navItems[n].classList.remove('active'); }
                var itemsNav = document.querySelector('[data-page="items"]');
                if (itemsNav) itemsNav.classList.add('active');
                var pages = document.querySelectorAll('.page');
                for (var p = 0; p < pages.length; p++) { pages[p].classList.remove('active'); }
                document.getElementById('page-items').classList.add('active');
                document.getElementById('categoryFilter').value = 'all';
                self.renderItemsGridFiltered(query);
            }
        });
    },

    renderItemsGridFiltered: function(query) {
        var grid = document.getElementById('itemsGrid');
        if (!grid) return;
        var filtered = [];
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].name.indexOf(query) !== -1 || this.items[i].barcode.indexOf(query) !== -1) { filtered.push(this.items[i]); }
        }
        if (filtered.length === 0) { grid.innerHTML = '<p class="empty-msg">\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0635\u0646\u0627\u0641 \u0645\u0637\u0627\u0628\u0642\u0629</p>'; return; }
        var html = '';
        for (var j = 0; j < filtered.length; j++) {
            var item = filtered[j];
            var imgStyle = '';
            if (item.image) { imgStyle = ' style="background:url(\'' + item.image + '\') center/cover;min-height:140px;"'; }
            html += '<div class="item-card">';
            html += '<div class="item-card-header"' + imgStyle + '>';
            if (!item.image) { html += '<span class="item-category-badge">' + item.category + '</span>'; }
            else { html += '<span class="item-category-badge" style="background:rgba(0,0,0,0.6);">' + item.category + '</span>'; }
            html += '<div class="item-btns">';
            html += '<button class="item-btn edit" onclick="App.editItem(\'' + item.id + '\')"><i class="fas fa-edit"></i></button>';
            html += '<button class="item-btn delete" onclick="App.deleteItem(\'' + item.id + '\')"><i class="fas fa-trash"></i></button>';
            html += '</div></div>';
            html += '<div class="item-card-body">';
            html += '<h4>' + item.name + '</h4>';
            html += '<p>' + (item.description || '\u0628\u062f\u0648\u0646 \u0648\u0635\u0641') + '</p>';
            html += '<div class="item-card-actions"><span class="item-price">' + item.price.toFixed(2) + ' \u0631.\u0633</span></div>';
            html += '<div class="item-barcode"><svg class="barcode-svg" data-barcode="' + item.barcode + '"></svg></div>';
            html += '</div></div>';
        }
        grid.innerHTML = html;
        if (typeof JsBarcode !== 'undefined') {
            var svgs = grid.querySelectorAll('.barcode-svg');
            for (var s = 0; s < svgs.length; s++) {
                try { JsBarcode(svgs[s], svgs[s].getAttribute('data-barcode'), { format: 'CODE128', width: 1.5, height: 40, displayValue: true, fontSize: 12, margin: 5 }); } catch (err) { }
            }
        }
    },

    showToast: function(message, type) {
        type = type || 'success';
        var toast = document.createElement('div');
        var bg = '#00b894';
        var fg = 'white';
        if (type === 'warning') { bg = '#fdcb6e'; fg = '#2d3436'; }
        else if (type === 'error') { bg = '#d63031'; }
        toast.style.cssText = 'position:fixed;bottom:24px;left:24px;background:' + bg + ';color:' + fg + ';padding:12px 24px;border-radius:8px;font-family:Cairo,sans-serif;font-size:0.9rem;font-weight:600;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(function() { toast.remove(); }, 300);
        }, 2500);
    }
};

document.addEventListener('DOMContentLoaded', function() { App.init(); });
