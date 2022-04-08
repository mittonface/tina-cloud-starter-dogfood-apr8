import { Container } from "../components/container";
import { ExperimentalGetTinaClient } from "../.tina/__generated__/types";
import { Layout } from "../components/layout";
import Link from "next/link";
import { Posts } from "../components/posts";
import { Section } from "../components/section";
import { staticRequest } from "tinacms";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const posts = props.data.getPostsList.edges;
  const pageInfo = props.data.getPostsList.pageInfo;

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large">
          <Posts data={posts} pageInfo={pageInfo} />
          {pageInfo.hasNextPage ? (
            <Link href={`/posts?page=${pageInfo.endCursor}`}>Next Page</Link>
          ) : (
            ""
          )}
        </Container>
      </Section>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.GetPostsPage({
    after: query.page || null,
  });
  return {
    props: { ...tinaProps }, // will be passed to the page component as props
  };
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
