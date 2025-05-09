import jwt from "jsonwebtoken";

export const generateToken = (
  id: string,
  role: string,
  email: string,
  isPremiumUser: boolean
) =>
  jwt.sign(
    { id, role, email, isPremiumUser },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "5d",
    }
  );
