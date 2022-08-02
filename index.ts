import express, { Request, Response, NextFunction } from "express";

const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();

app.use(express.json());