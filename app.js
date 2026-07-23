const App = {
    // ── البيانات الأولية ──
    items: JSON.parse(localStorage.getItem('app_items')) || [],
    orders: JSON.parse(localStorage.getItem('app_orders')) || [],
    categories: ['وجبات رئيسية', 'مقبلات', 'مشروبات', 'حلويات'],
    cart: [],
    receiptLogo: '',

    // ── التهيئة ──
    init() {
        this.setupNavigation();
        this.setupItemsManagement();
        this.setupPOS();
        this.setupOrders();
        this.setupSearch();
        this.renderDashboard();
        this.renderItemsTable();
        this.renderPOSCategories();
        this.renderPOSItems();
    },

    // ── التنقل بين الصفحات ──
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');

                navLinks.forEach(l => l.classList.remove('active'));
                pages.forEach(p => p.classList.remove('active'));

                link.classList.add('active');
                document.getElementById(`page-${targetPage}`).classList.add('active');

                if (targetPage === 'dashboard') this.renderDashboard();
                if (targetPage === 'orders') this.renderOrdersTable();
            });
        });
    },

    // ── إدارة الأصناف ──
    setupItemsManagement() {
        const itemForm = document.getElementById('itemForm');
        if (itemForm) {
            itemForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveItem();
            });
        }
    },

    saveItem() {
        const id = document.getElementById('itemId').value || 'ITEM-' + Date.now();
        const name = document.getElementById('itemName').value;
        const category = document.getElementById('itemCategory').value;
        const price = parseFloat(document.getElementById('itemPrice').value) || 0;
        const barcode = document.getElementById('itemBarcode').value || id;
        const description = document.getElementById('itemDescription').value;

        const existingIndex = this.items.findIndex(i => i.id === id);
        const itemData = { id, name, category, price, barcode, description };

        if (existingIndex > -1) {
            this.items[existingIndex] = itemData;
            this.showToast('تم تحديث الصنف بنجاح');
        } else {
            this.items.push(itemData);
            this.showToast('تم إضافة الصنف بنجاح');
        }

        localStorage.setItem('app_items', JSON.stringify(this.items));
        this.resetItemForm();
        this.renderItemsTable();
        this.renderPOSItems();
    },

    editItem(id) {
        const item = this.items.find(i => i.id === id);
        if (!item) return;

        document.getElementById('itemId').value = item.id;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemBarcode').value = item.barcode;
        document.getElementById('itemDescription').value = item.description || '';
    },

    deleteItem(id) {
        if (confirm('هل أنت تأكد من حذف هذا الصنف؟')) {
            this.items = this.items.filter(i => i.id !== id);
            localStorage.setItem('app_items', JSON.stringify(this.items));
            this.renderItemsTable();
            this.renderPOSItems();
            this.showToast('تم حذف الصنف', 'warning');
        }
    },

    resetItemForm() {
        const itemForm = document.getElementById('itemForm');
        if (itemForm) itemForm.reset();
        document.getElementById('itemId').value = '';
    },

    renderItemsTable() {
        const tbody = document.getElementById('itemsTableBody');
        if (!tbody) return;

        if (this.items.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-msg" style="text-align:center;">لا توجد أصناف مسجلة</td></tr>';
            return;
        }

        tbody.innerHTML = this.items.map(item => `
            <tr>
                <td>${item.barcode}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.price.toFixed(2)} ر.س</td>
                <td>
                    <button class="item-btn edit" onclick="App.editItem('${item.id}')"><i class="fas fa-edit"></i></button>
                    <button class="item-btn delete" onclick="App.deleteItem('${item.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    },

    // ── نقطة البيع (POS) ──
    setupPOS() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.processCheckout());
        }
    },

    renderPOSCategories() {
        const container = document.getElementById('posCategories');
        if (!container) return;

        const categoriesHtml = ['الكل', ...this.categories].map((cat, idx) => `
            <button class="category-btn ${idx === 0 ? 'active' : ''}" onclick="App.filterPOSItems('${cat}', this)">${cat}</button>
        `).join('');

        container.innerHTML = categoriesHtml;
    },

    renderPOSItems(categoryFilter = 'الكل') {
        const container = document.getElementById('posItemsGrid');
        if (!container) return;

        const filtered = categoryFilter === 'الكل' 
            ? this.items 
            : this.items.filter(i => i.category === categoryFilter);

        if (filtered.length === 0) {
            container.innerHTML = '<p class="empty-msg">لا توجد أصناف متاحة</p>';
            return;
        }

        container.innerHTML = filtered.map(item => `
            <div class="pos-item-card" onclick="App.addToCart('${item.id}')">
                <h4>${item.name}</h4>
                <span class="price">${item.price.toFixed(2)} ر.س</span>
            </div>
        `).join('');
    },

    filterPOSItems(category, btnElement) {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        if (btnElement) btnElement.classList.add('active');
        this.renderPOSItems(category);
    },

    addToCart(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        const existingCartItem = this.cart.find(c => c.id === itemId);
        if (existingCartItem) {
            existingCartItem.qty++;
        } else {
            this.cart.push({ ...item, qty: 1 });
        }

        this.renderCart();
    },

    updateCartQty(itemId, delta) {
        const cartItem = this.cart.find(c => c.id === itemId);
        if (!cartItem) return;

        cartItem.qty += delta;
        if (cartItem.qty <= 0) {
            this.cart = this.cart.filter(c => c.id !== itemId);
        }

        this.renderCart();
    },

    renderCart() {
        const container = document.getElementById('cartItems');
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = '<p class="empty-msg">السلة فارغة</p>';
            this.updateCartTotals(0);
            return;
        }

        container.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>${item.price.toFixed(2)} ر.س</span>
                </div>
                <div class="cart-item-controls">
                    <button onclick="App.updateCartQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="App.updateCartQty('${item.id}', 1)">+</button>
                </div>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        this.updateCartTotals(total);
    },

    updateCartTotals(total) {
        const subtotal = total / 1.15;
        const tax = total - subtotal;

        const subtotalEl = document.getElementById('cartSubtotal');
        const taxEl = document.getElementById('cartTax');
        const totalEl = document.getElementById('cartTotal');

        if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2) + ' ر.س';
        if (taxEl) taxEl.textContent = tax.toFixed(2) + ' ر.س';
        if (totalEl) totalEl.textContent = total.toFixed(2) + ' ر.س';
    },

    processCheckout() {
        if (this.cart.length === 0) {
            this.showToast('السلة فارغة!', 'error');
            return;
        }

        const grandTotal = this.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        const subtotal = grandTotal / 1.15;
        const tax = grandTotal - subtotal;

        const paymentMethodEl = document.getElementById('paymentMethod');
        const orderChannelEl = document.getElementById('orderChannel');

        const order = {
            id: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            items: [...this.cart],
            subtotal: subtotal,
            tax: tax,
            total: grandTotal,
            paymentMethod: paymentMethodEl ? paymentMethodEl.value : 'نقداً',
            channel: orderChannelEl ? orderChannelEl.value : 'محلي'
        };

        this.orders.unshift(order);
        localStorage.setItem('app_orders', JSON.stringify(this.orders));

        this.showReceipt(order);
        this.cart = [];
        this.renderCart();
        this.showToast('تم إتمام الطلب بنجاح');
    },

    // ── طباعة الفاتورة ──
    showReceipt(order) {
        const printWindow = window.open('', '_blank');
        const itemsHtml = order.items.map(item => `
            <tr>
                <td style="text-align:right;">${item.name}</td>
                <td style="text-align:center;">${item.qty}</td>
                <td style="text-align:left;">${(item.price * item.qty).toFixed(2)}</td>
            </tr>
        `).join('');

        const orderDate = new Date(order.date).toLocaleString('ar-SA');

        printWindow.document.write(`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <title>فاتورة - ${order.id}</title>
                <style>
                    body { font-family: 'Courier New', Courier, monospace; width: 280px; margin: 0 auto; padding: 10px; text-align: center; color: #000; }
                    .header { margin-bottom: 10px; border-bottom: 1px dashed #000; padding-bottom: 10px; }
                    .header h2 { margin: 5px 0; font-size: 1.2rem; }
                    .info { font-size: 0.8rem; text-align: right; margin-bottom: 10px; }
                    .info div { margin-bottom: 3px; }
                    table { width: 100%; font-size: 0.85rem; border-collapse: collapse; margin-bottom: 10px; }
                    th, td { padding: 4px 0; border-bottom: 1px dotted #ccc; }
                    .totals { font-size: 0.85rem; text-align: left; border-top: 1px dashed #000; padding-top: 5px; }
                    .totals div { display: flex; justify-content: space-between; margin-bottom: 3px; }
                    .grand-total { font-weight: bold; font-size: 1rem; border-top: 1px stroke #000; padding-top: 4px; }
                    .footer { margin-top: 15px; font-size: 0.75rem; border-top: 1px dashed #000; padding-top: 10px; }
                </style>
            </head>
            <body>
                <div class="header">
                    ${this.receiptLogo}
                    <h2>مطعم أبو مهيب</h2>
                    <p style="margin:2px;font-size:0.8rem;">فاتورة ضريبية مبسطة</p>
                </div>
                <div class="info">
                    <div><strong>رقم الطلب:</strong> ${order.id}</div>
                    <div><strong>التاريخ:</strong> ${orderDate}</div>
                    <div><strong>طريقة الدفع:</strong> ${order.paymentMethod}</div>
                    <div><strong>نوع الطلب:</strong> ${order.channel}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="text-align:right;">الصنف</th>
                            <th style="text-align:center;">العدد</th>
                            <th style="text-align:left;">المجموع</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>
                <div class="totals">
                    <div><span>المبلغ الخاضع للضريبة:</span> <span>${order.subtotal.toFixed(2)} ر.س</span></div>
                    <div><span>ضريبة القيمة المضافة (15%):</span> <span>${order.tax.toFixed(2)} ر.س</span></div>
                    <div class="grand-total"><span>الإجمالي:</span> <span>${order.total.toFixed(2)} ر.س</span></div>
                </div>
                <div class="footer">
                    <p>شكراً لزيارتكم!</p>
                </div>
                <script>
                    setTimeout(() => { window.print(); window.close(); }, 500);
                <\/script>
            </body>
            </html>
        `);
    },

    // ── إدارة الطلبات ──
    setupOrders() {},

    renderOrdersTable() {
        const tbody = document.getElementById('ordersTableBody');
        if (!tbody) return;

        if (this.orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-msg" style="text-align:center;">لا توجد طلبات مسجلة</td></tr>';
            return;
        }

        tbody.innerHTML = this.orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${new Date(order.date).toLocaleString('ar-SA')}</td>
                <td>${order.channel} / ${order.paymentMethod}</td>
                <td>${order.items.map(i => `${i.name} (${i.qty})`).join(', ')}</td>
                <td><strong>${order.total.toFixed(2)} ر.س</strong></td>
                <td>
                    <button class="item-btn" onclick="App.showReceipt(App.orders.find(o => o.id === '${order.id}'))">
                        <i class="fas fa-print"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    // ── لوحة التحكم ──
    renderDashboard() {
        const totalSales = this.orders.reduce((sum, o) => sum + o.total, 0);
        const totalOrders = this.orders.length;
        const totalItemsCount = this.items.length;

        const totalSalesEl = document.getElementById('dashTotalSales');
        const totalOrdersEl = document.getElementById('dashTotalOrders');
        const totalItemsEl = document.getElementById('dashTotalItems');

        if (totalSalesEl) totalSalesEl.textContent = totalSales.toFixed(2) + ' ر.س';
        if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
        if (totalItemsEl) totalItemsEl.textContent = totalItemsCount;
    },

    // ── البحث ──
    setupSearch() {
        const searchInput = document.getElementById('globalSearch');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) return;

            if (document.getElementById('page-items').classList.contains('active')) {
                const filtered = this.items.filter(i => i.name.toLowerCase().includes(query) || i.barcode.includes(query));
                this.renderFilteredItems(filtered);
            }
        });
    },

    renderFilteredItems(filteredItems) {
        const grid = document.getElementById('itemsGrid');
        if (!grid) return;

        if (filteredItems.length === 0) {
            grid.innerHTML = '<p class="empty-msg">لا توجد نتائج تطابق البحث</p>';
            return;
        }

        grid.innerHTML = filteredItems.map(item => `
            <div class="item-card">
                <div class="item-card-header">
                    <span class="item-category-badge">${item.category}</span>
                    <div class="item-btns">
                        <button class="item-btn edit" onclick="App.editItem('${item.id}')"><i class="fas fa-edit"></i></button>
                        <button class="item-btn delete" onclick="App.deleteItem('${item.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div class="item-card-body">
                    <h4>${item.name}</h4>
                    <p>${item.description || 'بدون وصف'}</p>
                    <div class="item-card-actions">
                        <span class="item-price">${item.price.toFixed(2)} ر.س</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // ── الإشعارات ──
    showToast(message, type = 'success') {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = `
                position: fixed; bottom: 20px; right: 20px; background: #323232; color: #fff;
                padding: 12px 24px; border-radius: 8px; z-index: 9999; font-size: 0.9rem;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: opacity 0.3s ease;
            `;
            document.body.appendChild(toast);
        }

        toast.style.background = type === 'warning' ? '#e65100' : (type === 'error' ? '#c62828' : '#2e7d32');
        toast.textContent = message;
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
        }, 3000);
    }
};

// تشغيل التطبيق عند تحميل DOM
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
