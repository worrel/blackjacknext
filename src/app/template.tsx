export default function GameTemplate({children}: { children: React.ReactNode }) {
    return (
      <main className="flex min-h-screen flex-col items-center p-6">
        <div className="z-10 w-full max-w-5xl items-center font-serif font-bold text-xl lg:flex">
          Blackjack
        </div>
  
        <div className="">
          {children}
        </div>
      </main>
    );
  }