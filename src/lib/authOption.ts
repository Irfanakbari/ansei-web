import {JWT} from "next-auth/jwt";
import {AuthOptions, CookiesOptions} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

// Mendapatkan nilai environment dari variabel lingkungan
const environment = process.env.NODE_ENV || 'development';

// Menentukan apakah aplikasi berjalan di localhost atau bukan
const isLocalhost = environment === 'development';

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    if (Date.now() > token.refreshTokenExpired) throw Error;
    const details = {
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: ['refresh_token'],
      refresh_token: token.refreshToken,
    };
    const formBody: string[] = [];
    Object.entries(details).forEach(([key, value]: [string, any]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      formBody.push(encodedKey + '=' + encodedValue);
    });
    const formData = formBody.join('&');
    const url = `${process.env.KEYCLOAK_BASE_URL}/realms/vuteq-indonesia/protocol/openid-connect/token`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData,
    });
    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;
    return {
      ...token,
      id_token: refreshedTokens.id_token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpired: Date.now() + (refreshedTokens.expires_in - 15) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refreshTokenExpired:
        Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

function decodeJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
}


export const cookieOption: CookiesOptions = {
  sessionToken: {
    name: `app-vuteq.session-token`, // Make sure to add conditional logic so that the name of the cookie does not include `__Secure-` on localhost
    options: {
      httpOnly: true,
      path: '/',
      secure: !isLocalhost, // Set to true only if not running on localhost
      domain: isLocalhost ? 'localhost' : 'vuteq.co.id',
    }
  },
  csrfToken: {
    name: `app-vuteq.csrf-token`, // Make sure to add conditional logic so that the name of the cookie does not include `__Secure-` on localhost
    options: {
      httpOnly: true,
      path: '/',
      secure: !isLocalhost, // Set to true only if not running on localhost
      domain: isLocalhost ? 'localhost' : 'vuteq.co.id',
    }
  },
  callbackUrl: {
    name: `app-vuteq.callback-url`, // Make sure to add conditional logic so that the name of the cookie does not include `__Secure-` on localhost
    options: {
      httpOnly: true,
      path: '/',
      secure: !isLocalhost, // Set to true only if not running on localhost
      domain: isLocalhost ? 'localhost' : 'vuteq.co.id',
    }
  },
  pkceCodeVerifier: {
    name: `app-vuteq.pkce.code_verifier`, // Make sure to add conditional logic so that the name of the cookie does not include `__Secure-` on localhost
    options: {
      httpOnly: true,
      path: '/',
      maxAge: 900,
      secure: !isLocalhost, // Set to true only if not running on localhost
      domain: isLocalhost ? 'localhost' : 'vuteq.co.id',
    }
  },
  state: {
    name: `app-vuteq.state`, // Make sure to add conditional logic so that the name of the cookie does not include `__Secure-` on localhost
    options: {
      httpOnly: true,
      path: '/',
      maxAge: 900,
      secure: !isLocalhost, // Set to true only if not running on localhost
      domain: isLocalhost ? 'localhost' : 'vuteq.co.id',
    }
  },
  nonce: {
    name: `app-vuteq.nonce`, // Make sure to add conditional logic so that the name of the cookie does not include `__Secure-` on localhost
    options: {
      httpOnly: true,
      path: '/',
      secure: !isLocalhost, // Set to true only if not running on localhost
      domain: isLocalhost ? 'localhost' : 'vuteq.co.id',
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      name: 'keycloak',
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: `${process.env.KEYCLOAK_BASE_URL}/realms/vuteq-indonesia`,
      authorization: {
        params: {
          grant_type: 'authorization_code',
          response_type: 'code'
        }
      },
      httpOptions: {
        timeout: 5000
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 23 * 60 * 60 // 23 hours
  },
  useSecureCookies: !isLocalhost,
  callbacks: {
    async signIn({user, account}) {
      if (account && user) {
        return true;
      } else {
        // TODO : Add unauthorized page
        return '/block';
      }
    },
    async session({session, token}) {
      if (token) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken
      }
      return session;
    },

    async jwt({ token, user, account, trigger, session }) {

      if (trigger === "update") {
        return refreshAccessToken(token);
      }
      // Initial sign in
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id_token = account.id_token;
        token.accessTokenExpired =
          Date.now() + (account.expires_in - 15) * 1000;
        token.refreshTokenExpired =
          Date.now() + (account.refresh_expires_in - 15) * 1000;
        token.user = user;
        // const decodedToken = decodeJwt(account.access_token)
        // token.user = decodedToken['resource_access']['vuteq-internal']['roles']
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpired) return token;

      // Access token has expired, try to update it
      return refreshAccessToken(token);

    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
  },
  pages: {
    signIn: '/login',
    error: '/block',
    // signOut: 'http://localhost:8080/realms/master/protocol/openid-connect/logout'
  },
  cookies: cookieOption
}