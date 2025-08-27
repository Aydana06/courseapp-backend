"use strict";
// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// export const refreshToken = async (req: Request, res: Response) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if (!token) {
//       return res.status(401).json({ message: "Refresh token байхгүй" });
//     }
//     const payload = jwt.verify(token, process.env.REFRESH_SECRET!);
//     const accessToken = jwt.sign(
//       { userId: (payload as any).userId, role: (payload as any).role },
//       process.env.JWT_SECRET!,
//       { expiresIn: "15m" }
//     );
//     res.json({ accessToken });
//   } catch (err) {
//     return res.status(403).json({ message: "Refresh token хүчингүй" });
//   }
// };
