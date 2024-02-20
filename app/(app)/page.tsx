import HeroForm from "@/components/forms/hero-form";

export default function Home() {
  return (
    <>
    <section className="w-full max-w-lg md:mt-20 space-y-20">
      <div className="prose text-pretty dark:prose-invert md:prose-xl">
        <h1>Your <strong>ONE</strong> link to share with rest of the world</h1>
        <p>One link to help you share everything you create, curate and sell from all your social media profiles.</p>
      </div>
      <HeroForm />
    </section>
    </>
  );
}
