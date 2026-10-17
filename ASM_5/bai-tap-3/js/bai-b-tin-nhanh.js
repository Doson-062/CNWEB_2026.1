/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------
const oTimKiem = document.getElementById("o-tim-kiem");
const dsTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const baoLoi = document.getElementById("bao-loi");

// F1 + F2 + F3. Một hàm duy nhất áp dụng bộ lọc hiện tại cho MỌI tin, rồi cập nhật bộ đếm
// và thông báo. Gọi khi tải trang, khi gõ phím và sau khi đăng tin.
function capNhat() {
	const tuKhoa = oTimKiem.value;
	const tuKhoaThuong = tuKhoa.toLowerCase();
	const cacTin = dsTin.querySelectorAll("li");
	let soHien = 0;
	for (const tin of cacTin) {
		const vanBan = tin.querySelector("h3").textContent + " " + tin.querySelector("p").textContent;
		const khop = vanBan.toLowerCase().includes(tuKhoaThuong);
		tin.classList.toggle("an", !khop);
		if (khop) soHien++;
	}
	boDem.textContent = `Đang hiển thị ${soHien}/${cacTin.length} tin`;
	khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
	khongThay.classList.toggle("an", soHien > 0);
}
oTimKiem.addEventListener("keyup", capNhat);
capNhat();

// F4. Một trình lắng nghe trên #list (event delegation): dùng được cho cả tin đăng sau này.
dsTin.addEventListener("click", (e) => {
	if (!e.target.matches("button.more")) return;
	const doan = e.target.closest("li").querySelector("p");
	const mo = doan.classList.toggle("day-du");
	e.target.textContent = mo ? "Thu gọn <<" : "Read more >>";
});

// F5. Đăng tin nhanh.
document.getElementById("nut-dang").addEventListener("click", () => {
	const tieuDe = oTieuDe.value.trim();
	const noiDung = oNoiDung.value.trim();
	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}
	const tin = document.createElement("li");
	const ngay = document.createElement("span");
	ngay.className = "time";
	ngay.textContent = homNay();
	const h3 = document.createElement("h3");
	h3.textContent = tieuDe;
	const p = document.createElement("p");
	p.textContent = noiDung;
	const nut = document.createElement("button");
	nut.type = "button";
	nut.className = "more";
	nut.textContent = "Read more >>";
	tin.append(ngay, h3, p, nut);
	dsTin.prepend(tin);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	capNhat();
});
