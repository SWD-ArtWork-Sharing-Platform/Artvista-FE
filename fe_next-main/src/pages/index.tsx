import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Index: React.FC = () => {

    const { push } = useRouter();

    useEffect(() => {
        push('/admin/dashboard');
    }, []);

    return <h3>Loading...</h3>;
}

export default Index;
