var app = angular.module("inventory", []);

app.controller("inventoryController", function ($scope) {

    // =============================
    // PRODUCT DATA
    // =============================

    // Product Array
    $scope.products = [];

    // Low Stock Threshold
    $scope.lowStockThreshold = 10;

    // Categories
    $scope.categories = [
        "Electronics",
        "Furniture",
        "Grocery",
        "Medical",
        "Accessories"
    ];

    // Warehouse Names (For Product Management Dropdown)
    $scope.warehouseNames = [
        "Warehouse A",
        "Warehouse B",
        "Warehouse C",
        "Main Storage",
        "Dispatch Area"
    ];

    // =============================
    // DASHBOARD
    // =============================

    // Stock Status
    $scope.getStockStatus = function (item) {

        var qty = Number(item.quantity) || 0;

        if (qty === 0)
            return "Out of Stock";

        if (qty <= $scope.lowStockThreshold)
            return "Low Stock";

        return "Available";

    };

    // Total Products
    $scope.getTotalProducts = function () {
        return $scope.products.length;
    };

    // Total Available Stock
    $scope.getAvailableStock = function () {

        var total = 0;

        angular.forEach($scope.products, function (product) {
            total += Number(product.quantity) || 0;
        });

        return total;
    };

    // Low Stock Count
    $scope.getLowStockCount = function () {

        var count = 0;

        angular.forEach($scope.products, function (product) {

            if (product.status === "Low Stock") {
                count++;
            }

        });

        return count;

    };

    // No Stock Count
    $scope.getNoStockCount = function () {

        var count = 0;

        angular.forEach($scope.products, function (product) {

            if (product.status === "Out of Stock") {
                count++;
            }

        });

        return count;

    };

    // Alert Products
    $scope.getAlertProducts = function () {

        return $scope.products.filter(function (product) {

            return product.status === "Low Stock" ||
                product.status === "Out of Stock";

        });

    };

    // Unique Categories
    $scope.getCategories = function () {

        var categories = [];
        var map = {};

        angular.forEach($scope.products, function (product) {

            if (product.category && !map[product.category]) {

                map[product.category] = true;
                categories.push(product.category);

            }

        });

        return categories;
    };

    // Category Count
    $scope.getCategoryCount = function () {
        return $scope.getCategories().length;
    };

    // Product Count By Category
    $scope.getProductCountByCategory = function (category) {

        var count = 0;

        angular.forEach($scope.products, function (product) {

            if (product.category === category)
                count++;

        });

        return count;
    };

    // Unique Warehouses
    $scope.getWarehouses = function () {

        var warehouses = [];
        var map = {};

        angular.forEach($scope.products, function (product) {

            if (product.warehouse && !map[product.warehouse]) {

                map[product.warehouse] = true;
                warehouses.push(product.warehouse);

            }

        });

        return warehouses;
    };

    // Warehouse Count
    $scope.getWarehouseCount = function () {

        return $scope.getWarehouses().length;

    };

    // Product Count By Warehouse
    $scope.getProductCountByWarehouse = function (warehouse) {

        var count = 0;

        angular.forEach($scope.products, function (product) {

            if (product.warehouse === warehouse)
                count++;

        });

        return count;

    };

    // Recent Updates
    $scope.getRecentUpdates = function () {

        return $scope.products
            .slice()
            .sort(function (a, b) {

                return new Date(b.lastUpdated)
                    - new Date(a.lastUpdated);

            });

    };

    // =============================
    // DASHBOARD END
    // =============================

    // =============================
    // PRODUCT MANAGEMENT
    // =============================

    // Product Object
    $scope.product = {};

    // Success Message
    $scope.message = "";

    // Add Product
    $scope.addProduct = function () {

        $scope.products.push({

            id: $scope.product.id,
            name: $scope.product.name,
            category: $scope.product.category,
            supplier: $scope.product.supplier,

            quantity: Number($scope.product.quantity),

            price: Number($scope.product.price),

            warehouse: $scope.product.warehouse,

            // Automatically determine status
            status: $scope.getStockStatus($scope.product),
            // Used in Dashboard → Recent Updates
            lastUpdated: new Date()

        });

        $scope.message = "Product added successfully!";

        // Clear form
        $scope.product = {};

        // Reset validation
        if ($scope.productForm) {

            $scope.productForm.$setPristine();
            $scope.productForm.$setUntouched();

        }

    };

    // =============================
    // PRODUCT MANAGEMENT END
    // =============================



    // =============================
    // INVENTORY LIST
    // =============================

    // Inventory List uses
    // ng-repeat="product in products"
    // No extra JavaScript is required.

    // =============================
    // INVENTORY LIST END
    // =============================
    // =============================
    // WAREHOUSE
    // =============================

    // Warehouse Details
    $scope.warehouseList = [

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

    // Default Warehouse
    $scope.selectedWarehouse = $scope.warehouseList[0];

    // Select Warehouse
    $scope.selectWarehouse = function (warehouse) {

        $scope.selectedWarehouse = warehouse;

    };

    // Total Warehouses
    $scope.totalWarehouses = $scope.warehouseList.length;

    // Total Warehouse Stock
    $scope.totalWarehouseStock = function () {

        var total = 0;

        angular.forEach($scope.warehouseList, function (warehouse) {

            total += warehouse.stock;

        });

        return total;

    };

    // Active Warehouses
    $scope.activeWarehouseCount = function () {

        var count = 0;

        angular.forEach($scope.warehouseList, function (warehouse) {

            if (warehouse.status === "Active") {

                count++;

            }

        });

        return count;

    };

    // Low Stock Warehouses
    $scope.lowStockWarehouseCount = function () {

        var count = 0;

        angular.forEach($scope.warehouseList, function (warehouse) {

            if (warehouse.stock < 200) {

                count++;

            }

        });

        return count;

    };

    // =============================
    // WAREHOUSE END
    // =============================

});