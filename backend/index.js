const express = require("express");
const cors = require("cors");
const axios = require('axios'); // Thêm dòng này để import axios

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "fdfc26b5-e434-4eff-ab94-f2d7ad83c0bc" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    // Kiểm tra xem e.response có tồn tại không trước khi truy cập thuộc tính
    if (e.response && e.response.status) {
      return res.status(e.response.status).json(e.response.data);
    } else {
      // Xử lý khi không có thông tin response hoặc status
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(3001);
