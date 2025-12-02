import axios from "axios";

export default async function handler(req, res) {
  const TARGET = "https://offlinechallanapi-3yh6els5ia-uc.a.run.app/vehicle/mobile-no";

  let reg;

  if (req.method === "GET") {
    reg = req.query.reg;
    if (!reg) return res.json({ success: false, message: "Missing ?reg" });
  } 
  
  else if (req.method === "POST") {
    reg = req.body.reg_number;
    if (!reg) return res.json({ success: false, message: "reg_number required" });
  }

  try {
    const response = await axios.post(
      TARGET,
      { reg_number: reg },
      {
        headers: {
          "content-type": "application/json",
          origin: "https://offlinechallan.com",
          referer: "https://offlinechallan.com/",
          "user-agent": "Mozilla/5.0",
        }
      }
    );

    const data = response.data;
    data.reg_no = reg;

    res.json(data);

  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}
