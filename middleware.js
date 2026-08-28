import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Solo estas dos cuentas pueden entrar a /admin. Esto es una segunda capa
// de defensa: la protección real ya vive en las políticas RLS de Supabase,
// pero así tampoco se le muestra el panel a una sesión válida que no sea
// de un admin reconocido (por ejemplo, si en el futuro se habilita el
// registro público por error).
const ADMIN_UIDS = [
  "b5febcc1-9c7a-4c35-a05e-bf777e5bf1f4",
  "9b182ec8-459c-4556-87e2-6a136251d6b5",
];

// Protege todo lo que esté bajo /admin: si no hay sesión de un admin
// reconocido, redirige a /admin/login. Las rutas públicas de la tienda no
// pasan por aquí.
export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = Boolean(user && ADMIN_UIDS.includes(user.id));
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (!isAdmin && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (isAdmin && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
