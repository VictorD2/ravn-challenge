"use client";
import "remixicon/fonts/remixicon.css";
import "../styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Container from "@/ui/Container";
import PanelLayout from "@/shared/layouts/PanelLayout";
import { API_GRAPHQL, TOKEN } from "@/shared/utils/api";
import { GlobalProvider } from "@/shared/contexts/GlobalProvider/GlobalProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new ApolloClient({
    uri: API_GRAPHQL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return (
    <html lang="en">
      <link
        rel="icon"
        href="https://images.prismic.io/website-v3/8e2cc986-b590-4f6a-8be6-e80bf7aca96b_favicon.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max"
        sizes="32x32"
      />
      <ApolloProvider client={client}>
        <GlobalProvider>
          <Container
            as="body"
            size={{ width: "w-full" }}
            bgColor="bg-background"
          >
            <PanelLayout>{children}</PanelLayout>
          </Container>
        </GlobalProvider>
      </ApolloProvider>
    </html>
  );
}
