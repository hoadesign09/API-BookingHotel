import ticket from "../model/ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userlogin && req.userlogin.id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided' });
    }
    const newTicket = new ticket({
      title,
      content,
      status: "sent",
      user: userId,
      messages: [{ sender: "client", message: content }],
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const userId = req.userlogin.id; // Lấy thông tin người dùng từ thông tin đã xác thực

    const tickets = await ticket.find({ user: userId }); // Lấy danh sách ticket của người dùng hiện tại
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllTicketsAdmin = async (req, res) => {
  try {
    const allTickets = await ticket.find({});
    res.status(200).json(allTickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    const updatedTicket = await ticket.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTicket = async (req, res, next) => {
  try {
    await ticket.findByIdAndDelete(req.params.id);
    res.status(200).json("Ticket has been delete!");
  } catch (err) {
    next(err);
  }
};

export const replyToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { message } = req.body;

    const Ticket = await ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    Ticket.messages.push({ sender: "admin", message });
    const updatedTicket = await Ticket.save();

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
