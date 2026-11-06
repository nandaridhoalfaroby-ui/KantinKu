import Link from "next/link";
export default function Home(){
  return (
    <div>
      <h1 className="text-3xl font-bold">Selamat Datang di KantinKu</h1>
      <p className="mt-2 text-gray-600">Pesan makanan favoritmu dengan cepat dan mudah!</p>
      <Link href="/menu" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        Lihat Menu
      </Link>
    </div>
  )
}