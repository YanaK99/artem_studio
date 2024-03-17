import Head from "next/head";

export const Title = ({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title} | AP Studio</title>
      </Head>
      {children}
    </>
  );
};
