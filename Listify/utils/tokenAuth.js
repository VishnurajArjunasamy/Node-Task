import { verify } from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
  // Get the JWT token from the Authorization header
  const token = req.headers["authorization"];

  if (!token) {
    // If the token is not provided, return an error
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the JWT token and extract the payload
    const payload = verify(token, process.env.SECRET_KEY);

    // Attach the payload to the request object
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    console.log(error);
  }
}
