import notification from "../model/notification.js"

  export const createNotification = async(req,res,next)=>{
    const newNotification = new notification(req.body)
    try {
        const saveNotification = await newNotification.save()
        res.status(200).json(saveNotification)
    } catch (err) {
        next(err)
    }
}

export const getNotifications = async (req, res) => {
    try {
      const notifications = await notification.find().sort({ createdAt: -1 });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Đã có lỗi xảy ra khi lấy danh sách thông báo.' });
    }
  };

  export const deleteNoti = async (req, res, next) => {
    try {
      await notifications.findByIdAndDelete(req.params.id);
      res.status(200).json("Notification has been delete!");
    } catch (err) {
      next(err);
    }
  };