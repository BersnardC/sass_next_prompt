import { connectDB } from "@utils/database"
import Prompt from '@models/prompt'

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response(JSON.stringify("Prompt not found"), { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        console.error('Error', error);
        return new Response(error.message, { status: 500 })
    }
}

export const PATCH  = async (req, { params }) => {
    const { prompt, tag } = await req.json()
    try {
        await connectDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response(JSON.stringify("Prompt not found"), { status: 404 });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        console.error('Error', error);
        return new Response(error.message, { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const prompt = await Prompt.findByIdAndDelete(params.id);
        if (!prompt) return new Response(JSON.stringify("Deleted succesfully"), { status: 200 });
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        console.error('Error', error);
        return new Response(error.message, { status: 500 })
    }
}