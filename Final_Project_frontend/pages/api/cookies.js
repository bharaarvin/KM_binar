import cookie from "cookie";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { cookie_name, token } = req.body;
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(cookie_name, token, {
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ message: `set ${cookie_name} cookies success` });
  } else if (req.method === "GET") res.status(200).json({ message: "get cookie success", data: req.cookies });
}
