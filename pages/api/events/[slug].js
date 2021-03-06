const { events } = require("./data.json");

export default (req, res) => {
  const evt = events.filter((event) => event.slug === req.query.slug);
  console.log(req.query);
  if (req.method === "GET") {
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      message: `${req.method} is not allowed`
    });
  }
};
