import Link from 'next/link';

export default function LoggedOutPage() {
  return (
    <div className="flex flex-col items-center p-4 space-y-2">
      <h1 className="text-3xl" >Bol si odhlásený</h1>
      <p>
        Prejdi na <Link href="/">domovskú stránku</Link>.
      </p>
        <Link href="/prihlasenie">
          <button className="button bg-green-500 hover:bg-green-400">Prihlásiť sa</button>
        </Link>
    </div>
  )
}