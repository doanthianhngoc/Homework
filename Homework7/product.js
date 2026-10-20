
// Danh sách sản phẩm
let products = [
    {
        id: "SP1",
        name: "Áo dài thêu họa tiết",
        img: "s1.jpeg",
        price: 122000
    },
    {
        id: "SP2",
        name: "Áo dài truyền thống",
        img: "s1.jpeg",
        price: 400000
    },
    {
        id: "SP3",
        name: "Áo dài",
        img: "s1.jpeg",
        price: 350000
    },
    {
        id: "SP4",
        name: "Áo dài hiện đại",
        img: "s1.jpeg",
        price: 564000
    }
];

// Hiển thị sản phẩm
function renderProducts() {
    let list = document.getElementById("product-list");

    // Kiểm tra phần tử HTML
    if (list == null) {
        console.log("Không tìm thấy product-list");
        return;
    }

    // Xóa danh sách cũ trước khi hiển thị
    list.innerHTML = "";

    // Duyệt từng sản phẩm
    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        // Tạo HTML cho một sản phẩm
        let html = "";

        html += '<div class="product-card">';

        html += '<img src="' + product.img +
                '" alt="' + product.name +
                '" class="product-image">';

        html += '<div class="product-name">';
        html += product.name;
        html += '</div>';

        html += '<div class="product-price">';
        html += product.price.toLocaleString("vi-VN") + "đ";
        html += '</div>';

        html += '<button type="button" class="add-cart" ';
        html += 'onclick="addToCart(\'' + product.id + '\')">';
        html += '🛒';
        html += '</button>';

        html += '</div>';

        // Đưa sản phẩm vào HTML
        list.innerHTML += html;
    }
}

// Chọn sản phẩm
function addToCart(id) {
    // Tìm sản phẩm theo ID
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            alert(
                "Bạn đã chọn: " + products[i].name +
                "\nGiá: " +
                products[i].price.toLocaleString("vi-VN") + "đ"
            );

            return;
        }
    }

    // Không tìm thấy sản phẩm
    alert("Không tìm thấy sản phẩm!");
}

// Hiển thị sản phẩm khi trang tải xong
renderProducts();
