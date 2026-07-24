var app = angular.module("inventory", [])
app.controller("inventoryController", function ($scope) {

    // =============================
    // DASHBOARD
    // =============================

    // Primary Inventory Products Array (Initialized for dynamic data push from Product Management)
    $scope.products = $scope.products || [];

    // Low stock threshold
    $scope.lowStockThreshold = 10;

    // Helper to compute stock status dynamically from product quantity
    $scope.getStockStatus = function (item) {
        if (!item || item.quantity === undefined || item.quantity === null) return "Unknown";
        var qty = Number(item.quantity);
        if (qty === 0) return "No Stock";
        if (qty <= $scope.lowStockThreshold) return "Low Stock";
        return "In Stock";
    };

    // 1. Total Products count fetched from products array
    $scope.getTotalProducts = function () {
        return ($scope.products && Array.isArray($scope.products)) ? $scope.products.length : 0;
    };

    // 2. Total Available Stock fetched from products array
    $scope.getAvailableStock = function () {
        if (!$scope.products || !Array.isArray($scope.products)) return 0;
        return $scope.products.reduce(function (sum, item) {
            return sum + (Number(item.quantity) || 0);
        }, 0);
    };

    // 3. Low Stock Items count (0 < quantity <= lowStockThreshold) fetched from products array
    $scope.getLowStockCount = function () {
        if (!$scope.products || !Array.isArray($scope.products)) return 0;
        return $scope.products.filter(function (item) {
            var qty = Number(item.quantity) || 0;
            return qty > 0 && qty <= $scope.lowStockThreshold;
        }).length;
    };

    // 4. No Stock Items count (quantity === 0) fetched from products array
    $scope.getNoStockCount = function () {
        if (!$scope.products || !Array.isArray($scope.products)) return 0;
        return $scope.products.filter(function (item) {
            var qty = Number(item.quantity) || 0;
            return qty === 0;
        }).length;
    };

    // 5. Low Stock / No Stock product items fetched from products array
    $scope.getAlertProducts = function () {
        if (!$scope.products || !Array.isArray($scope.products)) return [];
        return $scope.products.filter(function (item) {
            var qty = Number(item.quantity) || 0;
            return qty <= $scope.lowStockThreshold;
        });
    };

    // 6. Dynamic Unique Categories fetched from products array
    $scope.getCategories = function () {
        if (!$scope.products || !Array.isArray($scope.products)) return [];
        var categoryMap = {};
        var categories = [];
        $scope.products.forEach(function (item) {
            if (item.category && !categoryMap[item.category]) {
                categoryMap[item.category] = true;
                categories.push(item.category);
            }
        });
        return categories;
    };

    $scope.getCategoryCount = function () {
        return $scope.getCategories().length;
    };

    $scope.getProductCountByCategory = function (categoryName) {
        if (!$scope.products || !Array.isArray($scope.products)) return 0;
        return $scope.products.filter(function (p) { return p.category === categoryName; }).length;
    };

    // 7. Dynamic Unique Warehouses fetched from products array
    $scope.getWarehouses = function () {
        if (!$scope.products || !Array.isArray($scope.products)) return [];
        var warehouseMap = {};
        var warehouses = [];
        $scope.products.forEach(function (item) {
            if (item.warehouse && !warehouseMap[item.warehouse]) {
                warehouseMap[item.warehouse] = true;
                warehouses.push(item.warehouse);
            }
        });
        return warehouses;
    };

    $scope.getWarehouseCount = function () {
        return $scope.getWarehouses().length;
    };

    $scope.getProductCountByWarehouse = function (warehouseName) {
        if (!$scope.products || !Array.isArray($scope.products)) return 0;
        return $scope.products.filter(function (p) { return p.warehouse === warehouseName; }).length;
    };

    // 8. Dynamic Recent Inventory Updates fetched directly from products array
    $scope.getRecentUpdates = function () {
        if (!$scope.products || !Array.isArray($scope.products)) return [];
        return $scope.products
            .filter(function (p) { return p.lastUpdated || p.updatedAt; })
            .slice()
            .sort(function (a, b) {
                var dateA = new Date(a.lastUpdated || a.updatedAt || 0);
                var dateB = new Date(b.lastUpdated || b.updatedAt || 0);
                return dateB - dateA;
            });
    };

    // =============================
    // DASHBOARD END
    // =============================



    // =============================
    // PRODUCT MANAGEMENT
    // =============================
    // Categories
    $scope.categories = [
        "Electronics",
        "Furniture",
        "Grocery",
        "Medical",
        "Accessories"
    ];

    // Warehouse Locations
    $scope.warehouses = [
        "Warehouse A",
        "Warehouse B",
        "Warehouse C",
        "Main Storage",
        "Dispatch Area"
    ];

    // Product Object
    $scope.product = {};

    // Product Array
    $scope.products = [];

    // Success Message
    $scope.message = "";

    // Add Product Function
    $scope.addProduct = function () {

        $scope.products.push({
            id: $scope.product.id,
            name: $scope.product.name,
            category: $scope.product.category,
            supplier: $scope.product.supplier,
            quantity: $scope.product.quantity,
            price: $scope.product.price,
            warehouse: $scope.product.warehouse,
            status: $scope.product.status,
            addedDate: new Date()
        });

        $scope.message = "Product added successfully!";

        // Clear form
        $scope.product = {};

        // Reset form validation
        $scope.productForm.$setPristine();
        $scope.productForm.$setUntouched();
    };


    // =============================
    // PRODUCT MANAGEMENT END
    // =============================



    // =============================
    // INVENTORY LIST
    // =============================



    // =============================
    // INVENTORY LIST END
    // =============================


// =============================
// WAREHOUSE
// =============================
$scope.warehouses = [
    {
        id: "WH001",
        name: "Warehouse A",
        manager: "Rahul Sharma",
        location: "Kochi",
        capacity: 1500,
        stock: 1200,
        status: "Active",
        contact: "9876543210",
        lastUpdated: new Date()
    },
    {
        id: "WH002",
        name: "Warehouse B",
        manager: "Anjali Thomas",
        location: "Ernakulam",
        capacity: 1000,
        stock: 450,
        status: "Active",
        contact: "9876543211",
        lastUpdated: new Date()
    },
    {
        id: "WH003",
        name: "Warehouse C",
        manager: "Joseph Mathew",
        location: "Thrissur",
        capacity: 800,
        stock: 150,
        status: "Maintenance",
        contact: "9876543212",
        lastUpdated: new Date()
    },
    {
        id: "WH004",
        name: "Main Storage",
        manager: "Arun Kumar",
        location: "Bengaluru",
        capacity: 3000,
        stock: 2600,
        status: "Active",
        contact: "9876543213",
        lastUpdated: new Date()
    },
    {
        id: "WH005",
        name: "Dispatch Area",
        manager: "Neethu George",
        location: "Chennai",
        capacity: 600,
        stock: 75,
        status: "Active",
        contact: "9876543214",
        lastUpdated: new Date()
    }
];

// Default Selected Warehouse
$scope.selectedWarehouse = $scope.warehouses[0];

// Select Warehouse
$scope.selectWarehouse = function (warehouse) {
    $scope.selectedWarehouse = warehouse;
};

// Total Warehouses
$scope.totalWarehouses = $scope.warehouses.length;

// Total Stock
$scope.totalWarehouseStock = function () {
    var total = 0;

    angular.forEach($scope.warehouses, function (warehouse) {
        total += warehouse.stock;
    });

    return total;
};

// Active Warehouses
$scope.activeWarehouseCount = function () {
    var count = 0;

    angular.forEach($scope.warehouses, function (warehouse) {
        if (warehouse.status === "Active") {
            count++;
        }
    });

    return count;
};

// Low Stock Warehouses (Stock < 200)
$scope.lowStockWarehouseCount = function () {
    var count = 0;

    angular.forEach($scope.warehouses, function (warehouse) {
        if (warehouse.stock < 200) {
            count++;
        }
    });

    return count;
};

// =============================
// WAREHOUSE END

