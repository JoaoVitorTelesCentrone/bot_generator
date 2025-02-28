import { atom } from 'jotai';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Authentication state atom
const authAtom = atom({ user: null, isAuthenticated: false });

// Hook for redirecting if not authenticated
export const useAuthRedirect = () => {
    const [auth] = useAtom(authAtom);
    const router = useRouter();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            router.push('/');
        }
    }, [auth.isAuthenticated, router]);
};

// Export authAtom as default
export default authAtom;
