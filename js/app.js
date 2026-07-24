var app = angular.module("inventory", [])
app.controller("inventoryController", function ($scope) {

    // =============================
    // DASHBOARD
    // =============================



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



    // =============================
    // WAREHOUSE END
    // =============================

})