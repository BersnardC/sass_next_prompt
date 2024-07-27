import { connectDB } from "@utils/database"
import Prompt from '@models/prompt'

export const GET = async (request) => {
    try {
        await connectDB;
        console.log('getting posts');
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response(error.message, { status: 500 })
    }
}