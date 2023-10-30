import React from 'react';

const WithSuspense = (Component: React.FC) => {
    return (props: any) => {
        return <React.Suspense fallback={<div>Loading...</div>}>
            <Component {...props}/>
        </React.Suspense>
    }
};

export default WithSuspense;