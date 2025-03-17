import React from 'react';
import Link from 'next/link'

const App = () => {
    return (
        <div>
            <p>New ICU Catalogue</p>
            <Link href="/classic-2024">Go to Classic Version</Link>
        </div>
    );
};

export default App;