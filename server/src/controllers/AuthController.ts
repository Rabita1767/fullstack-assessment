import { Request, Response } from "express";

const AuthController = {
    login: (req: Request, res: Response) => {
        const { email, password } = req.body;
        console.log(email, password);
    },
};

export default AuthController;
