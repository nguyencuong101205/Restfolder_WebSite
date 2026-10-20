import test, { describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'http://localhost:5000/api';

describe('🏮 HOÀNG LONG QUÁN - REST API TEST SUITE', () => {
  let adminToken = '';
  let kitchenToken = '';
  let waiterToken = '';
  let createdDishId = '';
  let createdOrderId = '';

  before(async () => {
    // Ensure server is reachable before running tests
    try {
      const res = await fetch(`${BASE_URL}`);
      assert.equal(res.status, 200, 'Server should respond on /api');
    } catch (err) {
      throw new Error(`Cannot connect to Express server at ${BASE_URL}. Ensure server is running! Error: ${err.message}`);
    }
  });

  // ========================================================
  // 1. ROOT API & HEALTH
  // ========================================================
  describe('1. Root & Health Check', () => {
    test('GET /api - returns welcome message and endpoint index', async () => {
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
      assert.ok(data.message.includes('Hoàng Long Quán') || data.message.includes('API'));
      assert.ok(data.endpoints.menu);
      assert.ok(data.endpoints.orders);
    });
  });

  // ========================================================
  // 2. AUTHENTICATION & JWT
  // ========================================================
  describe('2. Authentication API (/api/auth)', () => {
    test('POST /api/auth/login - rejects missing credentials', async () => {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await res.json();
      assert.equal(res.status, 400);
      assert.equal(data.success, false);
    });

    test('POST /api/auth/login - rejects invalid credentials', async () => {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'wrongpassword' })
      });
      const data = await res.json();
      assert.equal(res.status, 401);
      assert.equal(data.success, false);
    });

    test('POST /api/auth/login - logs in admin successfully & returns JWT', async () => {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' })
      });
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
      assert.ok(data.data.token, 'Must return JWT token');
      assert.equal(data.data.user.role, 'admin');
      adminToken = data.data.token;
    });

    test('POST /api/auth/login - logs in kitchen chef & waiter', async () => {
      const resKitchen = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'bep', password: 'bep123' })
      });
      const dataKitchen = await resKitchen.json();
      assert.equal(resKitchen.status, 200);
      assert.equal(dataKitchen.data.user.role, 'kitchen');
      kitchenToken = dataKitchen.data.token;

      const resWaiter = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'phucvu', password: 'phucvu123' })
      });
      const dataWaiter = await resWaiter.json();
      assert.equal(resWaiter.status, 200);
      assert.equal(dataWaiter.data.user.role, 'waiter');
      waiterToken = dataWaiter.data.token;
    });

    test('GET /api/auth/me - returns user profile with valid Bearer token', async () => {
      const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
      assert.equal(data.data.user.username, 'admin');
    });

    test('GET /api/auth/me - rejects request when Bearer token is missing', async () => {
      const res = await fetch(`${BASE_URL}/auth/me`);
      const data = await res.json();
      assert.equal(res.status, 401);
      assert.equal(data.success, false);
    });

    test('GET /api/auth/demo-accounts - returns list of pre-configured staff accounts', async () => {
      const res = await fetch(`${BASE_URL}/auth/demo-accounts`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.data));
      assert.ok(data.data.length >= 3);
    });
  });

  // ========================================================
  // 3. MENU & DISHES
  // ========================================================
  describe('3. Menu & Dishes API (/api/menu)', () => {
    test('GET /api/menu - returns all dishes with valid structure', async () => {
      const res = await fetch(`${BASE_URL}/menu`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.data));
      assert.ok(data.data.length > 0);

      // Verify Vietnamese UTF-8 encoding on first dish
      const firstDish = data.data[0];
      assert.ok(firstDish.id);
      assert.ok(firstDish.name);
      assert.ok(typeof firstDish.price === 'number');
    });

    test('GET /api/menu?category=dimsum - filters dishes by category', async () => {
      const res = await fetch(`${BASE_URL}/menu?category=dimsum`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.ok(data.data.every(d => d.category === 'dimsum'));
    });

    test('GET /api/menu?search=vịt - searches dishes by keyword', async () => {
      const res = await fetch(`${BASE_URL}/menu?search=vịt`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.ok(data.data.length > 0);
      assert.ok(data.data.some(d => d.name.toLowerCase().includes('vịt')));
    });

    test('GET /api/menu/:id - returns dish detail for existing dish', async () => {
      const res = await fetch(`${BASE_URL}/menu/dish-01`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.data.id, 'dish-01');
      assert.equal(data.data.name, 'Há Cảo Thủy Tinh Tôm Tươi');
    });

    test('GET /api/menu/:id - returns 404 for non-existent dish', async () => {
      const res = await fetch(`${BASE_URL}/menu/dish-non-existent-999`);
      const data = await res.json();
      assert.equal(res.status, 404);
      assert.equal(data.success, false);
    });

    test('POST /api/menu - allows admin to create a new imperial dish', async () => {
      const newDish = {
        name: 'Mì Trộn Xá Xíu Quảng Đông Thượng Hạng',
        hanzi: '廣式叉燒撈麵',
        pinyin: 'Guǎngshì Chāshāo Lāomiàn',
        category: 'noodles',
        price: 85000,
        description: 'Mì trứng tươi kéo tay sợi vàng óng, ăn cùng xá xíu mật ong nướng lò than.',
        isSpicy: false,
        isBestSeller: true,
        toppings: ['Thêm xá xíu mật ong', 'Trứng lòng đào']
      };

      const res = await fetch(`${BASE_URL}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(newDish)
      });
      const data = await res.json();
      assert.equal(res.status, 201);
      assert.equal(data.success, true);
      assert.ok(data.data.id);
      assert.equal(data.data.name, newDish.name);
      createdDishId = data.data.id;
    });

    test('PUT /api/menu/:id - allows admin to update a dish', async () => {
      const res = await fetch(`${BASE_URL}/menu/${createdDishId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ price: 92000, description: 'Cập nhật giá và khẩu vị mới.' })
      });
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.data.price, 92000);
    });

    test('DELETE /api/menu/:id - allows admin to remove the temporary dish', async () => {
      const res = await fetch(`${BASE_URL}/menu/${createdDishId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
    });
  });

  // ========================================================
  // 4. TABLES & QR CODES
  // ========================================================
  describe('4. Tables & QR Code API (/api/tables)', () => {
    test('GET /api/tables - returns list of tables and statuses', async () => {
      const res = await fetch(`${BASE_URL}/tables`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.data));
      assert.ok(data.data.length >= 8);
    });

    test('GET /api/tables/:tableNumber/qr - generates QR Code data URL for table', async () => {
      const res = await fetch(`${BASE_URL}/tables/01/qr`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
      const qr = data.data.qrDataUrl || data.data.qrCode;
      assert.ok(qr.startsWith('data:image/png;base64,'));
    });

    test('GET /api/tables/all/with-qr - generates QR codes for all tables', async () => {
      const res = await fetch(`${BASE_URL}/tables/all/with-qr`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.ok(data.data.every(t => (t.qrDataUrl || t.qrCode) && (t.qrDataUrl || t.qrCode).startsWith('data:image/png;base64,')));
    });
  });

  // ========================================================
  // 5. ORDERS & KITCHEN KDS
  // ========================================================
  describe('5. Orders & Kitchen Workflow (/api/orders)', () => {
    test('POST /api/orders - rejects order without tableNumber', async () => {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: 'dish-01', quantity: 1 }] })
      });
      const data = await res.json();
      assert.equal(res.status, 400);
      assert.equal(data.success, false);
    });

    test('POST /api/orders - customer places an order with canonical enrichment & 8% VAT', async () => {
      const orderPayload = {
        tableNumber: '02',
        customerName: 'Khách Bàn 02',
        items: [
          {
            id: 'dish-01',
            quantity: 2,
            spiceLevel: 'Không cay',
            selectedToppings: [{ name: 'Thêm nước sốt sa tế đặc biệt', price: 10000 }],
            note: 'Hấp thật nóng'
          },
          {
            id: 'dish-15',
            quantity: 1,
            spiceLevel: 'Không cay',
            selectedToppings: [],
            note: 'Mang ấm trà lên trước'
          }
        ],
        note: 'Ưu tiên chuẩn bị nhanh giúp tôi'
      };

      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      assert.equal(res.status, 201);
      assert.equal(data.success, true);
      assert.ok(data.data.id);
      assert.equal(data.data.tableNumber, '02');

      // Check item 1 enrichment
      const item1 = data.data.items[0];
      assert.equal(item1.name, 'Há Cảo Thủy Tinh Tôm Tươi');
      assert.equal(item1.price, 68000);
      assert.equal(item1.quantity, 2);

      // Check item 2 enrichment
      const item2 = data.data.items[1];
      assert.equal(item2.name, 'Trà Long Tỉnh Tây Hồ Thượng Hạng (Ấm)');
      assert.equal(item2.price, 75000);

      // Check totals: (68000 + 10000)*2 + 75000 = 156000 + 75000 = 231000
      assert.equal(data.data.subTotal, 231000);
      // VAT 8%: 231000 * 0.08 = 18480
      assert.equal(data.data.vat, 18480);
      // Total: 231000 + 18480 = 249480
      assert.equal(data.data.totalPrice, 249480);
      assert.equal(data.data.status, 'pending');

      createdOrderId = data.data.id;
    });

    test('GET /api/orders/table/:num/active - retrieves active order for customer live tracker', async () => {
      const res = await fetch(`${BASE_URL}/orders/table/02/active`);
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
      assert.equal(data.data.id, createdOrderId);
    });

    test('PATCH /api/orders/:id/status - kitchen chef accepts and marks order as preparing', async () => {
      const res = await fetch(`${BASE_URL}/orders/${createdOrderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${kitchenToken}`
        },
        body: JSON.stringify({ status: 'preparing' })
      });
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.data.status, 'preparing');
    });

    test('POST /api/orders/:id/call-staff - customer rings waiter bell for ice water', async () => {
      const res = await fetch(`${BASE_URL}/orders/${createdOrderId}/call-staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          requestType: 'Xin thêm nước đá',
          note: 'Cho 2 ly nước đá đầy'
        })
      });
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.success, true);
      assert.ok(data.data.callStaffRequests.length > 0);
      const latestReq = data.data.callStaffRequests[data.data.callStaffRequests.length - 1];
      assert.equal(latestReq.requestType, 'Xin thêm nước đá');
    });

    test('GET /api/orders - kitchen retrieves all orders and finds table 02 order', async () => {
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${kitchenToken}` }
      });
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.ok(Array.isArray(data.data));
      const found = data.data.find(o => o.id === createdOrderId);
      assert.ok(found, 'Created order must be visible to kitchen staff');
      assert.equal(found.status, 'preparing');
    });

    test('PATCH /api/orders/:id/status - completes order', async () => {
      const res = await fetch(`${BASE_URL}/orders/${createdOrderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${kitchenToken}`
        },
        body: JSON.stringify({ status: 'completed' })
      });
      const data = await res.json();
      assert.equal(res.status, 200);
      assert.equal(data.data.status, 'completed');
    });
  });

  after(async () => {
    try {
      if (createdOrderId) {
        const ordersFile = path.join(process.cwd(), 'server', 'data', 'orders.json');
        const data = await fs.readFile(ordersFile, 'utf-8');
        const orders = JSON.parse(data);
        const cleaned = orders.filter(o => o.id !== createdOrderId);
        await fs.writeFile(ordersFile, JSON.stringify(cleaned, null, 2), 'utf-8');

        const tablesFile = path.join(process.cwd(), 'server', 'data', 'tables.json');
        const tblData = await fs.readFile(tablesFile, 'utf-8');
        const tables = JSON.parse(tblData);
        const tblIdx = tables.findIndex(t => t.tableNumber === '02');
        if (tblIdx !== -1) {
          tables[tblIdx].status = 'available';
          tables[tblIdx].currentOrderId = null;
          await fs.writeFile(tablesFile, JSON.stringify(tables, null, 2), 'utf-8');
        }
      }
    } catch {}
  });
});
