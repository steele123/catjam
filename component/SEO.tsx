import Head from "next/head";

interface Props {
  title: string;
  description?: string;
}

export default function SEO({ title, description }: Props) {
    const metaDescription = description || "A home for unreleased songs."

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title}></meta>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://catjam.me/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content="https://catjam.me/catjam.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://catjam.me/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={metaDescription} />
    </Head>
  );
}
