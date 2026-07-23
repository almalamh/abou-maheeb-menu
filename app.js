const App = {
    items: [],
    orders: [],
    cart: [],
    html5QrCode: null,
    scanning: false,
    paymentMethod: 'كاش',
    orderChannel: 'محل',

    init() {
        this.setupLogin();
    },

    // ── Login ──
    setupLogin() {
        const logged = sessionStorage.getItem('abou_maheeb_logged');
        if (logged) {
            this.showApp();
            return;
        }

        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('loginUser').value.trim();
            const pass = document.getElementById('loginPass').value;

            if (user === 'mm77' && pass === '1234') {
                sessionStorage.setItem('abou_maheeb_logged', '1');
                this.showApp();
            } else {
                document.getElementById('loginError').classList.add('show');
                document.getElementById('loginPass').value = '';
                setTimeout(() => document.getElementById('loginError').classList.remove('show'), 3000);
            }
        });
    },

    showApp() {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('appContainer').style.display = 'flex';

        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('abou_maheeb_logged');
            location.reload();
        });

        this.loadData();
        this.setupNavigation();
        this.setupModal();
        this.setupItems();
        this.setupBarcodeGenerator();
        this.setupBarcodeScanner();
        this.setupPOS();
        this.setupOrders();
        this.setupSearch();
        this.setDate();
        this.renderDashboard();
    },

    defaultItems: [
        { name: "برجر لحم كلاسيك", category: "برجر", price: 17.25, cost: 7, description: "برجر لحم طازج مع جبنة وخضار", sizes: "standard", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
        { name: "برجر دجاج مشوي", category: "برجر", price: 16.10, cost: 6, description: "برجر دجاج مشوي على الفحم", sizes: "standard", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500" },
        { name: "برجر دجاج مقرمش (كريسبي)", category: "برجر", price: 16.10, cost: 6, description: "برجر دجاج مقرمش بالبقسماط", sizes: "standard", image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500" },
        { name: "دبل برجر لحم", category: "برجر", price: 25.30, cost: 11, description: "طبقتين لحم مع جبنة وصلصة خاصة", sizes: "standard", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500" },
        { name: "كباب لحم", category: "مشويات", price: 23.00, cost: 10, description: "كباب لحم مشوي على الفحم", sizes: "standard", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500" },
        { name: "كباب دجاج", category: "مشويات", price: 20.70, cost: 9, description: "كباب دجاج مشوي مع بهارات", sizes: "standard", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" },
        { name: "أوصال لحم", category: "مشويات", price: 28.75, cost: 13, description: "أوصال لحم مشوية مع بهارات خاصة", sizes: "standard", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
        { name: "شيش طاووق", category: "مشويات", price: 25.30, cost: 11, description: "صدور دجاج متبلة مشوية", sizes: "standard", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500" },
        { name: "مشكل مشويات (صحن)", category: "مشويات", price: 40.25, cost: 18, description: "تشكيلة من المشويات على الفحم", sizes: "standard", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500" },
        { name: "حمص", category: "مقبلات", price: 9.20, cost: 3, description: "حمص كريمي مع زيت الزيتون", sizes: "standard", image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=500" },
        { name: "متبل", category: "مقبلات", price: 9.20, cost: 3, description: "باذنجان مشوي مع طحينة", sizes: "standard", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" },
        { name: "سلطة خضراء", category: "مقبلات", price: 8.05, cost: 2, description: "سلطة طازجة بالخضار", sizes: "standard", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
        { name: "تبولة", category: "مقبلات", price: 9.20, cost: 3, description: "تبولة لبنانية بالبقدونس", sizes: "standard", image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=500" },
        { name: "ورق عنب", category: "مقبلات", price: 11.50, cost: 4, description: "ورق عنب محشي بالأرز واللحم", sizes: "standard", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500" },
        { name: "ببسي", category: "مشروبات", price: 3.45, cost: 1, description: "بيبسي 330 مل", sizes: "standard", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500" },
        { name: "سفن أب", category: "مشروبات", price: 3.45, cost: 1, description: "سفن أب 330 مل", sizes: "standard", image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500" },
        { name: "ماء", category: "مشروبات", price: 2.30, cost: 0.5, description: "مياه معدنية 500 مل", sizes: "standard", image: "https://images.unsplash.com/photo-1561041695-d2fadf9f318c?w=500" },
        { name: "عصير برتقال طازج", category: "مشروبات", price: 9.20, cost: 3, description: "عصير برتقال طبيعي طازج", sizes: "standard", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500" },
        { name: "بطاطس مقلية", category: "أطباق جانبية", price: 8.05, cost: 2, description: "بطاطس مقلية مقرمشة", sizes: "standard", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500" },
        { name: "بطاطس بالجبن", category: "أطباق جانبية", price: 11.50, cost: 4, description: "بطاطس مقلية مع جبنة شيدر", sizes: "standard", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=500" },
        { name: "أصابع موزاريلا", category: "أطباق جانبية", price: 11.50, cost: 4, description: "أصابع موزاريلا مقرمشة", sizes: "standard", image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=500" },
        { name: "أم علي", category: "حلويات", price: 13.80, cost: 5, description: "حلوى أم علي بالقشطة والمكسرات", sizes: "standard", image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=500" },
        { name: "كنافة بالجبن", category: "حلويات", price: 17.25, cost: 6, description: "كنافة بالجبنة مع قطر الزهر", sizes: "standard", image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500" },
        { name: "كيكة الشوكولاتة", category: "حلويات", price: 11.50, cost: 4, description: "كيكة شوكولاتة طرية", sizes: "standard", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" }
    ],

    // ── localStorage (محلي) ──
    loadData() {
        this.items = JSON.parse(localStorage.getItem('abou_maheeb_items')) || [];
        this.orders = JSON.parse(localStorage.getItem('abou_maheeb_orders')) || [];

        if (this.items.length === 0) {
            this.items = this.defaultItems.map(item => ({
                ...item,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                barcode: this.generateBarcodeNumber(),
                createdAt: new Date().toISOString()
            }));
            this.saveItems();
        }
    },

    saveItems() {
        localStorage.setItem('abou_maheeb_items', JSON.stringify(this.items));
    },

    saveOrders() {
        localStorage.setItem('abou_maheeb_orders', JSON.stringify(this.orders));
    },

    // ── Navigation ──
    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                link.classList.add('active');
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById('page-' + page).classList.add('active');
                document.querySelector('.sidebar').classList.remove('open');
                if (page === 'items') this.renderItemsGrid();
                if (page === 'barcode-gen') this.renderBarcodeSelect();
                if (page === 'pos') this.renderPOSItems();
                if (page === 'dashboard') this.renderDashboard();
                if (page === 'orders') this.renderOrdersTable();
            });
        });

        document.getElementById('menuToggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });
    },

    setDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('ar-SA', options);
    },

    // ── Modal ──
    setupModal() {
        const modal = document.getElementById('itemModal');
        const form = document.getElementById('itemForm');

        document.getElementById('addItemBtn').addEventListener('click', () => {
            document.getElementById('modalTitle').textContent = 'إضافة صنف جديد';
            form.reset();
            document.getElementById('itemId').value = '';
            document.getElementById('imagePreview').style.display = 'none';
            document.getElementById('imagePlaceholder').style.display = 'block';
            document.getElementById('removeImage').style.display = 'none';
            document.getElementById('itemImage').value = '';
            modal.classList.add('active');
        });

        document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('active'));
        document.getElementById('cancelModal').addEventListener('click', () => modal.classList.remove('active'));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        document.getElementById('generateBarcodeNum').addEventListener('click', () => {
            document.getElementById('itemBarcode').value = this.generateBarcodeNumber();
        });

        // Image upload
        const uploadArea = document.getElementById('imageUploadArea');
        const fileInput = document.getElementById('itemImage');
        const preview = document.getElementById('imagePreview');
        const placeholder = document.getElementById('imagePlaceholder');
        const removeBtn = document.getElementById('removeImage');

        uploadArea.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                preview.src = ev.target.result;
                preview.style.display = 'block';
                placeholder.style.display = 'none';
                removeBtn.style.display = 'inline-flex';
            };
            reader.readAsDataURL(file);
        });

        removeBtn.addEventListener('click', () => {
            preview.src = '';
            preview.style.display = 'none';
            placeholder.style.display = 'block';
            removeBtn.style.display = 'none';
            fileInput.value = '';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveItem();
        });
    },

    generateBarcodeNumber() {
        let code;
        do {
            code = String(Math.floor(10000000 + Math.random() * 90000000));
        } while (this.items.find(i => i.barcode === code));
        return code;
    },

    saveItem() {
        const id = document.getElementById('itemId').value;
        const existingItem = id ? this.items.find(i => i.id === id) : null;
        const imgPreview = document.getElementById('imagePreview');
        const imageData = imgPreview.style.display !== 'none' ? imgPreview.src : '';

        const item = {
            id: id || Date.now().toString(),
            name: document.getElementById('itemName').value.trim(),
            category: document.getElementById('itemCategory').value,
            barcode: document.getElementById('itemBarcode').value.trim() || this.generateBarcodeNumber(),
            price: parseFloat(document.getElementById('itemPrice').value),
            cost: parseFloat(document.getElementById('itemCost').value) || 0,
            description: document.getElementById('itemDescription').value.trim(),
            sizes: document.getElementById('itemSizes').value,
            image: imageData,
            createdAt: existingItem?.createdAt || new Date().toISOString()
        };

        if (id) {
            const idx = this.items.findIndex(i => i.id === id);
            if (idx !== -1) this.items[idx] = item;
        } else {
            this.items.unshift(item);
        }

        this.saveItems();
        document.getElementById('itemModal').classList.remove('active');
        this.renderItemsGrid();
        this.showToast(id ? 'تم تحديث الصنف' : 'تم إضافة الصنف بنجاح');
    },

    // ── Items ──
    setupItems() {
        document.getElementById('categoryFilter').addEventListener('change', () => this.renderItemsGrid());
        document.getElementById('resetItemsBtn').addEventListener('click', () => {
            if (confirm('هل تريد حذف كل الأصناف وإعادة تعيين الأصناف الافتراضية؟')) {
                localStorage.removeItem('abou_maheeb_items');
                this.items = this.defaultItems.map(item => ({
                    ...item,
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    barcode: this.generateBarcodeNumber(),
                    createdAt: new Date().toISOString()
                }));
                this.saveItems();
                this.renderItemsGrid();
                this.renderDashboard();
                this.renderBarcodeSelect();
                this.renderPOSItems();
                this.showToast('تم إعادة تعيين الأصناف بنجاح', 'success');
            }
        });
    },

    renderItemsGrid() {
        const grid = document.getElementById('itemsGrid');
        const filter = document.getElementById('categoryFilter').value;
        let filtered = this.items;

        if (filter !== 'all') {
            filtered = this.items.filter(i => i.category === filter);
        }

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="empty-msg">لا توجد أصناف في هذا التصنيف</p>';
            return;
        }

        grid.innerHTML = filtered.map(item => `
            <div class="item-card">
                <div class="item-card-header" ${item.image ? `style="background:url('${item.image}') center/cover;min-height:140px;"` : ''}>
                    ${!item.image ? `<span class="item-category-badge">${item.category}</span>` : `<span class="item-category-badge" style="background:rgba(0,0,0,0.6);">${item.category}</span>`}
                    <div class="item-btns">
                        <button class="item-btn edit" onclick="App.editItem('${item.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="item-btn delete" onclick="App.deleteItem('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="item-card-body">
                    <h4>${item.name}</h4>
                    <p>${item.description || 'بدون وصف'}</p>
                    <div class="item-card-actions">
                        <span class="item-price">${item.price.toFixed(2)} ر.س</span>
                    </div>
                    ${item.sizes ? `<p style="font-size:0.75rem;color:var(--text-light);margin-top:8px;"><i class="fas fa-layer-group"></i> ${item.sizes}</p>` : ''}
                    <div class="item-barcode">
                        <svg class="barcode-svg" data-barcode="${item.barcode}"></svg>
                    </div>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.barcode-svg').forEach(svg => {
            JsBarcode(svg, svg.dataset.barcode, {
                format: 'CODE128',
                width: 1.5,
                height: 40,
                displayValue: true,
                fontSize: 12,
                margin: 5
            });
        });
    },

    editItem(id) {
        const item = this.items.find(i => i.id === id);
        if (!item) return;

        document.getElementById('modalTitle').textContent = 'تعديل الصنف';
        document.getElementById('itemId').value = item.id;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemBarcode').value = item.barcode;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemCost').value = item.cost || '';
        document.getElementById('itemDescription').value = item.description || '';
        document.getElementById('itemSizes').value = item.sizes || '';

        const imgPreview = document.getElementById('imagePreview');
        const placeholder = document.getElementById('imagePlaceholder');
        const removeBtn = document.getElementById('removeImage');

        if (item.image) {
            imgPreview.src = item.image;
            imgPreview.style.display = 'block';
            placeholder.style.display = 'none';
            removeBtn.style.display = 'inline-flex';
        } else {
            imgPreview.style.display = 'none';
            placeholder.style.display = 'block';
            removeBtn.style.display = 'none';
        }
        document.getElementById('itemImage').value = '';

        document.getElementById('itemModal').classList.add('active');
    },

    deleteItem(id) {
        if (!confirm('هل أنت متأكد من حذف هذا الصنف؟')) return;
        this.items = this.items.filter(i => i.id !== id);
        this.saveItems();
        this.renderItemsGrid();
        this.showToast('تم حذف الصنف');
    },

    // ── Barcode Generator ──
    setupBarcodeGenerator() {
        document.getElementById('printBarcodeBtn').addEventListener('click', () => this.printBarcodes());
        document.getElementById('selectAllBarcode').addEventListener('click', () => {
            document.querySelectorAll('.barcode-check').forEach(cb => cb.checked = true);
        });
    },

    renderBarcodeSelect() {
        const container = document.getElementById('barcodeItemSelect');
        const preview = document.getElementById('barcodePreview');

        if (this.items.length === 0) {
            container.innerHTML = '<p class="empty-msg">لا توجد أصناف متاحة. أضف أصنافاً أولاً</p>';
            preview.innerHTML = '';
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="barcode-item-row">
                <input type="checkbox" class="barcode-check" value="${item.id}" id="bc-${item.id}">
                <label for="bc-${item.id}">${item.name} (${item.category}) - ${item.barcode}</label>
            </div>
        `).join('');

        preview.innerHTML = '';
    },

    printBarcodes() {
        const selected = Array.from(document.querySelectorAll('.barcode-check:checked')).map(cb => cb.value);
        if (selected.length === 0) {
            this.showToast('اختر أصنافاً للطباعة', 'warning');
            return;
        }

        const preview = document.getElementById('barcodePreview');
        const itemsToPrint = this.items.filter(i => selected.includes(i.id));

        preview.innerHTML = itemsToPrint.map(item => `
            <div class="barcode-card">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} ر.س</p>
                <svg class="print-barcode" data-barcode="${item.barcode}"></svg>
            </div>
        `).join('');

        preview.querySelectorAll('.print-barcode').forEach(svg => {
            JsBarcode(svg, svg.dataset.barcode, {
                format: 'CODE128',
                width: 2,
                height: 60,
                displayValue: true,
                fontSize: 14,
                margin: 10
            });
        });

        setTimeout(() => {
            const printContent = preview.innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>باركود - أبو مهيب</title>
                    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"><\/script>
                    <style>
                        body { font-family: Arial, sans-serif; direction: rtl; padding: 20px; }
                        .barcode-card { text-align: center; padding: 15px; border: 1px dashed #ccc; margin: 10px; display: inline-block; width: 280px; }
                        .barcode-card h4 { margin: 0 0 5px 0; }
                        .barcode-card p { color: #e65100; font-weight: bold; font-size: 1.1rem; margin: 5px 0; }
                    </style>
                </head>
                <body>
                    <div id="content">${printContent}</div>
                    <script>
                        document.querySelectorAll('.print-barcode').forEach(svg => {
                            JsBarcode(svg, svg.dataset.barcode, {
                                format: 'CODE128', width: 2, height: 60,
                                displayValue: true, fontSize: 14, margin: 10
                            });
                        });
                        setTimeout(() => { window.print(); }, 500);
                    <\/script>
                </body>
                </html>
            `);
        }, 300);
    },

    // ── Barcode Scanner ──
    setupBarcodeScanner() {
        document.getElementById('startScanBtn').addEventListener('click', () => this.startScanner());
        document.getElementById('stopScanBtn').addEventListener('click', () => this.stopScanner());
        document.getElementById('manualSearchBtn').addEventListener('click', () => {
            const code = document.getElementById('manualBarcode').value.trim();
            if (code) this.lookupBarcode(code);
        });
        document.getElementById('manualBarcode').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const code = e.target.value.trim();
                if (code) this.lookupBarcode(code);
            }
        });
    },

    startScanner() {
        document.getElementById('startScanBtn').style.display = 'none';
        document.getElementById('stopScanBtn').style.display = 'inline-flex';

        this.html5QrCode = new Html5Qrcode('qr-reader');
        this.scanning = true;

        this.html5QrCode.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 250, height: 150 } },
            (decodedText) => {
                if (this.scanning) {
                    this.lookupBarcode(decodedText);
                    this.stopScanner();
                }
            },
            () => {}
        ).catch(() => {
            document.getElementById('qr-reader').innerHTML = '<p style="color:white;padding:40px;">لا يمكن الوصول للكاميرا. استخدم البحث اليدوي</p>';
            document.getElementById('startScanBtn').style.display = 'inline-flex';
            document.getElementById('stopScanBtn').style.display = 'none';
        });
    },

    stopScanner() {
        this.scanning = false;
        if (this.html5QrCode) {
            this.html5QrCode.stop().then(() => {
                this.html5QrCode.clear();
                document.getElementById('startScanBtn').style.display = 'inline-flex';
                document.getElementById('stopScanBtn').style.display = 'none';
            }).catch(() => {});
        }
    },

    lookupBarcode(code) {
        const item = this.items.find(i => i.barcode === code);
        const info = document.getElementById('scannedItemInfo');

        if (!item) {
            info.innerHTML = `
                <div style="text-align:center;padding:20px;color:var(--danger);">
                    <i class="fas fa-times-circle" style="font-size:2rem;"></i>
                    <p style="margin-top:10px;">لم يتم العثور على صنف بالباركود: ${code}</p>
                </div>
            `;
            return;
        }

        info.innerHTML = `
            <div class="scan-item-detail"><strong>الاسم:</strong> <span>${item.name}</span></div>
            <div class="scan-item-detail"><strong>التصنيف:</strong> <span>${item.category}</span></div>
            <div class="scan-item-detail"><strong>السعر:</strong> <span style="color:var(--primary);font-weight:800;">${item.price.toFixed(2)} ر.س</span></div>
            <div class="scan-item-detail"><strong>الباركود:</strong> <span>${item.barcode}</span></div>
            ${item.description ? `<div class="scan-item-detail"><strong>الوصف:</strong> <span>${item.description}</span></div>` : ''}
            ${item.sizes ? `<div class="scan-item-detail"><strong>الأحجام:</strong> <span>${item.sizes}</span></div>` : ''}
        `;
    },

    // ── POS ──
    setupPOS() {
        document.getElementById('posSearch').addEventListener('input', (e) => this.renderPOSItems(e.target.value));
        document.querySelectorAll('.pos-cat').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.pos-cat').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderPOSItems(document.getElementById('posSearch').value);
            });
        });
        document.getElementById('clearCart').addEventListener('click', () => this.clearCart());
        document.getElementById('completeOrder').addEventListener('click', () => this.completeOrder());
    },

    renderPOSItems(search = '') {
        const grid = document.getElementById('posItemsGrid');
        const activeCat = document.querySelector('.pos-cat.active')?.dataset.cat || 'all';

        let filtered = this.items;
        if (activeCat !== 'all') {
            filtered = filtered.filter(i => i.category === activeCat);
        }
        if (search) {
            filtered = filtered.filter(i => i.name.includes(search) || i.barcode.includes(search));
        }

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="empty-msg">لا توجد أصناف</p>';
            return;
        }

        const icons = { 'برجر': 'fa-burger', 'مشويات': 'fa-fire', 'مقبلات': 'fa-cookie-bite', 'مشروبات': 'fa-glass-water', 'أطباق جانبية': 'fa-bowl-food', 'حلويات': 'fa-ice-cream' };

        grid.innerHTML = filtered.map(item => `
            <div class="pos-item" onclick="App.addToCart('${item.id}')">
                ${item.image ? `<img src="${item.image}" class="pos-item-img" alt="${item.name}">` : `<div class="pos-item-icon"><i class="fas ${icons[item.category] || 'fa-utensils'}"></i></div>`}
                <h4>${item.name}</h4>
                <div class="pos-item-price">${item.price.toFixed(2)} ر.س</div>
            </div>
        `).join('');
    },

    addToCart(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        const existing = this.cart.find(c => c.id === itemId);
        if (existing) {
            existing.qty++;
        } else {
            this.cart.push({ ...item, qty: 1 });
        }
        this.renderCart();
        this.showToast(`تمت إضافة ${item.name}`);
    },

    renderCart() {
        const container = document.getElementById('cartItems');

        if (this.cart.length === 0) {
            container.innerHTML = '<p class="empty-msg">السلة فارغة</p>';
        } else {
            container.innerHTML = this.cart.map((item, idx) => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.price.toFixed(2)} ر.س</p>
                    </div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="App.updateQty(${idx}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="App.updateQty(${idx}, 1)">+</button>
                    </div>
                    <span class="cart-item-price">${(item.price * item.qty).toFixed(2)} ر.س</span>
                </div>
            `).join('');
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const subtotal = total / 1.15;
        const tax = total - subtotal;

        document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2) + ' ر.س';
        document.getElementById('cartTax').textContent = tax.toFixed(2) + ' ر.س';
        document.getElementById('cartTotal').textContent = total.toFixed(2) + ' ر.س';
    },

    updateQty(idx, delta) {
        this.cart[idx].qty += delta;
        if (this.cart[idx].qty <= 0) {
            this.cart.splice(idx, 1);
        }
        this.renderCart();
    },

    clearCart() {
        this.cart = [];
        this.renderCart();
    },

    setPaymentMethod(method, btn) {
        this.paymentMethod = method;
        document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    },

    setChannel(channel, btn) {
        this.orderChannel = channel;
        document.querySelectorAll('.channel-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    },

    completeOrder() {
        if (this.cart.length === 0) {
            this.showToast('السلة فارغة!', 'warning');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const subtotal = total / 1.15;
        const tax = total - subtotal;

        const order = {
            id: 'ORD-' + Date.now().toString(36).toUpperCase(),
            items: [...this.cart],
            subtotal,
            tax,
            total,
            paymentMethod: this.paymentMethod,
            channel: this.orderChannel,
            date: new Date().toISOString(),
            status: 'completed'
        };

        this.orders.unshift(order);
        this.saveOrders();
        this.showReceipt(order);
        this.cart = [];
        this.renderCart();
        this.showToast('تم إتمام الطلب بنجاح!');
    },

    receiptLogo: `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style="width:100px;height:100px;margin:0 auto 8px;display:block;">
        <defs>
            <linearGradient id="rf" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#bf360c"/><stop offset="50%" stop-color="#e65100"/><stop offset="100%" stop-color="#ff9e40"/></linearGradient>
            <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff9e40"/><stop offset="100%" stop-color="#ffd54f"/></linearGradient>
            <linearGradient id="rd" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0f0f23"/></linearGradient>
        </defs>
        <circle cx="120" cy="120" r="115" fill="none" stroke="url(#rg)" stroke-width="3"/>
        <circle cx="120" cy="120" r="108" fill="url(#rd)"/>
        <circle cx="120" cy="120" r="100" fill="none" stroke="url(#rg)" stroke-width="1.5" opacity="0.4"/>
        <path id="rt" d="M 35 120 A 85 85 0 0 1 205 120" fill="none"/>
        <text fill="url(#rg)" font-family="Cairo,Arial,sans-serif" font-size="22" font-weight="800" letter-spacing="4"><textPath href="#rt" startOffset="50%" text-anchor="middle">أبو مهيب</textPath></text>
        <path id="rb" d="M 35 125 A 85 85 0 0 0 205 125" fill="none"/>
        <text fill="url(#rg)" font-family="Cairo,Arial,sans-serif" font-size="13" font-weight="600" letter-spacing="2" opacity="0.7"><textPath href="#rb" startOffset="50%" text-anchor="middle">برجر ومشويات</textPath></text>
        <circle cx="32" cy="122" r="3.5" fill="url(#rg)" opacity="0.8"/><circle cx="208" cy="122" r="3.5" fill="url(#rg)" opacity="0.8"/>
        <g transform="translate(120,105)">
            <path d="M0,-35 C-5,-25 -28,0 -28,20 C-28,33 -16,42 0,45 C16,42 28,33 28,20 C28,0 5,-25 0,-35 Z" fill="url(#rf)"/>
            <path d="M0,-15 C-3,-8 -16,5 -16,17 C-16,26 -9,31 0,33 C9,31 16,26 16,17 C16,5 3,-8 0,-15 Z" fill="#ffcc80" opacity="0.7"/>
            <path d="M0,0 C-2,5 -8,12 -8,20 C-8,26 -4,29 0,30 C4,29 8,26 8,20 C8,12 2,5 0,0 Z" fill="#fff3e0" opacity="0.8"/>
        </g>
        <line x1="75" y1="158" x2="165" y2="158" stroke="url(#rg)" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <line x1="80" y1="165" x2="160" y2="165" stroke="url(#rg)" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
        <line x1="85" y1="172" x2="155" y2="172" stroke="url(#rg)" stroke-width="2" stroke-linecap="round" opacity="0.2"/>
    </svg>`,

    showReceipt(order) {
        const modal = document.getElementById('receiptModal');
        const content = document.getElementById('receiptContent');

        const now = new Date(order.date);
        const dateStr = now.toLocaleDateString('ar-SA');
        const timeStr = now.toLocaleTimeString('ar-SA');

        content.innerHTML = `
            ${this.receiptLogo}
            <h2>أبو مهيب</h2>
            <p>برجر ومشويات</p>
            <p>${dateStr} - ${timeStr}</p>
            <p style="margin-top:8px;font-weight:bold;">رقم الطلب: ${order.id}</p>
            <p><i class="fas fa-store"></i> القناة: ${order.channel || 'محل'}</p>
            <p><i class="fas fa-credit-card"></i> الدفع: ${order.paymentMethod || 'كاش'}</p>
            <hr style="border:1px dashed #ccc;margin:12px 0;">
            <div class="receipt-items">
                ${order.items.map(item => `
                    <div class="receipt-item">
                        <span>${item.name} x${item.qty}</span>
                        <span>${(item.price * item.qty).toFixed(2)} ر.س</span>
                    </div>
                `).join('')}
            </div>
            <div class="receipt-item">
                <span>المجموع الفرعي</span>
                <span>${order.subtotal.toFixed(2)} ر.س</span>
            </div>
            <div class="receipt-item">
                <span>الضريبة (15%)</span>
                <span>${order.tax.toFixed(2)} ر.س</span>
            </div>
            <div class="receipt-total">
                <span>الإجمالي</span>
                <span>${order.total.toFixed(2)} ر.س</span>
            </div>
            <hr style="border:1px dashed #ccc;margin:12px 0;">
           <div style="text-align: center; margin-top: 15px;">
  <p style="margin-bottom: 8px; font-weight: bold;">شكراً لزيارتكم!</p>
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://almalamh.github.io/abou-maheeb-menu/" alt="QR" style="width: 150px; height: 150px; margin: 8px auto; display: block;" />
  <p style="font-size: 13px; color: #555; margin-top: 5px;">امسح الكود لعرض القائمة</p>
</div>
        `;

        modal.classList.add('active');

        document.getElementById('closeReceipt').onclick = () => modal.classList.remove('active');
        document.getElementById('printReceipt').onclick = () => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head><title>فاتورة - أبو مهيب</title>
                <style>
                    body { font-family: Arial; direction: rtl; text-align: center; padding: 20px; }
                    .receipt-item { display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px dotted #ccc; }
                    .total { font-weight:bold; font-size:1.2rem; border-top:2px solid #000; margin-top:8px; padding-top:8px; }
                </style>
                </head>
                <body>
                    ${this.receiptLogo}
                    <h2>أبو مهيب</h2>
                    <p>برجر ومشويات</p>
                    <p>${dateStr} - ${timeStr}</p>
                    <p><strong>${order.id}</strong></p>
                    <p>القناة: ${order.channel || 'محل'} | الدفع: ${order.paymentMethod || 'كاش'}</p>
                    <hr>
                    ${order.items.map(item => `<div class="receipt-item"><span>${item.name} x${item.qty}</span><span>${(item.price * item.qty).toFixed(2)} ر.س</span></div>`).join('')}
                    <div class="receipt-item"><span>المجموع الفرعي</span><span>${order.subtotal.toFixed(2)} ر.س</span></div>
                    <div class="receipt-item"><span>الضريبة</span><span>${order.tax.toFixed(2)} ر.س</span></div>
                    <div class="receipt-item total"><span>الإجمالي</span><span>${order.total.toFixed(2)} ر.س</span></div>
                    <hr>
                    <p>شكراً لزيارتكم!</p>
                    <script>window.onload=function(){window.print();}<\/script>
                </body>
                </html>
            `);
        };
    },

    // ── Orders ──
    setupOrders() {
        document.getElementById('clearOrders').addEventListener('click', () => {
            if (confirm('هل أنت متأكد من مسح جميع الطلبات؟')) {
                this.orders = [];
                this.saveOrders();
                this.renderOrdersTable();
                this.showToast('تم مسح سجل الطلبات');
            }
        });
    },

    renderOrdersTable() {
        const tbody = document.getElementById('ordersBody');
        const noMsg = document.getElementById('noOrdersMsg');

        if (this.orders.length === 0) {
            tbody.innerHTML = '';
            noMsg.style.display = 'block';
            return;
        }

        noMsg.style.display = 'none';
        tbody.innerHTML = this.orders.map(order => {
            const date = new Date(order.date);
            const dateStr = date.toLocaleDateString('ar-SA') + ' ' + date.toLocaleTimeString('ar-SA');
            const itemsStr = order.items.map(i => `${i.name} x${i.qty}`).join(', ');

            return `
                <tr>
                    <td><strong>${order.id}</strong></td>
                    <td>${dateStr}</td>
                    <td>${itemsStr}</td>
                    <td><span class="status-badge ${order.channel === 'هنجرستيشن' ? 'hunger' : 'dine-in'}">${order.channel || 'محل'}</span></td>
                    <td><span class="status-badge ${order.paymentMethod === 'شبكة' ? 'network' : 'cash'}">${order.paymentMethod || 'كاش'}</span></td>
                    <td><strong style="color:var(--primary);">${order.total.toFixed(2)} ر.س</strong></td>
                    <td><span class="status-badge completed">مكتمل</span></td>
                    <td><button class="item-btn delete" onclick="App.deleteOrder('${order.id}')"><i class="fas fa-trash"></i></button></td>
                </tr>
            `;
        }).join('');
    },

    deleteOrder(id) {
        if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;
        this.orders = this.orders.filter(o => o.id !== id);
        this.saveOrders();
        this.renderOrdersTable();
        this.showToast('تم حذف الطلب');
    },

    // ── Dashboard ──
    renderDashboard() {
        document.getElementById('totalItems').textContent = this.items.length;
        document.getElementById('totalBurgers').textContent = this.items.filter(i => i.category === 'برجر').length;
        document.getElementById('totalGrill').textContent = this.items.filter(i => i.category === 'مشويات').length;
        document.getElementById('totalOrders').textContent = this.orders.length;

        // Revenue & Avg
        const totalRev = this.orders.reduce((s, o) => s + o.total, 0);
        const avgOrd = this.orders.length > 0 ? totalRev / this.orders.length : 0;
        document.getElementById('totalRevenue').textContent = totalRev.toFixed(2) + ' ر.س';
        document.getElementById('avgOrder').textContent = avgOrd.toFixed(2) + ' ر.س';

        // Recent Orders
        const recentOrders = document.getElementById('recentOrders');
        if (this.orders.length === 0) {
            recentOrders.innerHTML = '<p class="empty-msg">لا توجد طلبات بعد</p>';
        } else {
            recentOrders.innerHTML = this.orders.slice(0, 5).map(order => {
                const date = new Date(order.date);
                return `
                    <div class="order-item">
                        <div>
                            <strong>${order.id}</strong>
                            <p style="font-size:0.75rem;color:var(--text-light);">${date.toLocaleTimeString('ar-SA')}</p>
                        </div>
                        <strong style="color:var(--primary);">${order.total.toFixed(2)} ر.س</strong>
                    </div>
                `;
            }).join('');
        }

        // Top Items
        const topItems = document.getElementById('topItems');
        const itemCounts = {};
        this.orders.forEach(order => {
            order.items.forEach(item => {
                if (!itemCounts[item.name]) itemCounts[item.name] = 0;
                itemCounts[item.name] += item.qty;
            });
        });
        const sorted = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

        if (sorted.length === 0) {
            topItems.innerHTML = '<p class="empty-msg">لا توجد بيانات بعد</p>';
        } else {
            const maxCount = sorted[0][1];
            topItems.innerHTML = sorted.map(([name, count], idx) => {
                const pct = (count / maxCount) * 100;
                return `
                    <div class="order-item" style="flex-direction:column;align-items:stretch;gap:6px;">
                        <div style="display:flex;justify-content:space-between;">
                            <strong style="font-size:0.85rem;">${idx + 1}. ${name}</strong>
                            <span style="background:var(--primary);color:white;padding:2px 10px;border-radius:12px;font-size:0.75rem;font-weight:600;">${count} مرة</span>
                        </div>
                        <div style="width:100%;height:5px;background:var(--border);border-radius:3px;overflow:hidden;">
                            <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,var(--primary),var(--primary-light));border-radius:3px;"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Categories
        const catStats = document.getElementById('categoryStats');
        const catColors = {
            'برجر': '#e65100',
            'مشويات': '#d63031',
            'مقبلات': '#f39c12',
            'مشروبات': '#0984e3',
            'أطباق جانبية': '#00b894',
            'حلويات': '#e84393'
        };
        const catIcons = {
            'برجر': 'fa-burger',
            'مشويات': 'fa-fire',
            'مقبلات': 'fa-cookie-bite',
            'مشروبات': 'fa-glass-water',
            'أطباق جانبية': 'fa-bowl-food',
            'حلويات': 'fa-ice-cream'
        };

        const catCounts = {};
        this.items.forEach(item => {
            if (!catCounts[item.category]) catCounts[item.category] = 0;
            catCounts[item.category]++;
        });

        const totalItems = this.items.length || 1;
        const catEntries = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);

        if (catEntries.length === 0) {
            catStats.innerHTML = '<p class="empty-msg">لا توجد أصناف</p>';
        } else {
            catStats.innerHTML = catEntries.map(([cat, count]) => {
                const pct = (count / totalItems) * 100;
                const color = catColors[cat] || '#636e72';
                const icon = catIcons[cat] || 'fa-utensils';
                return `
                    <div class="cat-stat-row">
                        <div class="cat-stat-icon" style="background:${color};"><i class="fas ${icon}"></i></div>
                        <div class="cat-stat-info">
                            <div class="cat-stat-name">${cat}</div>
                            <div class="cat-stat-bar">
                                <div class="cat-stat-bar-fill" style="width:${pct}%;background:${color};"></div>
                            </div>
                        </div>
                        <span class="cat-stat-count">${count}</span>
                    </div>
                `;
            }).join('');
        }
    },

    // ── Search ──
    setupSearch() {
        document.getElementById('globalSearch').addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) return;

            const found = this.items.find(i =>
                i.name.toLowerCase().includes(query) ||
                i.barcode.includes(query)
            );

            if (found) {
                document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                document.querySelector('[data-page="items"]').classList.add('active');
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById('page-items').classList.add('active');
                document.getElementById('categoryFilter').value = 'all';
                this.renderItemsGrid();
            }
        });
    },

    // ── Toast ──
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 24px;
            background: ${type === 'warning' ? '#fdcb6e' : type === 'error' ? '#d63031' : '#00b894'};
            color: ${type === 'warning' ? '#2d3436' : 'white'};
            padding: 12px 24px;
            border-radius: 8px;
            font-family: 'Cairo', sans-serif;
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 9999;
            animation: toastIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
};
// توليد باركود المنيو داخل الفاتورة
const menuUrl = "https://almalamh.github.io/abou-maheeb-menu/";
const qrContainer = document.getElementById("receiptQR");

if (qrContainer) {
  qrContainer.innerHTML = "";
  if (typeof QRCode !== "undefined") {
    new QRCode(qrContainer, {
      text: menuUrl,
      width: 160,
      height: 160
    });
  } else if (typeof generateQRCanvas === "function") {
    generateQRCanvas(qrContainer, menuUrl, 160);
  }
}
document.addEventListener('DOMContentLoaded', () => App.init());
