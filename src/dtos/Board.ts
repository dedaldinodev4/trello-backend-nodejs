import { Schema, Document } from 'mongoose';

export interface IBoard {
    title: string;
    createdAt: Date;
    updatedAt: Date;
    userId: Schema.Types.ObjectId;
}

export interface BoardDocument extends Document, IBoard {}

export interface IBoardRequest {
    title: string;
    userId: string;
}

export interface IBoardRequestUpdate {
    title: string;
}