import {NextRequestWithAuth, withAuth} from 'next-auth/middleware';
import {NextResponse} from 'next/server';
import {authOptions} from '@/lib/authOption';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { token } = req.nextauth;
    if (!token ) {
        return NextResponse.rewrite(new URL('/login', req.url))
    }
      const hasAdmin = token.user.roles.some((role: any) => role === 'ansei-super')
      const hasPalletControlRoleOperator = token.user.roles.some((role: string) => role.includes('operator'));
    if (hasPalletControlRoleOperator || !hasAdmin) {
      return NextResponse.rewrite(new URL('/block', req.url))
    }

  },
  {
    cookies: authOptions.cookies ,
    pages: authOptions.pages
  }
);
export const config = { matcher: ["/", "/((?!register|api|login|$).*)"]}