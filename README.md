# PTUDW-16CLC2-Nhom02

## Friends with benefits web application

## Checklist  
A. Phân hệ FrontEnd (Giao diện tĩnh, chưa cần chức năng)  

1. Trang chủ: Liệt kê các dịch vụ (sản phẩm) mà trang web cung cấp với dữ liệu mẫu code cứng (chưa cần lấy từ csdl) X  

2. Trang chi tiết sản phẩm. X  

3. Trang giỏ hàng: Liệt kê các sản phẩm trong giỏ hàng, để sẵn giao diện các nút bấm để thêm , bớt số lượng (không có) 

4. Trang About: thông tin liên hệ X  

B. Phân hệ admin: (giao diện tĩnh, chưa cần chức năng)  

1. Trang dashboard: cho thấy tổng quát toàn bộ hệ thống: tổng số lượng sản phẩm, tổng số lượng đơn hàng, biểu đồ X  

2. Trang profile của admin: tối thiểu cần có Họ tên, Email, đổi mật khẩu X  

3. Trang quản lí loại sản phẩm và sản phẩm: (Gộp chung ở đây), chỉ cần thiết kế giao diện có phân trang, có thể bỏ qua search, sort và filter. X  

4. Trang quản lí các đơn hàng: liệt kê danh sách các đơn hàng với trạng thái tương ứng. X  

5. Trang chi tiết đơn hàng X   

6. Trang thống kê với các biểu đồ. Chú ý cần thiết kế giao diện chọn 2 ngày bắt dầu và kết thúc để truy vấn csdl tạo thống kê. X

C. BackEnd

1. Load trang chủ X

2. View chi tiết X

3. Đăng nhập/ đăng kí X (chưa có mail verify)

4. Chỉnh sửa thông tin cá nhân X

5. Upload avatar X

6. Thêm tiền vào ví X (chưa có thanh toán paypal)

7. Trở thành 1 friend X (chưa có chức năng duyệt của admin)

8. Transaction (bao gồm thuê, tình trạng đơn hàng, xem lịch sử)

9. Feedback (bao gồm review và comment)

10. Admin (chỉnh sửa thông tin, xem các biểu đồ, quản lý users)

## Guideline

1. Install PostgreSQL
2. npm install (in terminal)
3. add your own database info in config/config.json (because we use local database)
4. nodemon index (in terminal)
5. type localhost:3105/sync in your browser to add tables to database
6. Enjoy

## Collaborators
[Đỗ Mạnh Tiến](https://github.com/1653087)  
[Đinh Trần Toản](https://github.com/1653092)  
[HSIAO (Tiu) Kiều Vỹ](https://github.com/1653106)  
[Nguyễn Anh Tú](https://github.com/1653142)
## Figma
https://www.figma.com/file/UPHxujAaTOJJ2dpketINcGVP/F.w.B
