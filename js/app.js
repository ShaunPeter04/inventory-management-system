var app = angular.module("inventory", [])
app.controller("inventorycontroller", function ($scope) {

    // =============================
    // DASHBOARD
    // =============================



    // =============================
    // DASHBOARD END
    // =============================



    // =============================
    // PRODUCT MANAGEMENT
    // =============================



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

