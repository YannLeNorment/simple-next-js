import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PocketBase from "pocketbase";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const pb = new PocketBase("http://127.0.0.1:8090");
        if (credentials != undefined) {
          const res = await pb
            .collection("users")
            .authWithPassword(credentials.username, credentials.password, {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            });
          console.log(res.record)
          const user = res.record;

          // If no error and we have user data, return it
          if (pb.authStore.isValid) {
            return user;
          }
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);
