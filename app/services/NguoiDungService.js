function nguoiDungService(){
    this.mangNguoiDung = [];
    this.layDanhSachNguoiDung = function(){
        return axios({
        // Các giao thức phải nhớ khi làm việc với backend
        /**
         * get: lấy data về
         * post: thêm
         * put: cập nhật
         * delete: xóa
         * hàm exuios trả về 1 promise
         */
            method: "GET",
            url: "http://5dce9e0375f9360014c25fe6.mockapi.io/api/NguoiDung",
        });
    };

    this.themNguoiDung = function(nguoiDung){
        return axios ({
            method: "POST",
            url:"http://5dce9e0375f9360014c25fe6.mockapi.io/api/NguoiDung",
            data:nguoiDung,
        })
    }
    this.xoaNguoiDung = function(id){
        return axios({
            method: "DELETE",
            url: `http://5dce9e0375f9360014c25fe6.mockapi.io/api/NguoiDung/${id}`
        })
    }
    this.layThongTin = function(id){
        return axios({
            mehotd:"GET",
            url:`http://5dce9e0375f9360014c25fe6.mockapi.io/api/NguoiDung/${id}`
        })
    }
    this.capNhatThongTin = function(nguoiDung, id){
        return axios({
            method: "PUT",
            url:`http://5dce9e0375f9360014c25fe6.mockapi.io/api/NguoiDung/${id}`,
            data: nguoiDung
        })
    }
    this.timKiemNguoiDung = function(chuoiTimKiem,danhSachNguoiDung){
        return danhSachNguoiDung.filter(function(item){
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
        });
    }
}

