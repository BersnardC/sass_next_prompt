import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="text-center head_text">Discover and share AI Promps
        <br className="max-md:hidden" />
        <span className="block sm:inline orange_gradient text-center">AI Powered Promps</span>
      </h1>
      <p className="desc text-center">Promptopia is a open-source AI prompting tool for modern for
        modern world to discover, create and share creative promps
      </p>
      <Feed></Feed>
    </section>
  );
}

export default Home;