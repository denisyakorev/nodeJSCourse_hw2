import {Request, Response} from "express";

export type ViewHandler = (req: Request, res: Response) => void;