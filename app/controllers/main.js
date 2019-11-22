var NguoiDungService = new nguoiDungService();
getListUser();

function themNguoiDungTest(){
    console.log("thêm người dùng 2 lần 2");
}

function getListUser(){
    NguoiDungService.layDanhSachNguoiDung()
    // để thực hiện promise, ghi ở chỗ này để cấu trúc đồng bộ.
        .then(function(result){
            console.log(result.data);
            this.mangNguoiDung = result.data;
            renderTable(result.data);
            setLocalStorage(result.data);
        })
        // lí do không thực hiện được promise
        .catch(function(error){
            console.log(error);
        });
}
function get(id){
    return document.getElementById(id);
}
get('btnThemNguoiDung').addEventListener('click',function(){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";

    var footer = `
    <button class="btn btn-success" onclick = "ThemNguoiDung()">Thêm</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})

function ThemNguoiDung(){
    var taiKhoan = get('TaiKhoan').value;
    var hoTen = get('HoTen').value;
    var matKhau = get('MatKhau').value;
    var email = get('Email').value;
    var soDT = get('SoDienThoai').value;
    var loaiNguoiDung = get("loaiNguoiDung").value;
    var nd = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,loaiNguoiDung);
    console.log(nd);
    NguoiDungService.themNguoiDung(nd)
    .then(function(result){
        console.log(result);
        // load lại trang nếu thêm thành công
        // location.reload();
        getListUser();
        alert('Thêm người dùng thành công');
    })
    .catch(function(error){
        console.log(error);
    })
}
function renderTable(mang = nd.mangNguoiDung){
    var table = get("tblDanhSachNguoiDung");
    var content = "";
    mang.map(function(item,index){
        content += `<tr>
        <td>${index + 1}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.soDT}</td>
        <td>${item.loaiNguoiDung}</td>
        <td>
        <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick = "suaNguoiDung(${item.id})" >Sửa</button>
        <button class="btn btn-danger" onClick = "xoaNguoiDung(${item.id})">Xóa</button>
        </td>

        </tr>`
    })
    table.innerHTML = content;
}
function xoaNguoiDung(id){
    console.log(id);
    NguoiDungService.xoaNguoiDung(id)
    .then(function(result){
        getListUser();
        return result;
    })
    .catch(function(error){
        return(error);
    })
}
function suaNguoiDung(id){
    document.getElementsByClassName("modal-footer")[0].innerHTML = `
    <button class="btn btn-success" onclick = "luuNguoiDung(${id})">Sửa</button>
    `;
    document.getElementsByClassName("modal-header")[0].innerHTML = "Cập nhật người dùng";
    NguoiDungService.layThongTin(id)
    .then(function(result){
        console.log(result)
        var dataNguoiDung = result.data;
        get('TaiKhoan').value = dataNguoiDung.taiKhoan;
        get('HoTen').value = dataNguoiDung.hoTen;
        get('MatKhau').value = dataNguoiDung.matKhau;
        get('Email').value = dataNguoiDung.email;
        get('SoDienThoai').value = dataNguoiDung.soDT;
        get("loaiNguoiDung").value = dataNguoiDung.loaiNguoiDung;
    })
    .catch(function(error){
        console.log(error);
    })
}
function luuNguoiDung(id){
    var taiKhoan = get('TaiKhoan').value;
    var hoTen = get('HoTen').value;
    var matKhau = get('MatKhau').value;
    var email = get('Email').value;
    var soDT = get('SoDienThoai').value;
    var loaiNguoiDung = get("loaiNguoiDung").value;
    var nd = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,loaiNguoiDung);
    NguoiDungService.capNhatThongTin(nd,id)
    .then(function(result){
        console.log(result);
        getListUser();
    })
    .catch(function(err){
        return err;
    })
}

/**
 * tìm kiếm người dùng
 */
get('txtSearch').addEventListener('keyup',function(){
    var chuoiTimKiem = get('txtSearch').value;
    console.log(chuoiTimKiem);

    var danhSachNguoiDung = getLocalStorage();
    var mangTimKiem = NguoiDungService.timKiemNguoiDung(chuoiTimKiem,danhSachNguoiDung);
    renderTable(mangTimKiem);
})
function setLocalStorage(danhSachNguoiDung){
    localStorage.setItem("DSND", JSON.stringify(danhSachNguoiDung));
}
function getLocalStorage(){
    return JSON.parse(localStorage.getItem("DSND"));
}