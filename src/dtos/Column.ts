import { Schema, Document } from 'mongoose';

export interface IColumn {
    title: string;
    createdAt: Date;
    updatedAt: Date;
    userId: Schema.Types.ObjectId;
    boardId: Schema.Types.ObjectId;
}

export interface ColumnDocument extends Document, IColumn {}


export interface IColumnRequest {
    title: string;
    userId: string;
    boardId: string;
}

export interface IBoardRequestUpdate {
    title: string;
}