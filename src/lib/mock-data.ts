// Mock data for the POS system
export const mockDashboardStats = {
  dailySales: 2547.89,
  monthlyRevenue: 55420.50,
  tableOccupancy: 25,
  totalTables: 40,
};

export const mockPopularDishes = [
  { id: 1, name: 'Spicy Noodles', orders: 250, price: 12.99, image: '/dishes/noodles.jpg', inStock: true },
  { id: 2, name: 'Grilled Salmon', orders: 180, price: 24.99, image: '/dishes/salmon.jpg', inStock: true },
  { id: 3, name: 'Caesar Salad', orders: 165, price: 8.99, image: '/dishes/salad.jpg', inStock: false },
  { id: 4, name: 'Beef Steak', orders: 142, price: 32.99, image: '/dishes/steak.jpg', inStock: true },
  { id: 5, name: 'Mushroom Risotto', orders: 128, price: 18.99, image: '/dishes/risotto.jpg', inStock: true },
];

export const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    table: 5,
    items: [
      { name: 'Spicy Noodles', qty: 2, price: 12.99 },
      { name: 'Grilled Salmon', qty: 1, price: 24.99 },
    ],
    status: 'in-progress',
    total: 50.97,
    time: '10:30 AM',
  },
  {
    id: 'ORD-002',
    customerName: 'Emma Johnson',
    table: 8,
    items: [
      { name: 'Caesar Salad', qty: 1, price: 8.99 },
      { name: 'Beef Steak', qty: 2, price: 32.99 },
    ],
    status: 'completed',
    total: 74.97,
    time: '11:15 AM',
  },
  {
    id: 'ORD-003',
    customerName: 'Michael Brown',
    table: 3,
    items: [
      { name: 'Mushroom Risotto', qty: 1, price: 18.99 },
      { name: 'Spicy Noodles', qty: 1, price: 12.99 },
    ],
    status: 'in-progress',
    total: 31.98,
    time: '12:00 PM',
  },
  {
    id: 'ORD-004',
    customerName: 'Sarah Wilson',
    table: 12,
    items: [
      { name: 'Grilled Salmon', qty: 2, price: 24.99 },
    ],
    status: 'cancelled',
    total: 49.98,
    time: '09:45 AM',
  },
];

export const mockMenuItems = [
  { id: 1, itemId: '#22314644', name: 'Chicken Parmesan', category: 'Chicken', price: 55.00, stock: 119, image: '/dishes/chicken-parm.jpg', availability: 'In Stock' },
  { id: 2, itemId: '#22314645', name: 'Roasted Chicken', category: 'Chicken', price: 55.00, stock: 45, image: '/dishes/chicken.jpg', availability: 'In Stock' },
  { id: 3, itemId: '#22314646', name: 'Grilled Salmon', category: 'Seafood', price: 24.99, stock: 22, image: '/dishes/salmon.jpg', availability: 'In Stock' },
  { id: 4, itemId: '#22314647', name: 'Caesar Salad', category: 'Appetizers', price: 8.99, stock: 0, image: '/dishes/salad.jpg', availability: 'Out of Stock' },
  { id: 5, itemId: '#22314648', name: 'Beef Steak', category: 'Main Course', price: 32.99, stock: 15, image: '/dishes/steak.jpg', availability: 'In Stock' },
  { id: 6, itemId: '#22314649', name: 'Mushroom Risotto', category: 'Main Course', price: 18.99, stock: 30, image: '/dishes/risotto.jpg', availability: 'In Stock' },
  { id: 7, itemId: '#22314650', name: 'Tom Yum Soup', category: 'Appetizers', price: 9.99, stock: 28, image: '/dishes/soup.jpg', availability: 'In Stock' },
  { id: 8, itemId: '#22314651', name: 'Chocolate Cake', category: 'Bakery', price: 7.99, stock: 12, image: '/dishes/cake.jpg', availability: 'In Stock' },
  { id: 9, itemId: '#22314652', name: 'Mojito', category: 'Beverage', price: 6.99, stock: 50, image: '/dishes/mojito.jpg', availability: 'In Stock' },
  { id: 10, itemId: '#22314653', name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, stock: 20, image: '/dishes/pizza.jpg', availability: 'In Stock' },
  { id: 11, itemId: '#22314654', name: 'Cheese Burger', category: 'Burger', price: 10.99, stock: 15, image: '/dishes/burger.jpg', availability: 'In Stock' },
];

