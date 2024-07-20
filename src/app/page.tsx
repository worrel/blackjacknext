import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col items-center text-xl font-serif'>
      <div>Welcome to Project Blackjack</div>
      <Link 
        className="group rounded-lg border bg-slate-300 border-black px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        href="/play">Start new game</Link>
    </div>
  );
}
