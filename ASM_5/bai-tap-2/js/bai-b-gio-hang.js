/* BÀI B — VIẾT CODE: Giỏ hàng của xưởng in
   Hoàn thiện class GioHang và hàm napGioHang.
   Không đổi tên class, tên phương thức, tên hàm; không sửa phần "DỮ LIỆU ĐÃ CHO". */

// ---------- DỮ LIỆU ĐÃ CHO (không sửa) ----------
const DANH_MUC = [
	{ id: "TC01", ten: "Thiệp cưới cotton", loai: "thiep cuoi", gia: 1500 },
	{ id: "TC02", ten: "Thiệp cưới kraft", loai: "thiep cuoi", gia: 900 },
	{ id: "DT01", ten: "Danh thiếp ép kim", loai: "danh thiep", gia: 1200 },
	{ id: "PB01", ten: "Phong bì lót lụa", loai: "phu kien", gia: 500 }
];

// ---------- PHẦN BẠN VIẾT ----------
class GioHang {
	constructor() {
		// Mỗi dòng của giỏ là một object { id, ten, loai, gia, soLuong }.
		this.dsDong = [];
	}

	// 1. Thêm sản phẩm; trả về true nếu thêm được, false nếu soLuong không hợp lệ.
	them(sanPham, soLuong) {
		// Kiểm tra soLuong: phải là number, nguyên, lớn hơn 0
		// typeof NaN === 'number' nhưng Number.isInteger(NaN) === false → loại được NaN
		// typeof null/undefined/string → không phải 'number' → loại được
		// 2.5: typeof là number nhưng !Number.isInteger(2.5) → false → loại được
		if (
			typeof soLuong !== 'number' ||
			!Number.isInteger(soLuong) ||
			soLuong <= 0
		) {
			return false;
		}

		// Kiểm tra xem sản phẩm (theo id) đã có trong giỏ chưa
		const dongTonTai = this.dsDong.find(d => d.id === sanPham.id);

		if (dongTonTai) {
			// Sản phẩm đã có → cộng dồn số lượng (không ảnh hưởng sanPham bên ngoài)
			dongTonTai.soLuong += soLuong;
		} else {
			// Sản phẩm chưa có → tạo bản SAO (copy từng trường) để tránh giữ tham chiếu
			// Không dùng Object.assign hay spread trực tiếp {..sanPham} để tránh copy
			// các thuộc tính thừa có thể có trên sanPham sau này
			this.dsDong.push({
				id:       sanPham.id,
				ten:      sanPham.ten,
				loai:     sanPham.loai,
				gia:      sanPham.gia,
				soLuong:  soLuong       // soLuong là number primitive → không phải tham chiếu
			});
		}

		return true;
	}

	// 2. Xoá dòng có id tương ứng; trả về true nếu có xoá, false nếu không tìm thấy.
	xoa(id) {
		const viTri = this.dsDong.findIndex(d => d.id === id);
		if (viTri === -1) return false;
		this.dsDong.splice(viTri, 1);
		return true;
	}

	// 3. Tổng tiền cả giỏ.
	tongTien() {
		return this.dsDong.reduce((tong, d) => tong + d.gia * d.soLuong, 0);
		// initialValue = 0 quan trọng: giỏ rỗng → trả về 0 đúng theo yêu cầu
	}

	// 4. Object thống kê: { "<loai>": tổng tiền của loại đó, ... }.
	thongKeTheoLoai() {
		return this.dsDong.reduce((tk, d) => {
			tk[d.loai] = (tk[d.loai] || 0) + d.gia * d.soLuong;
			return tk;
		}, {}); // initialValue là {} rỗng → giỏ rỗng trả về {} theo yêu cầu
	}

	// 5. Dòng có thành tiền lớn nhất (bản sao, có thêm thanhTien); null nếu giỏ rỗng.
	dongDatNhat() {
		if (this.dsDong.length === 0) return null;

		// Dùng reduce KHÔNG có initialValue để phần tử đầu làm max ban đầu
		// Nếu bằng nhau → điều kiện > là false → giữ max (bài đứng trước) ✓
		const max = this.dsDong.reduce(
			(m, d) => d.gia * d.soLuong > m.gia * m.soLuong ? d : m
		);

		// Trả về BẢN SAO (spread) + thêm thanhTien → bên ngoài sửa không ảnh hưởng giỏ
		return { ...max, thanhTien: max.gia * max.soLuong };
	}

	// 6. Mảng BẢN SAO các dòng, mỗi dòng có thêm thuộc tính thanhTien.
	layDanhSach() {
		// map tạo mảng MỚI, spread {...d} tạo object MỚI cho từng dòng
		// → sửa/xoá trên kết quả không làm giỏ thay đổi (T15)
		return this.dsDong.map(d => ({
			...d,
			thanhTien: d.gia * d.soLuong
		}));
	}

	// 7. Chuỗi JSON của mảng các dòng.
	xuatJSON() {
		// Map ra object chỉ có ĐÚNG 5 khoá (không có thanhTien hay bất kỳ khoá thừa nào)
		// T16 kiểm tra Object.keys(d).length === 5 → phải liệt kê rõ ràng
		return JSON.stringify(
			this.dsDong.map(d => ({
				id:      d.id,
				ten:     d.ten,
				loai:    d.loai,
				gia:     d.gia,
				soLuong: d.soLuong
			}))
		);
	}
}

// 8. Tạo lại một GioHang từ chuỗi JSON do xuatJSON() sinh ra.
function napGioHang(chuoiJSON) {
	const mang = JSON.parse(chuoiJSON); // mảng [{id, ten, loai, gia, soLuong}, ...]
	const g = new GioHang();

	// Gán trực tiếp từng dòng (copy lại để giỏ mới độc lập với giỏ gốc - T18)
	// JSON.parse đã tạo object mới nên mang[i] không tham chiếu tới giỏ gốc
	g.dsDong = mang.map(d => ({
		id:      d.id,
		ten:     d.ten,
		loai:    d.loai,
		gia:     d.gia,
		soLuong: d.soLuong
	}));

	return g;
	// Giỏ trả về có dsDong đúng dữ liệu → them(), tongTien(), xuatJSON()... hoạt động bình thường
}

// ---------- CHẠY THỬ (không sửa) ----------
const gio = new GioHang();
gio.them(DANH_MUC[0], 100);  // TC01 × 100 = 150000
gio.them(DANH_MUC[3], 200);  // PB01 × 200 = 100000
gio.them(DANH_MUC[0], 50);   // TC01 đã có → cộng dồn: 150 × 1500 = 225000
// Tổng: 225000 + 100000 = 325000 ✓
veGioHang(gio.layDanhSach(), gio.tongTien());
console.table(gio.layDanhSach());
hienThi(`JSON gửi lên máy chủ: ${gio.xuatJSON()}`);
