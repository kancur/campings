import Link from 'next/link';

export default function LoggedOutPage() {
  return (
    <div className="flex flex-col items-center p-4 space-y-3 my-auto">
      <h1 className="text-4xl text-pink-500" >Bol si odhlásený</h1>
      <p>
        Prejdi na <Link href="/">domovskú stránku</Link>.
      </p>
        <Link href="/prihlasenie">
          <button className="button bg-emerald-500 hover:bg-emerald-400">Prihlásiť sa</button>
        </Link>
    </div>
  )
}