export const mockCategories = [
  { id: 'all', name: 'All', count: 116, icon: 'LayoutGrid' },
  { id: 'pizza', name: 'Pizza', count: 20, icon: 'Pizza' },
  { id: 'burger', name: 'Burger', count: 15, icon: 'Sandwich' },
  { id: 'chicken', name: 'Chicken', count: 10, icon: 'Drumstick' },
  { id: 'bakery', name: 'Bakery', count: 18, icon: 'Cookie' },
  { id: 'beverage', name: 'Beverage', count: 12, icon: 'Coffee' },
  { id: 'seafood', name: 'Seafood', count: 16, icon: 'Fish' },
];

export const mockStaff = [
  {
    id: 1,
    staffId: '#101',
    name: 'Watson Joyce',
    role: 'Manager',
    email: 'watsonjoyce112@gmail.com',
    phone: '+1 (123) 123 4654',
    age: '45 yr',
    salary: '$2200.00',
    timings: '9am to 6pm',
    status: 'active',
    avatar: '/avatars/watson.jpg'
  },
  {
    id: 2,
    staffId: '#102',
    name: 'Alice Cooper',
    role: 'Chef',
    email: 'alicecooper@gmail.com',
    phone: '+1 (123) 456 7890',
    age: '32 yr',
    salary: '$1800.00',
    timings: '7am to 4pm',
    status: 'active',
    avatar: '/avatars/alice.jpg'
  },
  {
    id: 3,
    staffId: '#103',
    name: 'Bob Martinez',
    role: 'Waiter',
    email: 'bobmartinez@gmail.com',
    phone: '+1 (123) 111 2222',
    age: '28 yr',
    salary: '$1500.00',
    timings: '4pm to 11pm',
    status: 'active',
    avatar: '/avatars/bob.jpg'
  },
  {
    id: 4,
    staffId: '#104',
    name: 'Eva Green',
    role: 'Cashier',
    email: 'evagreen@gmail.com',
    phone: '+1 (123) 555 6666',
    age: '25 yr',
    salary: '$1600.00',
    timings: '10am to 7pm',
    status: 'active',
    avatar: '/avatars/eva.jpg'
  },
  {
    id: 5,
    staffId: '#105',
    name: 'David Lee',
    role: 'Waiter',
    email: 'davidlee@gmail.com',
    phone: '+1 (123) 777 8888',
    age: '22 yr',
    salary: '$1400.00',
    timings: '4pm to 11pm',
    status: 'active',
    avatar: '/avatars/david.jpg'
  },
  {
    id: 6,
    staffId: '#106',
    name: 'Sarah Connor',
    role: 'Chef',
    email: 'sarahconnor@gmail.com',
    phone: '+1 (123) 999 0000',
    age: '35 yr',
    salary: '$1900.00',
    timings: '7am to 4pm',
    status: 'active',
    avatar: '/avatars/sarah.jpg'
  },
  {
    id: 7,
    staffId: '#107',
    name: 'John Doe',
    role: 'Cleaner',
    email: 'johndoe@gmail.com',
    phone: '+1 (123) 000 1111',
    age: '40 yr',
    salary: '$1200.00',
    timings: '6am to 3pm',
    status: 'active',
    avatar: '/avatars/john.jpg'
  },
  {
    id: 8,
    staffId: '#108',
    name: 'Jane Smith',
    role: 'Waiter',
    email: 'janesmith@gmail.com',
    phone: '+1 (123) 222 3333',
    age: '24 yr',
    salary: '$1450.00',
    timings: '5pm to 12am',
    status: 'active',
    avatar: '/avatars/jane.jpg'
  },
];

export const mockInventory = [
  { id: 1, name: 'Fresh Salmon', category: 'Seafood', quantity: 25, unit: 'kg', status: 'in-stock', lastUpdated: '2024-12-26' },
  { id: 2, name: 'Olive Oil', category: 'Oils', quantity: 15, unit: 'bottles', status: 'in-stock', lastUpdated: '2024-12-25' },
  { id: 3, name: 'Pasta', category: 'Grains', quantity: 5, unit: 'kg', status: 'low-stock', lastUpdated: '2024-12-26' },
  { id: 4, name: 'Tomatoes', category: 'Vegetables', quantity: 0, unit: 'kg', status: 'out-of-stock', lastUpdated: '2024-12-24' },
  { id: 5, name: 'Chicken Breast', category: 'Meat', quantity: 18, unit: 'kg', status: 'in-stock', lastUpdated: '2024-12-26' },
  { id: 6, name: 'Rice', category: 'Grains', quantity: 50, unit: 'kg', status: 'in-stock', lastUpdated: '2024-12-23' },
];

