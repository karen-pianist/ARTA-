const About = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white transition-colors duration-300">

      {/* Hero */}
      <section className="mx-auto max-w-5xl text-center">
        <h1 className="text-6xl font-bold tracking-tight text-black dark:text-white">
          About ARTA
        </h1>

        <p className="mt-8 text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Where creativity meets emotion. ARTA is a digital
          space built to connect artists, collectors, and
          people who appreciate meaningful artwork.
        </p>
      </section>


      {/* Story */}
      <section className="mx-auto mt-24 max-w-4xl">
        <h2 className="text-3xl font-bold text-black dark:text-white ">
          Our Story
        </h2>

        <p className="mt-5 text-gray-600 dark:text-gray-400 leading-8">
          ARTA was created with one idea in mind:
          every artwork has a story worth sharing.
          We believe art is more than an image —
          it is a reflection of imagination, culture,
          and human expression.
        </p>
      </section>


      {/* Values */}
      <section className="mx-auto mt-24 grid max-w-5xl gap-8 md:grid-cols-3">

        <div className="rounded-3xl bg-gray-200 dark:bg-zinc-900 p-8">
          <h3 className="text-xl font-bold text-black dark:text-white">
            🎨 Creativity
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Supporting unique ideas and artistic vision.
          </p>
        </div>


        <div className="rounded-3xl bg-gray-200 dark:bg-zinc-900 p-8">
          <h3 className="text-xl font-bold text-black dark:text-white">
            🌎 Community
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Bringing artists and art lovers together.
          </p>
        </div>


        <div className="rounded-3xl bg-gray-200 dark:bg-zinc-900 p-8">
          <h3 className="text-xl font-bold text-black dark:text-white">
            ✨ Discovery
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Helping people find inspiring artwork.
          </p>
        </div>

      </section>

    </div>
  );
};

export default About;