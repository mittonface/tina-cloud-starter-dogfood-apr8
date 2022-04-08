import { Container } from "../components/container";
import { ExperimentalGetTinaClient } from "../.tina/__generated__/types";
import { Layout } from "../components/layout";
import { Posts } from "../components/posts";
import { Section } from "../components/section";
import { staticRequest } from "tinacms";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const posts = props.data.getPostsList.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large">
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.GetPostsPage();

  console.log(tinaProps);
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
