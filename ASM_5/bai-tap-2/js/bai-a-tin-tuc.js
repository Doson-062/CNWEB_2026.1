/* BÀI A — ĐIỀN VÀO CHỖ TRỐNG: Trang News lấy dữ liệu từ JSON
   Thay mỗi ___(n)___ bằng đáp án của bạn.
   - Chỗ trống nằm trong CODE: điền tên phương thức / từ khoá / toán tử / biểu thức còn thiếu.
   - Chỗ trống nằm trong CHÚ THÍCH ("in ra: ..."): điền kết quả bạn DỰ ĐOÁN, chưa chạy vội.
   File chỉ chạy được khi mọi chỗ trống trong code đã được điền. */

// Máy chủ gửi về MỘT CHUỖI JSON chứa 5 bài viết.
const duLieuTho = '[' +
	'{"id":1,"title":"Khai trương xưởng in mới","date":"01-03-2012","views":320,"tags":["su kien","xuong in"],"draft":false},' +
	'{"id":2,"title":"Mẫu thiệp cưới mùa thu","date":"15-03-2012","views":870,"tags":["thiep cuoi","mau moi"],"draft":false},' +
	'{"id":3,"title":"Hướng dẫn chọn giấy cotton","date":"02-04-2012","views":540,"tags":["huong dan","giay"],"draft":false},' +
	'{"id":4,"title":"Bảng giá 2013","date":"20-04-2012","views":0,"tags":["bang gia"],"draft":true},' +
	'{"id":5,"title":"Ưu đãi in danh thiếp","date":"05-05-2012","views":870,"tags":["khuyen mai","mau moi"],"draft":false}' +
	']';

// ---------- Phần 1: JSON → mảng object ----------
// (1) parse — chuyển chuỗi JSON thành mảng object JavaScript
const dsBai = JSON.parse(duLieuTho);

// ---------- Phần 2: Thêm / bớt phần tử ----------
// Thêm vào CUỐI mảng:
// (2) push — thêm phần tử vào cuối mảng
dsBai.push({ id: 6, title: "Tuyển thực tập sinh", date: "10-05-2012", views: 45, tags: ["tuyen dung"], draft: true });
// Thêm vào ĐẦU mảng:
// (3) unshift — thêm phần tử vào đầu mảng
dsBai.unshift({ id: 0, title: "Thông báo nghỉ lễ", date: "30-04-2012", views: 120, tags: ["thong bao"], draft: false });
// Lấy ra và xoá phần tử CUỐI:
// (4) pop — xoá và trả về phần tử cuối
const baiCuoi = dsBai.pop();
console.log(baiCuoi.id);             // in ra: 6
// (5) = 6 — push(id:6) thêm vào cuối trước, unshift(id:0) thêm vào đầu,
//            nên pop() lấy ra id:6 (vẫn ở cuối)

// Lấy ra và xoá phần tử ĐẦU:
// (6) shift — xoá và trả về phần tử đầu
const baiDau = dsBai.shift();
console.log(dsBai.length);           // in ra: 5
// (7) = 5 — ban đầu 5, push→6, unshift→7, pop→6, shift→5

// ---------- Phần 3: Thuộc tính của object ----------
const baiMot = dsBai[0];
baiMot.noiBat = true;                          // thêm thuộc tính
baiMot["tac gia"] = "Ban biên tập";            // (8) ["tac gia"] — bracket notation vì key có dấu cách
// (9) delete — từ khoá xoá thuộc tính khỏi object
delete baiMot.noiBat;
console.log(baiMot.noiBat);          // in ra: undefined
// (10) = undefined — thuộc tính bị delete, truy cập → undefined

// ---------- Phần 4: Kiểu tham chiếu ----------
const baiGhim = dsBai[1];
baiGhim.title = "[GHIM] " + baiGhim.title;
console.log(dsBai[1].title);         // in ra: [GHIM] Mẫu thiệp cưới mùa thu
// (11) = [GHIM] Mẫu thiệp cưới mùa thu
// baiGhim và dsBai[1] cùng tham chiếu tới 1 object trong bộ nhớ

