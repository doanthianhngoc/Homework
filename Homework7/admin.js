
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

// Không sử dụng localStorage
let products = defaultProducts.map(product => ({ ...product }));
let editingId = null;

const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const imgInput = document.getElementById("img");
const priceInput = document.getElementById("price");
const table = document.getElementById("product-table");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formTitle = document.getElementById("form-title");

// Hiển thị danh sách sản phẩm
function renderTable() {
    table.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>
                <img
                    src="${product.img}"
                    alt="${product.name}"
                    width="65"
                >
            </td>
            <td>${product.price.toLocaleString("vi-VN")}</td>
            <td>
                <button
                    type="button"
                    class="edit-btn"
                    data-action="edit"
                    data-id="${product.id}">
                    Sửa
                </button>

                <button
                    type="button"
                    class="delete-btn"
                    data-action="delete"
                    data-id="${product.id}">
                    Xóa
                </button>
            </td>
        </tr>
    `).join("");

    table.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", function () {
            console.error("Không tìm thấy ảnh:", img.src);
            img.alt = "Không tải được ảnh";
        });
    });
}

// Thêm hoặc cập nhật sản phẩm
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const img = imgInput.value.trim();
    const price = Number(priceInput.value);

    if (
        name === "" ||
        img === "" ||
        priceInput.value === "" ||
        !Number.isFinite(price) ||
        price < 0
    ) {
        alert("Vui lòng nhập đầy đủ thông tin hợp lệ!");
        return;
    }

    if (editingId !== null) {
        const product = products.find(item => item.id === editingId);

        if (product) {
            product.name = name;
            product.img = img;
            product.price = price;
        }

        alert("Cập nhật sản phẩm thành công!");
    } else {
        let number = 1;

        while (products.some(item => item.id === "SP" + number)) {
            number++;
        }

        const newProduct = {
            id: "SP" + number,
            name: name,
            img: img,
            price: price
        };

        products.push(newProduct);
        alert("Thêm sản phẩm thành công!");
    }

    resetForm();
    renderTable();
});

// Xử lý nút sửa và xóa
table.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;
    const product = products.find(item => item.id === id);

    if (!product) return;

    if (action === "edit") {
        editingId = id;

        nameInput.value = product.name;
        imgInput.value = product.img;
        priceInput.value = product.price;

        formTitle.textContent = "Cập nhật sản phẩm";
        submitBtn.textContent = "Cập nhật";
        cancelBtn.hidden = false;

        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    if (action === "delete") {
        const confirmed = confirm(
            "Bạn có chắc chắn muốn xóa " + product.name + "?"
        );

        if (confirmed) {
            products = products.filter(item => item.id !== id);

            if (editingId === id) {
                resetForm();
            }

            renderTable();
            alert("Đã xóa sản phẩm!");
        }
    }
});

// Làm trống biểu mẫu
function resetForm() {
    form.reset();
    editingId = null;

    formTitle.textContent = "Thêm sản phẩm";
    submitBtn.textContent = "Thêm sản phẩm";
    cancelBtn.hidden = true;
}

// Hủy chỉnh sửa
cancelBtn.addEventListener("click", resetForm);

// Hiển thị dữ liệu ban đầu
renderTable();
