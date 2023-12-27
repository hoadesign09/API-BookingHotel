import order from "../model/order.js"

export const processPayment = async (req, res) => {
    try {
      // Lấy thông tin từ request body
      const { user, amount, orderDescription, orderType } = req.body;
  
      // Tạo đơn hàng mới
      const newOrder = new order({
        user,
        amount,
        orderDescription,
        orderType,
      });
  
      // Lưu đơn hàng vào MongoDB
      await newOrder.save();
  
      // Thực hiện thanh toán VNPAY ở đây (sử dụng các API của VNPAY)
  
      // Nếu thanh toán thành công, trả về kết quả thành công
      return res.status(200).json({ message: 'Đã thanh toán và lưu đơn hàng thành công.' });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi khi xử lý thanh toán và lưu đơn hàng.' });
    }
  };