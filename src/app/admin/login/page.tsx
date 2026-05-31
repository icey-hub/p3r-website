import Link from "next/link";
import { loginAction } from "../actions";
import { getAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getAdminSession();
  if (session) redirect("/admin");
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#102c42] text-white">
      <section className="mx-auto grid min-h-screen w-full max-w-[1080px] items-center px-[clamp(20px,6vw,72px)] py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#86edfc]">icey admin</p>
          <h1 className="mt-5 text-[clamp(54px,10vw,116px)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
            write
            <span className="block text-[#86edfc]">room</span>
          </h1>
          <p className="mt-8 max-w-md text-base font-semibold leading-8 text-white/72">
            登录后可以发布、编辑、隐藏或删除文章。部署到服务器前记得设置自己的环境变量。
          </p>
        </div>

        <form action={loginAction} className="mt-10 bg-white p-6 text-[#1d384a] shadow-[18px_18px_0_rgba(134,237,252,.55)] lg:mt-0">
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#1d384a]/15 pb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5ba4d7]">administrator</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">Login</h2>
            </div>
            <Link href="/" className="text-xs font-black uppercase tracking-[0.16em] text-[#5ba4d7]">
              Home
            </Link>
          </div>

          {params.error ? (
            <p className="mb-4 bg-[#fce7f3] px-4 py-3 text-sm font-bold text-[#9d174d]">
              账号或密码不正确。
            </p>
          ) : null}

          <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#1d384a]/60" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            defaultValue="icey"
            className="mt-2 h-13 w-full border border-[#1d384a]/20 px-4 text-base font-bold outline-none focus:border-[#5ba4d7]"
            required
          />

          <label className="mt-5 block text-xs font-black uppercase tracking-[0.18em] text-[#1d384a]/60" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-2 h-13 w-full border border-[#1d384a]/20 px-4 text-base font-bold outline-none focus:border-[#5ba4d7]"
            required
          />

          <button className="mt-7 h-14 w-full bg-[#1d384a] text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#5ba4d7]" type="submit">
            Enter dashboard
          </button>
        </form>
      </section>
    </main>
  );
}

