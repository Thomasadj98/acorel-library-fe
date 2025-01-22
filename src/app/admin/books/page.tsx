import AdminControl from "@/app/components/admin/AdminControl";

export default function Home() {
  return (
    <section className='flex items-center justify-items-center flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]"'>
      <h1 className='text-4xl text-center'>Welcome to the admin page</h1>
      <AdminControl/>
    </section>
  );
}