export const mockTables = [
  { id: 'bar', name: 'Bar', capacity: 4 },
  { id: 'a1', name: 'A1', capacity: 2 },
  { id: 'a2', name: 'A2', capacity: 4 },
  { id: 'b1', name: 'B1', capacity: 4 },
  { id: 'b2', name: 'B2', capacity: 6 },
  { id: 'b3', name: 'B3', capacity: 2 },
  { id: 'c1', name: 'C1', capacity: 4 },
  { id: 'c2', name: 'C2', capacity: 8 },
];

export const mockReservations = [
  {
    id: 1,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'bar',
    date: '2024-02-20',
    startTime: '13:00',
    endTime: '14:30',
    status: 'confirmed',
    type: 'default' // grey
  },
  {
    id: 2,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'bar',
    date: '2024-02-20',
    startTime: '17:00',
    endTime: '18:00',
    status: 'confirmed',
    type: 'default'
  },
  {
    id: 3,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'a1',
    date: '2024-02-20',
    startTime: '18:00',
    endTime: '19:30',
    status: 'confirmed',
    type: 'new' // pink
  },
  {
    id: 4,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'a2',
    date: '2024-02-20',
    startTime: '10:00',
    endTime: '11:00',
    status: 'confirmed',
    type: 'default'
  },
  {
    id: 5,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'a2',
    date: '2024-02-20',
    startTime: '14:00',
    endTime: '15:00',
    status: 'confirmed',
    type: 'new'
  },
  {
    id: 6,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'b1',
    date: '2024-02-20',
    startTime: '10:00',
    endTime: '11:00',
    status: 'confirmed',
    type: 'default'
  },
  {
    id: 7,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'b2',
    date: '2024-02-20',
    startTime: '15:00',
    endTime: '16:30',
    status: 'confirmed',
    type: 'new'
  },
  {
    id: 8,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'b3',
    date: '2024-02-20',
    startTime: '11:00',
    endTime: '12:30',
    status: 'confirmed',
    type: 'default'
  },
  {
    id: 9,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'c1',
    date: '2024-02-20',
    startTime: '18:00',
    endTime: '19:00',
    status: 'confirmed',
    type: 'new'
  },
  {
    id: 10,
    guestName: 'John Doe',
    guests: 1,
    tableId: 'c2',
    date: '2024-02-20',
    startTime: '16:00',
    endTime: '17:30',
    status: 'confirmed',
    type: 'default'
  },
];

export const mockRevenueData = [
  { month: 'Jan', revenue: 42000, orders: 380 },
  { month: 'Feb', revenue: 38000, orders: 340 },
  { month: 'Mar', revenue: 52000, orders: 450 },
  { month: 'Apr', revenue: 48000, orders: 420 },
  { month: 'May', revenue: 55000, orders: 490 },
  { month: 'Jun', revenue: 61000, orders: 540 },
  { month: 'Jul', revenue: 58000, orders: 510 },
  { month: 'Aug', revenue: 64000, orders: 570 },
  { month: 'Sep', revenue: 59000, orders: 520 },
  { month: 'Oct', revenue: 67000, orders: 600 },
  { month: 'Nov', revenue: 72000, orders: 650 },
  { month: 'Dec', revenue: 78000, orders: 710 },
];

export const mockReservationStats = {
  total: 156,
  confirmed: 98,
  pending: 32,
  cancelled: 26,
};

export const navItems = [
  { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { name: 'Menu', href: '/menu', icon: 'UtensilsCrossed' },
  { name: 'Orders', href: '/orders', icon: 'ClipboardList' },
  { name: 'Staff', href: '/staff', icon: 'Users' },
  { name: 'Inventory', href: '/inventory', icon: 'Package' },
  { name: 'Reports', href: '/reports', icon: 'BarChart3' },
  { name: 'Reservations', href: '/reservations', icon: 'CalendarCheck' },
  { name: 'Settings', href: '/settings', icon: 'Settings' },
];
