import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
            console.log('Current session', session)
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}) {
            try {
                console.log('Prfofile', profile);
                await connectDB();
                /* Check if user exists */
                const user = await User.findOne({
                    email: profile.email
                })
                console.log('User', user);
                /* Create User if not exists*/
                if(!user) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log('error', error)
            }
        }
    }
});

export {handler as GET, handler as POST};