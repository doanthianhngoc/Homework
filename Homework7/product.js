
const defaultProducts = [
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

// Dữ liệu chỉ tồn tại trong lúc trang đang chạy
let products = defaultProducts.map(product => ({ ...product }));

// Hiển thị danh sách sản phẩm
function renderProducts() {
    const list = document.getElementById("product-list");

    if (!list) {
        console.error("Không tìm thấy phần tử có id='product-list' trong index.html");
        return;
    }

    list.innerHTML = products.map(product => `
        <div class="product-card">
            <img
                src="${product.img}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-name">
                ${product.name}
            </div>

            <div class="product-price">
                ${product.price.toLocaleString("vi-VN")}đ
            </div>

            <button
                type="button"
                class="add-cart"
                onclick="addToCart('${product.id}')"
                aria-label="Chọn ${product.name}"
            >
                🛒
            </button>
        </div>
    `).join("");

    // Báo lỗi nếu không tải được ảnh
    list.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", function () {
            console.error("Không tìm thấy ảnh:", img.src);
            img.alt = "Không tải được ảnh sản phẩm";
        });
    });
}

// Chọn sản phẩm
function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (product) {
        alert(
            "Bạn đã chọn: " + product.name +
            "\nGiá: " + product.price.toLocaleString("vi-VN") + "đ"
        );
    }
}

// Chạy khi HTML đã được tải
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderProducts);
} else {
    renderProducts();
}
