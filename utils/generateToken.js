import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,       // ✅ must be true for HTTPS (Render uses HTTPS)
    sameSite: "none",   // ✅ required for cross-domain (Netlify/Vercel)
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
