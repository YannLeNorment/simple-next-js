import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../../components/layout";
import AccessDenied from "../../components/access-denied";
import { useRouter } from "next/router";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

export default async function CharacterPage() {
  const { data: session } = useSession();
  const [content, setContent] = useState();
  const router = useRouter();
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }
  console.log(session);
  router.push({
    pathname: "/login",
  });
}
