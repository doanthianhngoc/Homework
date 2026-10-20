
// Danh sách sản phẩm ban đầu
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

// ID của sản phẩm đang sửa
let editingId = null;


// HIỂN THỊ DANH SÁCH SẢN PHẨM
function renderTable() {
    let table = document.getElementById("product-table");

    // Xóa dữ liệu cũ
    table.innerHTML = "";

    // Duyệt từng sản phẩm
    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        let row = "<tr>";

        row += "<td>" + product.id + "</td>";
        row += "<td>" + product.name + "</td>";

        row += '<td><img src="' + product.img +
               '" alt="' + product.name +
               '" width="65"></td>';

        row += "<td>" +
               product.price.toLocaleString("vi-VN") +
               "đ</td>";

        row += '<td>';
        row += '<button type="button" onclick="editProduct(\'' +
               product.id + '\')">Sửa</button> ';

        row += '<button type="button" onclick="deleteProduct(\'' +
               product.id + '\')">Xóa</button>';

        row += '</td>';

        row += "</tr>";

        // Thêm dòng vào bảng
        table.innerHTML += row;
    }
}


// THÊM HOẶC CẬP NHẬT SẢN PHẨM
function saveProduct() {
    let name = document.getElementById("name").value.trim();
    let img = document.getElementById("img").value.trim();
    let priceText = document.getElementById("price").value;
    let price = Number(priceText);

    // Kiểm tra dữ liệu
    if (name === "" || img === "" || priceText === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (isNaN(price) || !isFinite(price) || price < 0) {
        alert("Giá sản phẩm không hợp lệ!");
        return;
    }

    // Nếu đang sửa sản phẩm
    if (editingId !== null) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === editingId) {
                products[i].name = name;
                products[i].img = img;
                products[i].price = price;
                break;
            }
        }

        alert("Cập nhật sản phẩm thành công!");
    } else {
        // Tìm ID chưa được sử dụng
        let number = 1;
        let idExists = true;

        while (idExists) {
            idExists = false;

            for (let i = 0; i < products.length; i++) {
                if (products[i].id === "SP" + number) {
                    idExists = true;
                    number++;
                    break;
                }
            }
        }

        // Tạo sản phẩm mới
        let newProduct = {
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
}


// SỬA SẢN PHẨM
function editProduct(id) {
    let product = null;

    // Tìm sản phẩm theo ID
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            product = products[i];
            break;
        }
    }

    if (product === null) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }

    // Đưa thông tin cũ lên biểu mẫu
    document.getElementById("name").value = product.name;
    document.getElementById("img").value = product.img;
    document.getElementById("price").value = product.price;

    editingId = id;

    document.getElementById("form-title").textContent =
        "Cập nhật sản phẩm";

    document.getElementById("submit-btn").textContent =
        "Cập nhật";

    document.getElementById("cancel-btn").hidden = false;

    // Cuộn đến biểu mẫu
    document.getElementById("product-form").scrollIntoView();
}


// XÓA SẢN PHẨM
function deleteProduct(id) {
    let product = null;
    let index = -1;

    // Tìm sản phẩm cần xóa
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            product = products[i];
            index = i;
            break;
        }
    }

    if (product === null) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }

    // Hỏi trước khi xóa
    let confirmed = confirm(
        "Bạn có chắc chắn muốn xóa " + product.name + "?"
    );

    if (confirmed) {
        // Xóa sản phẩm tại vị trí index
        products.splice(index, 1);

        // Nếu đang sửa đúng sản phẩm vừa xóa
        if (editingId === id) {
            resetForm();
        }

        renderTable();

        alert("Đã xóa sản phẩm!");
    }
}


// LÀM TRỐNG BIỂU MẪU
function resetForm() {
    document.getElementById("product-form").reset();

    editingId = null;

    document.getElementById("form-title").textContent =
        "Thêm sản phẩm";

    document.getElementById("submit-btn").textContent =
        "Thêm sản phẩm";

    document.getElementById("cancel-btn").hidden = true;
}


// HỦY CHỈNH SỬA
function cancelEdit() {
    resetForm();
}


// HIỂN THỊ SẢN PHẨM BAN ĐẦU
renderTable();