// ---------- Phần 5: filter / map / reduce ----------
// Chỉ giữ các bài ĐÃ ĐĂNG (draft là false):
// (12) filter — tạo mảng mới chỉ gồm phần tử thoả điều kiện
const daDang = dsBai.filter(bai => bai.draft === false);
console.log(daDang.length);          // in ra: 4
// (13) = 4 — id:1, id:2, id:3, id:5 có draft=false; id:4 draft=true bị loại

// Mảng mới gồm tiêu đề viết HOA:
// (14) map — tạo mảng mới bằng cách biến đổi mỗi phần tử
// (15) toUpperCase — phương thức String chuyển chữ thường → chữ hoa
const dsTieuDe = daDang.map(bai => bai.title.toUpperCase());

// Tổng lượt xem:
// (16) bai.views — giá trị cần cộng dồn
// (17) 0 — giá trị khởi tạo của accumulator
const tongLuotXem = daDang.reduce((tong, bai) => tong + bai.views, 0);
console.log(tongLuotXem);            // in ra: 2600
// (18) = 2600 — 320 + 870 + 540 + 870 = 2600

// Nếu BỎ đối số thứ hai (17) của reduce thì tongLuotXem là:
//   (A) vẫn là con số đúng   (B) một chuỗi bắt đầu bằng "[object Object]"   (C) báo TypeError
//   → (B) một chuỗi bắt đầu bằng "[object Object]"
// (19) = B — không có initialValue, phần tử đầu (object) làm accumulator,
//            object + number ép kiểu thành chuỗi "[object Object]870..."

// Bài nhiều lượt xem nhất; nếu bằng nhau thì giữ bài ĐỨNG TRƯỚC trong mảng:
// (20) > (strictly greater than) — bài sau chỉ thắng khi THỰC SỰ LỚN HƠN,
//        nếu bằng nhau điều kiện false → giữ max (bài đứng trước)
const baiHot = daDang.reduce((max, bai) => bai.views > max.views ? bai : max);
console.log(baiHot.id);              // in ra: 2
// (21) = 2 — id:2(870) vs id:5(870): 870 > 870 = false → giữ id:2

// Callback của map KHÔNG return:
const thu = daDang.map(bai => { bai.views + 1; });
console.log(thu[0]);                 // in ra: undefined
// (22) = undefined — block {} không có return → arrow function trả về undefined

// ---------- Phần 6: Đếm số bài theo thẻ (tag) ----------
const demThe = {};
daDang.forEach(bai => {
	// (23) of — for...of duyệt từng phần tử trong mảng bai.tags
	for (const the of bai.tags) {
		// (24) the — dùng biến the làm key để tra cứu trong demThe
		demThe[the] = (demThe[the] || 0) + 1;
	}
});
console.log(demThe["mau moi"]);      // in ra: 2
// (25) = 2 — tag "mau moi" có ở id:2 và id:5

// ---------- Phần 7: Class ----------
class BaiViet {
	// (26) constructor — phương thức đặc biệt được gọi khi new BaiViet(...)
	constructor(duLieu) {
		this.title = duLieu.title;
		this.date = duLieu.date;
		// (27) this — tham chiếu đến instance đang được tạo
		this.views = duLieu.views;
	}
	tomTat() {
		return `${this.date} — ${this.views} lượt xem`;
	}
}
// (28) new — tạo instance mới từ class BaiViet
const dsBaiViet = daDang.map(duLieu => new BaiViet(duLieu));

// ---------- Phần 8: Object → JSON ----------
// (29) stringify — chuyển object JS thành chuỗi JSON
const guiDi = JSON.stringify(dsBaiViet[0]);
console.log(guiDi);
// Chuỗi guiDi có chứa phương thức tomTat không? (có / không)  → không
// (30) = không — JSON.stringify bỏ qua function/method, chỉ giữ dữ liệu

// ---------- Hiển thị ----------
veDanhSachTin(dsBaiViet);
hienThi(`Đã đăng: ${daDang.length} bài — tổng ${tongLuotXem} lượt xem — bài hot: #${baiHot.id}`);
hienThi(`Tiêu đề: ${dsTieuDe.join(" | ")}`);
for (const the in demThe) {
	hienThi(`#${the}: ${demThe[the]} bài`);
}
