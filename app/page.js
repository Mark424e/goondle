import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="./logo.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h2 className="border-b pb-4">The daily Goon Squad game</h2>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            <Link className="transition hover:font-bold" href="/quotes">Guess the Quote</Link>
          </li>
        </ol>
      </main>
    </div>
  );
}
