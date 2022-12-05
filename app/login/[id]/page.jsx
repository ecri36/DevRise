export default async function Home({ params }) {
  const x = await fetch('/api/hello').then(j => j.json());

  return (
    <div>
      <h1>Welcome to {x}</h1>
    </div>
  );
}
